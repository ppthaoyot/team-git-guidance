import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography, Collapse, Dialog, IconButton } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

import { searchStudents, Student } from "../modules/student/mockStudentData";
import { ensureSarabunFont } from "../modules/student/canvasFontLoader";
import MobileFooter from "../modules/_common/components/MobileFooter";

const normalizeCitizenId = (value: string) => {
    const normalized = value.replace(/[^a-zA-Z0-9]/g, "");
    if (/^\d+$/.test(normalized)) {
        return normalized.slice(0, 13);
    }
    return normalized.slice(0, 15).toUpperCase();
};

const formatCitizenId = (id: string) => {
    const digits = normalizeCitizenId(id);
    if (digits.length !== 13 || !/^\d+$/.test(digits)) return id;
    return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10, 12)}-${digits.slice(
        12
    )}`;
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

const drawCard = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, student: Student) => {
    ctx.clearRect(0, 0, 838, 531);
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
    ctx.fillText(`วงเงินค่ารักษาพยาบาล : ${student.coverageLimit} บาท/ต่ออุบัติเหตุแต่ละครั้ง`, 419, 368);

    setFont(12.5, true);
    ctx.fillText(
        `(กรณีไม่เรียกร้องผลประโยชน์ค่ารักษาพยาบาล OPD อนามัย ${student.compensationOPDClinic} บาท OPD ${student.compensationOPDHospital} บาท IPD ${student.compensationIPD} บาท/ต่ออุบัติเหตุแต่ละครั้ง)`,
        419,
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
};

const drawCardWithFonts = async (ctx: CanvasRenderingContext2D, img: HTMLImageElement, student: Student) => {
    await ensureSarabunFont();
    drawCard(ctx, img, student);
};

const drawCardToCanvas = (student: Student, onComplete: () => void) => {
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
        onComplete();
    };
    img.onerror = () => {
        onComplete();
        Swal.fire({
            icon: "error",
            title: "ดาวน์โหลดล้มเหลว",
            text: "ไม่สามารถโหลดรูปภาพพื้นหลังบัตรได้",
        });
    };
};

const CardPreview = ({
    student,
    onZoom,
    onImageReady,
}: {
    student: Student;
    onZoom?: () => void;
    onImageReady?: (src: string) => void;
}) => {
    const [imgSrc, setImgSrc] = useState<string>("");

    useEffect(() => {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}template-card.png`;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 838;
            canvas.height = 531;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            void drawCardWithFonts(ctx, img, student).then(() => {
                const dataUrl = canvas.toDataURL("image/png");
                setImgSrc(dataUrl);
                onImageReady?.(dataUrl);
            });
        };
    }, [student]);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 510,
                borderRadius: "8px",
                overflow: "hidden",
                bgcolor: "#FFFFFF",
                cursor: imgSrc && onZoom ? "pointer" : "default",
            }}
            onClick={() => imgSrc && onZoom && onZoom()}
        >
            {imgSrc ? (
                <img
                    src={imgSrc}
                    alt="Digital Insurance Card"
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                    }}
                />
            ) : (
                <Box sx={{ width: "100%", height: 0, pb: "63.36%" }} />
            )}
        </Box>
    );
};

const DetailRow = ({
    label,
    value,
    accent = false,
    labelWidth = "132px",
}: {
    label: string;
    value: React.ReactNode;
    accent?: boolean;
    labelWidth?: string;
}) => (
    <Box sx={{ display: "grid", gridTemplateColumns: `${labelWidth} 1fr`, gap: 1, alignItems: "start", py: 0.15 }}>
        <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#2F2F2F", whiteSpace: "nowrap" }}>
            {label}
        </Typography>
        <Typography
            sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: accent ? "#008BD2" : "#707070",
                textAlign: "right",
                wordBreak: "break-word",
            }}
        >
            {value}
        </Typography>
    </Box>
);

