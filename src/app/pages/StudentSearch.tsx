import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    AppBar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import Swal from "sweetalert2";

import { searchStudents, Student } from "../modules/_common/mockStudentData";
import MobileFooter from "../modules/_common/components/MobileFooter";

/**
 * ฟังก์ชันช่วยแปลงข้อมูลเลขบัตรประชาชนให้อยู่ในรูปแบบที่แสดงบางส่วน (Masked)
 * ตัวอย่าง: 1234567890123 -> 1-2345-xxxxx-23-4
 */
const maskCitizenId = (id: string) => {
    if (id.length !== 13) return id;
    return `${id.slice(0, 1)}-${id.slice(1, 5)}-xxxxx-${id.slice(10, 12)}-${id.slice(12)}`;
};

/**
 * ค้นหาข้อมูลที่อยู่ของโรงเรียนแบบไดนามิกเพื่อนำมาแสดงผลเป็น Subtitle
 */
const getSchoolSubtitle = (schoolName: string) => {
    if (schoolName.includes("สตรีศรีน่าน")) {
        return "ตำบลในเวียง อำเภอเมืองน่าน จังหวัดน่าน";
    } else if (schoolName.includes("ก้อนแก้ว")) {
        return "ตำบลก้อนแก้ว อำเภอคลองเขื่อน จังหวัดฉะเชิงเทรา";
    } else if (schoolName.includes("สีคิ้ว")) {
        return "ตำบลสีคิ้ว อำเภอสีคิ้ว จังหวัดนครราชสีมา";
    }
    return "ตำบลในเวียง อำเภอเมืองน่าน จังหวัดน่าน";
};

/**
 * หน้าจอค้นหาข้อมูลบัตรประกันภัยของนักเรียน (Mobile Web View - Public Route)
 * ปรับปรุงใหม่ตามสไตล์การจัดวางและโค้ด CSS ของ Figma:
 * 1. แสดงผลชื่อโรงเรียนและที่อยู่ด้านบนสุดของแบบฟอร์ม
 * 2. ป้อนเลขบัตรประชาชนเพื่อค้นหาข้อมูลประกันภัย
 * 3. เมื่อค้นหาพบข้อมูล จะแสดงภาพบัตรจริง ซ้อนทับรายละเอียดแบบ Responsive 
 * 4. มีปุ่มวงกลมสำหรับ "บันทึกรูปบัตร" (Canvas render ดาวน์โหลด) และปุ่ม "แชร์"
 * 5. แสดงตารางข้อมูลผู้เอาประกันแยกรายละเอียดตามข้อกำหนดในฟิกม่า
 */
