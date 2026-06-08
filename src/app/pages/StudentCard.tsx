import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    Button,
    Typography,
    AppBar,
    IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import Swal from "sweetalert2";

import { searchStudents, Student } from "../modules/_common/mockStudentData";
import MobileFooter from "../modules/_common/components/MobileFooter";

/**
 * หน้าจอแสดงบัตรประกันภัยอุบัติเหตุส่วนบุคคล (PA) แบบดิจิทัลสำหรับนักเรียน (Mobile Web View - Public Route)
 * ฟังก์ชันหลัก:
 * 1. ดึงตัวแปร citizenId จากพารามิเตอร์ URL เพื่อค้นหาข้อมูลสิทธิ์ของนักเรียนคนนั้นๆ
 * 2. แสดงผลบัตรจำลองในหน้ารวม โดยใช้ภาพเปล่า template-card.png
 * 3. ซ้อนทับข้อมูลจริงของนักเรียน (ชื่อ, เลขอ้างอิง, โรงเรียน, วงเงินคุ้มครอง) บนรูปภาพบัตรโดยใช้ CSS Absolute Positioning แบบเปอร์เซ็นต์ยืดหยุ่น (Responsive)
 * 4. ปุ่ม "ดาวน์โหลดภาพบัตรประกันภัย" เพื่อส่งออกแบบความละเอียดสูงเป็นไฟล์รูปภาพ (.png) ผ่าน HTML5 Canvas
 */
