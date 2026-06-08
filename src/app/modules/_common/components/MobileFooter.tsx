import { Box, Typography } from "@mui/material";

/**
 * MobileFooter - ส่วนท้ายของหน้าจอแสดงผลบนมือถือ (Figma Component 629 - 154)
 * ประกอบด้วย Call Center โทร 1434 และลิงก์ไปยัง LINE Official และเว็บไซต์สยามสไมล์
 */
export const MobileFooter = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 16px",
                width: "100%",
                maxWidth: "500px",
                height: "40px",
                background: "#079AFF",
                borderRadius: "8px 8px 0px 0px",
                boxSizing: "border-box",
                position: "fixed",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)"
            }}
        >
            {/* ข้อความ Call Center */}
            <Typography
                sx={{
                    fontFamily: "'Prompt', 'Sarabun', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "13.5px",
                    lineHeight: "20px",
                    color: "#FFFFFF"
                }}
            >
                Call Center โทร 1434 (บริการ 24 ชั่วโมง)
            </Typography>

            {/* โซเชียลมีเดียลิงก์ */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "14px"
                }}
            >
                {/* LINE App Icon */}
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
                        width: "28px",
                        height: "28px",
                        background: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "100px",
                        transition: "background 0.2s ease-in-out",
                        "&:hover": {
                            background: "rgba(255, 255, 255, 1)"
                        }
                    }}
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#06C755">
                        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.564.39.084.922.258 1.057.592.12.303.079.778.038 1.087l-.173 1.042c-.053.313-.257 1.226 1.109.668 1.365-.558 7.373-4.341 10.057-7.429 2.128-2.316 3.836-5.011 3.836-7.518zm-15.827 3.32h-2.126c-.361 0-.653-.292-.653-.654v-3.784c0-.361.292-.653.653-.653s.654.292.654.653v3.131h1.472c.361 0 .653.292.653.653s-.292.654-.653.654zm2.716-.654c0 .361-.292.653-.653.653s-.653-.292-.653-.653v-3.784c0-.361.292-.653.653-.653s.653.292.653.653v3.784zm5.021 0c0 .313-.221.579-.527.64l-1.954.385c-.042.008-.085.013-.128.013-.361 0-.653-.292-.653-.653v-3.784c0-.361.292-.653.653-.653s.653.292.653.653v2.859l1.428-.282c.307-.061.578.14.64.448l.04.168.042.171zm3.844-.686c0 .361-.292.654-.654.654h-1.471v-.93h1.471c.362 0 .654.292.654.653v.111l-.001.077c-.005.153-.058.283-.153.355l-1.317-.92v-1.12h1.471c.362 0 .654.292.654.653s-.292.654-.654.654h-1.471v.784h1.471c.362 0 .654.292.654.653s-.292.654-.654.654z"/>
                    </svg>
                </Box>

                {/* Website Link (Globe Icon) in #25AAE1 */}
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
                        width: "28px",
                        height: "28px",
                        background: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "100px",
                        transition: "background 0.2s ease-in-out",
                        "&:hover": {
                            background: "rgba(255, 255, 255, 1)"
                        }
                    }}
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#25AAE1">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/>
                    </svg>
                </Box>
            </Box>
        </Box>
    );
};
export default MobileFooter;
