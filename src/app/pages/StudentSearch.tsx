import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Divider,
    Tabs,
    Tab,
    AppBar,
    IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";

import { searchStudents, Student } from "../modules/_common/mockStudentData";
import MobileFooter from "../modules/_common/components/MobileFooter";

// --- อินเตอร์เฟสสำหรับควบคุมการแสดงผลของแต่ละแท็บ ---
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

/**
 * คอมโพเนนต์ช่วยสลับเนื้อหาภายในแท็บ
 */
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

/**
 * หน้าจอค้นหาข้อมูลบัตรประกันภัยของนักเรียน (Mobile Web View - Public Route)
 * ฟังก์ชันหลัก:
 * 1. คัดกรองข้อมูลตามพารามิเตอร์โรงเรียนจาก URL (เช่น `?school=โรงเรียนสตรีศรีน่าน`)
 * 2. ป้อนเลขบัตรประชาชน 13 หลักเพื่อค้นหาประวัติการทำประกัน
 * 3. แสดงรายละเอียดสิทธิประโยชน์เมื่อพบข้อมูล (แท็บข้อมูลส่วนตัว และแท็บวงเงินคุ้มครอง)
 * 4. ปุ่มนำทางเพื่อกดเปิดดูภาพบัตรประกันแบบดิจิทัล
 */