const StudentSearch = () => {
    const [searchParams] = useSearchParams();
    
    // ดึงค่าชื่อโรงเรียนจาก URL Query Parameter (ค่าเริ่มต้นคือ โรงเรียนสตรีศรีน่าน)
    const urlSchool = searchParams.get("school") || "โรงเรียนสตรีศรีน่าน";
    const schoolSubtitle = getSchoolSubtitle(urlSchool);

    // --- State การทำงาน ---
    const [citizenId, setCitizenId] = useState<string>("");
    const [foundStudent, setFoundStudent] = useState<Student | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    // ดึงเลขบัตรประชาชนจาก URL Query Parameter (หากมาจากปุ่มแชร์)
    useEffect(() => {
        const urlCitizenId = searchParams.get("citizenId");
        if (urlCitizenId && urlCitizenId.length === 13) {
            setCitizenId(urlCitizenId);
            const results = searchStudents({
                citizenId: urlCitizenId,
                schoolName: urlSchool || undefined
            });
            if (results.length > 0) {
                setFoundStudent(results[0]);
                setHasSearched(true);
            }
        }
    }, [searchParams, urlSchool]);

    // ฟังก์ชันประมวลผลการค้นหาด้วยเลขประจำตัวประชาชน
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!citizenId.trim()) {
            Swal.fire({
                icon: "warning",
                title: "กรุณากรอกข้อมูล",
                text: "กรุณาป้อนข้อมูลเลขประจำตัวประชาชน หรือเลขหนังสือเดินทาง"
            });
            return;
        }

        const results = searchStudents({
            citizenId: citizenId.trim(),
            schoolName: urlSchool || undefined
        });

        if (results.length > 0) {
            setFoundStudent(results[0]);
            setHasSearched(true);
        } else {
            setFoundStudent(null);
            setHasSearched(true);
            Swal.fire({
                icon: "error",
                title: "ไม่พบข้อมูลบัตรประกันภัย",
                text: "กรุณาตรวจสอบเลขประจำตัวประชาชนใหม่อีกครั้ง หรือติดต่อโรงเรียนหากมีข้อสงสัย",
                confirmButtonColor: "#03A9F4"
            });
        }
    };

    // ฟังก์ชันประมวลผลการวาดรายละเอียดลงบนบัตรเปล่าผ่าน Canvas และสั่งดาวน์โหลด
    const handleDownloadCard = () => {
        if (!foundStudent) return;

        Swal.fire({
            title: "กำลังเตรียมดาวน์โหลด...",
            text: "กรุณารอซักครู่",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}template-card.png`;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 838;
            canvas.height = 531;
            const ctx = canvas.getContext("2d");
            
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                
                const setFont = (size: number, isBold: boolean = false) => {
                    ctx.font = `${isBold ? "bold" : "normal"} ${size}px 'Sarabun', sans-serif`;
                };

                const xLeft = 80;
                setFont(15, true);
                ctx.fillText(`เลขอ้างอิง : ${foundStudent.refNo}`, xLeft, 150);
                
                setFont(15, true);
                ctx.fillText(`ผู้ถือกรมธรรม์ : ${foundStudent.schoolName}`, xLeft, 192);

                setFont(15, true);
                ctx.fillText(`ระดับการศึกษา : ${foundStudent.gradeLevel}`, xLeft, 234);

                setFont(15, true);
                ctx.fillText(`ชื่อผู้เอาประกัน : ${foundStudent.title}${foundStudent.firstName} ${foundStudent.lastName}`, xLeft, 276);

                setFont(15, true);
                ctx.fillText(`ผู้บริหารโครงการ : บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด`, xLeft, 318);

                ctx.textAlign = "center";
                ctx.fillStyle = "#07518c";
                setFont(21, true);
                ctx.fillText(`วงเงินค่ารักษาพยาบาล : ${foundStudent.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง`, canvas.width / 2, 368);

                setFont(12.5, true);
                ctx.fillText(
                    `(กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย ${foundStudent.compensationOPDClinic} บาท OPD ${foundStudent.compensationOPDHospital} บาท IPD ${foundStudent.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)`,
                    canvas.width / 2,
                    405
                );

                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                setFont(14.5, true);
                ctx.fillText(`วันที่มีผลบังคับ : ${foundStudent.effectiveDate}`, 180, 446);
                ctx.fillText(`วันที่สิ้นสุด : ${foundStudent.expiryDate}`, 425, 446);

                ctx.fillStyle = "#333333";
                setFont(11.5, true);
                ctx.fillText(`บริษัทผู้รับประกัน : ${foundStudent.insurer}`, 36, 498);

                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = `PA_Card_${foundStudent.firstName}.png`;
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

    // ฟังก์ชันแชร์ลิงก์ข้อมูลบัตรประกันภัย
    const handleShareCard = () => {
        if (!foundStudent) return;
        
        const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}student/search?school=${encodeURIComponent(foundStudent.schoolName)}&citizenId=${foundStudent.citizenId}`;
        
        if (navigator.share) {
            navigator.share({
                title: `บัตรประกันภัย PA ของ ${foundStudent.firstName}`,
                text: `คลิกตรวจสอบสิทธิ์และบัตรประกันภัย PA ของโรงเรียน ${foundStudent.schoolName}`,
                url: shareUrl
            }).catch(() => {
                // fallback to clipboard
                copyToClipboard(shareUrl);
            });
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        Swal.fire({
            icon: "success",
            title: "คัดลอกลิงก์แชร์เรียบร้อยแล้ว!",
            text: "คุณสามารถส่งต่อลิงก์นี้เพื่อใช้เปิดดูสิทธิ์บัตรได้ทันที",
            timer: 2000,
            showConfirmButton: false
        });
    };

    // รายการคอลัมน์ข้อมูลที่ต้องการแสดงล่างบัตร
    const getDetailRows = (student: Student) => [
        { label: "กรมธรรม์เลขที่ :", value: student.policyNo, isBlue: true },
        { label: "เลขอ้างอิง :", value: student.refNo, isBlue: true },
        { label: "สถานศึกษา :", value: student.schoolName, isBlue: false },
        { label: "ประเภทแผน :", value: `แผนความคุ้มครอง (${student.coverageLimit} บาท)`, isBlue: false },
        { label: "วันที่มีผลบังคับ :", value: student.effectiveDate, isBlue: false },
        { label: "วันที่สิ้นสุด :", value: `${student.expiryDate}`, isBlue: false },
        { label: "ชื่อผู้เอาประกัน :", value: `${student.title}${student.firstName} ${student.lastName}`, isBlue: true },
        { label: "เลขบัตรประชาชน :", value: maskCitizenId(student.citizenId), isBlue: false }
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "'Prompt', 'Sarabun', sans-serif",
                pb: "70px",
                width: "100%"
            }}
        >
            {/* ส่วนหัวแอปพลิเคชัน */}
            <AppBar position="static" sx={{ bgcolor: "#07518c", boxShadow: 1 }}>
                <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem", fontFamily: "'Prompt', sans-serif" }}>
                        สยามสไมล์ ประกันภัยโรงเรียน
                    </Typography>
                </Box>
            </AppBar>

            {/* คอนเทนเนอร์หลักความกว้างตาม Figma 500px */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    px: 2,
                    boxSizing: "border-box",
                    mt: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                }}
            >
                {/* แบบฟอร์มการค้นหาหลัก (Frame 1000008428) */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        borderRadius: "10px",
                        bgcolor: "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)"
                    }}
                >
                    {/* ชื่อโรงเรียน */}
                    <Typography
                        sx={{
                            fontFamily: "'Prompt', 'Sarabun', sans-serif",
                            fontWeight: 700,
                            fontSize: "1.6rem",
                            lineHeight: "2.1rem",
                            color: "#000000",
                            textAlign: "center",
                            mb: 0.5
                        }}
                    >
                        {urlSchool}
                    </Typography>

                    {/* ที่อยู่ตำบล อำเภอ จังหวัด */}
                    <Typography
                        sx={{
                            fontFamily: "'Prompt', 'Sarabun', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            lineHeight: "1.3rem",
                            color: "#000000",
                            textAlign: "center",
                            mb: 3
                        }}
                    >
                        {schoolSubtitle}
                    </Typography>

                    {/* ช่องกรอกเลขบัตร */}
                    <Box component="form" onSubmit={handleSearch} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="ค้นหาเลขบัตรประชาชน / Passport นักเรียน"
                            value={citizenId}
                            onChange={(e) => setCitizenId(e.target.value.replace(/\D/g, "").slice(0, 13))}
                            inputProps={{ maxLength: 13, inputMode: "numeric" }}
                            sx={{
                                mb: 2,
                                maxWidth: "398px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "6px",
                                    height: "48px",
                                    "& fieldset": {
                                        borderColor: "#007AC1",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#005a8f",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#007AC1",
                                        borderWidth: "1.5px"
                                    }
                                }
                            }}
                        />

                        {/* ปุ่มค้นหา (ความกว้าง 280px) */}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                bgcolor: "#03A9F4",
                                color: "#FFFFFF",
                                width: "280px",
                                height: "48px",
                                borderRadius: "4px",
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                fontFamily: "'Prompt', sans-serif",
                                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14)",
                                "&:hover": {
                                    bgcolor: "#0288d1"
                                },
                                mb: 1
                            }}
                        >
                            ค้นหา
                        </Button>
                    </Box>

                    {/* ส่วนแสดงสถานะการกรอกข้อมูล (ก่อนมีการกดค้นหาหรือเมื่อไม่พบผู้ประกันตน) */}
                    {(!hasSearched || !foundStudent) && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gap: 1.5,
                                mt: 3
                            }}
                        >
                            <Box
                                sx={{
                                    width: "56px",
                                    height: "56px",
                                    bgcolor: "#E2F2FF",
                                    borderRadius: "100px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <SearchIcon sx={{ color: "#0093FF", fontSize: "32px" }} />
                            </Box>
                            <Typography sx={{ fontFamily: "'Prompt', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#000000" }}>
                                ค้นหาข้อมูลนักเรียน
                            </Typography>
                            <Typography sx={{ fontFamily: "'Prompt', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: "#707070" }}>
                                กรุณาป้อนข้อมูลในช่องค้นหาด้านบน
                            </Typography>
                            <Typography sx={{ fontFamily: "'Prompt', sans-serif", fontWeight: 500, fontSize: "0.9rem", color: "#707070" }}>
                                สามารถค้นหาด้วยเลขบัตรประชาชน / Passport นักเรียน
                            </Typography>
                        </Box>
                    )}
                </Paper>

                {/* ส่วนแสดงผลลัพธ์ (เมื่อค้นเจอข้อมูลนักเรียนสำเร็จ) */}
                {hasSearched && foundStudent && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 3,
                            width: "100%"
                        }}
                    >
                        {/* การ์ดดิจิทัลซ้อนตัวอักษร 16(New) */}
                        <Paper
                            elevation={4}
                            sx={{
                                width: "100%",
                                maxWidth: "400px",
                                aspectRatio: "838 / 531",
                                backgroundImage: `url('${import.meta.env.BASE_URL}template-card.png')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderRadius: "8px",
                                position: "relative",
                                overflow: "hidden",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)"
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    fontSize: "min(2.8vw, 12.5px)",
                                    color: "#000000",
                                    lineHeight: 1.2
                                }}
                            >
                                {/* ข้อมูลข้อความต่างๆ ซ้อนทับการ์ด */}
                                <Box sx={{ position: "absolute", left: "9.5%", top: "27.5%", display: "flex", flexDirection: "column", gap: "2%" }}>
                                    <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                        เลขอ้างอิง : <span style={{ fontWeight: "normal" }}>{foundStudent.refNo}</span>
                                    </Box>
                                    <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "3px" }}>
                                        ผู้ถือกรมธรรม์ : <span style={{ fontWeight: "normal" }}>{foundStudent.schoolName}</span>
                                    </Box>
                                    <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "3px" }}>
                                        ระดับการศึกษา : <span style={{ fontWeight: "normal" }}>{foundStudent.gradeLevel}</span>
                                    </Box>
                                    <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "3px" }}>
                                        ชื่อผู้เอาประกัน : <span style={{ fontWeight: "normal" }}>{foundStudent.title}{foundStudent.firstName} {foundStudent.lastName}</span>
                                    </Box>
                                    <Box sx={{ fontSize: "0.95em", fontWeight: "bold", fontFamily: "Sarabun", mt: "3px" }}>
                                        ผู้บริหารโครงการ : <span style={{ fontWeight: "normal", fontSize: "0.9em" }}>บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด</span>
                                    </Box>
                                </Box>

                                {/* วงเงินคุ้มครอง */}
                                <Box sx={{ position: "absolute", top: "69.5%", left: "50%", transform: "translateX(-50%)", width: "90%", textAlign: "center" }}>
                                    <Box sx={{ color: "#07518c", fontSize: "1.2em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                        วงเงินค่ารักษาพยาบาล : {foundStudent.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง
                                    </Box>
                                </Box>

                                {/* ข้อความเพิ่มเติม */}
                                <Box sx={{ position: "absolute", top: "76.5%", left: "50%", transform: "translateX(-50%)", width: "90%", textAlign: "center" }}>
                                    <Box sx={{ color: "#07518c", fontSize: "0.68em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                        (กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย {foundStudent.compensationOPDClinic} บาท OPD {foundStudent.compensationOPDHospital} บาท IPD {foundStudent.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)
                                    </Box>
                                </Box>

                                {/* วันเริ่มต้นคุ้มครอง และวันหมดอายุ */}
                                <Box sx={{ position: "absolute", bottom: "16.5%", left: "21%", right: "8%", display: "flex", justifyContent: "space-between" }}>
                                    <Box sx={{ fontSize: "0.85em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                        วันที่มีผลบังคับ : <span style={{ fontWeight: "normal" }}>{foundStudent.effectiveDate}</span>
                                    </Box>
                                    <Box sx={{ fontSize: "0.85em", fontWeight: "bold", fontFamily: "Sarabun", mr: "4%" }}>
                                        วันที่สิ้นสุด : <span style={{ fontWeight: "normal" }}>{foundStudent.expiryDate}</span>
                                    </Box>
                                </Box>

                                {/* ผู้รับประกัน */}
                                <Box sx={{ position: "absolute", bottom: "6.5%", left: "4.5%", width: "70%" }}>
                                    <Box sx={{ color: "#333333", fontSize: "0.68em", fontWeight: "bold", fontFamily: "Sarabun" }}>
                                        บริษัทผู้รับประกัน : {foundStudent.insurer}
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>

                        {/* ปุ่มควบคุม Save & Share ดีไซน์แบบวงกลมพร้อมข้อความด้านล่างตามรูปที่ 2 */}
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 6, mt: 1 }}>
                            {/* ปุ่มบันทึกรูปบัตร */}
                            <Box
                                onClick={handleDownloadCard}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    "&:hover opacity": 0.85
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "28px",
                                        height: "28px",
                                        background: "linear-gradient(90deg, #25CFF2 0%, #0093FF 100%)",
                                        borderRadius: "100px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                                        mb: 0.5
                                    }}
                                >
                                    <DownloadIcon sx={{ color: "#FFFFFF", fontSize: "16px" }} />
                                </Box>
                                <Typography sx={{ fontFamily: "'Prompt', 'Sarabun', sans-serif", fontSize: "14px", fontWeight: "bold", color: "#000000" }}>
                                    บันทึกรูปบัตร
                                </Typography>
                            </Box>

                            {/* ปุ่มแชร์ */}
                            <Box
                                onClick={handleShareCard}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    "&:hover opacity": 0.85
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "28px",
                                        height: "28px",
                                        background: "linear-gradient(90deg, #25CFF2 0%, #0093FF 100%)",
                                        borderRadius: "100px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                                        mb: 0.5
                                    }}
                                >
                                    <ShareIcon sx={{ color: "#FFFFFF", fontSize: "16px" }} />
                                </Box>
                                <Typography sx={{ fontFamily: "'Prompt', 'Sarabun', sans-serif", fontSize: "14px", fontWeight: "bold", color: "#000000" }}>
                                    แชร์
                                </Typography>
                            </Box>
                        </Box>

                        {/* กล่องแสดงรายละเอียดตาราง ข้อมูลผู้เอาประกัน (Frame 1000008213) */}
                        <Paper
                            elevation={2}
                            sx={{
                                width: "100%",
                                p: 2.5,
                                pt: 2,
                                pb: 1,
                                borderRadius: "10px",
                                bgcolor: "#FFFFFF",
                                display: "flex",
                                flexDirection: "column",
                                boxSizing: "border-box",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }}
                        >
                            {/* หัวข้อส่วน (Frame 1000008326) */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                {/* healthicons:insurance-card-outline (ไอคอนรูปบัตรผู้เอาประกัน) */}
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/>
                                </svg>
                                <Typography sx={{ fontFamily: "'Prompt', 'Sarabun', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#000000" }}>
                                    ข้อมูลผู้เอาประกัน
                                </Typography>
                            </Box>

                            {/* แถบเส้นสีฟ้า (Frame 1000008218) */}
                            <Box sx={{ borderTop: "1.5px solid #079AFF", width: "100%", mb: 1 }} />

                            {/* รายละเอียดแต่ละแถว (Frame 1000007971 ถึง 1000007982) */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {getDetailRows(foundStudent).map((row, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            py: 0.8,
                                            borderBottom: idx !== 7 ? "1px solid #E0E0E0" : "none"
                                        }}
                                    >
                                        {/* หัวข้อแถว เช่น เลขที่กรมธรรม์ */}
                                        <Typography sx={{ fontFamily: "'Prompt', 'Sarabun', sans-serif", fontSize: "0.95rem", fontWeight: "bold", color: "#000000" }}>
                                            {row.label}
                                        </Typography>

                                        {/* ค่าข้อมูลขวาสุด */}
                                        <Typography
                                            sx={{
                                                fontFamily: "'Prompt', 'Sarabun', sans-serif",
                                                fontSize: "0.95rem",
                                                fontWeight: "bold",
                                                color: row.isBlue ? "#079AFF" : "#707070",
                                                textAlign: "right"
                                            }}
                                        >
                                            {row.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Box>
                )}
            </Box>

            {/* Mobile Footer */}
            <MobileFooter />
        </Box>
    );
};

export default StudentSearch;
