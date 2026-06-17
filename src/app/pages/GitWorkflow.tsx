import React, { useState, useEffect, useRef } from "react";

import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Checkbox,
    FormControlLabel,
    LinearProgress,
    Tooltip,
    Fab,
    Icon,
    Alert,
    useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Swal from "sweetalert2";

// Define Reading Themes
type ReadingTheme = "light" | "dark" | "sepia";

interface ThemeColors {
    background: string;
    paperBg: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    accent: string;
    codeBg: string;
    hoverBg: string;
}

const themeColors: Record<ReadingTheme, ThemeColors> = {
    light: {
        background: "#F9FAF9",
        paperBg: "#FFFFFF",
        textPrimary: "#1C1E21",
        textSecondary: "#4A4D52",
        border: "#E2E8F0",
        accent: "#007AC1",
        codeBg: "#F1F5F9",
        hoverBg: "#F1F5F9",
    },
    dark: {
        background: "#0D1117",
        paperBg: "#161B22",
        textPrimary: "#C9D1D9",
        textSecondary: "#8B949E",
        border: "#30363D",
        accent: "#58A6FF",
        codeBg: "#090D13",
        hoverBg: "#21262D",
    },
    sepia: {
        background: "#F4ECD8",
        paperBg: "#FAF0D9",
        textPrimary: "#433422",
        textSecondary: "#5F4D37",
        border: "#E8D9BD",
        accent: "#8B5A2B",
        codeBg: "#EEDCBA",
        hoverBg: "#EAD4A8",
    },
};

// Custom Code Block component
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Box
            sx={{
                position: "relative",
                my: 2,
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "rgba(148, 163, 184, 0.15)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                    bgcolor: "rgba(0, 0, 0, 0.05)",
                    borderBottom: "1px solid",
                    borderColor: "rgba(148, 163, 184, 0.1)",
                }}
            >
                <Typography variant="caption" sx={{ fontFamily: "monospace", opacity: 0.6 }}>
                    terminal / code
                </Typography>
                <Button
                    size="small"
                    startIcon={copied ? <CheckCircleIcon color="success" /> : <ContentCopyIcon />}
                    onClick={handleCopy}
                    sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        color: "inherit",
                        opacity: 0.8,
                        "&:hover": { opacity: 1 },
                    }}
                >
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </Box>
            <Box
                component="pre"
                sx={{
                    margin: 0,
                    p: 2,
                    overflowX: "auto",
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    textAlign: "left",
                }}
            >
                <code>{code}</code>
            </Box>
        </Box>
    );
};

