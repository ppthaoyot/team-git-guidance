import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

interface SaveImageDialogProps {
    open: boolean;
    onClose: () => void;
    imageSrc: string;
    fileName: string;
}

export const SaveImageDialog: React.FC<SaveImageDialogProps> = ({ open, onClose, imageSrc, fileName }) => {
    const handleDirectDownload = () => {
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "16px",
                    p: 0.5,
                    overflow: "hidden",
                },
            }}
        >
            <DialogTitle
                sx={{
                    m: 0,
                    p: 2,
                    fontWeight: 700,
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                บันทึกรูปภาพ
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                dividers
                sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
            >
                <Typography variant="body2" color="text.secondary" align="center" sx={{ fontWeight: 600 }}>
                    แตะค้างที่รูปภาพด้านล่างเพื่อบันทึกลงอุปกรณ์ของคุณ
                </Typography>

                {imageSrc && (
                    <Box
                        sx={{
                            width: "100%",
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            border: "1px solid #e0e0e0",
                            bgcolor: "#f5f5f5",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={imageSrc}
                            alt="Save Preview"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                userSelect: "auto",
                                WebkitUserSelect: "auto",
                            }}
                        />
                    </Box>
                )}

                <Typography
                    variant="caption"
                    color="warning.main"
                    align="center"
                    sx={{
                        mt: 1,
                        p: 1.5,
                        borderRadius: "8px",
                        bgcolor: "#fffde7",
                        border: "1px solid #fff59d",
                        width: "100%",
                        boxSizing: "border-box",
                        fontWeight: 600,
                        lineHeight: 1.5,
                    }}
                >
                    💡 หากปุ่มดาวน์โหลดไม่ทำงาน (เช่น บน LINE หรือ Safari) ให้กดค้างที่รูปภาพด้านบนแล้วเลือก
                    &quot;บันทึกรูปภาพ&quot; (Save Image) หรือ &quot;แชร์&quot; (Share)
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: "space-between", gap: 1.5 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    sx={{ borderRadius: "8px", py: 1 }}
                >
                    ปิด
                </Button>
                <Button
                    onClick={handleDirectDownload}
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    fullWidth
                    sx={{
                        borderRadius: "8px",
                        py: 1,
                        bgcolor: "#07518c",
                        "&:hover": { bgcolor: "#053e6d" },
                    }}
                >
                    ดาวน์โหลดโดยตรง
                </Button>
            </DialogActions>
        </Dialog>
    );
};
