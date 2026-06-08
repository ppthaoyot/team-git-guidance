import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Button,
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
import QrCodeIcon from "@mui/icons-material/QrCode";
import { PageWrapper } from "../modules/_auth";
import StandardDataTable from "../modules/_common/components/DataTable/StandardDataTable";
import Swal from "sweetalert2";

import {
    mockStudents,
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
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");
    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");

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

    // ดึงข้อมูลเริ่มต้น
    useEffect(() => {
        setStudents(mockStudents);
    }, []);

    // Cascading dropdowns: reset children when parent changes
    useEffect(() => {
        setSelectedDistrict("");
        setSelectedSubDistrict("");
    }, [selectedProvince]);

    useEffect(() => {
        setSelectedSubDistrict("");
    }, [selectedDistrict]);

    // Derive dropdown choices dynamically from mockStudents
    const provinces = Array.from(new Set(mockStudents.map(s => s.province)));
    
    const districts = selectedProvince
        ? Array.from(new Set(mockStudents.filter(s => s.province === selectedProvince).map(s => s.schoolDistrict)))
        : Array.from(new Set(mockStudents.map(s => s.schoolDistrict)));
        
    const subDistricts = (selectedProvince || selectedDistrict)
        ? Array.from(new Set(mockStudents.filter(s => {
            if (selectedProvince && s.province !== selectedProvince) return false;
            if (selectedDistrict && s.schoolDistrict !== selectedDistrict) return false;
            return true;
          }).map(s => s.schoolSubDistrict)))
        : Array.from(new Set(mockStudents.map(s => s.schoolSubDistrict)));
        
    const plans = Array.from(new Set(mockStudents.map(s => s.coverageLimit)));
    const statuses = ["ปกติ", "ค้างชำระ", "ยกเลิก"];

    // ฟังก์ชันจัดการเมื่อผู้ใช้งานกดปุ่ม "ค้นหา"
    const handleSearch = () => {
        const results = mockStudents.filter(student => {
            if (selectedProvince && student.province !== selectedProvince) return false;
            if (selectedDistrict && student.schoolDistrict !== selectedDistrict) return false;
            if (selectedSubDistrict && student.schoolSubDistrict !== selectedSubDistrict) return false;
            if (selectedPlan && student.coverageLimit !== selectedPlan) return false;
            if (selectedStatus && student.paymentStatus !== selectedStatus) return false;
            return true;
        });
        setStudents(results);
        setPaginated(prev => ({
            ...prev,
            totalAmountRecords: results.length,
            currentPage: 1
        }));
    };

    // ฟังก์ชันล้างเงื่อนไขในฟอร์มค้นหาทั้งหมด
    const handleClear = () => {
        setSelectedProvince("");
        setSelectedDistrict("");
        setSelectedSubDistrict("");
        setSelectedPlan("");
        setSelectedStatus("");
        setStudents(mockStudents);
        setPaginated(prev => ({
            ...prev,
            totalAmountRecords: mockStudents.length,
            currentPage: 1
        }));
    };


    // ฟังก์ชันเมื่อกดปุ่ม "Gen QR Code" เพื่อแสดงป๊อปอัปโปสเตอร์ดาวน์โหลด
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
        const searchUrl = `${window.location.origin}${import.meta.env.BASE_URL}student/search?school=${encodeURIComponent(schoolName)}`;
        
        // ใช้ QR Server API ในการสร้างรูปภาพ QR Code
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(searchUrl)}`;
        setQrCodeUrl(qrUrl);
        setQrModalOpen(true);
    };

    // ฟังก์ชันวาดภาพโปสเตอร์ QR Code และดาวน์โหลดเป็นรูปภาพ (.png)
    const downloadPoster = () => {
        Swal.fire({
            title: 'กำลังสร้างไฟล์รูปภาพ...',
            text: 'กรุณารอซักครู่',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}template-bg-qr-code.png`;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            
            if (ctx) {
                ctx.drawImage(img, 0, 0);

                ctx.font = "bold 42px 'Sarabun', sans-serif";
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(activeSchool, canvas.width / 2, 322);

                const qrImg = new Image();
                qrImg.crossOrigin = "anonymous";
                qrImg.src = qrCodeUrl;
                qrImg.onload = () => {
                    const qrSize = 420;
                    const qrX = (canvas.width - qrSize) / 2;
                    const qrY = 480;
                    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

                    const dataUrl = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.download = `QR_${activeSchool}.png`;
                    link.href = dataUrl;
                    link.click();
                    Swal.close();
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

    // ฟังก์ชันก๊อปปี้ลิงก์เพื่อแชร์ให้คนอื่นเปิดได้โดยตรง
    const handleShare = () => {
        const searchUrl = `${window.location.origin}${import.meta.env.BASE_URL}student/search?school=${encodeURIComponent(activeSchool)}`;
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
                    if (!student) return value;
                    return (
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => {
                                window.open(`${import.meta.env.BASE_URL}student/card/${student.citizenId}`, "_blank");
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
            name: "schoolDistrict",
            label: "เขต/อำเภอ",
        },
        {
            name: "schoolSubDistrict",
            label: "แขวง/ตำบล",
        },
        {
            name: "coverageLimit",
            label: "แผนประกัน",
            options: {
                customBodyRender: (value: string) => {
                    return `แผนความคุ้มครอง (${value} บาท)`;
                }
            }
        },
        {
            name: "paymentStatus",
            label: "สถานะกรมธรรม์",
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
            label: "ดูรายละเอียด",
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
            <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#F5F5F7", minHeight: "100vh" }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: "32px 16px 48px",
                        bgcolor: "#FFFFFF",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)"
                    }}
                >
                    {/* Filter Panel */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
                        {/* Row 1 */}
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: "32px", width: "100%", px: "16px" }}>
                            {/* จังหวัด */}
                            <FormControl sx={{ width: { xs: "100%", lg: 365 }, height: 48 }}>
                                <InputLabel sx={{ fontFamily: "TH Sarabun New", fontSize: "20px", fontWeight: "bold", color: "#A6A6A6" }}>จังหวัด</InputLabel>
                                <Select
                                    label="จังหวัด"
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    sx={{
                                        height: 48,
                                        fontFamily: "TH Sarabun New",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#212121",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#A6A6A6"
                                        }
                                    }}
                                >
                                    <MenuItem value="" sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}><em>ทั้งหมด</em></MenuItem>
                                    {provinces.map(p => (
                                        <MenuItem key={p} value={p} sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}>{p}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* เขต/อำเภอ */}
                            <FormControl sx={{ width: { xs: "100%", lg: 365 }, height: 48 }}>
                                <InputLabel sx={{ fontFamily: "TH Sarabun New", fontSize: "20px", fontWeight: "bold", color: "#A6A6A6" }}>เขต/อำเภอ</InputLabel>
                                <Select
                                    label="เขต/อำเภอ"
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    sx={{
                                        height: 48,
                                        fontFamily: "TH Sarabun New",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#212121",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#A6A6A6"
                                        }
                                    }}
                                >
                                    <MenuItem value="" sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}><em>ทั้งหมด</em></MenuItem>
                                    {districts.map(d => (
                                        <MenuItem key={d} value={d} sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}>{d}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* แขวง/ตำบล */}
                            <FormControl sx={{ width: { xs: "100%", lg: 365 }, height: 48 }}>
                                <InputLabel sx={{ fontFamily: "TH Sarabun New", fontSize: "20px", fontWeight: "bold", color: "#A6A6A6" }}>แขวง/ตำบล</InputLabel>
                                <Select
                                    label="แขวง/ตำบล"
                                    value={selectedSubDistrict}
                                    onChange={(e) => setSelectedSubDistrict(e.target.value)}
                                    sx={{
                                        height: 48,
                                        fontFamily: "TH Sarabun New",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#212121",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#A6A6A6"
                                        }
                                    }}
                                >
                                    <MenuItem value="" sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}><em>ทั้งหมด</em></MenuItem>
                                    {subDistricts.map(sd => (
                                        <MenuItem key={sd} value={sd} sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}>{sd}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* แผนประกัน */}
                            <FormControl sx={{ width: { xs: "100%", lg: 365 }, height: 48 }}>
                                <InputLabel sx={{ fontFamily: "TH Sarabun New", fontSize: "20px", fontWeight: "bold", color: "#A6A6A6" }}>แผนประกัน</InputLabel>
                                <Select
                                    label="แผนประกัน"
                                    value={selectedPlan}
                                    onChange={(e) => setSelectedPlan(e.target.value)}
                                    sx={{
                                        height: 48,
                                        fontFamily: "TH Sarabun New",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#212121",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#A6A6A6"
                                        }
                                    }}
                                >
                                    <MenuItem value="" sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}><em>ทั้งหมด</em></MenuItem>
                                    {plans.map(p => (
                                        <MenuItem key={p} value={p} sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}>
                                            {`แผนความคุ้มครอง (${p} บาท)`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Row 2 */}
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: "32px", width: "100%", alignItems: "center", px: "16px" }}>
                            {/* สถานะกรมธรรม์ */}
                            <FormControl sx={{ width: { xs: "100%", lg: 365 }, height: 48 }}>
                                <InputLabel sx={{ fontFamily: "TH Sarabun New", fontSize: "20px", fontWeight: "bold", color: "#A6A6A6" }}>สถานะกรมธรรม์</InputLabel>
                                <Select
                                    label="สถานะกรมธรรม์"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    sx={{
                                        height: 48,
                                        fontFamily: "TH Sarabun New",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#212121",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#A6A6A6"
                                        }
                                    }}
                                >
                                    <MenuItem value="" sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}><em>ทั้งหมด</em></MenuItem>
                                    {statuses.map(s => (
                                        <MenuItem key={s} value={s} sx={{ fontFamily: "TH Sarabun New", fontSize: "22px" }}>{s}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Buttons */}
                            <Box sx={{ display: "flex", gap: "23px", width: { xs: "100%", lg: 365 }, justifyContent: "flex-start", height: 45 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    sx={{
                                        width: "100px",
                                        height: "45px",
                                        backgroundColor: "#007AC1",
                                        "&:hover": {
                                            backgroundColor: "#005b90"
                                        },
                                        fontFamily: "TH Sarabun New",
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                        color: "#FFFFFF",
                                        borderRadius: "4px",
                                        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)"
                                    }}
                                >
                                    ค้นหา
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleClear}
                                    sx={{
                                        height: "45px",
                                        fontFamily: "TH Sarabun New",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        borderRadius: "4px"
                                    }}
                                >
                                    ล้างเงื่อนไข
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    {/* Table */}
                    <Box sx={{ width: "100%", px: "16px" }}>
                        <StandardDataTable
                            name="students"
                            title={`ผลลัพธ์การค้นหา (${students.length} รายการ)`}
                            columns={columns}
                            data={students}
                            color="primary"
                            options={{
                                serverSide: false,
                                rowsPerPage: 10,
                                selectableRows: "none",
                                download: false,
                                print: false
                            }}
                        />
                    </Box>
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
                            {activeSchool} ต.{schoolDetails.subDistrict} อ.{schoolDetails.district} จ.{schoolDetails.province}
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
                            backgroundImage: `url('${import.meta.env.BASE_URL}template-bg-qr-code.png')`,
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
                                top: "107px",
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
