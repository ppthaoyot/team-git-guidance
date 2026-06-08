import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import Swal from "sweetalert2";

import { searchStudents, Student } from "../modules/_common/mockStudentData";
import MobileFooter from "../modules/_common/components/MobileFooter";

const normalizeCitizenId = (value: string) => value.replace(/\D/g, "").slice(0, 13);

const formatCitizenId = (id: string) => {
    const digits = normalizeCitizenId(id);
    if (digits.length !== 13) return id;
    return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10, 12)}-${digits.slice(12)}`;
};

const maskCitizenId = (id: string) => {
    const digits = normalizeCitizenId(id);
    if (digits.length !== 13) return id;
    return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-xxxxx-${digits.slice(10, 12)}-${digits.slice(12)}`;
};

const getSchoolSubtitle = (schoolName: string) => {
    if (schoolName.includes("ก้อนแก้ว")) {
        return "ตำบลก้อนแก้ว อำเภอคลองเขื่อน จังหวัดฉะเชิงเทรา";
    }
    if (schoolName.includes("ประทีป")) {
        return "ตำบลเมืองนครราชสีมา อำเภอเมืองนครราชสีมา จังหวัดนครราชสีมา";
    }
    if (schoolName.includes("อัสสัมชัญ")) {
        return "ตำบลบางรัก อำเภอบางรัก จังหวัดกรุงเทพมหานคร";
    }
    return "ตำบลก้อนแก้ว อำเภอคลองเขื่อน จังหวัดฉะเชิงเทรา";
};

const fullName = (student: Student) => `${student.title}${student.firstName} ${student.lastName}`;