// Interactive Git Tree Diagram
const GitVisualizer: React.FC<{ activeTheme: ReadingTheme }> = ({ activeTheme }) => {
    const isDark = activeTheme === "dark";
    const dotColor = isDark ? "#58A6FF" : "#007AC1";
    const textColor = themeColors[activeTheme].textPrimary;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                my: 3,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: themeColors[activeTheme].border,
                bgcolor: activeTheme === "light" ? "#F8FAFC" : activeTheme === "dark" ? "#0F141C" : "#EFE6CE",
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mb: 3, textAlign: "center", fontFamily: "'Prompt', sans-serif" }}
            >
                Branch Strategy Model (Structure & Merge Flow)
            </Typography>

            <Box sx={{ maxWidth: 600, mx: "auto", overflowX: "auto", py: 1 }}>
                <svg width="100%" height="240" viewBox="0 0 500 240" style={{ minWidth: 400 }}>
                    {/* Grid Lines & Labels */}
                    <line
                        x1="80"
                        y1="30"
                        x2="450"
                        y2="30"
                        stroke={isDark ? "#30363D" : "#E2E8F0"}
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />
                    <line
                        x1="80"
                        y1="80"
                        x2="450"
                        y2="80"
                        stroke={isDark ? "#30363D" : "#E2E8F0"}
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />
                    <line
                        x1="80"
                        y1="130"
                        x2="450"
                        y2="130"
                        stroke={isDark ? "#30363D" : "#E2E8F0"}
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />
                    <line
                        x1="80"
                        y1="190"
                        x2="450"
                        y2="190"
                        stroke={isDark ? "#30363D" : "#E2E8F0"}
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />

                    {/* Branch Titles */}
                    <text
                        x="70"
                        y="35"
                        textAnchor="end"
                        fill={textColor}
                        style={{ fontSize: 13, fontWeight: "bold", fontFamily: "sans-serif" }}
                    >
                        master
                    </text>
                    <text
                        x="70"
                        y="85"
                        textAnchor="end"
                        fill={textColor}
                        style={{ fontSize: 13, fontWeight: "bold", fontFamily: "sans-serif" }}
                    >
                        release/*
                    </text>
                    <text
                        x="70"
                        y="135"
                        textAnchor="end"
                        fill={textColor}
                        style={{ fontSize: 13, fontWeight: "bold", fontFamily: "sans-serif" }}
                    >
                        develop
                    </text>
                    <text
                        x="70"
                        y="195"
                        textAnchor="end"
                        fill={textColor}
                        style={{ fontSize: 13, fontWeight: "bold", fontFamily: "sans-serif" }}
                    >
                        feature/*
                    </text>

                    {/* Git Connective Lines */}
                    {/* develop branch line */}
                    <line x1="100" y1="130" x2="420" y2="130" stroke="#10B981" strokeWidth="3" />
                    {/* master branch line */}
                    <line x1="100" y1="30" x2="420" y2="30" stroke="#EF4444" strokeWidth="3" />

                    {/* feature 1 branching & merging */}
                    <path
                        d="M 120 130 Q 140 190 170 190 L 220 190 Q 250 190 270 130"
                        fill="none"
                        stroke={dotColor}
                        strokeWidth="2.5"
                    />
                    {/* release branching & merging */}
                    <path
                        d="M 230 130 Q 250 80 280 80 L 330 80 Q 360 80 380 30"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                    />
                    {/* release merge-back to develop */}
                    <path
                        d="M 330 80 Q 350 110 370 130"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeDasharray="4,4"
                    />

                    {/* Nodes (Circles) */}
                    {/* master nodes */}
                    <circle cx="100" cy="30" r="6" fill="#EF4444" />
                    <circle cx="380" cy="30" r="6" fill="#EF4444" />
                    <text
                        x="380"
                        y="18"
                        textAnchor="middle"
                        fill="#EF4444"
                        style={{ fontSize: 10, fontWeight: "bold" }}
                    >
                        Prod Release
                    </text>

                    {/* develop nodes */}
                    <circle cx="120" cy="130" r="5" fill="#10B981" />
                    <circle cx="270" cy="130" r="5" fill="#10B981" />
                    <circle cx="370" cy="130" r="5" fill="#10B981" />

                    {/* feature nodes */}
                    <circle cx="170" cy="190" r="5" fill={dotColor} />
                    <circle cx="220" cy="190" r="5" fill={dotColor} />
                    <text x="195" y="210" textAnchor="middle" fill={textColor} style={{ fontSize: 10 }}>
                        feature branch
                    </text>

                    {/* release nodes */}
                    <circle cx="280" cy="80" r="5" fill="#F59E0B" />
                    <circle cx="330" cy="80" r="5" fill="#F59E0B" />
                    <text x="305" y="70" textAnchor="middle" fill="#F59E0B" style={{ fontSize: 10 }}>
                        UAT / Stabilize
                    </text>

                    {/* Arrowheads/Indicators */}
                    {/* Feature branch start arrow */}
                    <polygon points="125,140 120,130 130,130" fill="#10B981" transform="rotate(20 120 130)" />
                    {/* Feature merge PR */}
                    <polygon points="270,130 268,137 274,137" fill="#10B981" />
                    {/* Release branch start */}
                    <polygon points="235,120 230,130 240,130" fill="#10B981" transform="rotate(-20 230 130)" />
                    {/* Release merge to master */}
                    <polygon points="380,30 378,37 384,37" fill="#EF4444" />
                </svg>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, textAlign: "center", fontStyle: "italic", mt: 1 }}>
                * Recommended GitFlow-lite approach: never push directly to master/develop, always work via feature/*
                branches
            </Typography>
        </Paper>
    );
};

// FAQ Item data
interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqData: Record<string, FAQItem[]> = {
    general: [
        {
            id: "faq-1",
            question: "Why must we always branch from the latest develop?",
            answer: "Because develop is the team's latest code base. Branching from an old state means your branch will miss recent changes like scaffold output, API contracts, shared services, configs, or new migrations. The result is heavier conflicts when merging back.",
        },
        {
            id: "faq-2",
            question: "Should we pull develop every day?",
            answer: "We recommend syncing at least once a day, or always before opening a PR. If your work touches files that others frequently modify (e.g., DbContext, API generated client, shared DTO, shared components), sync even more often.",
        },
        {
            id: "faq-3",
            question: "Should we use rebase or merge?",
            answer: "It depends on the situation:\n- Solo branch (you're the only contributor) → rebase to keep the log clean\n- Shared branch (multiple contributors) → merge is safer to prevent history loss\n- develop/master → NEVER rebase or rewrite history",
        },
        {
            id: "faq-4",
            question: "Why can't we push directly to develop?",
            answer: "Because develop should be a trusted, testable branch ready for UAT/Staging. If everyone can push directly, there's no Pull Request checkpoint (Code Review), no Automated Build/Test validation, and bugs slip into the system more easily.",
        },
        {
            id: "faq-5",
            question: "Can we merge incomplete features into develop?",
            answer: "Only if a Feature Flag system is in place to hide the new functionality from end users, or if the code has absolutely zero impact on existing system behavior. If the code breaks the build or destabilizes the current system, it must NOT be merged into develop.",
        },
    ],
    scaffold: [
        {
            id: "faq-9",
            question: "Should EF Core Power Tools output / DbContext / Generated Files be committed?",
            answer: "Yes, commit them if they are required for the project to build and run (e.g., Entity classes, DbContext, OpenAPI client). However, the team must agree on rules: 1) Generate using standardized scripts only 2) Use the same tool version 3) Use the same shared DEV database 4) Assign an owner and NEVER manually edit generated files.",
        },
        {
            id: "faq-10",
            question: "If someone pushed scaffold changes to develop, do I need to update my branch?",
            answer: "You must sync immediately, especially if your work is in the same domain. Without syncing, your feature branch operates on an outdated DB model, and merging back to develop will result in massive, hard-to-resolve conflicts.",
        },
        {
            id: "faq-11",
            question: "What if scaffold output keeps causing frequent conflicts?",
            answer: "Check these 4 key factors:\n1. Is there a designated scaffold owner maintaining the scripts?\n2. Is everyone using the same command/configuration to run?\n3. Is everyone running against the shared DEV database?\n4. Is anyone secretly editing generated files manually? (Strictly forbidden)\nIf all are in order but problems persist, use partial classes to add custom logic instead of overwriting generated files.",
        },
    ],
    deployment: [
        {
            id: "faq-6",
            question: "How should we deploy only specific work from develop?",
            answer: "It depends on the need:\n- Batch of ready features / scheduled release → Use a release branch from develop\n- Need only specific urgent commits → Use cherry-pick to a special release\n- Want to merge to develop but not ready to go live → Use Feature Flags to control visibility",
        },
        {
            id: "faq-7",
            question: "Is cherry-pick safe? How often should we use it?",
            answer: "It's safe when each commit is small and focused on a single topic. It's unsafe when commits bundle multiple changes, as unready features or permissions may be pulled along. If cherry-pick is needed frequently for deployment, it signals problems with commit discipline or release planning.",
        },
        {
            id: "faq-15",
            question: "How does an integration branch differ from develop?",
            answer: "develop is the team's main branch and the source of truth for standard testing.\nintegration/* is a temporary branch created to test cross-team integration (e.g., Teams A, B, C) within a limited timeframe without disrupting develop. It must be deleted once merged to develop. Never use it as a second permanent develop.",
        },
    ],
    troubleshoot: [
        {
            id: "faq-18",
            question: "What if I accidentally committed to the wrong branch (e.g., develop)?",
            answer: "If you haven't pushed to the remote server yet, it's easy to fix:\n1. Run `git checkout -b feature/correct-branch` to move all code to a new branch\n2. Go back to the original branch and reset\nIf already pushed, always notify the team lead and teammates before deleting or force-pushing to prevent others' code from being lost.",
        },
        {
            id: "faq-14",
            question: "Should we manually resolve conflicts in generated files (e.g., DbContext)?",
            answer: "Generally, no — manual resolution may be incomplete. The best approach is to update the DB schema to match the main system, then re-run the EF Core Power Tools reverse-engineering to regenerate the files completely.",
        },
    ],
};

const HighlightText: React.FC<{ text: string; search: string }> = ({ text, search }) => {
    if (!search) return <>{text}</>;
    const parts = text.split(new RegExp(`(${search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi"));
    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === search.toLowerCase() ? (
                    <mark
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        style={{ backgroundColor: "#FDE047", color: "#000000", borderRadius: "2px", padding: "0 2px" }}
                    >
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
};

const GitWorkflow: React.FC = () => {
    const matchesLg = useMediaQuery("(min-width:1025px)");

    // States for Reading Customization
    const [readingTheme, setReadingTheme] = useState<ReadingTheme>("light");
    const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1.0);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState("summary");

    // Checklist state
    const [checklistItems, setChecklistItems] = useState([
        { id: 1, text: "Branch is synced (Rebase/Merge) with latest develop", checked: false },
        { id: 2, text: "Build command (dotnet build / npm run build) passes with no errors", checked: false },
        { id: 3, text: "Tests (dotnet test) or manual testing passed successfully", checked: false },
        { id: 4, text: "No junk or temporary files showing in git status", checked: false },
        { id: 5, text: "No personal configuration files (local config) leaked into commit", checked: false },
        { id: 6, text: "Database schema changes include attached DB migration scripts", checked: false },
        { id: 7, text: "EF Core Power Tools / API codegen ran using standardized scripts", checked: false },
        { id: 8, text: "No business logic manually written in generated files", checked: false },
        { id: 9, text: "PR description includes clear Scope, Impact, and Reviewer assignment", checked: false },
    ]);

    // Handle checklists
    const handleChecklistChange = (id: number) => {
        setChecklistItems(checklistItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    };

    const checkedCount = checklistItems.filter((i) => i.checked).length;
    const checklistProgress = Math.round((checkedCount / checklistItems.length) * 100);

    // Section Refs for scroll tracking
    const sectionsRef = {
        summary: useRef<HTMLDivElement>(null),
        goals: useRef<HTMLDivElement>(null),
        strategy: useRef<HTMLDivElement>(null),
        rules: useRef<HTMLDivElement>(null),
        daily: useRef<HTMLDivElement>(null),
        pr: useRef<HTMLDivElement>(null),
        collab: useRef<HTMLDivElement>(null),
        scaffold: useRef<HTMLDivElement>(null),
        faq: useRef<HTMLDivElement>(null),
        commands: useRef<HTMLDivElement>(null),
    };

    // Tracking scroll location to update active TOC
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 160;

            for (const [key, ref] of Object.entries(sectionsRef)) {
                if (ref.current) {
                    const top = ref.current.offsetTop;
                    const height = ref.current.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(key);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: keyof typeof sectionsRef) => {
        const ref = sectionsRef[sectionId];
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 120,
                behavior: "smooth",
            });
            setActiveSection(sectionId);
        }
    };

    const colors = themeColors[readingTheme];

    // Alert completion
    const handleCompleteChecklist = () => {
        if (checklistProgress === 100) {
            Swal.fire({
                icon: "success",
                title: "Excellent!",
                text: "Your code is ready for Merge! Forward to the Reviewer now.",
                confirmButtonColor: "#10B981",
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Incomplete",
                text: `You have only checked ${checkedCount}/${checklistItems.length} items. Please review your code thoroughly before submitting.`,
                confirmButtonColor: "#F59E0B",
            });
        }
    };

    return (
        <Box
            sx={{
                bgcolor: colors.background,
                minHeight: "100vh",
                color: colors.textPrimary,
                fontFamily: "'Sarabun', sans-serif",
                fontSize: `${16 * fontSizeMultiplier}px`,
                transition: "all 0.25s ease-in-out",
                pb: 10,
            }}
        >
            {/* Reading Scroll Progress */}
            <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}>
                <LinearProgress
                    variant="determinate"
                    value={
                        typeof window !== "undefined"
                            ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                            : 0
                    }
                    sx={{
                        height: 4,
                        bgcolor: "rgba(0,0,0,0.1)",
                        "& .MuiLinearProgress-bar": {
                            bgcolor: colors.accent,
                        },
                    }}
                />
            </Box>

            {/* Sticky Reading Navbar */}
            <Paper
                elevation={1}
                sx={{
                    position: "sticky",
                    top: 4,
                    zIndex: 1000,
                    borderRadius: 0,
                    borderBottom: "1px solid",
                    borderColor: colors.border,
                    bgcolor: colors.paperBg,
                    color: colors.textPrimary,
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", sm: "auto" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
                        <MenuBookIcon sx={{ color: colors.accent }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontFamily: "'Prompt', sans-serif",
                                fontSize: "1.1rem",
                            }}
                        >
                            Git Workflow Guide
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        width: { xs: "100%", sm: "auto" },
                        justifyContent: "flex-end",
                    }}
                >
                    {/* Live Search */}
                    <TextField
                        size="small"
                        placeholder="Search in guide..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: "action.active", mr: 1, fontSize: 20 }} />,
                            endAdornment: searchQuery && (
                                <IconButton size="small" onClick={() => setSearchQuery("")}>
                                    <CloseIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            ),
                        }}
                        sx={{
                            width: { xs: "100%", sm: 220, md: 300 },
                            "& .MuiOutlinedInput-root": {
                                bgcolor: colors.background,
                                borderRadius: "20px",
                                color: colors.textPrimary,
                                "& fieldset": { borderColor: colors.border },
                                "&:hover fieldset": { borderColor: colors.accent },
                                "&.Mui-focused fieldset": { borderColor: colors.accent },
                            },
                        }}
                    />

                    {/* Font Adjuster */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid",
                            borderColor: colors.border,
                            borderRadius: "20px",
                            px: 1,
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={() => setFontSizeMultiplier(Math.max(0.8, fontSizeMultiplier - 0.1))}
                            sx={{ color: colors.textSecondary }}
                        >
                            <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>A-</span>
                        </IconButton>
                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                        <IconButton
                            size="small"
                            onClick={() => setFontSizeMultiplier(Math.min(1.4, fontSizeMultiplier + 0.1))}
                            sx={{ color: colors.textSecondary }}
                        >
                            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>A+</span>
                        </IconButton>
                    </Box>

                    {/* Theme Toggles */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Tooltip title="Light Mode">
                            <IconButton
                                size="small"
                                onClick={() => setReadingTheme("light")}
                                sx={{
                                    color: readingTheme === "light" ? "#F59E0B" : colors.textSecondary,
                                    bgcolor: readingTheme === "light" ? "action.hover" : "transparent",
                                }}
                            >
                                <Brightness7Icon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Sepia Mode (Eye Comfort)">
                            <IconButton
                                size="small"
                                onClick={() => setReadingTheme("sepia")}
                                sx={{
                                    color: readingTheme === "sepia" ? "#8B5A2B" : colors.textSecondary,
                                    bgcolor: readingTheme === "sepia" ? "action.hover" : "transparent",
                                }}
                            >
                                <CoffeeIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Dark Mode">
                            <IconButton
                                size="small"
                                onClick={() => setReadingTheme("dark")}
                                sx={{
                                    color: readingTheme === "dark" ? "#58A6FF" : colors.textSecondary,
                                    bgcolor: readingTheme === "dark" ? "action.hover" : "transparent",
                                }}
                            >
                                <Brightness4Icon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>

            {/* Main Content Layout */}
            <Grid container spacing={4} sx={{ px: { xs: 2, md: 6 }, mt: 2 }}>
                {/* Desktop Sticky Sidebar (Table of Contents) */}
                {matchesLg && (
                    <Grid item xs={12} lg={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                position: "sticky",
                                top: "120px",
                                p: 2,
                                borderRadius: "12px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                                color: colors.textPrimary,
                                maxHeight: "calc(100vh - 160px)",
                                overflowY: "auto",
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 700,
                                    px: 2,
                                    pb: 1.5,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.textSecondary,
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Table of Contents
                            </Typography>
                            <List dense sx={{ py: 0 }}>
                                {[
                                    { key: "summary", label: "Summary", icon: "bolt" },
                                    { key: "goals", label: "1. Goals & Objectives", icon: "track_changes" },
                                    { key: "strategy", label: "2. Branch Strategy", icon: "call_split" },
                                    { key: "rules", label: "3. Team Rules", icon: "gavel" },
                                    { key: "daily", label: "4. Daily Workflows", icon: "today" },
                                    { key: "pr", label: "5. Pull Request Rules", icon: "rate_review" },
                                    { key: "collab", label: "6. Cross-Team Collaboration", icon: "groups" },
                                    { key: "scaffold", label: "9-10. EF & API Codegen", icon: "code" },
                                    { key: "faq", label: "15. FAQ", icon: "help_outline" },
                                    { key: "commands", label: "16. Quick Git Commands", icon: "terminal" },
                                ].map((item) => {
                                    const isActive = activeSection === item.key;
                                    return (
                                        <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                                            <ListItemButton
                                                onClick={() => scrollToSection(item.key as any)}
                                                sx={{
                                                    borderRadius: "8px",
                                                    py: 1,
                                                    bgcolor: isActive ? "action.selected" : "transparent",
                                                    color: isActive ? colors.accent : "inherit",
                                                    "&:hover": { bgcolor: colors.hoverBg },
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 32,
                                                        color: isActive ? colors.accent : colors.textSecondary,
                                                    }}
                                                >
                                                    <Icon sx={{ fontSize: 18 }}>{item.icon}</Icon>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.label}
                                                    primaryTypographyProps={{
                                                        fontWeight: isActive ? 700 : 500,
                                                        fontFamily: "'Prompt', sans-serif",
                                                        fontSize: "0.875rem",
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Paper>
                    </Grid>
                )}

                {/* Right Documentation Content */}
                <Grid item xs={12} lg={matchesLg ? 9 : 12}>
                    <Box sx={{ maxWidth: 840, mx: "auto" }}>
                        {/* Title Banner */}
                        <Box sx={{ mb: 5, textAlign: "center" }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                    mb: 2,
                                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                                    lineHeight: 1.3,
                                }}
                            >
                                Git Workflow Practice for Dev Team
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: colors.textSecondary,
                                    maxWidth: 680,
                                    mx: "auto",
                                    lineHeight: 1.6,
                                    fontSize: "1.05rem",
                                }}
                            >
                                A collaborative guide to reduce Merge Conflicts, avoid duplicated work, and keep
                                protected branches stable and safe.
                            </Typography>
                        </Box>

                        {/* Summary Section */}
                        <Paper
                            ref={sectionsRef.summary}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                <Icon sx={{ color: "#EF4444" }}>bolt</Icon>
                                <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Prompt', sans-serif" }}>
                                    Summary (Core Principles)
                                </Typography>
                            </Box>

                            <Typography paragraph sx={{ opacity: 0.9 }}>
                                The team should follow <strong>GitFlow-lite / Trunk-based with develop</strong> with
                                clearly defined branch roles:
                            </Typography>

                            <Box sx={{ pl: 2, borderLeft: "4px solid", borderColor: colors.accent, my: 3 }}>
                                <Grid container spacing={2}>
                                    {[
                                        { branch: "master", desc: "Production-ready code, deployable immediately" },
                                        {
                                            branch: "develop",
                                            desc: "Latest code that passed PR Review and initial build testing",
                                        },
                                        { branch: "feature/*", desc: "Individual task/ticket working branch" },
                                        {
                                            branch: "release/*",
                                            desc: "Deployment preparation for Stabilization / UAT cycle",
                                        },
                                        {
                                            branch: "hotfix/*",
                                            desc: "Critical Production hotfix (branched from master)",
                                        },
                                        {
                                            branch: "integration/*",
                                            desc: "Temporary cross-team integration testing (use only when necessary)",
                                        },
                                    ].map((item) => (
                                        <Grid item xs={12} sm={6} key={item.branch}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontFamily: "monospace",
                                                    fontWeight: "bold",
                                                    fontSize: "0.95rem",
                                                }}
                                            >
                                                {item.branch}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                                                {item.desc}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mb: 1, fontFamily: "'Prompt', sans-serif" }}
                            >
                                💡 Critical Rules — Everyone Must Follow Immediately:
                            </Typography>
                            <List sx={{ pl: 2, py: 0, listStyleType: "decimal" }}>
                                {[
                                    "Never push directly to master or develop (Protected Branches — always use PR)",
                                    "Always branch from latest develop and sync regularly",
                                    "Sync your branch with latest develop before submitting a Pull Request",
                                    "Create small, focused PRs — never combine 3-4 features in a single PR",
                                    "Generated files (EF Core Power Tools, API Codegen) must NEVER be manually edited — always use standardized scripts",
                                ].map((rule) => (
                                    <li key={rule} style={{ marginBottom: "8px", color: colors.textSecondary }}>
                                        <span style={{ color: colors.textPrimary, fontWeight: 550 }}>
                                            <HighlightText text={rule} search={searchQuery} />
                                        </span>
                                    </li>
                                ))}
                            </List>
                        </Paper>

                        {/* Goals Section */}
                        <Paper
                            ref={sectionsRef.goals}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                1. Git Workflow Objectives
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Alert
                                        severity="error"
                                        icon={<Icon>error_outline</Icon>}
                                        sx={{ height: "100%", borderRadius: "12px" }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 700, mb: 1, fontFamily: "'Prompt', sans-serif" }}
                                        >
                                            Common Pain Points
                                        </Typography>
                                        <List dense sx={{ pl: 2, listStyleType: "disc", py: 0 }}>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Frequent overlapping edits on the same files
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Long-lived feature branches causing heavy conflicts
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Inconsistent EF Core Power Tools output and API contract generation
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Merging broken or incomplete code into develop
                                            </li>
                                        </List>
                                    </Alert>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Alert
                                        severity="success"
                                        icon={<Icon>check_circle_outline</Icon>}
                                        sx={{ height: "100%", borderRadius: "12px" }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 700, mb: 1, fontFamily: "'Prompt', sans-serif" }}
                                        >
                                            Team Goals
                                        </Typography>
                                        <List dense sx={{ pl: 2, listStyleType: "disc", py: 0 }}>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Significantly reduce Merge Conflict rates
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Keep develop branch always buildable and testable 24/7
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Enable selective feature deployment without pulling unrelated work
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Faster onboarding for new developers
                                            </li>
                                        </List>
                                    </Alert>
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Branch Strategy Section */}
                        <Paper
                            ref={sectionsRef.strategy}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                2. Recommended Branch Strategy
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                A well-structured branching architecture enables sub-teams to collaborate without
                                accidentally overwriting each other&apos;s code.
                            </Typography>

                            {/* Dynamic visual graph */}
                            <GitVisualizer activeTheme={readingTheme} />

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, mt: 3, mb: 2, fontFamily: "'Prompt', sans-serif" }}
                            >
                                Branch Details & Access Permissions
                            </Typography>

                            <Box sx={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                                    <thead>
                                        <tr style={{ borderBottom: `2px solid ${colors.border}`, textAlign: "left" }}>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                Branch
                                            </th>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                Usage
                                            </th>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                Merge Permission
                                            </th>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                Notes
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            {
                                                name: "master",
                                                use: "Latest Production Code",
                                                role: "Lead / Maintainer only",
                                                note: "Direct push strictly forbidden",
                                            },
                                            {
                                                name: "develop",
                                                use: "Team's main integration branch",
                                                role: "Team via PR Approval",
                                                note: "Must pass Automated Tests",
                                            },
                                            {
                                                name: "feature/*",
                                                use: "Developer's feature work",
                                                role: "Task Owner",
                                                note: "Short-lived, ideally 1-3 days",
                                            },
                                            {
                                                name: "release/*",
                                                use: "UAT preparation / release cycle",
                                                role: "Lead / Release Owner",
                                                note: "Final bug-fixing stage",
                                            },
                                            {
                                                name: "hotfix/*",
                                                use: "Emergency Production fix",
                                                role: "Hotfix Assignee",
                                                note: "Branched urgently from master",
                                            },
                                            {
                                                name: "integration/*",
                                                use: "Temporary cross-team integration",
                                                role: "Integration Owner",
                                                note: "Delete after merging to develop",
                                            },
                                        ].map((row) => (
                                            <tr key={row.name} style={{ borderBottom: `1px solid ${colors.border}` }}>
                                                <td
                                                    style={{
                                                        padding: "12px 8px",
                                                        fontFamily: "monospace",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {row.name}
                                                </td>
                                                <td style={{ padding: "12px 8px", color: colors.textSecondary }}>
                                                    {row.use}
                                                </td>
                                                <td style={{ padding: "12px 8px", fontWeight: 600 }}>{row.role}</td>
                                                <td
                                                    style={{
                                                        padding: "12px 8px",
                                                        color: colors.textSecondary,
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    {row.note}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        </Paper>

                        {/* Rules Section */}
                        <Paper
                            ref={sectionsRef.rules}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                3. Team Rules (Agreements)
                            </Typography>

                            <Grid container spacing={3}>
                                {[
                                    {
                                        title: "3.1 Never push directly to master / develop",
                                        desc: "Strictly forbidden! All code must go through a Pull Request for CI/CD build testing and at least 1 reviewer approval to prevent accidental project breakage.",
                                        icon: "block",
                                    },
                                    {
                                        title: "3.2 Feature branch must fork from latest develop",
                                        desc: "Before starting a new task, always pull the latest code first. Starting from the latest state prevents build errors and DB schema conflicts.",
                                        icon: "call_split",
                                    },
                                    {
                                        title: "3.3 Short-lived Branches",
                                        desc: "Avoid keeping code on your machine for 2+ weeks. Break work into small chunks and submit PRs every 1-3 days. This makes it easier for teammates to stay updated and reduces conflicts by 10x.",
                                        icon: "hourglass_empty",
                                    },
                                    {
                                        title: "3.4 Micro-commits (Single-purpose Commits)",
                                        desc: "Keep each commit focused on one topic, e.g. 'feat(api): add customer endpoint'. Avoid bundling changes as 'fix all / wip / update' — reverting becomes extremely difficult.",
                                        icon: "playlist_add_check",
                                    },
                                ].map((item) => (
                                    <Grid item xs={12} md={6} key={item.title}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                p: 2,
                                                borderRadius: "8px",
                                                border: `1px solid ${colors.border}`,
                                                height: "100%",
                                            }}
                                        >
                                            <Icon sx={{ color: colors.accent, mt: 0.5 }}>{item.icon}</Icon>
                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ fontWeight: 700, mb: 1, fontFamily: "'Prompt', sans-serif" }}
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: colors.textSecondary, lineHeight: 1.6 }}
                                                >
                                                    {item.desc}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>

                        {/* Daily Workflows Section */}
                        <Paper
                            ref={sectionsRef.daily}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                4. Daily Workflow
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                Follow these standard Git command steps in your daily development loop.
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mt: 2, fontFamily: "'Prompt', sans-serif" }}
                            >
                                1. Starting a new feature:
                            </Typography>
                            <CodeBlock
                                code={`git checkout develop\ngit pull --ff-only origin develop\ngit checkout -b feature/HCM-120-add-leave-type`}
                            />

                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mt: 3, fontFamily: "'Prompt', sans-serif" }}
                            >
                                2. Committing work locally:
                            </Typography>
                            <CodeBlock
                                code={`git status\ngit add src/LeaveService.cs\ngit commit -m "feat(leave): add leave type validation"`}
                            />

                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mt: 3, fontFamily: "'Prompt', sans-serif" }}
                            >
                                3. Syncing latest updates from develop:
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                                * Use rebase for solo branches, or merge if others are collaborating on the same branch.
                            </Typography>
                            <CodeBlock
                                code={`# Rebase sync (for solo branch)\ngit fetch origin\ngit rebase origin/develop\n\n# Merge sync (for shared branch)\ngit fetch origin\ngit merge origin/develop`}
                            />
                        </Paper>

                        {/* Pull Request Practice Section */}
                        <Paper
                            ref={sectionsRef.pr}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                5. Pull Request / Merge Request Practice
                            </Typography>

                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                You can verify your code readiness before merging to the main stability branch using the
                                <strong>Interactive PR Checklist</strong> below:
                            </Typography>

                            {/* Checklist Block */}
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: "12px",
                                    bgcolor:
                                        readingTheme === "light"
                                            ? "#F1F5F9"
                                            : readingTheme === "dark"
                                            ? "#1E293B"
                                            : "#EADFB4",
                                    border: `1px solid ${colors.border}`,
                                    my: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700, fontFamily: "'Prompt', sans-serif" }}
                                    >
                                        📝 PR Readiness Checklist
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", color: colors.accent }}>
                                        Readiness {checklistProgress}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={checklistProgress}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        mb: 3,
                                        bgcolor: "rgba(0,0,0,0.1)",
                                        "& .MuiLinearProgress-bar": {
                                            bgcolor: checklistProgress === 100 ? "#10B981" : colors.accent,
                                        },
                                    }}
                                />

                                <Grid container spacing={1}>
                                    {checklistItems.map((item) => (
                                        <Grid item xs={12} key={item.id}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={item.checked}
                                                        onChange={() => handleChecklistChange(item.id)}
                                                        sx={{
                                                            color: colors.textSecondary,
                                                            "&.Mui-checked": {
                                                                color: colors.accent,
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: item.checked
                                                                ? colors.textPrimary
                                                                : colors.textSecondary,
                                                            textDecoration: item.checked ? "line-through" : "none",
                                                            transition: "all 0.15s ease",
                                                            fontWeight: item.checked ? 500 : 400,
                                                        }}
                                                    >
                                                        {item.text}
                                                    </Typography>
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box sx={{ mt: 3, textAlign: "right" }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleCompleteChecklist}
                                        sx={{
                                            bgcolor: checklistProgress === 100 ? "#10B981" : colors.accent,
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            textTransform: "none",
                                            borderRadius: "8px",
                                            "&:hover": {
                                                bgcolor: checklistProgress === 100 ? "#059669" : "action.selected",
                                            },
                                        }}
                                    >
                                        Confirm Build Readiness
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Cross-team Collab Section */}
                        <Paper
                            ref={sectionsRef.collab}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                6. Cross-Team Collaboration (Team A/B/C)
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                When multiple sub-teams develop features in parallel, use a temporary{" "}
                                <strong>integration/*</strong> branch to combine work before merging into develop,
                                preventing main system breakage.
                            </Typography>

                            <Box sx={{ borderLeft: "4px solid #10B981", pl: 3, my: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 700, fontFamily: "'Prompt', sans-serif" }}
                                >
                                    ✨ Integration Branch Workflow:
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary="1. Create Integration Branch"
                                            secondary="Create branch 'integration/payment-revamp' from latest develop"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="2. Submit PR to Integration"
                                            secondary="All sub-teams A, B, C push progress to this branch for conflict testing"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="3. Verify & Delete"
                                            secondary="Once QA confirms stability, open PR to develop and immediately delete the temporary branch"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Paper>

                        {/* Scaffold & Generated Code Section */}
                        <Paper
                            ref={sectionsRef.scaffold}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                9-10. EF Core Power Tools & API Codegen Issues
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                Up to 80% of conflicts in projects come from differences in EF Core Power Tools
                                reverse-engineering output and inconsistent OpenAPI client code generation.
                            </Typography>

                            <Alert severity="warning" sx={{ mb: 3, borderRadius: "10px" }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 700, fontFamily: "'Prompt', sans-serif" }}
                                >
                                    Strict Rules — No Exceptions:
                                </Typography>
                                <Typography variant="body2">
                                    Do NOT run EF Core Power Tools reverse-engineering or API Codegen on your own
                                    without the standardized script. NEVER manually edit auto-generated files!
                                </Typography>
                            </Alert>

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, mb: 1, fontFamily: "'Prompt', sans-serif" }}
                            >
                                Recommended: Use standardized EF Core Power Tools configuration:
                            </Typography>
                            <CodeBlock
                                code={`# EF Core Power Tools Reverse Engineering\n# 1. Right-click on project > EF Core Power Tools > Reverse Engineer\n# 2. Use shared efpt.config.json (committed to repo)\n# 3. Connection: Use shared DEV database\n# 4. Output: Domain/Entities + Infrastructure/Persistence\n\n# Or use the CLI wrapper script:\n./scripts/efpt-reverse-engineer.ps1`}
                            />

                            <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1, opacity: 0.8 }}>
                                * All team members MUST use the same efpt.config.json and shared DEV database. Use
                                `./scripts/efpt-reverse-engineer.ps1` to ensure consistent output across the team.
                            </Typography>
                        </Paper>

                        {/* FAQs Section */}
                        <Paper
                            ref={sectionsRef.faq}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                15. Frequently Asked Questions (FAQ)
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontFamily: "'Prompt', sans-serif",
                                        color: colors.textSecondary,
                                    }}
                                >
                                    Category: General & Branching
                                </Typography>
                                {faqData.general.map((item) => (
                                    <Accordion
                                        key={item.id}
                                        sx={{
                                            bgcolor: colors.background,
                                            color: colors.textPrimary,
                                            border: `1px solid ${colors.border}`,
                                            mb: 1,
                                            "&:before": { display: "none" },
                                            borderRadius: "8px !important",
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: colors.textSecondary }} />}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontFamily: "'Prompt', sans-serif",
                                                    fontSize: "0.95rem",
                                                }}
                                            >
                                                {item.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ borderTop: `1px solid ${colors.border}`, pt: 2 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: colors.textSecondary,
                                                    whiteSpace: "pre-line",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {item.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontFamily: "'Prompt', sans-serif",
                                        color: colors.textSecondary,
                                    }}
                                >
                                    Category: EF Core Power Tools & DbContext
                                </Typography>
                                {faqData.scaffold.map((item) => (
                                    <Accordion
                                        key={item.id}
                                        sx={{
                                            bgcolor: colors.background,
                                            color: colors.textPrimary,
                                            border: `1px solid ${colors.border}`,
                                            mb: 1,
                                            "&:before": { display: "none" },
                                            borderRadius: "8px !important",
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: colors.textSecondary }} />}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontFamily: "'Prompt', sans-serif",
                                                    fontSize: "0.95rem",
                                                }}
                                            >
                                                {item.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ borderTop: `1px solid ${colors.border}`, pt: 2 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: colors.textSecondary,
                                                    whiteSpace: "pre-line",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {item.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontFamily: "'Prompt', sans-serif",
                                        color: colors.textSecondary,
                                    }}
                                >
                                    Category: Release & Deployment
                                </Typography>
                                {faqData.deployment.map((item) => (
                                    <Accordion
                                        key={item.id}
                                        sx={{
                                            bgcolor: colors.background,
                                            color: colors.textPrimary,
                                            border: `1px solid ${colors.border}`,
                                            mb: 1,
                                            "&:before": { display: "none" },
                                            borderRadius: "8px !important",
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: colors.textSecondary }} />}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontFamily: "'Prompt', sans-serif",
                                                    fontSize: "0.95rem",
                                                }}
                                            >
                                                {item.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ borderTop: `1px solid ${colors.border}`, pt: 2 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: colors.textSecondary,
                                                    whiteSpace: "pre-line",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {item.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>

                            <Box sx={{ mb: 1 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontFamily: "'Prompt', sans-serif",
                                        color: colors.textSecondary,
                                    }}
                                >
                                    Category: Troubleshooting
                                </Typography>
                                {faqData.troubleshoot.map((item) => (
                                    <Accordion
                                        key={item.id}
                                        sx={{
                                            bgcolor: colors.background,
                                            color: colors.textPrimary,
                                            border: `1px solid ${colors.border}`,
                                            mb: 1,
                                            "&:before": { display: "none" },
                                            borderRadius: "8px !important",
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: colors.textSecondary }} />}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontFamily: "'Prompt', sans-serif",
                                                    fontSize: "0.95rem",
                                                }}
                                            >
                                                {item.question}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ borderTop: `1px solid ${colors.border}`, pt: 2 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: colors.textSecondary,
                                                    whiteSpace: "pre-line",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {item.answer}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                        </Paper>

                        {/* Quick Reference Section */}
                        <Paper
                            ref={sectionsRef.commands}
                            elevation={0}
                            sx={{
                                p: { xs: 3, md: 4 },
                                mb: 5,
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: colors.border,
                                bgcolor: colors.paperBg,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                }}
                            >
                                16. Quick Reference Git Commands
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                Collection of frequently used and emergency Git commands. Copy and run on your Terminal
                                instantly.
                            </Typography>

                            <Grid container spacing={2}>
                                {[
                                    {
                                        title: "Start a Feature Branch",
                                        cmd: "git checkout develop\ngit pull --ff-only origin develop\ngit checkout -b feature/ABC-123-short-name",
                                    },
                                    {
                                        title: "Sync via Rebase (Solo Branch)",
                                        cmd: "git fetch origin\ngit rebase origin/develop",
                                    },
                                    {
                                        title: "Sync via Merge (Shared Branch)",
                                        cmd: "git fetch origin\ngit merge origin/develop",
                                    },
                                    {
                                        title: "Push to Remote",
                                        cmd: "git push origin feature/ABC-123-short-name",
                                    },
                                    { title: "Force Push after Rebase (Safe)", cmd: "git push --force-with-lease" },
                                    { title: "Stash Work Temporarily", cmd: "git stash\ngit stash pop" },
                                    {
                                        title: "Cherry-pick Specific Commits",
                                        cmd: "git checkout release/target-branch\ngit cherry-pick <commit-hash>",
                                    },
                                    { title: "Stage Specific Lines (Partial Add)", cmd: "git add -p" },
                                ].map((ref) => (
                                    <Grid item xs={12} md={6} key={ref.title}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: "8px",
                                                border: `1px solid ${colors.border}`,
                                                height: "100%",
                                                bgcolor: colors.background,
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ fontWeight: 700, mb: 1, fontFamily: "'Prompt', sans-serif" }}
                                            >
                                                {ref.title}
                                            </Typography>
                                            <CodeBlock code={ref.cmd} />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>

                        {/* Final Summary */}
                        <Box sx={{ textAlign: "center", mt: 6, mb: 4 }}>
                            <Divider sx={{ my: 4 }} />
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    fontFamily: "'Prompt', sans-serif",
                                    color: colors.accent,
                                    mb: 1,
                                }}
                            >
                                🤝 Building Standards Together
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: colors.textSecondary, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
                            >
                                Maintaining code standards is not just about Git tools — it is about discipline and a
                                shared commitment to building software together. Let us reduce merge chaos and build
                                quality code as a team!
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Mobile floating toggle button */}
            {!matchesLg && (
                <Fab
                    color="primary"
                    sx={{ position: "fixed", bottom: 20, right: 20, bgcolor: colors.accent }}
                    onClick={() => {
                        // Open simple list in custom sweetalert
                        Swal.fire({
                            title: "Table of Contents",
                            html: `
                                <div style="text-align: left; font-family: 'Prompt', sans-serif;">
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('summary-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">Summary</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('goals-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">1. Goals & Objectives</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('strategy-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">2. Branch Strategy</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('rules-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">3. Team Rules</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('daily-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">4. Daily Workflows</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('pr-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">5. PR Practice</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('collab-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">6. Cross-Team Collaboration</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('scaffold-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">9-10. EF & API Codegen</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('faq-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">15. FAQ</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('commands-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">16. Quick Commands</button>
                                </div>
                            `,
                            showConfirmButton: false,
                            showCancelButton: true,
                            cancelButtonText: "Close",
                            customClass: {
                                container: "custom-swal-container",
                            },
                        });
                    }}
                >
                    <Icon>menu</Icon>
                </Fab>
            )}

            {/* Invisible Anchors for Scroll Actions */}
            <div id="summary-section" ref={sectionsRef.summary} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="goals-section" ref={sectionsRef.goals} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="strategy-section" ref={sectionsRef.strategy} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="rules-section" ref={sectionsRef.rules} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="daily-section" ref={sectionsRef.daily} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="pr-section" ref={sectionsRef.pr} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="collab-section" ref={sectionsRef.collab} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="scaffold-section" ref={sectionsRef.scaffold} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="faq-section" ref={sectionsRef.faq} style={{ position: "absolute", top: 0, height: 1 }} />
            <div id="commands-section" ref={sectionsRef.commands} style={{ position: "absolute", top: 0, height: 1 }} />
        </Box>
    );
};

export default GitWorkflow;
