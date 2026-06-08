import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Grid,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Chip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { PageWrapper } from "../modules/_auth";
import StandardDataTable from "../modules/_common/components/DataTable/StandardDataTable";
import Swal from "sweetalert2";

import {
    searchStudents,
    getUniqueClassrooms,
    getUniqueGrades,
    getUniqueSchools,
    Student
} from "../modules/_common/mockStudentData";

/**
 * หน้าจอระบบจัดการบัตรประกันภัยอิเล็กทรอนิกส์สำหรับครูผู้ประสานงาน (Desktop View)
 * ฟังก์ชันหลัก:
 * 1. ค้นหาข้อมูลนักเรียนที่ทำประกันภัยแยกตามโรงเรียน ชั้นเรียน ห้องเรียน และเลขบัตรประชาชน
 * 2. แสดงตารางผลลัพธ์การค้นหาอ้างอิงตาม Siam Smile Standard Datatable
 * 3. สร้างรหัส QR Code สำหรับแจกจ่ายให้นักเรียนสแกนเข้าไปดูการ์ดของโรงเรียนนั้นๆ
 * 4. ดาวน์โหลดภาพโปสเตอร์ QR Code ความละเอียดสูง โดยใช้ HTML5 Canvas เขียนข้อความทับบนเทมเพลตภาพเปล่า
 */
