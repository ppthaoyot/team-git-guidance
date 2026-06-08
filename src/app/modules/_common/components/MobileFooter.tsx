import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Typography } from "@mui/material";

export const MobileFooter = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                width: "100%",
                maxWidth: "500px",
                height: "40px",
                background: "#079AFF",
                borderRadius: "6px 6px 0 0",
                boxSizing: "border-box",
                position: "fixed",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000
            }}
        >
            <Typography
                sx={{
                    fontFamily: "'Prompt', 'Sarabun', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#FFFFFF",
                    whiteSpace: "nowrap"
                }}
            >
                Call Center โทร 1434 (บริการ 24 ชั่วโมง)
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                    component="a"
                    href="https://www.siamsmile.co.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="เว็บไซต์สยามสไมล์"
                    sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "rgba(255,255,255,0.82)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#079AFF"
                    }}
                >
                    <LanguageIcon sx={{ fontSize: 18 }} />
                </Box>
                <Box
                    component="a"
                    href="https://line.me/R/ti/p/%40siamsmile"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LINE @siamsmile"
                    sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "rgba(255,255,255,0.82)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#06C755"
                    }}
                >
                    <ChatBubbleOutlineIcon sx={{ fontSize: 17 }} />
                </Box>
            </Box>
        </Box>
    );
};

export default MobileFooter;
