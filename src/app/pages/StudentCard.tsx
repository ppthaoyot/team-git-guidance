import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Swal from "sweetalert2";

import { searchStudents, Student } from "../modules/student/mockStudentData";
import { ensureSarabunFont } from "../modules/student/canvasFontLoader";
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
    const cardCanvasRef = useRef<HTMLCanvasElement | null>(null);

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
                    confirmButtonColor: "#07518c",
                }).then(() => {
                    navigate("/student/search");
                });
            }
        }
    }, [citizenId, navigate]);

    const drawCard = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, targetStudent: Student) => {
        ctx.clearRect(0, 0, 838, 531);
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";

        const setFont = (size: number, isBold: boolean = false) => {
            ctx.font = `${isBold ? "bold" : "normal"} ${size}px 'Sarabun', sans-serif`;
        };

        const fillTextCentered = (text: string, y: number, maxWidth: number, baseFontSize: number, isBold = true) => {
            setFont(baseFontSize, isBold);
            let fontSize = baseFontSize;
            while (ctx.measureText(text).width > maxWidth && fontSize > 8) {
                fontSize -= 0.5;
                setFont(fontSize, isBold);
            }
            const textWidth = ctx.measureText(text).width;
            const x = (838 - textWidth) / 2;
            ctx.textAlign = "left";
            ctx.fillText(text, x, y);
        };

        const xLeft = 80;
        setFont(15, true);
        ctx.fillText(`เลขอ้างอิง : ${targetStudent.refNo}`, xLeft, 150);

        setFont(15, true);
        ctx.fillText(`ผู้ถือกรมธรรม์ : ${targetStudent.schoolName}`, xLeft, 192);

        setFont(15, true);
        ctx.fillText(`ระดับการศึกษา : ${targetStudent.gradeLevel}`, xLeft, 234);

        setFont(15, true);
        ctx.fillText(
            `ชื่อผู้เอาประกัน : ${targetStudent.title}${targetStudent.firstName} ${targetStudent.lastName}`,
            xLeft,
            276
        );

        setFont(15, true);
        ctx.fillText(`ผู้บริหารโครงการ : บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด`, xLeft, 318);

        ctx.fillStyle = "#07518c";
        fillTextCentered(
            `วงเงินค่ารักษาพยาบาล : ${targetStudent.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง`,
            368,
            680,
            21
        );

        fillTextCentered(
            `(กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย ${targetStudent.compensationOPDClinic} บาท OPD ${targetStudent.compensationOPDHospital} บาท IPD ${targetStudent.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)`,
            405,
            720,
            12.5
        );

        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        setFont(14.5, true);
        ctx.fillText(`วันที่มีผลบังคับ : ${targetStudent.effectiveDate}`, 180, 446);
        ctx.fillText(`วันที่สิ้นสุด : ${targetStudent.expiryDate}`, 425, 446);

        ctx.fillStyle = "#333333";
        setFont(11.5, true);
        ctx.fillText(`บริษัทผู้รับประกัน : ${targetStudent.insurer}`, 36, 498);
    };

    const drawCardWithFonts = async (ctx: CanvasRenderingContext2D, img: HTMLImageElement, targetStudent: Student) => {
        await ensureSarabunFont();
        drawCard(ctx, img, targetStudent);
    };

    useEffect(() => {
        if (!student || !cardCanvasRef.current) return;

        const canvas = cardCanvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}template-card.png`;
        img.onload = () => {
            void drawCardWithFonts(ctx, img, student);
        };
    }, [student]);

    // ฟังก์ชันประมวลผลการวาดรายละเอียดลงบนบัตรเปล่าผ่าน Canvas และส่งออกดาวน์โหลดรูปภาพ
    const handleDownload = () => {
        if (!student) return;

        Swal.fire({
            title: "กำลังเตรียมดาวน์โหลด...",
            text: "กรุณารอซักครู่",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}template-card.png`;
        img.onload = async () => {
            const canvas = document.createElement("canvas");
            canvas.width = 838;
            canvas.height = 531;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            await drawCardWithFonts(ctx, img, student);

            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `PA_Card_${student.firstName}.png`;
            link.href = dataUrl;
            link.click();
            Swal.close();
        };
        img.onerror = () => {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "ดาวน์โหลดล้มเหลว",
                text: "ไม่สามารถโหลดรูปภาพพื้นหลังบัตรได้",
            });
        };
    };

    if (!student) return null;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#DDF9FF",
                background: "linear-gradient(180deg, #E9FDFF 0%, #C7F3FF 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "Sarabun",
                pb: "78px",
            }}
        >
            {/* แทบเมนูด้านบนของหน้าจอบนมือถือ */}
            {/* กล่องบรรจุตัวการ์ดและการจัดการสำหรับโมบาย */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "540px",
                    px: 2,
                    pt: 6,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 510,
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <canvas
                        ref={cardCanvasRef}
                        width={838}
                        height={531}
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                        }}
                    />
                </Box>

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
                        "&:hover": { bgcolor: "#053e6d" },
                    }}
                >
                    ดาวน์โหลดภาพบัตรประกันภัย
                </Button>
                <Button
                    fullWidth
                    variant="text"
                    onClick={() =>
                        navigate(
                            `/student/search?school=${encodeURIComponent(student.schoolName)}&citizenId=${
                                student.citizenId
                            }`
                        )
                    }
                    sx={{ color: "#07518c", fontWeight: 700 }}
                >
                    กลับไปหน้าค้นหา
                </Button>
            </Box>

            {/* Mobile Footer */}
            <MobileFooter />
        </Box>
    );
};

export default StudentCard;