const StudentSearch = () => {
    const [searchParams] = useSearchParams();
    const [coverageOpen, setCoverageOpen] = useState(true);
    const [benefitsOpen, setBenefitsOpen] = useState(true);
    const urlSchool = searchParams.get("school") || "โรงเรียนก้อนแก้วพิทยาคม";
    const schoolSubtitle = getSchoolSubtitle(urlSchool);
    const [citizenId, setCitizenId] = useState<string>("");
    const [foundStudent, setFoundStudent] = useState<Student | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [zoomImgSrc, setZoomImgSrc] = useState<string>("");

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
                text: "กรุณาป้อนเลขบัตรประชาชนหรือ Passport นักเรียน",
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
                confirmButtonColor: "#03A9F4",
            });
        }
    };

    const handleDownloadCard = () => {
        if (!foundStudent) return;
        Swal.fire({
            title: "กำลังเตรียมดาวน์โหลด...",
            text: "กรุณารอสักครู่",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });
        drawCardToCanvas(foundStudent, () => Swal.close());
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        Swal.fire({
            icon: "success",
            title: "คัดลอกลิงก์แชร์เรียบร้อยแล้ว!",
            timer: 1800,
            showConfirmButton: false,
        });
    };

    const handleShareCard = () => {
        if (!foundStudent) return;
        const shareUrl = `${window.location.origin}${
            import.meta.env.BASE_URL
        }student/search?school=${encodeURIComponent(foundStudent.schoolName)}&citizenId=${foundStudent.citizenId}`;

        if (navigator.share) {
            navigator
                .share({
                    title: `บัตรประกันภัย PA ของ ${foundStudent.firstName}`,
                    text: `ตรวจสอบสิทธิ์บัตรประกันภัย PA ของ ${foundStudent.schoolName}`,
                    url: shareUrl,
                })
                .catch(() => copyToClipboard(shareUrl));
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
                pb: "78px",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "560px",
                    px: 2,
                    pt: hasSearched && foundStudent ? { xs: 3, sm: 6 } : { xs: 4, sm: 8 },
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Paper
                    component="form"
                    elevation={0}
                    onSubmit={handleSearch}
                    sx={{
                        p: "20px 24px 28px",
                        borderRadius: "8px",
                        bgcolor: "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "26px",
                            lineHeight: "36px",
                            fontWeight: 600,
                            textAlign: "center",
                            color: "#000000",
                        }}
                    >
                        {urlSchool}
                    </Typography>
                    <Typography
                        sx={{
                            mt: 1.2,
                            mb: 2,
                            fontSize: "13px",
                            lineHeight: "20px",
                            fontWeight: 600,
                            textAlign: "center",
                            color: "#000000",
                        }}
                    >
                        {schoolSubtitle}
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="ค้นหาเลขบัตรประชาชน / Passport นักเรียน"
                        value={
                            citizenId.length === 13 && /^\d+$/.test(citizenId) ? formatCitizenId(citizenId) : citizenId
                        }
                        onChange={(e) => setCitizenId(normalizeCitizenId(e.target.value))}
                        inputProps={{ inputMode: "text" }}
                        sx={{
                            mb: 1.5,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "4px",
                                height: "48px",
                                fontSize: "16px",
                                "& fieldset": { borderColor: "#007AC1" },
                                "&:hover fieldset": { borderColor: "#007AC1" },
                                "&.Mui-focused fieldset": { borderColor: "#007AC1", borderWidth: "1px" },
                            },
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
                            boxShadow: "0px 2px 4px rgba(0,0,0,0.22)",
                            "&:hover": { bgcolor: "#0C95D1" },
                        }}
                    >
                        ค้นหา
                    </Button>

                    {(!hasSearched || !foundStudent) && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gap: 1,
                                mt: 3,
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    bgcolor: "#E2F2FF",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <SearchIcon sx={{ color: "#0093FF", fontSize: 32 }} />
                            </Box>
                            <Typography sx={{ fontWeight: 700, fontSize: "17px", color: "#000000" }}>
                                ค้นหาข้อมูลนักเรียน
                            </Typography>
                            <Typography sx={{ fontWeight: 500, fontSize: "13px", color: "#707070" }}>
                                กรุณาป้อนข้อมูลในช่องค้นหาด้านบน
                            </Typography>
                            <Typography sx={{ fontWeight: 500, fontSize: "13px", color: "#707070", mb: 2 }}>
                                สามารถค้นหาด้วยเลขบัตรประชาชน / Passport นักเรียน
                            </Typography>

                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    width: "100%",
                                    maxWidth: "400px",
                                    borderColor: "#E2F2FF",
                                    bgcolor: "#F9FCFF",
                                    borderRadius: "8px",
                                    textAlign: "left",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        color: "#007AC1",
                                        mb: 1.5,
                                        textAlign: "center",
                                    }}
                                >
                                    💡 ข้อมูลตัวอย่างสำหรับทดสอบระบบ (Mock Test Data)
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Box
                                        onClick={() => setCitizenId("7640543275347")}
                                        sx={{
                                            p: 1,
                                            bgcolor: "#FFFFFF",
                                            border: "1px solid #E2F2FF",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            "&:hover": {
                                                borderColor: "#007AC1",
                                                bgcolor: "rgba(19, 168, 232, 0.04)",
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#707070" }}>
                                            เลขประจำตัวประชาชน (ด.ช. ธรณ์วัฒน์)
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 700,
                                                color: "#333333",
                                                fontFamily: "monospace",
                                            }}
                                        >
                                            7640543275347
                                        </Typography>
                                    </Box>
                                    <Box
                                        onClick={() => setCitizenId("AA1234567")}
                                        sx={{
                                            p: 1,
                                            bgcolor: "#FFFFFF",
                                            border: "1px solid #E2F2FF",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            "&:hover": {
                                                borderColor: "#007AC1",
                                                bgcolor: "rgba(19, 168, 232, 0.04)",
                                            },
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#707070" }}>
                                            หนังสือเดินทาง / Passport (ด.ช. ปีเตอร์)
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 700,
                                                color: "#333333",
                                                fontFamily: "monospace",
                                            }}
                                        >
                                            AA1234567
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ fontSize: "11px", color: "#888888", mt: 1.5, textAlign: "center" }}>
                                    คลิกที่กล่องเพื่อนำข้อมูลไปวางในช่องค้นหาอัตโนมัติ
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    {hasSearched && foundStudent && (
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <CardPreview
                                    student={foundStudent}
                                    onZoom={() => setZoomOpen(true)}
                                    onImageReady={(src) => setZoomImgSrc(src)}
                                />
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "center", gap: 6, py: 1 }}>
                                {/* ปุ่มขยาย — ปุ่มแรก */}
                                <Box
                                    onClick={() => setZoomOpen(true)}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            background: "linear-gradient(90deg, #25CFF2 0%, #0093FF 100%)",
                                            borderRadius: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            mb: 0.5,
                                        }}
                                    >
                                        <ZoomInIcon sx={{ color: "#FFFFFF", fontSize: 17 }} />
                                    </Box>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>ขยาย</Typography>
                                </Box>
                                <Box
                                    onClick={handleDownloadCard}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            background: "linear-gradient(90deg, #25CFF2 0%, #0093FF 100%)",
                                            borderRadius: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            mb: 0.5,
                                        }}
                                    >
                                        <DownloadIcon sx={{ color: "#FFFFFF", fontSize: 17 }} />
                                    </Box>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>บันทึกรูปบัตร</Typography>
                                </Box>
                                <Box
                                    onClick={handleShareCard}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            background: "linear-gradient(90deg, #25CFF2 0%, #0093FF 100%)",
                                            borderRadius: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            mb: 0.5,
                                        }}
                                    >
                                        <ShareIcon sx={{ color: "#FFFFFF", fontSize: 17 }} />
                                    </Box>
                                    <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>แชร์</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ width: "100%", pt: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                    <BadgeOutlinedIcon sx={{ fontSize: 21 }} />
                                    <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                                        ข้อมูลผู้เอาประกัน
                                    </Typography>
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
                                        <Box
                                            component="span"
                                            sx={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                color: "#0FAE45",
                                                fontWeight: 700,
                                            }}
                                        >
                                            <CheckCircleIcon sx={{ fontSize: 14 }} /> มีผลบังคับ
                                        </Box>
                                    }
                                />
                            </Box>

                            <Box sx={{ width: "100%", pt: 1 }}>
                                <Box
                                    onClick={() => setCoverageOpen(!coverageOpen)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                        mt: 1.5,
                                        mb: 1,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <BusinessCenterOutlinedIcon sx={{ fontSize: 22 }} />
                                        <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>ความคุ้มครอง</Typography>
                                    </Box>
                                    {coverageOpen ? (
                                        <ExpandLessIcon sx={{ color: "#707070" }} />
                                    ) : (
                                        <ExpandMoreIcon sx={{ color: "#707070" }} />
                                    )}
                                </Box>
                                <Box sx={{ borderTop: "1px solid #008BD2", mb: 1.2 }} />
                                <Collapse in={coverageOpen}>
                                    <DetailRow label="ทุนประกัน" value={`${foundStudent.coverageTotal} บาท`} />
                                </Collapse>
                                <Box
                                    onClick={() => setBenefitsOpen(!benefitsOpen)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                        mt: 1.5,
                                        mb: 1,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <HealthAndSafetyOutlinedIcon sx={{ fontSize: 22 }} />
                                        <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                                            สิทธิประโยชน์ความคุ้มครอง
                                        </Typography>
                                    </Box>
                                    {benefitsOpen ? (
                                        <ExpandLessIcon sx={{ color: "#707070" }} />
                                    ) : (
                                        <ExpandMoreIcon sx={{ color: "#707070" }} />
                                    )}
                                </Box>
                                <Box sx={{ borderTop: "1px solid #008BD2", mb: 1.2 }} />
                                <Collapse in={benefitsOpen}>
                                    <DetailRow
                                        label="เสียชีวิตเนื่องจากอุบัติเหตุทั่วไป"
                                        value={`${foundStudent.deathGeneral} บาท`}
                                        labelWidth="220px"
                                    />
                                    <DetailRow
                                        label="ทุพพลภาพโดยถาวร"
                                        value={`${foundStudent.murderOrAssault} บาท`}
                                        labelWidth="220px"
                                    />
                                    <DetailRow
                                        label="ฆาตกรรม/ถูกทำร้ายร่างกาย"
                                        value={`${foundStudent.vehicleAccident} บาท`}
                                        labelWidth="220px"
                                    />
                                    <DetailRow
                                        label="เสียชีวิตเนื่องจากโรคภัยไข้เจ็บ"
                                        value={`${foundStudent.illnessDeath} บาท`}
                                        labelWidth="220px"
                                    />
                                </Collapse>
                            </Box>

                            <Box
                                sx={{
                                    width: "100%",
                                    bgcolor: "#36B9E5",
                                    borderRadius: "5px",
                                    px: 2,
                                    py: 1.6,
                                    boxSizing: "border-box",
                                    color: "#FFFFFF",
                                    textAlign: "center",
                                    boxShadow: "0px 2px 5px rgba(0,0,0,0.18)",
                                    mt: 1,
                                }}
                            >
                                <Typography sx={{ fontSize: "12px", lineHeight: 1.8 }}>
                                    รายละเอียดข้อกำหนดและเงื่อนไขของความคุ้มครองรวมหรือยกเว้นไม่คุ้มครองในกรมธรรม์ประกันภัย
                                    เป็นไปตามที่บริษัทผู้รับประกันออกให้ผู้ถือกรมธรรม์และ/หรือผู้เอาประกัน
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Box>

            <MobileFooter />

            {/* Fullscreen Landscape Card Dialog */}
            <Dialog
                open={zoomOpen}
                onClose={() => setZoomOpen(false)}
                fullScreen
                PaperProps={{
                    sx: {
                        bgcolor: "rgba(0, 0, 0, 0.92)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 0,
                        m: 0,
                    },
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={() => setZoomOpen(false)}
                    sx={{
                        position: "fixed",
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        bgcolor: "rgba(255, 255, 255, 0.15)",
                        color: "#FFFFFF",
                        backdropFilter: "blur(4px)",
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Card Image — rotated to landscape on portrait mobile */}
                {zoomImgSrc && (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 1,
                            "@media (orientation: portrait)": {
                                "& > img": {
                                    transform: "rotate(90deg)",
                                    maxWidth: "100vh",
                                    maxHeight: "100vw",
                                    width: "auto",
                                    height: "auto",
                                },
                            },
                            "@media (orientation: landscape)": {
                                "& > img": {
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    width: "auto",
                                    height: "auto",
                                },
                            },
                        }}
                    >
                        <img
                            src={zoomImgSrc}
                            alt="Digital Insurance Card Fullscreen"
                            style={{
                                display: "block",
                                objectFit: "contain",
                                borderRadius: "8px",
                                boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
                            }}
                        />
                    </Box>
                )}

                {/* Hint Text */}
                <Typography
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        fontWeight: 500,
                        pointerEvents: "none",
                    }}
                >
                    แตะที่ใดก็ได้เพื่อปิด
                </Typography>
            </Dialog>
        </Box>
    );
};

export default StudentSearch;
