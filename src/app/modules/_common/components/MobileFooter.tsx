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
                    gap: "14px",
                    width: "70px",
                    height: "28px",
                }}
            >
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
                        order: 0,
                        flexGrow: 0,
                    }}
                >
                    <svg viewBox="0 0 24 24" width="20" height="18" fill="#06C755" style={{ display: "block" }}>
                        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738S0 4.935 0 10.304c0 4.809 4.27 8.842 10.035 9.608.39.084.922.258 1.058.59.12.294.08 1.058-.04 1.488-.13.488-.636 2.928-.75 3.44-.13.59.08.76.51.51.4-.23 6.47-3.805 9.07-5.845 2.6-2.04 4.117-4.729 4.117-7.788zm-15.003.945H7.43v-3.79c0-.226-.182-.41-.408-.41H6.186c-.226 0-.408.184-.408.41v4.61c0 .226.182.408.408.408h2.811c.226 0 .408-.182.408-.408v-.41c0-.228-.182-.41-.408-.41zm2.348-.82c0-.226-.182-.41-.408-.41h-.836c-.226 0-.408-.184-.408-.41V7.458c0-.226-.182-.408-.408-.408h-.836c-.226 0-.408.182-.408.408v4.61c0 .226.182.408.408.408h2.072c.226 0 .408-.182.408-.408v-.817c0-.228-.183-.41-.408-.41zm3.111-2.97c0-.226-.182-.41-.408-.41h-.836c-.226 0-.408-.184-.408-.41V7.458c0-.226-.182-.408-.408-.408h-.836c-.226 0-.408.182-.408.408v4.61c0 .226.182.408.408.408h.836c.226 0 .408-.182.408-.408v-3.79h.836c.226 0 .408-.182.408-.408V7.46zm5.834 3.79c0-.226-.182-.41-.408-.41h-1.65v-1.01h1.65c.226 0 .408-.184.408-.41V8.62c0-.226-.182-.41-.408-.41h-1.65V7.458c0-.226-.182-.408-.408-.408h-.836c-.226 0-.408.182-.408.408v4.61c0 .226.182.408.408.408h2.89c.226 0 .408-.182.408-.408v-.41c.003-.228-.179-.41-.405-.41z" />
                    </svg>
                </Box>

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
                        order: 1,
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
            </Box>
        </Box>
    );
};

export default MobileFooter;