const StudentSearch = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // ดึงค่าชื่อโรงเรียนจาก URL Query Parameter (หากนักเรียนสแกนจากป้ายหน้าโรงเรียน)
    const urlSchool = searchParams.get("school") || "";

    // --- State การทำงาน ---
    const [citizenId, setCitizenId] = useState<string>("");
    const [foundStudent, setFoundStudent] = useState<Student | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);

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

        // ค้นหาในฐานข้อมูลจำลอง (Mock Database) โดยกรองด้วยเลขบัตรประชาชน และโรงเรียน (ถ้ามีระบุใน URL)
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
                confirmButtonColor: "#07518c"
            });
        }
    };

    // ฟังก์ชันย้อนกลับไปหน้าค้นหาใหม่
    const handleBack = () => {
        setHasSearched(false);
        setFoundStudent(null);
        setCitizenId("");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f5f8fa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "Sarabun",
                pb: "60px"
            }}
        >
            {/* ส่วนหัวของแอปพลิเคชันมือถือ */}
            <AppBar position="static" sx={{ bgcolor: "#07518c", boxShadow: 1 }}>
                <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        สยามสไมล์ ประกันภัยโรงเรียน
                    </Typography>
                </Box>
            </AppBar>

            {/* แบนเนอร์แสดงชื่อโรงเรียนต้นสังกัด */}
            <Paper
                elevation={1}
                sx={{
                    width: "90%",
                    maxWidth: "450px",
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#e1effb",
                    borderLeft: "5px solid #07518c"
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#07518c" }}>
                    {urlSchool ? urlSchool : "ระบบสแกนบัตรประกันภัยออนไลน์"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {urlSchool ? "โครงการโรงเรียนปลอดภัย" : "กรุณากรอกข้อมูลนักเรียนเพื่อเข้าถึงบัตรประจำตัวผู้เอาประกัน"}
                </Typography>
            </Paper>

            {!hasSearched || !foundStudent ? (
                // === ส่วนที่ 1: หน้าจอการค้นหา (ก่อนเจอข้อมูล) ===
                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        width: "90%",
                        maxWidth: "450px",
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                            ค้นหาข้อมูลนักเรียน
                        </Typography>

                        {/* กล่องกรอกเลขประจำตัวประชาชน จำกัดเฉพาะตัวเลข 13 หลัก */}
                        <TextField
                            fullWidth
                            label="เลขบัตรประจำตัวประชาชน / Passport นักเรียน"
                            variant="outlined"
                            placeholder="กรอกเลข 13 หลัก"
                            value={citizenId}
                            onChange={(e) => setCitizenId(e.target.value.replace(/\D/g, "").slice(0, 13))}
                            inputProps={{ maxLength: 13, inputMode: "numeric" }}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SearchIcon />}
                            sx={{
                                bgcolor: "#07518c",
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: "bold",
                                "&:hover": { bgcolor: "#053e6d" }
                            }}
                        >
                            ค้นหาข้อมูล
                        </Button>
                    </Paper>

                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", px: 2 }}>
                        * หมายเหตุ: ค้นหาข้อมูลนักเรียน กรุณาป้อนข้อมูลเลขประจำตัวประชาชน หรือเลขหนังสือเดินทาง / Passport นักเรียน
                    </Typography>
                </Box>
            ) : (
                // === ส่วนที่ 2: หน้าจอแสดงผลสัมฤทธิ์แยกประเภทการคุ้มครอง (เมื่อค้นพบตัวนักเรียน) ===
                <Box
                    sx={{
                        width: "90%",
                        maxWidth: "450px",
                        mt: 2,
                        mb: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    {/* ปุ่มย้อนกลับสำหรับการค้นหาใหม่ */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={handleBack} sx={{ color: "#07518c" }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#07518c" }}>
                            ย้อนกลับไปค้นหาใหม่
                        </Typography>
                    </Box>

                    {/* แผงควบคุมรายละเอียดการประกันภัยแบ่งแท็บ */}
                    <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
                        <Box sx={{ bgcolor: "#07518c", p: 2, color: "#ffffff", textAlign: "center" }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                                {foundStudent.schoolName}
                            </Typography>
                        </Box>

                        {/* การเปลี่ยนแถบการแสดงผล (ข้อมูลผู้ประกันตน / ความคุ้มครอง) */}
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={activeTab}
                                onChange={(_, newValue) => setActiveTab(newValue)}
                                variant="fullWidth"
                                textColor="primary"
                                indicatorColor="primary"
                            >
                                <Tab label="ข้อมูลผู้ประกันตน" sx={{ fontWeight: "bold" }} />
                                <Tab label="สิทธิประโยชน์ความคุ้มครอง" sx={{ fontWeight: "bold" }} />
                            </Tabs>
                        </Box>

                        {/* แท็บที่ 1: ข้อมูลผู้ประกันตน */}
                        <CustomTabPanel value={activeTab} index={0}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">เลขที่ใบสมัคร:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>{foundStudent.applicationNo}</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">ชื่อ-นามสกุล:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        {foundStudent.title}{foundStudent.firstName} {foundStudent.lastName}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">ระดับชั้น:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        {foundStudent.gradeLevel}/{foundStudent.classroom}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">สถานะความคุ้มครอง:</Typography>
                                    <Typography variant="body2" color="success.main" sx={{ fontWeight: "bold" }}>
                                        มีผลคุ้มครอง ({foundStudent.paymentStatus})
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">เลขกรมธรรม์:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>{foundStudent.policyNo}</Typography>
                                </Box>

                                {/* ปุ่มกดเพื่อแสดงบัตรประกันภัยดิจิทัล */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<CreditCardIcon />}
                                    onClick={() => navigate(`/student/card/${foundStudent.citizenId}`)}
                                    sx={{
                                        mt: 2,
                                        bgcolor: "#07518c",
                                        borderRadius: 2.5,
                                        fontWeight: "bold",
                                        py: 1.2,
                                        boxShadow: 2
                                    }}
                                >
                                    คลิกเพื่อดูภาพบัตร
                                </Button>
                            </Box>
                        </CustomTabPanel>

                        {/* แท็บที่ 2: สิทธิประโยชน์ความคุ้มครอง */}
                        <CustomTabPanel value={activeTab} index={1}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Box sx={{ bgcolor: "#fff9e6", p: 1.5, borderRadius: 2, border: "1px solid #ffeeba" }}>
                                    <Typography variant="body2" color="warning.dark" sx={{ fontWeight: "bold", textAlign: "center" }}>
                                        วงเงินค่ารักษาพยาบาลจากอุบัติเหตุ
                                    </Typography>
                                    <Typography variant="h5" color="warning.dark" sx={{ fontWeight: "bold", textAlign: "center", mt: 0.5 }}>
                                        {foundStudent.coverageLimit} บาท / ครั้ง
                                    </Typography>
                                </Box>

                                <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1, color: "#07518c" }}>
                                    สิทธิการชดเชยรายได้และค่ารักษาเพิ่มเติม:
                                </Typography>
                                <Box sx={{ pl: 1 }}>
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                        • OPD อนามัย: ชดเชยสูงสุด <strong>{foundStudent.compensationOPDClinic} บาท</strong> / ครั้ง
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                        • OPD โรงพยาบาล: ชดเชยสูงสุด <strong>{foundStudent.compensationOPDHospital} บาท</strong> / ครั้ง
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                                        • IPD ผู้ป่วยใน: ชดเชยสูงสุด <strong>{foundStudent.compensationIPD} บาท</strong> / วัน
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">วันที่มีผลบังคับ:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>{foundStudent.effectiveDate}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">วันที่สิ้นสุด:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>{foundStudent.expiryDate}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">ผู้รับประกันภัย:</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "0.8rem", textAlign: "right" }}>
                                        {foundStudent.insurer}
                                    </Typography>
                                </Box>
                            </Box>
                        </CustomTabPanel>
                    </Paper>
                </Box>
            )}

            {/* Mobile Footer */}
            <MobileFooter />
        </Box>
    );
};

export default StudentSearch;
