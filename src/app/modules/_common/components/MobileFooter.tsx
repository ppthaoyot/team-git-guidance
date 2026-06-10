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
                zIndex: 1000,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#FFFFFF",
                    whiteSpace: "nowrap",
                }}
            >
                Call Center โทร 1434 (บริการ 24 ชั่วโมง)
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "0px",
                    gap: "14px",
                    width: "70px",
                    height: "28px",
                    flex: "none",
                    order: 1,
                    flexGrow: 0,
                }}
            >
                {/* Siam Smile Website Icon */}
                <Box
                    component="a"
                    href="https://www.siamsmile.co.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="เว็บไซต์สยามสไมล์"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 28,
                        height: 28,
                        bgcolor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "100px",
                        flex: "none",
                        order: 0,
                        flexGrow: 0,
                    }}
                >
                    <svg viewBox="0 0 24 24" width="20" height="19" style={{ display: "block" }}>
                        <rect x="2" y="7" width="20" height="10" rx="3.5" fill="#25AAE1" />
                        <rect x="7" y="2" width="10" height="20" rx="3.5" fill="#25AAE1" />
                        <ellipse cx="12" cy="7.2" rx="2.1" ry="2.5" fill="white" />
                        <path
                            d="M11.2 7.7 C11.4 8.2 12.6 8.2 12.8 7.7"
                            stroke="#25AAE1"
                            strokeWidth="0.6"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 2.2 11.2 C 6.5 11.2, 17.5 11.2, 21.8 11.2 C 17.5 12.5, 14.5 14.2, 14.5 17.5 L 14.5 22 L 13.2 22 L 12.5 18.5 C 12.3 18, 11.7 18, 11.5 18.5 L 10.8 22 L 9.5 22 L 9.5 17.5 C 9.5 14.2, 6.5 12.5, 2.2 11.2 Z"
                            fill="white"
                        />
                    </svg>
                </Box>

                {/* LINE Icon */}
                <Box
                    component="a"
                    href="https://line.me/R/ti/p/%40siamsmile"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LINE @siamsmile"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 28,
                        height: 28,
                        bgcolor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "100px",
                        flex: "none",
                        order: 1,
                        flexGrow: 0,
                    }}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" style={{ display: "block" }}>
                        <path
                            fill="#25AAE1"
                            d="M12 2C6.5 2 2 6.0 2 11c0 3.98 2.91 7.35 6.95 8.53L12 22.5l3.05-2.97C19.09 18.35 22 14.98 22 11c0-5.0-4.5-9-10-9z"
                        />
                        <text
                            x="12"
                            y="12.9"
                            fontFamily="'Inter', 'Sarabun', 'Roboto', sans-serif"
                            fontSize="5.8"
                            fontWeight="900"
                            fill="#FFFFFF"
                            textAnchor="middle"
                            letterSpacing="-0.2"
                        >
                            LINE
                        </text>
                    </svg>
                </Box>
            </Box>
        </Box>
    );
};

export default MobileFooter;