const drawCardToCanvas = (student: Student, onComplete: () => void) => {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}template-card.png`;
    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 838;
        canvas.height = 531;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";

        const setFont = (size: number, isBold = false) => {
            ctx.font = `${isBold ? "bold" : "normal"} ${size}px 'Sarabun', sans-serif`;
        };

        const xLeft = 80;
        setFont(15, true);
        ctx.fillText(`เลขอ้างอิง : ${student.refNo}`, xLeft, 150);
        ctx.fillText(`ผู้ถือกรมธรรม์ : ${student.schoolName}`, xLeft, 192);
        ctx.fillText(`ระดับการศึกษา : ${student.gradeLevel}`, xLeft, 234);
        ctx.fillText(`ชื่อผู้เอาประกัน : ${fullName(student)}`, xLeft, 276);
        ctx.fillText(`ผู้บริหารโครงการ : บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด`, xLeft, 318);

        ctx.textAlign = "center";
        ctx.fillStyle = "#07518c";
        setFont(21, true);
        ctx.fillText(`วงเงินค่ารักษาพยาบาล : ${student.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง`, canvas.width / 2, 368);

        setFont(12.5, true);
        ctx.fillText(
            `(กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย ${student.compensationOPDClinic} บาท OPD ${student.compensationOPDHospital} บาท IPD ${student.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)`,
            canvas.width / 2,
            405
        );

        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        setFont(14.5, true);
        ctx.fillText(`วันที่มีผลบังคับ : ${student.effectiveDate}`, 180, 446);
        ctx.fillText(`วันที่สิ้นสุด : ${student.expiryDate}`, 425, 446);

        ctx.fillStyle = "#333333";
        setFont(11.5, true);
        ctx.fillText(`บริษัทผู้รับประกัน : ${student.insurer}`, 36, 498);

        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `PA_Card_${student.firstName}.png`;
        link.href = dataUrl;
        link.click();
        onComplete();
    };
    img.onerror = () => {
        onComplete();
        Swal.fire({
            icon: "error",
            title: "ดาวน์โหลดล้มเหลว",
            text: "ไม่สามารถโหลดรูปภาพพื้นหลังบัตรได้"
        });
    };
};

const CardPreview = ({ student }: { student: Student }) => (
    <Paper
        elevation={4}
        sx={{
            width: "100%",
            maxWidth: 400,
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
        <Box sx={{ position: "absolute", inset: 0, fontSize: "clamp(7px, 2.38vw, 12.2px)", color: "#000000", lineHeight: 1.22 }}>
            <Box sx={{ position: "absolute", left: "9.5%", top: "27.5%", display: "flex", flexDirection: "column", gap: "0.34em", fontFamily: "Sarabun" }}>
                <Box sx={{ fontWeight: 700 }}>เลขอ้างอิง : <Box component="span" sx={{ fontWeight: 400 }}>{student.refNo}</Box></Box>
                <Box sx={{ fontWeight: 700 }}>ผู้ถือกรมธรรม์ : <Box component="span" sx={{ fontWeight: 400 }}>{student.schoolName}</Box></Box>
                <Box sx={{ fontWeight: 700 }}>ระดับการศึกษา : <Box component="span" sx={{ fontWeight: 400 }}>{student.gradeLevel}</Box></Box>
                <Box sx={{ fontWeight: 700 }}>ชื่อผู้เอาประกัน : <Box component="span" sx={{ fontWeight: 400 }}>{fullName(student)}</Box></Box>
                <Box sx={{ fontWeight: 700 }}>ผู้บริหารโครงการ : <Box component="span" sx={{ fontWeight: 400, fontSize: "0.92em" }}>บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด</Box></Box>
            </Box>
            <Box sx={{ position: "absolute", top: "69%", left: "50%", transform: "translateX(-50%)", width: "90%", textAlign: "center", color: "#07518c", fontFamily: "Sarabun", fontSize: "1.18em", fontWeight: 700 }}>
                วงเงินค่ารักษาพยาบาล : {student.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง
            </Box>
            <Box sx={{ position: "absolute", top: "76%", left: "50%", transform: "translateX(-50%)", width: "90%", textAlign: "center", color: "#07518c", fontFamily: "Sarabun", fontSize: "0.67em", fontWeight: 700 }}>
                (กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย {student.compensationOPDClinic} บาท OPD {student.compensationOPDHospital}บาท IPD {student.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)
            </Box>
            <Box sx={{ position: "absolute", bottom: "16.5%", left: "21%", right: "8%", display: "flex", justifyContent: "space-between", fontFamily: "Sarabun", fontSize: "0.82em", fontWeight: 700 }}>
                <Box>วันที่มีผลบังคับ : <Box component="span" sx={{ fontWeight: 400 }}>{student.effectiveDate}</Box></Box>
                <Box>วันที่สิ้นสุด : <Box component="span" sx={{ fontWeight: 400 }}>{student.expiryDate}</Box></Box>
            </Box>
            <Box sx={{ position: "absolute", bottom: "6.5%", left: "4.5%", width: "70%", color: "#333333", fontFamily: "Sarabun", fontSize: "0.67em", fontWeight: 700 }}>
                บริษัทผู้รับประกัน : {student.insurer}
            </Box>
        </Box>
    </Paper>
);

const DetailRow = ({ label, value, accent = false }: { label: string; value: React.ReactNode; accent?: boolean }) => (
    <Box sx={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: 1, alignItems: "start", py: 0.15 }}>
        <Typography sx={{ fontFamily: "'Prompt', 'Sarabun', sans-serif", fontSize: "13px", fontWeight: 700, color: "#2F2F2F" }}>
            {label}
        </Typography>
        <Typography sx={{ fontFamily: "'Prompt', 'Sarabun', sans-serif", fontSize: "13px", fontWeight: 500, color: accent ? "#008BD2" : "#707070", textAlign: "right", wordBreak: "break-word" }}>
            {value}
        </Typography>
    </Box>
);

const StudentSearch = () => {
    const [searchParams] = useSearchParams();
    const urlSchool = searchParams.get("school") || "โรงเรียนก้อนแก้วพิทยาคม";
    const schoolSubtitle = getSchoolSubtitle(urlSchool);
    const [citizenId, setCitizenId] = useState<string>("");
    const [foundStudent, setFoundStudent] = useState<Student | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    useEffect(() => {
        const urlCitizenId = searchParams.get("citizenId");
        if (urlCitizenId) {
            const normalized = normalizeCitizenId(urlCitizenId);
            setCitizenId(normalized);
            const results = searchStudents({ citizenId: normalized, schoolName: urlSchool || undefined });
            setFoundStudent(results[0] ?? null);
            setHasSearched(true);
        }
    }, [searchParams, urlSchool]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const normalized = normalizeCitizenId(citizenId);

        if (!normalized) {
            Swal.fire({
                icon: "warning",
                title: "กรุณากรอกข้อมูล",
                text: "กรุณาป้อนเลขบัตรประชาชนหรือ Passport นักเรียน"
            });
            return;
        }

        const results = searchStudents({ citizenId: normalized, schoolName: urlSchool || undefined });
        setFoundStudent(results[0] ?? null);
        setHasSearched(true);

        if (results.length === 0) {
            Swal.fire({
                icon: "error",
                title: "ไม่พบข้อมูลบัตรประกันภัย",
                text: "กรุณาตรวจสอบเลขบัตรประชาชนใหม่อีกครั้ง",
                confirmButtonColor: "#03A9F4"
            });
        }
    };

    const handleDownloadCard = () => {
        if (!foundStudent) return;
        Swal.fire({
            title: "กำลังเตรียมดาวน์โหลด...",
            text: "กรุณารอสักครู่",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
        drawCardToCanvas(foundStudent, () => Swal.close());
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        Swal.fire({
            icon: "success",
            title: "คัดลอกลิงก์แชร์เรียบร้อยแล้ว!",
            timer: 1800,
            showConfirmButton: false
        });
    };

    const handleShareCard = () => {
        if (!foundStudent) return;
        const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}student/search?school=${encodeURIComponent(foundStudent.schoolName)}&citizenId=${foundStudent.citizenId}`;

        if (navigator.share) {
            navigator.share({
                title: `บัตรประกันภัย PA ของ ${foundStudent.firstName}`,
                text: `ตรวจสอบสิทธิ์บัตรประกันภัย PA ของ ${foundStudent.schoolName}`,
                url: shareUrl
            }).catch(() => copyToClipboard(shareUrl));
            return;
        }

        copyToClipboard(shareUrl);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#DDF9FF",
                background: "linear-gradient(180deg, #E9FDFF 0%, #C7F3FF 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "'Prompt', 'Sarabun', sans-serif",
                pb: "78px",
                width: "100%"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    px: 2,
                    pt: hasSearched && foundStudent ? 6 : { xs: 23, sm: 28 },
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                <Paper
                    component="form"
                    elevation={0}
                    onSubmit={handleSearch}
                    sx={{
                        p: "20px 32px 28px",
                        borderRadius: "4px",
                        bgcolor: "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.08)"
                    }}
                >
                    <Typography sx={{ fontSize: "26px", lineHeight: "36px", fontWeight: 600, textAlign: "center", color: "#000000" }}>
                        {urlSchool}
                    </Typography>
                    <Typography sx={{ mt: 1.2, mb: 2, fontSize: "13px", lineHeight: "20px", fontWeight: 600, textAlign: "center", color: "#000000" }}>
                        {schoolSubtitle}
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="ค้นหาเลขบัตรประชาชน / Passport นักเรียน"
                        value={citizenId.length === 13 ? formatCitizenId(citizenId) : citizenId}
                        onChange={(e) => setCitizenId(normalizeCitizenId(e.target.value))}
                        inputProps={{ inputMode: "numeric" }}
                        sx={{
                            mb: 1.5,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "4px",
                                height: "48px",
                                fontFamily: "'Prompt', 'Sarabun', sans-serif",
                                fontSize: "16px",
                                "& fieldset": { borderColor: "#007AC1" },
                                "&:hover fieldset": { borderColor: "#007AC1" },
                                "&.Mui-focused fieldset": { borderColor: "#007AC1", borderWidth: "1px" }
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            bgcolor: "#13A8E8",
                            color: "#FFFFFF",
                            width: "280px",
                            maxWidth: "100%",
                            height: "48px",
                            borderRadius: "4px",
                            fontSize: "18px",
                            fontWeight: 700,
                            fontFamily: "'Prompt', 'Sarabun', sans-serif",
                            boxShadow: "0px 2px 4px rgba(0,0,0,0.22)",
                            "&:hover": { bgcolor: "#0C95D1" }
                        }}
                    >
                        ค้นหา
                    </Button>

                    {(!hasSearched || !foundStudent) && (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1, mt: 3 }}>
                            <Box sx={{ width: 56, height: 56, bgcolor: "#E2F2FF", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <SearchIcon sx={{ color: "#0093FF", fontSize: 32 }} />
                            </Box>
                            <Typography sx={{ fontWeight: 700, fontSize: "17px", color: "#000000" }}>ค้นหาข้อมูลนักเรียน</Typography>
                            <Typography sx={{ fontWeight: 500, fontSize: "13px", color: "#707070" }}>กรุณาป้อนข้อมูลในช่องค้นหาด้านบน</Typography>
                            <Typography sx={{ fontWeight: 500, fontSize: "13px", color: "#707070" }}>สามารถค้นหาด้วยเลขบัตรประชาชน / Passport นักเรียน</Typography>
                        </Box>
                    )}
                </Paper>

                {hasSearched && foundStudent && (
                    <>
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 1 }}>
                            <CardPreview student={foundStudent} />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 6, py: 1 }}>
                            <Box onClick={handleDownloadCard} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                                <Box sx={{ width: 32, height: 32, background: "linear-gradient(90deg, #25CFF2 0%, #0093FF 100%)", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mb: 0.5 }}>
                                    <DownloadIcon sx={{ color: "#FFFFFF", fontSize: 17 }} />
                                </Box>
                                <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>บันทึกรูปบัตร</Typography>
                            </Box>
                            <Box onClick={handleShareCard} sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                                <Box sx={{ width: 32, height: 32, background: "linear-gradient(90deg, #25CFF2 0%, #0093FF 100%)", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mb: 0.5 }}>
                                    <ShareIcon sx={{ color: "#FFFFFF", fontSize: 17 }} />
                                </Box>
                                <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>แชร์</Typography>
                            </Box>
                        </Box>

                        <Paper elevation={1} sx={{ width: "100%", p: "14px 10px 16px", borderRadius: "5px", bgcolor: "#FFFFFF", boxSizing: "border-box", boxShadow: "0px 2px 5px rgba(0,0,0,0.22)" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <BadgeOutlinedIcon sx={{ fontSize: 21 }} />
                                <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>ข้อมูลผู้เอาประกัน</Typography>
                            </Box>
                            <Box sx={{ borderTop: "1px solid #008BD2", mb: 1.2 }} />
                            <DetailRow label="กรมธรรม์เลขที่ :" value={foundStudent.policyNo} accent />
                            <DetailRow label="เลขอ้างอิง :" value={foundStudent.refNo} accent />
                            <DetailRow label="สถานศึกษา :" value={foundStudent.schoolName} />
                            <DetailRow label="ประเภทแผน :" value={foundStudent.planType} />
                            <DetailRow label="วันที่มีผลบังคับ :" value={foundStudent.effectiveDate} />
                            <DetailRow label="วันที่สิ้นสุด :" value={foundStudent.expiryDate} />
                            <DetailRow label="ชื่อผู้เอาประกัน :" value={fullName(foundStudent)} accent />
                            <DetailRow label="เลขบัตรประชาชน" value={maskCitizenId(foundStudent.citizenId)} />
                            <DetailRow label="ระดับชั้น :" value={foundStudent.gradeLevel} />
                            <DetailRow
                                label="สถานะ :"
                                value={
                                    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, color: "#0FAE45", fontWeight: 700 }}>
                                        <CheckCircleIcon sx={{ fontSize: 14 }} /> มีผลบังคับ
                                    </Box>
                                }
                            />
                            <DetailRow label="ประเภทแผน :" value={foundStudent.planType} />
                        </Paper>

                        <Paper elevation={1} sx={{ width: "100%", p: "14px 10px 16px", borderRadius: "5px", bgcolor: "#FFFFFF", boxSizing: "border-box", boxShadow: "0px 2px 5px rgba(0,0,0,0.18)" }}>
                            <DetailRow label="ประเภทแผน" value={foundStudent.planType} />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5, mb: 1 }}>
                                <BusinessCenterOutlinedIcon sx={{ fontSize: 22 }} />
                                <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>ความคุ้มครอง</Typography>
                            </Box>
                            <Box sx={{ borderTop: "1px solid #008BD2", mb: 1.2 }} />
                            <DetailRow label="ทุนประกัน" value={`${foundStudent.coverageTotal} บาท`} />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5, mb: 1 }}>
                                <HealthAndSafetyOutlinedIcon sx={{ fontSize: 22 }} />
                                <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>สิทธิประโยชน์ความคุ้มครอง</Typography>
                            </Box>
                            <Box sx={{ borderTop: "1px solid #008BD2", mb: 1.2 }} />
                            <DetailRow label="เสียชีวิตเนื่องจากอุบัติเหตุทั่วไป" value={`${foundStudent.deathGeneral} บาท`} />
                            <DetailRow label="ทุพพลภาพโดยถาวร" value={`${foundStudent.murderOrAssault} บาท`} />
                            <DetailRow label="ฆาตกรรม/ถูกทำร้ายร่างกาย" value={`${foundStudent.vehicleAccident} บาท`} />
                            <DetailRow label="เสียชีวิตเนื่องจากโรคภัยไข้เจ็บ" value={`${foundStudent.illnessDeath} บาท`} />
                        </Paper>

                        <Box sx={{ width: "100%", bgcolor: "#36B9E5", borderRadius: "5px", px: 2, py: 1.6, boxSizing: "border-box", color: "#FFFFFF", textAlign: "center", boxShadow: "0px 2px 5px rgba(0,0,0,0.18)" }}>
                            <Typography sx={{ fontSize: "12px", lineHeight: 1.8 }}>
                                รายละเอียดข้อกำหนดและเงื่อนไขของความคุ้มครองรวมหรือยกเว้นไม่คุ้มครองในกรมธรรม์ประกันภัย เป็นไปตามที่บริษัทผู้รับประกันออกให้ผู้ถือกรมธรรม์และ/หรือผู้เอาประกัน
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>

            <MobileFooter />
        </Box>
    );
};

export default StudentSearch;