const ElectronicCardPage = () => {
    // --- State ของ ฟอร์มค้นหา ---
    const [selectedSchool, setSelectedSchool] = useState<string>("");
    const [selectedGrade, setSelectedGrade] = useState<string>("");
    const [selectedClassroom, setSelectedClassroom] = useState<string>("");
    const [citizenId, setCitizenId] = useState<string>("");
    const [studentName, setStudentName] = useState<string>("");

    // --- State ของ รายการคัดกรองใน Dropdown ---
    const [schools, setSchools] = useState<string[]>([]);
    const [grades, setGrades] = useState<string[]>([]);
    const [classrooms, setClassrooms] = useState<string[]>([]);

    // --- State ของ ข้อมูลในตารางแสดงผล ---
    const [students, setStudents] = useState<Student[]>([]);
    const [, setPaginated] = useState({
        totalAmountRecords: 0,
        currentPage: 1,
        recordsPerPage: 10,
    });

    // --- State สำหรับเปิด-ปิด และแสดงผล Modal QR Code ---
    const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
    const [activeSchool, setActiveSchool] = useState<string>("");
    const [schoolDetails, setSchoolDetails] = useState({
        subDistrict: "",
        district: "",
        province: ""
    });
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

    // 1. ดึงรายชื่อโรงเรียนทั้งหมดมาใส่ใน Dropdown เมื่อโหลดหน้าจอครั้งแรก
    useEffect(() => {
        setSchools(getUniqueSchools());
        setStudents(searchStudents({})); // แสดงรายชื่อนักเรียนทั้งหมดเริ่มต้น
    }, []);

    // 2. อัปเดตรายชื่อระดับชั้นเรียนเมื่อคุณครูเลือกโรงเรียนใหม่ (Cascading Dropdown)
    useEffect(() => {
        setGrades(getUniqueGrades(selectedSchool || undefined));
        setSelectedGrade("");
        setSelectedClassroom("");
    }, [selectedSchool]);

    // 3. อัปเดตรายชื่อห้องเรียนเมื่อคุณครูเลือกระดับชั้นเรียนใหม่ (Cascading Dropdown)
    useEffect(() => {
        setClassrooms(getUniqueClassrooms(selectedSchool || undefined, selectedGrade || undefined));
        setSelectedClassroom("");
    }, [selectedGrade, selectedSchool]);

    // 4. ฟังก์ชันจัดการเมื่อผู้ใช้งานกดปุ่ม "ค้นหา"
    const handleSearch = () => {
        const results = searchStudents({
            schoolName: selectedSchool || undefined,
            gradeLevel: selectedGrade || undefined,
            classroom: selectedClassroom || undefined,
            citizenId: citizenId || undefined,
            searchText: studentName || undefined
        });
        setStudents(results);
        setPaginated(prev => ({
            ...prev,
            totalAmountRecords: results.length,
            currentPage: 1
        }));
    };

    // 5. ฟังก์ชันล้างเงื่อนไขในฟอร์มค้นหาทั้งหมด
    const handleClear = () => {
        setSelectedSchool("");
        setSelectedGrade("");
        setSelectedClassroom("");
        setCitizenId("");
        setStudentName("");
        const results = searchStudents({});
        setStudents(results);
        setPaginated(prev => ({
            ...prev,
            totalAmountRecords: results.length,
            currentPage: 1
        }));
    };

    // 6. ฟังก์ชันเมื่อกดปุ่ม "Gen QR Code" เพื่อแสดงป๊อปอัปโปสเตอร์ดาวน์โหลด
    const openQrModal = (schoolName: string) => {
        setActiveSchool(schoolName);
        
        // ค้นหาข้อมูลที่อยู่ของโรงเรียนจากข้อมูลนักเรียนใน mock
        const studentInSchool = students.find(s => s.schoolName === schoolName);
        if (studentInSchool) {
            setSchoolDetails({
                subDistrict: studentInSchool.schoolSubDistrict,
                district: studentInSchool.schoolDistrict,
                province: studentInSchool.province
            });
        } else {
            setSchoolDetails({
                subDistrict: "ก้อนแก้ว",
                district: "เมืองฉะเชิงเทรา",
                province: "ฉะเชิงเทรา"
            });
        }

        // ลิงก์ปลายทางเพื่อให้ผู้ปกครองใช้ค้นหาบัตรผ่านมือถือ
        const searchUrl = `${window.location.origin}/student/search?school=${encodeURIComponent(schoolName)}`;
        
        // ใช้ QR Server API ในการสร้างรูปภาพ QR Code (สะดวกและไม่มี dependency เพิ่มเติม)
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(searchUrl)}`;
        setQrCodeUrl(qrUrl);
        setQrModalOpen(true);
    };

    // 7. ฟังก์ชันวาดภาพโปสเตอร์ QR Code และดาวน์โหลดเป็นรูปภาพ (.png)
    const downloadPoster = () => {
        // แสดง Spinner หมุนเพื่อบอกให้ผู้ใช้งานรอระหว่างเจนไฟล์ภาพ
        Swal.fire({
            title: 'กำลังสร้างไฟล์รูปภาพ...',
            text: 'กรุณารอซักครู่',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "/template-bg-qr-code.png"; // ไฟล์เทมเพลตโปสเตอร์ว่างในโฟลเดอร์ public
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;   // ขนาดจริงของภาพ 1080px
            canvas.height = img.naturalHeight; // ขนาดจริงของภาพ 1350px
            const ctx = canvas.getContext("2d");
            
            if (ctx) {
                // 7.1 วาดภาพพื้นหลังลงบนผืนผ้าใบ Canvas
                ctx.drawImage(img, 0, 0);

                // 7.2 เขียนชื่อโรงเรียนลงในแถบแบนเนอร์สีน้ำเงินบนเทมเพลต
                ctx.font = "bold 42px 'Sarabun', sans-serif";
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                // พิกัดกึ่งกลางแนวนอน และความสูงของแถบแบนเนอร์ที่ y = 295
                ctx.fillText(activeSchool, canvas.width / 2, 295);

                // 7.3 โหลดภาพ QR Code เพื่อนำมาวาดรวมกัน
                const qrImg = new Image();
                qrImg.crossOrigin = "anonymous";
                qrImg.src = qrCodeUrl;
                qrImg.onload = () => {
                    // วาดรหัส QR Code ลงในกล่องสีขาวตรงกลางโปสเตอร์
                    const qrSize = 420;
                    const qrX = (canvas.width - qrSize) / 2;
                    const qrY = 480;
                    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

                    // 7.4 แปลงผลลัพธ์บน Canvas เป็น Data URL และสั่งดาวน์โหลดอัตโนมัติ
                    const dataUrl = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.download = `QR_${activeSchool}.png`;
                    link.href = dataUrl;
                    link.click();
                    Swal.close(); // ปิดแจ้งเตือนโหลดสำเร็จ
                };
                qrImg.onerror = () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'ไม่สามารถดาวน์โหลดภาพ QR Code ได้เนื่องจากปัญหาเครือข่าย'
                    });
                };
            }
        };
        img.onerror = () => {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถดึงรูปภาพพื้นหลังโปสเตอร์มาประมวลผลได้'
            });
        };
    };

    // 8. ฟังก์ชันก๊อปปี้ลิงก์เพื่อแชร์ให้คนอื่นเปิดได้โดยตรง
    const handleShare = () => {
        const searchUrl = `${window.location.origin}/student/search?school=${encodeURIComponent(activeSchool)}`;
        navigator.clipboard.writeText(searchUrl);
        Swal.fire({
            icon: "success",
            title: "คัดลอกลิงก์เรียบร้อยแล้ว!",
            text: "คุณสามารถส่งลิงก์นี้ต่อให้กับผู้ปกครองหรือนักเรียนเพื่อใช้ค้นหาบัตรได้ทันที",
            timer: 2000,
            showConfirmButton: false
        });
    };

    // --- การตั้งค่าคอลัมน์ของ StandardDataTable ---
    const columns = [
        {
            name: "applicationNo",
            label: "เลขที่ Application",
            options: {
                customBodyRender: (value: string, tableMeta: any) => {
                    const student = students[tableMeta.rowIndex];
                    return (
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => {
                                // เปิดแท็บใหม่เพื่อแสดงหน้าบัตรของนักเรียนแต่ละคน (เลียนแบบการทำงานจากฝั่งผู้ประสานงาน)
                                window.open(`/student/card/${student.citizenId}`, "_blank");
                            }}
                        >
                            {value}
                        </Typography>
                    );
                }
            }
        },
        {
            name: "schoolName",
            label: "ชื่อสถานศึกษา",
        },
        {
            name: "province",
            label: "จังหวัด",
        },
        {
            name: "gradeLevel",
            label: "ระดับชั้น",
            options: {
                customBodyRender: (value: string, tableMeta: any) => {
                    const student = students[tableMeta.rowIndex];
                    return `${value}/${student.classroom}`;
                }
            }
        },
        {
            name: "refNo",
            label: "เลขอ้างอิง",
        },
        {
            name: "policyNo",
            label: "เลขกรมธรรม์",
        },
        {
            name: "paymentStatus",
            label: "สถานะการชำระเงิน",
            options: {
                customBodyRender: (value: string) => {
                    const isPaid = value === "ปกติ";
                    return (
                        <Chip
                            label={value}
                            color={isPaid ? "success" : value === "ค้างชำระ" ? "warning" : "error"}
                            variant="filled"
                            size="small"
                            sx={{ fontWeight: "bold" }}
                        />
                    );
                }
            }
        },
        {
            name: "schoolName",
            label: "การจัดการ",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value: string) => {
                    return (
                        <Button
                            variant="contained"
                            color="info"
                            size="small"
                            startIcon={<QrCodeIcon />}
                            onClick={() => openQrModal(value)}
                            sx={{
                                textTransform: "none",
                                borderRadius: 1.5,
                                fontSize: "0.8rem",
                                fontWeight: "bold"
                            }}
                        >
                            Gen QR Code
                        </Button>
                    );
                }
            }
        }
    ];

    return (
        <PageWrapper title="บัตรประกันภัยอิเล็กทรอนิกส์">
            <Box sx={{ p: 2 }}>
                {/* แผงฟอร์มค้นหาข้อมูล */}
                <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: "#07518c" }}>
                        เงื่อนไขการค้นหา
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel>สถานศึกษา</InputLabel>
                                <Select
                                    label="สถานศึกษา"
                                    value={selectedSchool}
                                    onChange={(e) => setSelectedSchool(e.target.value)}
                                >
                                    <MenuItem value=""><em>ทั้งหมด</em></MenuItem>
                                    {schools.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth size="small" disabled={!selectedSchool}>
                                <InputLabel>ระดับชั้น</InputLabel>
                                <Select
                                    label="ระดับชั้น"
                                    value={selectedGrade}
                                    onChange={(e) => setSelectedGrade(e.target.value)}
                                >
                                    <MenuItem value=""><em>ทั้งหมด</em></MenuItem>
                                    {grades.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth size="small" disabled={!selectedGrade}>
                                <InputLabel>ห้องเรียน</InputLabel>
                                <Select
                                    label="ห้องเรียน"
                                    value={selectedClassroom}
                                    onChange={(e) => setSelectedClassroom(e.target.value)}
                                >
                                    <MenuItem value=""><em>ทั้งหมด</em></MenuItem>
                                    {classrooms.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="เลขบัตรประจำตัวประชาชน / Passport นักเรียน"
                                value={citizenId}
                                onChange={(e) => setCitizenId(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                size="small"
                                label="ชื่อหรือนามสกุลนักเรียน"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<ClearIcon />}
                            onClick={handleClear}
                            sx={{ borderRadius: 2, px: 3 }}
                        >
                            ล้างเงื่อนไข
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                            sx={{ borderRadius: 2, px: 3 }}
                        >
                            ค้นหา
                        </Button>
                    </Box>
                </Paper>

                {/* ตารางแสดงผลลัพธ์นักเรียน */}
                <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <StandardDataTable
                        name="students"
                        title={`ผลลัพธ์การค้นหา (${students.length} รายการ)`}
                        columns={columns}
                        data={students}
                        color="primary"
                        options={{
                            serverSide: false, // ใช้การค้นหาตัวกรองฝั่ง Client (Mock)
                            rowsPerPage: 10,
                            selectableRows: "none",
                            download: true,
                            print: true
                        }}
                    />
                </Paper>
            </Box>

            {/* Modal ป๊อปอัปหน้าจอ Gen QR Code */}
            <Dialog
                open={qrModalOpen}
                onClose={() => setQrModalOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Gen QR Code</Typography>
                        <Typography variant="body2" color="text.secondary">
                            โรงเรียน{activeSchool} ต.{schoolDetails.subDistrict} อ.{schoolDetails.district} จ.{schoolDetails.province}
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setQrModalOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ display: "flex", justifyContent: "center", bgcolor: "#f5f5f5", p: 4 }}>
                    {/* ส่วนพรีวิวหน้าจอการ์ดโปสเตอร์ที่จะดาวน์โหลด */}
                    <Box
                        id="qr-poster-preview"
                        sx={{
                            width: "360px",
                            height: "450px",
                            position: "relative",
                            backgroundImage: "url('/template-bg-qr-code.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden"
                        }}
                    >
                        {/* แถบแบนเนอร์แสดงชื่อโรงเรียน (Overlay) */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: "98px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "240px",
                                textAlign: "center",
                                zIndex: 2
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#ffffff",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    fontFamily: "Sarabun",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                            >
                                {activeSchool}
                            </Typography>
                        </Box>

                        {/* แสดง QR Code ตรงกลางโปสเตอร์ (Overlay) */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: "160px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "140px",
                                height: "140px",
                                bgcolor: "#ffffff",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 1.5,
                                p: 1,
                                boxShadow: 1
                            }}
                        >
                            {qrCodeUrl && (
                                <img
                                    src={qrCodeUrl}
                                    alt="QR Code"
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            )}
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<ShareIcon />}
                        onClick={handleShare}
                        sx={{ borderRadius: 2, flex: 1 }}
                    >
                        แชร์ลิงก์
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={downloadPoster}
                        sx={{ borderRadius: 2, flex: 1 }}
                    >
                        ดาวน์โหลดรูปภาพ
                    </Button>
                </DialogActions>
            </Dialog>
        </PageWrapper>
    );
};

export default ElectronicCardPage;
