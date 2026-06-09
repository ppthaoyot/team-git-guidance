import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SaveImageDialogProps {
    open: boolean;
    onClose: () => void;
    imageSrc: string;
}

export const SaveImageDialog: React.FC<SaveImageDialogProps> = ({ open, onClose, imageSrc }) => {
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
                    💡 กดค้างที่รูปภาพด้านบนแล้วเลือก &quot;บันทึกรูปภาพ&quot; (Save Image) หรือ &quot;แชร์&quot;
                    (Share) เพื่อบันทึกรูปภาพลงในเครื่อง
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: "8px",
                        py: 1.2,
                        bgcolor: "#07518c",
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#053e6d" },
                    }}
                >
                    ปิดหน้าต่าง
                </Button>
            </DialogActions>
        </Dialog>
    );
};
