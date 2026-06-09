import { Box, Button, Card, CardContent, Grid, Paper, Tooltip, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../modules/_auth";
import SearchIcon from "@mui/icons-material/Search";
import BadgeIcon from "@mui/icons-material/Badge";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";

const Home = () => {
    const navigate = useNavigate();

    const mockCases = [
        {
            type: "เลขประจำตัวประชาชน (Citizen ID)",
            value: "7640543275347",
            name: "เด็กชาย ธรณ์วัฒน์ แสนคำ",
            school: "โรงเรียนก้อนแก้วพิทยาคม",
            desc: "สำหรับทดสอบข้อมูลสิทธิ์นักเรียนสัญชาติไทย รูปแบบมาตรฐาน 13 หลัก",
        },
        {
            type: "หนังสือเดินทาง (Passport ID)",
            value: "AA1234567",
            name: "เด็กชาย ปีเตอร์ ปาร์คเกอร์",
            school: "โรงเรียนสตรีวิทยา",
            desc: "สำหรับทดสอบข้อมูลนักเรียนต่างชาติ หรือการใช้รหัสหนังสือเดินทาง (Alphanumeric)",
        },
    ];

    const handleCopy = (val: string, type: string) => {
        navigator.clipboard.writeText(val);
        const toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });
        toast.fire({
            icon: "success",
            title: `คัดลอก ${type} สำเร็จ`,
        });
    };

    return (
        <PageWrapper title="หน้าแรก">
            <Box sx={{ py: 1 }}>
                {/* Header Welcome Banner */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #007AC1 0%, #13A8E8 100%)",
                        borderRadius: "12px",
                        p: { xs: 3, md: 4 },
                        color: "#FFFFFF",
                        mb: 4,
                        boxShadow: "0px 6px 20px rgba(19, 168, 232, 0.25)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-50%",
                            right: "-20%",
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.08)",
                            pointerEvents: "none",
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            fontFamily: "'Sarabun', sans-serif",
                            fontSize: { xs: "24px", md: "32px" },
                            mb: 1,
                        }}
                    >
                        ระบบจัดการบัตรประกันภัยอุบัติเหตุอิเล็กทรอนิกส์
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            fontFamily: "'Sarabun', sans-serif",
                            fontSize: { xs: "14px", md: "18px" },
                            opacity: 0.9,
                        }}
                    >
                        สะดวก รวดเร็ว ปลอดภัย ตรวจสอบสิทธิ์ง่ายผ่านระบบออนไลน์และ QR Code สำหรับ PA Student Card
                    </Typography>
                </Box>

                {/* Quick Navigation Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: "12px",
                                border: "1px solid #E2F2FF",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0px 8px 24px rgba(0, 122, 193, 0.12)",
                                    borderColor: "#007AC1",
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: "10px",
                                        bgcolor: "#E2F2FF",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#007AC1",
                                        mb: 2,
                                    }}
                                >
                                    <BadgeIcon sx={{ fontSize: 28 }} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                        color: "#2B2B2B",
                                        fontFamily: "'Sarabun', sans-serif",
                                    }}
                                >
                                    จัดการบัตรประกันภัยอิเล็กทรอนิกส์
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#707070", lineHeight: 1.6 }}>
                                    สำหรับเจ้าหน้าที่และอาจารย์ในการดูข้อมูลสิทธิ์ ค้นหารายชื่อนักเรียน
                                    กรองตามโรงเรียน/ชั้นเรียน และดาวน์โหลดโปสเตอร์ QR Code รายบุคคลสำหรับการแจกจ่าย
                                </Typography>
                            </CardContent>
                            <Box sx={{ px: 3, pb: 3 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate("/electronic-card")}
                                    sx={{
                                        bgcolor: "#007AC1",
                                        color: "#FFFFFF",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderRadius: "8px",
                                        py: 1,
                                        "&:hover": { bgcolor: "#005E94" },
                                    }}
                                >
                                    ไปหน้าจัดการข้อมูล
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: "12px",
                                border: "1px solid #E2F2FF",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.04)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0px 8px 24px rgba(0, 122, 193, 0.12)",
                                    borderColor: "#007AC1",
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: "10px",
                                        bgcolor: "#E2F2FF",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#007AC1",
                                        mb: 2,
                                    }}
                                >
                                    <SearchIcon sx={{ fontSize: 28 }} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                        color: "#2B2B2B",
                                        fontFamily: "'Sarabun', sans-serif",
                                    }}
                                >
                                    ค้นหาข้อมูลและแสดงบัตรนักเรียน
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#707070", lineHeight: 1.6 }}>
                                    หน้าสแกนหรือค้นหาด้วยเลขประจำตัวประชาชน หรือหนังสือเดินทาง (Passport)
                                    สำหรับนักเรียน/ผู้ปกครอง
                                    เพื่อดาวน์โหลดหรือตรวจสอบสิทธิ์การเคลมประกันอุบัติเหตุออนไลน์
                                </Typography>
                            </CardContent>
                            <Box sx={{ px: 3, pb: 3 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate("/student/search")}
                                    sx={{
                                        bgcolor: "#007AC1",
                                        color: "#FFFFFF",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        borderRadius: "8px",
                                        py: 1,
                                        "&:hover": { bgcolor: "#005E94" },
                                    }}
                                >
                                    ไปหน้าค้นหาบัตร
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Mock Test Guides Box */}
                <Paper
                    variant="outlined"
                    sx={{
                        p: 3,
                        borderRadius: "12px",
                        borderColor: "#E2F2FF",
                        bgcolor: "#F9FCFF",
                        boxShadow: "inset 0 0 8px rgba(19, 168, 232, 0.03)",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <CheckCircleIcon sx={{ color: "#13A8E8" }} />
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#007AC1", fontFamily: "'Sarabun', sans-serif" }}
                        >
                            ข้อมูลตัวอย่างสำหรับใช้ในการทดสอบระบบ (Mock Test Data)
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#555555", mb: 3 }}>
                        ท่านสามารถนำข้อมูลจำลองด้านล่างนี้ไปทดสอบใช้ค้นหาได้ทั้งในหน้าจัดการบัตร
                        และหน้าตรวจสอบสิทธิ์นักเรียน
                    </Typography>

                    <Grid container spacing={3}>
                        {mockCases.map((item) => (
                            <Grid item xs={12} md={6} key={item.value}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: "8px",
                                        borderColor: "#E2F2FF",
                                        bgcolor: "#FFFFFF",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#007AC1", mb: 1 }}>
                                            {item.type}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                bgcolor: "#F5F5F5",
                                                p: 1,
                                                borderRadius: "6px",
                                                mb: 1.5,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "monospace",
                                                    fontWeight: 700,
                                                    fontSize: "15px",
                                                    color: "#333333",
                                                }}
                                            >
                                                {item.value}
                                            </Typography>
                                            <Tooltip title="คัดลอกข้อมูล" arrow>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleCopy(item.value, item.type)}
                                                    sx={{ color: "#007AC1", "&:hover": { bgcolor: "#E2F2FF" } }}
                                                >
                                                    <ContentCopyIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Box sx={{ fontSize: "13px", mb: 1 }}>
                                            <Typography component="span" sx={{ fontWeight: 600, color: "#555555" }}>
                                                ชื่อ-สกุล:{" "}
                                            </Typography>
                                            <Typography component="span" sx={{ color: "#333333" }}>
                                                {item.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ fontSize: "13px", mb: 1 }}>
                                            <Typography component="span" sx={{ fontWeight: 600, color: "#555555" }}>
                                                สถานศึกษา:{" "}
                                            </Typography>
                                            <Typography component="span" sx={{ color: "#333333" }}>
                                                {item.school}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            sx={{ fontSize: "12px", color: "#777777", mt: 1, fontStyle: "italic" }}
                                        >
                                            {item.desc}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        endIcon={<PlayArrowIcon />}
                                        onClick={() => navigate(`/student/search?citizenId=${item.value}`)}
                                        sx={{
                                            mt: 2,
                                            textTransform: "none",
                                            borderColor: "#13A8E8",
                                            color: "#13A8E8",
                                            alignSelf: "flex-start",
                                            "&:hover": {
                                                borderColor: "#007AC1",
                                                bgcolor: "rgba(19, 168, 232, 0.04)",
                                            },
                                        }}
                                    >
                                        ค้นหาข้อมูลนี้ทันที
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>
        </PageWrapper>
    );
};

export default Home;
