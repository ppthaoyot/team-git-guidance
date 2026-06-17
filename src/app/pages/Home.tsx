import { Box, Button, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../modules/_auth";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import ChecklistRtlOutlined from "@mui/icons-material/ChecklistRtlOutlined";
import CodeOutlined from "@mui/icons-material/CodeOutlined";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import RocketLaunchOutlined from "@mui/icons-material/RocketLaunchOutlined";

const ACCENT = {
    blue: "#58A6FF",
    green: "#3FB950",
    gold: "#D29922",
} as const;

const featureCards = [
    {
        title: "Branch Strategy",
        description: "Master, Develop, Feature, Release, and Hotfix branches with clear rules",
        Icon: AccountTreeOutlined,
        accent: ACCENT.blue,
    },
    {
        title: "PR Checklist",
        description: "Interactive checklist to verify code quality before merging",
        Icon: ChecklistRtlOutlined,
        accent: ACCENT.green,
    },
    {
        title: "Code Generation",
        description: "Standardized EF Scaffold and OpenAPI codegen workflow",
        Icon: CodeOutlined,
        accent: ACCENT.gold,
    },
] as const;

const quickStartSteps = [
    { step: 1, text: "Clone the repo" },
    { step: 2, text: "Create feature branch from develop" },
    { step: 3, text: "Follow the PR checklist" },
    { step: 4, text: "Submit Pull Request" },
] as const;

const Home = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper title="Home">
            <Box sx={{ minHeight: "100vh" }}>
                {/* ───────────────────── Hero Section ───────────────────── */}
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #1a1a2e 100%)",
                        borderRadius: "16px",
                        px: { xs: 3, md: 8 },
                        py: { xs: 8, md: 12 },
                        mb: 6,
                        textAlign: "center",
                    }}
                >
                    {/* Decorative SVG git-branch lines */}
                    <Box
                        component="svg"
                        viewBox="0 0 800 400"
                        preserveAspectRatio="none"
                        sx={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0.08,
                            pointerEvents: "none",
                        }}
                    >
                        <path
                            d="M0 200 C100 100, 200 300, 400 200 S600 100, 800 200"
                            stroke={ACCENT.blue}
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            d="M0 260 C150 160, 250 360, 400 260 S650 160, 800 260"
                            stroke={ACCENT.green}
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            d="M0 140 C120 80, 280 220, 400 140 S620 80, 800 140"
                            stroke={ACCENT.gold}
                            strokeWidth="1.5"
                            fill="none"
                        />
                        {/* Branch dots */}
                        <circle cx="200" cy="200" r="5" fill={ACCENT.blue} />
                        <circle cx="400" cy="200" r="5" fill={ACCENT.blue} />
                        <circle cx="600" cy="200" r="5" fill={ACCENT.blue} />
                        <circle cx="300" cy="260" r="4" fill={ACCENT.green} />
                        <circle cx="500" cy="260" r="4" fill={ACCENT.green} />
                        <circle cx="350" cy="140" r="3.5" fill={ACCENT.gold} />
                        <circle cx="550" cy="140" r="3.5" fill={ACCENT.gold} />
                        {/* Feature branch fork */}
                        <path
                            d="M200 200 Q250 120, 300 140"
                            stroke={ACCENT.gold}
                            strokeWidth="1.5"
                            fill="none"
                            strokeDasharray="6 4"
                        />
                        <path
                            d="M400 200 Q420 240, 500 260"
                            stroke={ACCENT.green}
                            strokeWidth="1.5"
                            fill="none"
                            strokeDasharray="6 4"
                        />
                    </Box>

                    {/* Radial glow */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { xs: 300, md: 600 },
                            height: { xs: 300, md: 600 },
                            borderRadius: "50%",
                            background: `radial-gradient(circle, ${ACCENT.blue}15 0%, transparent 70%)`,
                            pointerEvents: "none",
                        }}
                    />

                    {/* Hero text */}
                    <Typography
                        variant="h2"
                        sx={{
                            position: "relative",
                            fontWeight: 900,
                            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
                            color: "#FFFFFF",
                            letterSpacing: "-0.02em",
                            mb: 2,
                        }}
                    >
                        Team Git Guidance
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            position: "relative",
                            fontWeight: 400,
                            fontSize: { xs: "0.95rem", md: "1.25rem" },
                            color: "rgba(255,255,255,0.7)",
                            maxWidth: 600,
                            mx: "auto",
                            mb: 5,
                            lineHeight: 1.6,
                        }}
                    >
                        Standardized Git workflow practices for the development team
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardOutlined />}
                        onClick={() => navigate("/git-workflow")}
                        sx={{
                            position: "relative",
                            bgcolor: ACCENT.blue,
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "none",
                            borderRadius: "12px",
                            px: 5,
                            py: 1.5,
                            boxShadow: `0 4px 24px ${ACCENT.blue}40`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                                bgcolor: "#4393E4",
                                transform: "translateY(-2px)",
                                boxShadow: `0 8px 32px ${ACCENT.blue}50`,
                            },
                        }}
                    >
                        Read the Guide
                    </Button>
                </Box>

                {/* ──────────── Feature Highlights Section ──────────── */}
                <Box sx={{ mb: 8 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            textAlign: "center",
                            mb: 1,
                            color: "#E6EDF3",
                            fontSize: { xs: "1.5rem", md: "2rem" },
                        }}
                    >
                        What You Will Find
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: "center",
                            color: "#8B949E",
                            mb: 5,
                            maxWidth: 520,
                            mx: "auto",
                        }}
                    >
                        Everything your team needs for a consistent, high-quality Git workflow.
                    </Typography>

                    <Grid container spacing={4}>
                        {featureCards.map(({ title, description, Icon, accent }) => (
                            <Grid item xs={12} md={4} key={title}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        borderRadius: "16px",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        background: "rgba(22,27,34,0.55)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                        transition: "all 0.35s cubic-bezier(.25,.8,.25,1)",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: `0 16px 48px ${accent}18`,
                                            borderColor: `${accent}40`,
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "14px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mb: 3,
                                                background: `${accent}14`,
                                                border: `1px solid ${accent}30`,
                                            }}
                                        >
                                            <Icon sx={{ fontSize: 30, color: accent }} />
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                color: "#E6EDF3",
                                                mb: 1.5,
                                            }}
                                        >
                                            {title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#8B949E",
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ──────────── Quick Start Section ──────────── */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(22,27,34,0.55)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        p: { xs: 3, md: 5 },
                        mb: 6,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                        <RocketLaunchOutlined sx={{ color: ACCENT.green, fontSize: 28 }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, color: "#E6EDF3" }}>
                            Quick Start
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {quickStartSteps.map(({ step, text }) => (
                            <Grid item xs={12} sm={6} md={3} key={step}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 2,
                                        p: 2.5,
                                        borderRadius: "12px",
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.04)",
                                        height: "100%",
                                        transition: "all 0.25s ease",
                                        "&:hover": {
                                            background: "rgba(255,255,255,0.06)",
                                            borderColor: `${ACCENT.green}30`,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            minWidth: 36,
                                            height: 36,
                                            borderRadius: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 800,
                                            fontSize: "0.95rem",
                                            color: ACCENT.green,
                                            background: `${ACCENT.green}14`,
                                            border: `1px solid ${ACCENT.green}30`,
                                        }}
                                    >
                                        {step}
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#C9D1D9",
                                            fontWeight: 500,
                                            lineHeight: 1.6,
                                            pt: 0.5,
                                        }}
                                    >
                                        {text}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Box>
        </PageWrapper>
    );
};

export default Home;
