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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { PageWrapper } from "../modules/_auth";
import StandardDataTable from "../modules/_common/components/DataTable/StandardDataTable";
import Swal from "sweetalert2";

import { mockStudents, Student } from "../modules/student/mockStudentData";
import { ensureSarabunFont } from "../modules/student/canvasFontLoader";

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
        province: "",
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
    const provinces = Array.from(new Set(mockStudents.map((s) => s.province)));

    const districts = selectedProvince
        ? Array.from(new Set(mockStudents.filter((s) => s.province === selectedProvince).map((s) => s.schoolDistrict)))
        : Array.from(new Set(mockStudents.map((s) => s.schoolDistrict)));

    const subDistricts =
        selectedProvince || selectedDistrict
            ? Array.from(
                  new Set(
                      mockStudents
                          .filter((s) => {
                              if (selectedProvince && s.province !== selectedProvince) return false;
                              if (selectedDistrict && s.schoolDistrict !== selectedDistrict) return false;
                              return true;
                          })
                          .map((s) => s.schoolSubDistrict)
                  )
              )
            : Array.from(new Set(mockStudents.map((s) => s.schoolSubDistrict)));

    const schools = Array.from(new Set(mockStudents.map((s) => s.schoolName)));
    const statuses = ["ปกติ", "ค้างชำระ", "ยกเลิก"];

    const fieldSx = {
        width: { xs: "100%", lg: 365 },
        height: 40,
        "& .MuiInputLabel-root": {
            fontSize: "13px",
            color: "#9E9E9E",
            bgcolor: "#FFFFFF",
            px: 0.5,
            top: "-4px",
        },
        "& .MuiSelect-select": {
            fontSize: "14px",
            fontWeight: 400,
            color: "#212121",
            py: "8px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#BDBDBD",
        },
    };

    // ฟังก์ชันจัดการเมื่อผู้ใช้งานกดปุ่ม "ค้นหา"
    const handleSearch = () => {
        const results = mockStudents.filter((student) => {
            if (selectedProvince && student.province !== selectedProvince) return false;
            if (selectedDistrict && student.schoolDistrict !== selectedDistrict) return false;
            if (selectedSubDistrict && student.schoolSubDistrict !== selectedSubDistrict) return false;
            if (selectedPlan && student.schoolName !== selectedPlan) return false;
            if (selectedStatus && student.paymentStatus !== selectedStatus) return false;
            return true;
        });
        setStudents(results);
        setPaginated((prev) => ({
            ...prev,
            totalAmountRecords: results.length,
            currentPage: 1,
        }));
    };

    // ฟังก์ชันเมื่อกดปุ่ม "Gen QR Code" เพื่อแสดงป๊อปอัปโปสเตอร์ดาวน์โหลด
    const openQrModal = (schoolName: string) => {
        setActiveSchool(schoolName);

        // ค้นหาข้อมูลที่อยู่ของโรงเรียนจากข้อมูลนักเรียนใน mock
        const studentInSchool = students.find((s) => s.schoolName === schoolName);
        if (studentInSchool) {
            setSchoolDetails({
                subDistrict: studentInSchool.schoolSubDistrict,
                district: studentInSchool.schoolDistrict,
                province: studentInSchool.province,
            });
        } else {
            setSchoolDetails({
                subDistrict: "ก้อนแก้ว",
                district: "คลองเขื่อน",
                province: "ฉะเชิงเทรา",
            });
        }

        // ลิงก์ปลายทางเพื่อให้ผู้ปกครองใช้ค้นหาบัตรผ่านมือถือ
        const searchUrl = `${window.location.origin}${
            import.meta.env.BASE_URL
        }student/search?school=${encodeURIComponent(schoolName)}`;

        // ใช้ QR Server API ในการสร้างรูปภาพ QR Code
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(searchUrl)}`;
        setQrCodeUrl(qrUrl);
        setQrModalOpen(true);
    };

    // ฟังก์ชันวาดภาพโปสเตอร์ QR Code และดาวน์โหลดเป็นรูปภาพ (.png)
    const downloadPoster = () => {
        Swal.fire({
            title: "กำลังสร้างไฟล์รูปภาพ...",
            text: "กรุณารอซักครู่",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}template-bg-qr-code.png`;
        img.onload = async () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                await ensureSarabunFont();
                ctx.drawImage(img, 0, 0);

                ctx.font = "bold 42px 'Sarabun', sans-serif";
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(activeSchool, canvas.width / 2, 405);

                const qrImg = new Image();
                qrImg.crossOrigin = "anonymous";
                qrImg.src = qrCodeUrl;
                qrImg.onload = () => {
                    const qrSize = 500;
                    const qrX = (canvas.width - qrSize) / 2;
                    const qrY = 500;
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
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text: "ไม่สามารถดาวน์โหลดภาพ QR Code ได้เนื่องจากปัญหาเครือข่าย",
                    });
                };
            }
        };
        img.onerror = () => {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถดึงรูปภาพพื้นหลังโปสเตอร์มาประมวลผลได้",
            });
        };
    };

    // ฟังก์ชันก๊อปปี้ลิงก์เพื่อแชร์ให้คนอื่นเปิดได้โดยตรง
    const handleShare = () => {
        const searchUrl = `${window.location.origin}${
            import.meta.env.BASE_URL
        }student/search?school=${encodeURIComponent(activeSchool)}`;
        navigator.clipboard.writeText(searchUrl);
        Swal.fire({
            icon: "success",
            title: "คัดลอกลิงก์เรียบร้อยแล้ว!",
            text: "คุณสามารถส่งลิงก์นี้ต่อให้กับผู้ปกครองหรือนักเรียนเพื่อใช้ค้นหาบัตรได้ทันที",
            timer: 2000,
            showConfirmButton: false,
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
                            sx={{
                                fontWeight: 600,
                                fontSize: "14px",
                                textDecoration: "none",
                                cursor: "pointer",
                                transition: "color 0.2s ease, text-decoration 0.2s ease",
                                "&:hover": {
                                    textDecoration: "underline",
                                    color: "#0C95D1",
                                },
                            }}
                            onClick={() => {
                                window.open(
                                    `${import.meta.env.BASE_URL}student/card/${student.citizenId}`,
                                    "_blank",
                                    "noopener,noreferrer"
                                );
                            }}
                        >
                            {value}
                        </Typography>
                    );
                },
            },
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
            name: "planName",
            label: "แผนประกัน",
        },
        {
            name: "paymentStatus",
            label: "สถานะกรมธรรม์",
            options: {
                customBodyRender: (value: string) => {
                    const isPaid = value === "ปกติ";
                    return (
                        <Box
                            sx={{
                                minWidth: 80,
                                height: 24,
                                px: 1.5,
                                borderRadius: "9999px",
                                bgcolor: isPaid ? "#ECFDF5" : value === "ค้างชำระ" ? "#FFFBEB" : "#FEF2F2",
                                color: isPaid ? "#059669" : value === "ค้างชำระ" ? "#D97706" : "#DC2626",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: 600,
                            }}
                        >
                            {value}
                        </Box>
                    );
                },
            },
        },
        {
            name: "schoolName",
            label: " ",
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
                                borderRadius: "6px",
                                bgcolor: "#13A8E8",
                                minWidth: 120,
                                height: 32,
                                fontSize: "13px",
                                fontWeight: 500,
                                boxShadow: "none",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    bgcolor: "#0C95D1",
                                    boxShadow: "0px 2px 4px rgba(12, 149, 209, 0.2)",
                                },
                            }}
                        >
                            Gen QR Code
                        </Button>
                    );
                },
            },
        },
    ];

    return (
        <PageWrapper title="">
            <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#FFFFFF", minHeight: "100vh" }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: "24px 12px 36px", lg: "32px 32px 48px" },
                        bgcolor: "#FFFFFF",
                        borderRadius: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                        boxShadow: "none",
                    }}
                >
                    {/* Filter Panel */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
                        {/* Row 1 */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", lg: "row" },
                                gap: "32px",
                                width: "100%",
                            }}
                        >
                            {/* จังหวัด */}
                            <FormControl sx={fieldSx}>
                                <InputLabel>จังหวัด</InputLabel>
                                <Select
                                    label="จังหวัด"
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="">
                                        <em>ทั้งหมด</em>
                                    </MenuItem>
                                    {provinces.map((p) => (
                                        <MenuItem key={p} value={p}>
                                            {p}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* เขต/อำเภอ */}
                            <FormControl sx={fieldSx}>
                                <InputLabel>อำเภอ</InputLabel>
                                <Select
                                    label="อำเภอ"
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="">
                                        <em>ทั้งหมด</em>
                                    </MenuItem>
                                    {districts.map((d) => (
                                        <MenuItem key={d} value={d}>
                                            {d}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* แขวง/ตำบล */}
                            <FormControl sx={fieldSx}>
                                <InputLabel>ตำบล</InputLabel>
                                <Select
                                    label="ตำบล"
                                    value={selectedSubDistrict}
                                    onChange={(e) => setSelectedSubDistrict(e.target.value)}
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="">
                                        <em>ทั้งหมด</em>
                                    </MenuItem>
                                    {subDistricts.map((sd) => (
                                        <MenuItem key={sd} value={sd}>
                                            {sd}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* แผนประกัน */}
                            <FormControl sx={fieldSx}>
                                <InputLabel>สถานศึกษา</InputLabel>
                                <Select
                                    label="สถานศึกษา"
                                    value={selectedPlan}
                                    onChange={(e) => setSelectedPlan(e.target.value)}
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="">
                                        <em>ทั้งหมด</em>
                                    </MenuItem>
                                    {schools.map((p) => (
                                        <MenuItem key={p} value={p}>
                                            {p}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Row 2 */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", lg: "row" },
                                gap: "32px",
                                width: "100%",
                                alignItems: "center",
                            }}
                        >
                            {/* สถานะกรมธรรม์ */}
                            <FormControl sx={fieldSx}>
                                <InputLabel>สถานะกรมธรรม์</InputLabel>
                                <Select
                                    label="สถานะกรมธรรม์"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    sx={{ height: 40 }}
                                >
                                    <MenuItem value="">
                                        <em>ทั้งหมด</em>
                                    </MenuItem>
                                    {statuses.map((s) => (
                                        <MenuItem key={s} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Buttons */}
                            <Box
                                sx={{
                                    display: "flex",
                                    width: { xs: "100%", lg: 365 },
                                    justifyContent: "flex-start",
                                    height: 40,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    sx={{
                                        width: "90px",
                                        height: "40px",
                                        backgroundColor: "#007AC1",
                                        "&:hover": {
                                            backgroundColor: "#005b90",
                                        },
                                        fontSize: "15px",
                                        fontWeight: 700,
                                        color: "#FFFFFF",
                                        borderRadius: "4px",
                                        boxShadow:
                                            "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    ค้นหา
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    {/* Table */}
                    <Box sx={{ width: "100%" }}>
                        <StandardDataTable
                            name="students"
                            columns={columns}
                            data={students}
                            color="primary"
                            displayToolbar={false}
                            options={{
                                serverSide: false,
                                rowsPerPage: 10,
                                selectableRows: "none",
                                download: false,
                                print: false,
                                filter: false,
                                search: false,
                                viewColumns: false,
                                responsive: "standard",
                                textLabels: {
                                    body: {
                                        noMatch: "ไม่พบข้อมูล",
                                        toolTip: "Sort",
                                        columnHeaderTooltip: (column) => `จัดเรียงจาก ${column.label}`,
                                    },
                                },
                            }}
                            sx={{
                                "& .MuiPaper-root": {
                                    boxShadow: "none",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                },
                                "& .MuiTableCell-head": {
                                    height: "44px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    bgcolor: "#F1F5F9 !important",
                                    color: "#334155 !important",
                                    borderRight: "none !important",
                                    borderBottom: "1px solid #E2E8F0 !important",
                                    px: 2,
                                },
                                "& .MuiTableCell-body": {
                                    height: "50px",
                                    fontSize: "14px",
                                    color: "#475569",
                                    borderBottom: "1px solid #E2E8F0",
                                    px: 2,
                                },
                                "& .MuiTableRow-root": {
                                    bgcolor: "#FFFFFF",
                                    transition: "background-color 0.2s ease",
                                    "&:hover": {
                                        bgcolor: "#F8FAFC !important",
                                    },
                                    "&:nth-of-type(even)": {
                                        bgcolor: "#FAFCFD",
                                        "&:hover": {
                                            bgcolor: "#F8FAFC !important",
                                        },
                                    },
                                },
                                "& .MuiTableFooter-root": {
                                    display: "none",
                                },
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
                    sx: { borderRadius: "8px", overflow: "hidden" },
                }}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        px: 4,
                        py: 2.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #E0E0E0",
                    }}
                >
                    <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>Gen QR Code</Typography>
                    <IconButton onClick={() => setQrModalOpen(false)} sx={{ color: "#9E9E9E" }}>
                        <CloseIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ px: 4, py: 4, bgcolor: "#FFFFFF" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                        <Box
                            sx={{
                                width: "100%",
                                bgcolor: "#E5F6FF",
                                borderRadius: "6px",
                                py: 2.5,
                                px: 2,
                                textAlign: "center",
                                boxSizing: "border-box",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#07518c",
                                    fontSize: "28px",
                                    lineHeight: 1.25,
                                    fontWeight: 600,
                                }}
                            >
                                {activeSchool}
                            </Typography>
                            <Typography sx={{ mt: 1, fontSize: "16px", fontWeight: 500 }}>
                                ตำบล{schoolDetails.subDistrict} อำเภอ{schoolDetails.district} จังหวัด
                                {schoolDetails.province}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: 330,
                                height: 330,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
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

                        <Typography sx={{ fontSize: "16px", color: "#777777" }}>
                            สแกน QR Code เพื่อดาวน์โหลดบัตรประกันนักเรียน
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 4, pb: 3, pt: 0, gap: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={downloadPoster}
                        sx={{
                            borderRadius: "4px",
                            flex: 1,
                            height: 48,
                            bgcolor: "#13A8E8",
                            fontSize: "18px",
                            "&:hover": { bgcolor: "#0C95D1" },
                        }}
                    >
                        ดาวน์โหลดรูปภาพ
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        onClick={handleShare}
                        sx={{
                            borderRadius: "4px",
                            flex: 1,
                            height: 48,
                            borderColor: "#007AC1",
                            color: "#007AC1",
                            fontSize: "18px",
                            "&:hover": { borderColor: "#005b90", bgcolor: "#F2FBFF" },
                        }}
                    >
                        แชร์
                    </Button>
                </DialogActions>
            </Dialog>
        </PageWrapper>
    );
};

export default ElectronicCardPage;