const StudentCard = () => {
    const { citizenId } = useParams<{ citizenId: string }>();
    const navigate = useNavigate();
    const [student, setStudent] = useState<Student | null>(null);

    // ดึงข้อมูลเมื่อ citizenId ใน URL เปลี่ยนแปลง
    useEffect(() => {
        if (citizenId) {
            const results = searchStudents({ citizenId });
            if (results.length > 0) {
                setStudent(results[0]);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ไม่พบข้อมูลบัตร",
                    text: "ไม่พบข้อมูลสิทธิ์ประกันภัยนี้ในระบบ",
                    confirmButtonColor: "#07518c"
                }).then(() => {
                    navigate("/student/search");
                });
            }
        }
    }, [citizenId, navigate]);

    // ฟังก์ชันประมวลผลการวาดรายละเอียดลงบนบัตรเปล่าผ่าน Canvas และส่งออกดาวน์โหลดรูปภาพ
    const handleDownload = () => {
        if (!student) return;

        Swal.fire({
            title: "กำลังเตรียมดาวน์โหลด...",
            text: "กรุณารอซักครู่",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}template-card.png`; // ดึง path ตาม Base URL ของระบบ
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 838;  // ขนาดพิกเซลจริงของหน้าบัตรต้นฉบับกว้าง
            canvas.height = 531; // ขนาดพิกเซลจริงของหน้าบัตรต้นฉบับสูง
            const ctx = canvas.getContext("2d");
            
            if (ctx) {
                // 1. วาดเทมเพลตภาพเปล่าลงบน Canvas
                ctx.drawImage(img, 0, 0);

                // ตั้งค่ารูปแบบการแสดงตัวหนังสือเริ่มต้น
                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                
                // ฟังก์ชันช่วยย่อโค้ดในการเรียกใช้ฟอนต์สารบัญ
                const setFont = (size: number, isBold: boolean = false) => {
                    ctx.font = `${isBold ? "bold" : "normal"} ${size}px 'Sarabun', sans-serif`;
                };

                // 2. วาดรายละเอียดข้อมูลผู้ประกันตนด้านซ้ายบนการ์ด
                const xLeft = 80;
                setFont(15, true);
                ctx.fillText(`เลขอ้างอิง : ${student.refNo}`, xLeft, 150);
                
                setFont(15, true);
                ctx.fillText(`ผู้ถือกรมธรรม์ : ${student.schoolName}`, xLeft, 192);

                setFont(15, true);
                ctx.fillText(`ระดับการศึกษา : ${student.gradeLevel}`, xLeft, 234);

                setFont(15, true);
                ctx.fillText(`ชื่อผู้เอาประกัน : ${student.title}${student.firstName} ${student.lastName}`, xLeft, 276);

                setFont(15, true);
                ctx.fillText(`ผู้บริหารโครงการ : บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด`, xLeft, 318);

                // 3. วาดวงเงินคุ้มครองและตัวหนังสือสีน้ำเงินโดดเด่นกลางการ์ด
                ctx.textAlign = "center";
                ctx.fillStyle = "#07518c";
                setFont(21, true);
                ctx.fillText(`วงเงินค่ารักษาพยาบาล : ${student.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง`, canvas.width / 2, 368);

                // 4. วาดสิทธิการชดเชยค่ารักษาพยาบาลเพิ่มเติม (ตัวอักษรจิ๋วกลางล่าง)
                setFont(12.5, true);
                ctx.fillText(
                    `(กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย ${student.compensationOPDClinic} บาท OPD ${student.compensationOPDHospital} บาท IPD ${student.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)`,
                    canvas.width / 2,
                    405
                );

                // 5. วาดวันมีผลบังคับและวันสิ้นสุดสัญญา
                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                setFont(14.5, true);
                ctx.fillText(`วันที่มีผลบังคับ : ${student.effectiveDate}`, 180, 446);
                ctx.fillText(`วันที่สิ้นสุด : ${student.expiryDate}`, 425, 446);

                // 6. วาดข้อความบริษัทผู้รับประกันภัย (แถบล่างสุด)
                ctx.fillStyle = "#333333";
                setFont(11.5, true);
                ctx.fillText(`บริษัทผู้รับประกัน : ${student.insurer}`, 36, 498);

                // 7. บันทึก Canvas ออกมาเป็นภาพ PNG และส่งไปยังเบราว์เซอร์เพื่อเริ่มดาวน์โหลด
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = `PA_Card_${student.firstName}.png`;
                link.href = dataUrl;
                link.click();
                Swal.close();
            }
        };
        img.onerror = () => {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ดาวน์โหลดล้มเหลว",
                text: "ไม่สามารถโหลดรูปภาพพื้นหลังบัตรได้"
            });
        };
    };

    if (!student) return null;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "Sarabun",
                pb: "60px"
            }}
        >
            {/* แทบเมนูด้านบนของหน้าจอบนมือถือ */}
            <AppBar position="static" sx={{ bgcolor: "#07518c", boxShadow: 1 }}>
                <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => navigate(`/student/search?school=${encodeURIComponent(student.schoolName)}`)}
                        sx={{ mr: 1 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        บัตรประกันภัยอุบัติเหตุของท่าน
                    </Typography>
                </Box>
            </AppBar>

            {/* กล่องบรรจุตัวการ์ดและการจัดการสำหรับโมบาย */}
            <Box
                sx={{
                    width: "92%",
                    maxWidth: "500px",
                    mt: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3
                }}
            >
                {/* องค์ประกอบการ์ดจำลอง: แสดงพื้นหลังเป็นรูปเปล่า และใช้ CSS เปอร์เซ็นต์ในการ Absolute ข้อความทับ */}
                <Paper
                    elevation={4}
                    sx={{
                        width: "100%",
                        aspectRatio: "838 / 531", // รักษาสัดส่วนการ์ดให้คมชัดและขนาดพอดีกับรูปภาพจริงเสมอ
                        backgroundImage: `url('${import.meta.env.BASE_URL}template-card.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 3,
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0px 8px 24px rgba(7, 81, 140, 0.15)"
                    }}
                >
                    {/* กล่องซ้อนทับ: คอนโทรล font-size ตามความกว้างของหน้าจอเพื่อป้องกันปัญหาตัวหนังสือหลุดเฟรม */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            fontSize: "min(3vw, 15px)", // สเกลฟอนต์ให้หด/ขยายอัตโนมัติอ้างอิงตามบอร์ด
                            color: "#000000",
                            lineHeight: 1.2
                        }}
                    >
                        {/* ข้อความข้อมูลส่วนตัว (ซ้อนทับตามพิกัดร้อยละเทียบจากขนาดการ์ด) */}
                        <Box sx={{ position: "absolute", left: "9.5%", top: "27.5%", display: "flex", flexDirection: "column", gap: "2%" }}>
                            <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                เลขอ้างอิง : <span style={{ fontWeight: "normal" }}>{student.refNo}</span>
                            </Box>
                            <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "4px" }}>
                                ผู้ถือกรมธรรม์ : <span style={{ fontWeight: "normal" }}>{student.schoolName}</span>
                            </Box>
                            <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "4px" }}>
                                ระดับการศึกษา : <span style={{ fontWeight: "normal" }}>{student.gradeLevel}</span>
                            </Box>
                            <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "4px" }}>
                                ชื่อผู้เอาประกัน : <span style={{ fontWeight: "normal" }}>{student.title}{student.firstName} {student.lastName}</span>
                            </Box>
                            <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "4px" }}>
                                ผู้บริหารโครงการ : <span style={{ fontWeight: "normal", fontSize: "0.9em" }}>บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด</span>
                            </Box>
                        </Box>

                        {/* ข้อความแสดงวงเงิน (กึ่งกลางการ์ด) */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: "69.5%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "90%",
                                textAlign: "center"
                            }}
                        >
                            <Box sx={{ color: "#07518c", fontSize: "1.25em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                วงเงินค่ารักษาพยาบาล : {student.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง
                            </Box>
                        </Box>

                        {/* คำชี้แจงค่ารักษาเพิ่มเติม */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: "76.5%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "90%",
                                textAlign: "center"
                            }}
                        >
                            <Box sx={{ color: "#07518c", fontSize: "0.7em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                (กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย {student.compensationOPDClinic} บาท OPD {student.compensationOPDHospital} บาท IPD {student.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)
                            </Box>
                        </Box>

                        {/* วันเริ่มคุ้มครอง และวันหมดอายุ */}
                        <Box sx={{ position: "absolute", bottom: "16.5%", left: "21%", right: "8%", display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ fontSize: "0.85em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                วันที่มีผลบังคับ : <span style={{ fontWeight: "normal" }}>{student.effectiveDate}</span>
                            </Box>
                            <Box sx={{ fontSize: "0.85em", fontWeight: "bold", fontFamily: "Sarabun", mr: "4%" }}>
                                วันที่สิ้นสุด : <span style={{ fontWeight: "normal" }}>{student.expiryDate}</span>
                            </Box>
                        </Box>

                        {/* ผู้รับประกัน (ล่างซ้าย) */}
                        <Box sx={{ position: "absolute", bottom: "6.5%", left: "4.5%", width: "70%" }}>
                            <Box sx={{ color: "#333333", fontSize: "0.68em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                บริษัทผู้รับประกัน : {student.insurer}
                            </Box>
                        </Box>
                    </Box>
                </Paper>

                {/* ปุ่มควบคุมดาวน์โหลดภาพการ์ดเก็บลงเครื่อง */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    sx={{
                        bgcolor: "#07518c",
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#053e6d" }
                    }}
                >
                    ดาวน์โหลดภาพบัตรประกันภัย
                </Button>
            </Box>

            {/* Mobile Footer */}
            <MobileFooter />
        </Box>
    );
};

export default StudentCard;
