import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
                    {copied ? "คัดลอกแล้ว!" : "คัดลอก"}
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
                โครงสร้างและการรวมงาน (Branch Strategy Model)
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
                * แนะนำใช้แนวทาง GitFlow-lite: ห้าม push ตรงเข้า master/develop, แตกงานผ่าน feature/* เสมอ
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
            question: "ทำไมต้องแตก branch จาก develop ล่าสุดทุกครั้ง?",
            answer: "เพราะ develop คือ code base ล่าสุดของทีม ถ้าแตกจาก branch เก่า จะทำให้ branch ของเราขาดการเปลี่ยนแปลงล่าสุด เช่น scaffold, API contract, shared service, config หรือ migration ใหม่ ๆ ผลลัพธ์คือ conflict ตอน merge กลับจะหนักขึ้น",
        },
        {
            id: "faq-2",
            question: "ต้อง pull develop ทุกวันไหม?",
            answer: "แนะนำให้ sync อย่างน้อยวันละครั้ง หรือก่อนเปิด PR เสมอ ถ้างานที่ทำเกี่ยวข้องกับไฟล์ที่คนอื่นแก้บ่อย เช่น DbContext, API generated client, shared DTO, shared component ควร sync บ่อยกว่านั้น",
        },
        {
            id: "faq-3",
            question: "ใช้ rebase หรือ merge ดีกว่ากัน?",
            answer: "ขึ้นอยู่กับสถานการณ์: \n- branch ส่วนตัว (เราทำงานคนเดียว) → rebase เพื่อให้ log สะอาด\n- branch หลายคนใช้ร่วมกัน (มีคนช่วยทำ) → merge ปลอดภัยกว่าเพื่อป้องกันประวัติโค้ดหาย\n- develop/master → ห้ามใช้ rebase หรือ rewrite history เด็ดขาด",
        },
        {
            id: "faq-4",
            question: "ทำไมไม่ให้ push ตรงเข้า develop?",
            answer: "เพราะ develop ควรเป็น branch รวมที่เชื่อถือได้และพร้อมทดสอบ UAT/Staging ถ้าทุกคน push ตรงได้ จะไม่มีจุดตรวจผ่าน Pull Request (Code Review), ไม่มีการทดสอบ Automated Build/Test และทำให้ข้อผิดพลาดหลุดเข้าระบบได้ง่ายขึ้น",
        },
        {
            id: "faq-5",
            question: "ถ้า feature ยังไม่เสร็จ แต่อยากเอา code เข้า develop ได้ไหม?",
            answer: "ทำได้เฉพาะกรณีที่มีระบบ Feature Flag เพื่อปิดฟังก์ชั่นการทำงานใหม่ไม่ให้ผู้ใช้ทั่วไปเห็น หรือโค้ดนั้นไม่มีผลกระทบต่อพฤติกรรมของระบบเดิมเด็ดขาด แต่ถ้าโค้ดทำให้ build พัง หรือทำระบบปัจจุบันรวน ห้าม merge เข้า develop เป็นอันขาด",
        },
    ],
    scaffold: [
        {
            id: "faq-9",
            question: "ไฟล์ EF Scaffold / DbContext / Generated Files ควร commit หรือไม่?",
            answer: "ควร commit หากไฟล์นั้นจำเป็นสำหรับการรันและบิลด์โปรเจกต์ (เช่น Entity classes, DbContext, OpenAPI client) แต่ต้องตกลงกติการ่วมกัน: 1) generate ด้วยคำสั่งมาตรฐานเท่านั้น 2) ใช้เวอร์ชั่นทูลเดียวกัน 3) แหล่งข้อมูล (DB กลาง) เดียวกัน 4) มีเจ้าของ (owner) และห้ามแก้ไขไฟล์ generated ด้วยมือเปล่า",
        },
        {
            id: "faq-10",
            question: "ถ้ามีคน scaffold เข้า develop แล้ว branch เราต้อง update ไหม?",
            answer: "ต้องอัปเดต (sync) ทันที โดยเฉพาะงานของเราอยู่ในส่วนงานหรือ Domain เดียวกัน หากไม่อัปเดต feature branch ของเราจะทำงานอยู่บน DB Model เวอร์ชั่นเก่า และตอนเตรียม merge กลับ develop จะพบ conflict ขนาดใหญ่และแก้ยากมาก",
        },
        {
            id: "faq-11",
            question: "ถ้า scaffold แล้ว conflict บ่อยมาก ควรแก้ไขอย่างไร?",
            answer: "ให้ตรวจสอบ 4 ปัจจัยหลัก:\n1. มีผู้ดูแลรักษาสคริปต์หลัก (scaffold owner) หรือไม่\n2. ทุกคนใช้ command เดียวกันในการรันหรือไม่\n3. ทุกคนรันจาก DEV Database เครื่องกลางร่วมกันหรือไม่\n4. มีทีมงานแอบเข้าไปแก้โค้ดใน generated file ด้วยตนเองหรือไม่ (ห้ามเด็ดขาด)\nถ้าครบแล้วยังเกิดปัญหาบ่อย แนะนำให้ใช้ partial class ในการเพิ่ม custom logic แทนการพิมพ์ทับไฟล์ generated",
        },
    ],
    deployment: [
        {
            id: "faq-6",
            question: "ถ้าต้อง deploy บางงานก่อน (เช่น ปนกันใน develop) ควรเลือกวิธีใด?",
            answer: "ขึ้นอยู่กับความจำเป็น:\n- งานพร้อมเป็นกลุ่ม / รอบ deploy → ใช้ release branch แตกจาก develop\n- ต้องการดึงเฉพาะบาง commit ที่แก้ไขด่วน → ใช้ cherry-pick ไปปล่อย release พิเศษ\n- อยากรวมงานเข้า develop แต่ยังไม่พร้อมเปิดใช้จริง → ใช้ Feature Flag ควบคุม",
        },
        {
            id: "faq-7",
            question: "Cherry-pick มีความปลอดภัยและควรใช้บ่อยแค่ไหน?",
            answer: "ปลอดภัยหากแต่ละ commit แยกเรื่องย่อยชัดเจนและมีขนาดเล็ก ไม่ปลอดภัยหาก commit มัดรวมหลายเรื่องเนื่องจากจะนำสิทธิ์หรือส่วนอื่นที่ระบบยังไม่พร้อมติดไปด้วย และหากต้องใช้ cherry-pick บ่อยครั้งในการ deploy แสดงว่าวินัยการแยก commit หรือวางแผนรอบปล่อยงานมีปัญหา",
        },
        {
            id: "faq-15",
            question: "Integration branch ต่างจาก develop อย่างไร?",
            answer: "develop คือ branch หลักของทีมที่เป็น source of truth ของงานทดสอบปกติ\nintegration/* คือ branch ชั่วคราวสร้างขึ้นเพื่อทดสอบการรวมระบบของหลายทีม (เช่น ทีม A, B, C) ในช่วงเวลาจำกัดเพื่อไม่ให้รบกวน develop และจำเป็นต้องลบทิ้งเมื่อนำขึ้น develop เรียบร้อยแล้ว ห้ามใช้เป็น develop ถาวรอันที่สอง",
        },
    ],
    troubleshoot: [
        {
            id: "faq-18",
            question: "หากเผลอ commit ผิด branch (เช่น นั่งทำบน develop) ต้องทำอย่างไร?",
            answer: "หากยังไม่ได้ push ขึ้น remote server สามารถแก้ไขได้ง่าย:\n1. พิมพ์ `git checkout -b feature/correct-branch` เพื่อย้ายโค้ดทั้งหมดไป branch ใหม่\n2. กลับไป branch เดิมแล้วดึงข้อมูลถอยกลับ (reset)\nหาก push ไปแล้ว ให้แจ้งผู้ดูแลระบบและเพื่อนร่วมทีมก่อนทำการลบหรือ force-push เสมอเพื่อป้องกันโค้ดเพื่อนสูญหาย",
        },
        {
            id: "faq-14",
            question: "ถ้าเกิด conflict ในไฟล์ generated (เช่น DbContext) ควรแก้ด้วยมือไหม?",
            answer: "โดยทั่วไป ไม่ควร เพราะอาจแกะโค้ดไม่สมบูรณ์ ทางออกที่ดีที่สุดคือการอัปเดต schema DB ให้ตรงกับระบบหลักแล้วรันคำสั่ง scaffold ใหม่ผ่านคำสั่งออโต้เพื่อแก้ไขทับโดยตรง",
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
    const navigate = useNavigate();
    const matchesLg = useMediaQuery("(min-width:1025px)");

    // States for Reading Customization
    const [readingTheme, setReadingTheme] = useState<ReadingTheme>("light");
    const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1.0);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState("summary");

    // Checklist state
    const [checklistItems, setChecklistItems] = useState([
        { id: 1, text: "Branch ทำการ Sync (Rebase/Merge) กับ develop ล่าสุดแล้ว", checked: false },
        { id: 2, text: "ทำการรันคำสั่งบิลด์ (dotnet build / npm run build) สำเร็จ ไร้ข้อผิดพลาด", checked: false },
        { id: 3, text: "รันชุดทดสอบ (dotnet test) หรือทดสอบ manual ผ่านเรียบร้อย", checked: false },
        { id: 4, text: "ไม่มีไฟล์ขยะ หรือไฟล์ชั่วคราวที่ไม่ต้องการติดไปใน git status", checked: false },
        { id: 5, text: "ไม่มีไฟล์ configuration ส่วนตัว (local config) หลุดเข้าไป", checked: false },
        { id: 6, text: "หากมีการแก้สคีมา Database ได้แนบไฟล์ DB script มาด้วยแล้ว", checked: false },
        { id: 7, text: "หากมีการรัน scaffold / api-codegen ได้ใช้คำสั่งมาตรฐานและระบุชัดเจน", checked: false },
        { id: 8, text: "มั่นใจว่าไม่มี business logic แอบเขียนลงไปใน generated files", checked: false },
        { id: 9, text: "ได้ทำการอธิบาย Scope, Impact และแจ้งผู้ตรวจสอบ (Reviewer) ชัดเจน", checked: false },
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
                title: "ยอดเยี่ยม!",
                text: "โค้ดของคุณพร้อมสำหรับการ Merge แล้ว! ส่งต่อไปยัง Reviewer ได้เลย",
                confirmButtonColor: "#10B981",
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "ยังไม่ครบถ้วน",
                text: `คุณพึ่งเช็คลิสต์ไปเพียง ${checkedCount}/${checklistItems.length} ข้อ โปรดตรวจสอบโค้ดให้ดีก่อนส่งตรวจสอบ`,
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
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/")}
                        sx={{
                            color: colors.textSecondary,
                            textTransform: "none",
                            mr: 2,
                            fontWeight: 600,
                            fontFamily: "'Prompt', sans-serif",
                            "&:hover": { bgcolor: colors.hoverBg },
                        }}
                    >
                        กลับหน้าแรก
                    </Button>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: "none", sm: "block" } }} />
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
                        placeholder="ค้นหาในแนวทางปฏิบัติ..."
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
                        <Tooltip title="Sepia Mode (ถนอมสายตา)">
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
                                สารบัญนำทาง
                            </Typography>
                            <List dense sx={{ py: 0 }}>
                                {[
                                    { key: "summary", label: "Summary สรุปสั้นๆ", icon: "bolt" },
                                    { key: "goals", label: "1. เป้าหมายแนวทาง", icon: "track_changes" },
                                    { key: "strategy", label: "2. Branch Strategy", icon: "call_split" },
                                    { key: "rules", label: "3. กติกาหลักของทีม", icon: "gavel" },
                                    { key: "daily", label: "4. Daily Workflows", icon: "today" },
                                    { key: "pr", label: "5. Pull Request Rules", icon: "rate_review" },
                                    { key: "collab", label: "6. ร่วมมือระหว่างทีม A/B/C", icon: "groups" },
                                    { key: "scaffold", label: "9-10. EF & API Codegen", icon: "code" },
                                    { key: "faq", label: "15. ตอบคำถาม FAQ", icon: "help_outline" },
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
                                Git Workflow Practice สำหรับทีม Dev
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
                                คู่มือแนวทางการทำงานร่วมกันเพื่อลดปัญหา Merge Conflict, หลีกเลี่ยงงานซ้ำซ้อน และควบคุม
                                Branch สำคัญให้มีความเสถียรและปลอดภัย
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
                                    Summary สรุปสั้นๆ (แนวทางหลัก)
                                </Typography>
                            </Box>

                            <Typography paragraph sx={{ opacity: 0.9 }}>
                                ทีมควรใช้แนวทาง <strong>GitFlow-lite / Trunk-based with develop</strong>{" "}
                                โดยกำหนดบทบาทของ branch ให้ชัดเจน:
                            </Typography>

                            <Box sx={{ pl: 2, borderLeft: "4px solid", borderColor: colors.accent, my: 3 }}>
                                <Grid container spacing={2}>
                                    {[
                                        { branch: "master", desc: "โค้ด Production หรือพร้อมใช้งานจริงทันที" },
                                        {
                                            branch: "develop",
                                            desc: "โค้ดอัปเดตล่าสุดที่ผ่านการ Review PR และบิลด์ทดสอบขั้นต้น",
                                        },
                                        { branch: "feature/*", desc: "branch งานย่อยของแต่ละ Task / Ticket" },
                                        {
                                            branch: "release/*",
                                            desc: "เตรียม Deploy สำหรับการ Stabilization / UAT เฉพาะรอบ",
                                        },
                                        {
                                            branch: "hotfix/*",
                                            desc: "แก้ไขปัญหาด่วนที่สุดจาก Production (แตกจาก master)",
                                        },
                                        {
                                            branch: "integration/*",
                                            desc: "ผสานและทดสอบงานชั่วคราวกรณีมีหลายทีมร่วมกัน (เฉพาะจำเป็น)",
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
                                💡 กติกาสำคัญที่ทุกคนต้องปฏิบัติตามทันที:
                            </Typography>
                            <List sx={{ pl: 2, py: 0, listStyleType: "decimal" }}>
                                {[
                                    "ห้าม push ตรงเข้า master และ develop (ต้องคุ้มครองและทำผ่าน PR เสมอ)",
                                    "แตก branch จาก develop ล่าสุด และคอย sync สม่ำเสมอ",
                                    "ซิงค์ branch ตัวเองกับ develop ล่าสุดทุกครั้ง ก่อนจะกดส่ง Pull Request",
                                    "สร้าง PR ขนาดเล็ก มีโฟกัสชัดเจน ห้ามรวมงาน 3-4 ฟีเจอร์ไว้ใน PR เดียว",
                                    "ไฟล์ generated (เช่น Entity Framework, API Codegen) ห้ามแอบเขียนมือและต้องรันผ่านสคริปต์มาตรฐานที่กำหนด",
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
                                1. เป้าหมายของ Git Workflow
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
                                            ปัญหาที่พบบ่อย (Pain Points)
                                        </Typography>
                                        <List dense sx={{ pl: 2, listStyleType: "disc", py: 0 }}>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                แก้ไขไฟล์เดียวกันทับซ้อนบ่อย
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Feature branch แช่ไว้นานเกินไปทำให้ conflict หนัก
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                ต่างคนต่างรัน scaffold DB และ generate contract ไม่ตรงกัน
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                นำโค้ดที่รันไม่เสร็จหรือพังไปรวมใน develop
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
                                            ผลลัพธ์ที่ทีมต้องการ (Goals)
                                        </Typography>
                                        <List dense sx={{ pl: 2, listStyleType: "disc", py: 0 }}>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                ลดอัตราการเกิด Merge Conflict บนเครื่องลงอย่างมีนัยสำคัญ
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                ทำให้ branch develop พร้อมบิลด์และทดสอบเสมอตลอด 24 ชม.
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                ทำระบบสิทธิการ Deploy ปล่อยบางฟีเจอร์ได้โดยไม่ต้องดึงงานอื่น
                                            </li>
                                            <li style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                                                Onboard นักพัฒนาใหม่เข้าทีมได้รวดเร็วขึ้น
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
                                2. Branch Strategy ที่แนะนำ
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                การสลับการทำงานร่วมกันระหว่างทีมย่อยด้วยสถาปัตยกรรม Branching ที่มีระเบียบ
                                จะป้องกันไม่ให้เราเผลอ push โค้ดทับของคนอื่นโดยไม่ตั้งใจ
                            </Typography>

                            {/* Dynamic visual graph */}
                            <GitVisualizer activeTheme={readingTheme} />

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, mt: 3, mb: 2, fontFamily: "'Prompt', sans-serif" }}
                            >
                                รายละเอียดและสิทธิ์การเข้าถึงแต่ละ Branch
                            </Typography>

                            <Box sx={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                                    <thead>
                                        <tr style={{ borderBottom: `2px solid ${colors.border}`, textAlign: "left" }}>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                Branch
                                            </th>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                การใช้งาน
                                            </th>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                ผู้มีสิทธิ์รวมงาน
                                            </th>
                                            <th style={{ padding: "12px 8px", fontFamily: "'Prompt', sans-serif" }}>
                                                หมายเหตุ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            {
                                                name: "master",
                                                use: "Production Code ล่าสุด",
                                                role: "Lead / Maintainer เท่านั้น",
                                                note: "ห้าม push ตรง 100%",
                                            },
                                            {
                                                name: "develop",
                                                use: "ศูนย์รวมงานหลักของทีม",
                                                role: "ทีมงานผ่าน PR Approval",
                                                note: "ต้องผ่าน Automated Test",
                                            },
                                            {
                                                name: "feature/*",
                                                use: "ฟีเจอร์ย่อยของนักพัฒนา",
                                                role: "เจ้าของ Task",
                                                note: "อายุสั้นที่สุด 1-3 วัน",
                                            },
                                            {
                                                name: "release/*",
                                                use: "เตรียมทดสอบ UAT / ปล่อยรอบ",
                                                role: "Lead / Release Owner",
                                                note: "ใช้เคลียร์บั๊กช่วงสุดท้าย",
                                            },
                                            {
                                                name: "hotfix/*",
                                                use: "แก้บั๊กด่วนบน Production",
                                                role: "Hotfix Assignee",
                                                note: "แตกด่วนมาจาก master",
                                            },
                                            {
                                                name: "integration/*",
                                                use: "รวมงานชั่วคราวข้ามทีม",
                                                role: "Integration Owner",
                                                note: "ลบทิ้งเมื่อนำเข้า develop สำเร็จ",
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
                                3. กติกาหลักของทีม (Team Agreements)
                            </Typography>

                            <Grid container spacing={3}>
                                {[
                                    {
                                        title: "3.1 ห้าม push ตรงเข้า master / develop",
                                        desc: "ห้ามเด็ดขาด! โค้ดทั้งหมดต้องผ่าน Pull Request เพื่อให้ระบบทำการบิลด์ทดสอบ (CI/CD) และผ่านตาผู้รีวิวอย่างน้อย 1 คน จะได้มั่นใจว่าไม่มีใครทำโปรเจกต์พังโดยไม่ได้เจตนา",
                                        icon: "block",
                                    },
                                    {
                                        title: "3.2 Feature branch ต้องแตกจาก develop ล่าสุด",
                                        desc: "ก่อนเริ่มต้นทำ Task ใหม่ ให้พิมพ์คำสั่งเพื่อดึงโค้ดเวอร์ชั่นอัปเดตที่สุดลงเครื่องก่อนเสมอ การเริ่มจากหลังสุดจะช่วยลดปัญหาบิลด์เอเรอร์และ Conflict คีย์สคีมาฐานข้อมูล",
                                        icon: "call_split",
                                    },
                                    {
                                        title: "3.3 Branch ต้องอายุสั้น (Short-lived Branches)",
                                        desc: "หลีกเลี่ยงการกอดโค้ดไว้บนเครื่องนาน 2 สัปดาห์ การแตกงานเป็นชิ้นย่อยและทยอยส่ง PR ทุก 1-3 วันจะทำให้เพื่อนในทีมอัปเดตงานต่อได้ง่าย และ conflict น้อยลงเป็น 10 เท่า",
                                        icon: "hourglass_empty",
                                    },
                                    {
                                        title: "3.4 Commit ต้องแยกเรื่อง (Micro-commits)",
                                        desc: "กรุณาจัดระเบียบ Commit ข้อความให้มีเพียงเรื่องเดียว เช่น 'feat(api): add customer endpoint' หลีกเลี่ยงการมัดรวม 'fix all / wip / update' เพราะเวลาถอยงานจะยากมาก",
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
                                4. Workflow การทำงานประจำวัน
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                แนะนำทำตามสเต็ปการรันคำสั่ง Git Command ไลน์มาตรฐานตามลูปประจำวันด้านล่างนี้
                            </Typography>

                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mt: 2, fontFamily: "'Prompt', sans-serif" }}
                            >
                                1. เมื่อเริ่มฟีเจอร์ใหม่:
                            </Typography>
                            <CodeBlock
                                code={`git checkout develop\ngit pull --ff-only origin develop\ngit checkout -b feature/HCM-120-add-leave-type`}
                            />

                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mt: 3, fontFamily: "'Prompt', sans-serif" }}
                            >
                                2. การคอมมิตงานย่อยบนเครื่องส่วนตัว:
                            </Typography>
                            <CodeBlock
                                code={`git status\ngit add src/LeaveService.cs\ngit commit -m "feat(leave): add leave type validation"`}
                            />

                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 700, mt: 3, fontFamily: "'Prompt', sans-serif" }}
                            >
                                3. การซิงค์ดึงข้อมูลอัปเดตล่าสุดจาก develop:
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                                * แนะนำใช้ rebase หากเป็น branch ส่วนตัว หรือใช้ merge ในกรณีมีผู้อื่นช่วยพัฒนาร่วมกัน
                            </Typography>
                            <CodeBlock
                                code={`# ซิงค์แบบ Rebase (สำหรับ Branch ส่วนตัว)\ngit fetch origin\ngit rebase origin/develop\n\n# ซิงค์แบบ Merge (กรณี Branch มีเพื่อนทำด้วย)\ngit fetch origin\ngit merge origin/develop`}
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
                                คุณสามารถตรวจสอบโค้ดของคุณก่อนนำเข้า merge สู่ระดับความเสถียรหลักได้ง่ายๆ
                                ด้วยฟังก์ชันแบบโต้ตอบ <strong>Interactive PR Checklist</strong> ด้านล่างนี้:
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
                                        📝 เช็คลิสต์ความพร้อมก่อนส่ง PR
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", color: colors.accent }}>
                                        ความพร้อม {checklistProgress}%
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
                                        ยืนยันความพร้อมบิลด์
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
                                6. การทำงานร่วมกันระหว่างทีม A/B/C
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                เมื่อมีทีมลูกพัฒนาขนานกันหลายฟีเจอร์ แนะนำใช้โครงสร้าง <strong>integration/*</strong>{" "}
                                ชั่วคราวในการรวมงานก่อนยัดเข้าสู่ develop เพื่อป้องกันการพังของระบบหลัก
                            </Typography>

                            <Box sx={{ borderLeft: "4px solid #10B981", pl: 3, my: 3 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 700, fontFamily: "'Prompt', sans-serif" }}
                                >
                                    ✨ ลำดับขั้นการรันระบบ Integration:
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary="1. แตกกิ่งก้านหลัก"
                                            secondary="สร้าง branch 'integration/payment-revamp' ตั้งต้นจากจุด develop ล่าสุด"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="2. เปิด PR สู่ Integration"
                                            secondary="ทุกทีมย่อย A, B, C ส่งความคืบหน้าเข้าสู่กิ่งหลักนี้เพื่อทดสอบหา Conflict"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="3. รันเช็ค / ลบทิ้ง"
                                            secondary="เมื่อ QA ยืนยันว่างานรวมกันเสถียร จึงค่อยเปิด PR สู่ develop แล้วทำการลบกิ่งชั่วคราวทิ้งทันที"
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
                                9-10. ปัญหา EF Scaffold & API Codegen
                            </Typography>
                            <Typography paragraph sx={{ color: colors.textSecondary }}>
                                ประเด็นการเกิด conflict ที่พบสูงถึง 80% ในโปรเจกต์มักมาจากความแตกต่างในการ Scaffold
                                Database และคำสั่งเรียก OpenAPI Client เจนเนอเรทโค้ดต่างกัน
                            </Typography>

                            <Alert severity="warning" sx={{ mb: 3, borderRadius: "10px" }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 700, fontFamily: "'Prompt', sans-serif" }}
                                >
                                    กติกาเหล็กห้ามหลีกเลี่ยง:
                                </Typography>
                                <Typography variant="body2">
                                    ห้ามทำ Scaffold DB หรือรัน Codegen เผื่อคอมมิตเองตามใจชอบโดยไม่มีคำสั่งสคริปต์กลาง
                                    และห้ามแก้ไขไฟล์ออโต้เจนเนอเรทด้วยการคีย์มือเปล่าเด็ดขาด!
                                </Typography>
                            </Alert>

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, mb: 1, fontFamily: "'Prompt', sans-serif" }}
                            >
                                แนะนำเก็บชุดคำสั่งไว้ใน PowerShell Script:
                            </Typography>
                            <CodeBlock
                                code={`dotnet ef dbcontext scaffold \\\n  "Name=ConnectionStrings:DefaultConnection" \\\n  Microsoft.EntityFrameworkCore.SqlServer \\\n  --context AppDbContext \\\n  --context-dir Infrastructure/Persistence \\\n  --output-dir Domain/Entities \\\n  --force \\\n  --no-onconfiguring`}
                            />

                            <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1, opacity: 0.8 }}>
                                * ทุกคนในทีมต้องสั่งรันสคริปต์นี้เหมือนกันหมด (เช่น `./scripts/scaffold-db.ps1`)
                                เพื่อลดความเหลื่อมล้ำของเวอร์ชั่นทูลส์
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
                                15. FAQ ตอบคำถามข้อสงสัย (20 คำถามยอดนิยม)
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
                                    หมวดหมู่: ทั่วไป & Branching
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
                                    หมวดหมู่: Scaffold & DbContext
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
                                    หมวดหมู่: การปล่อยตัวงาน & Deployment
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
                                    หมวดหมู่: แก้ไขปัญหาเบื้องต้น (Troubleshooting)
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
                                รวมชุดคำสั่งฉุกเฉินและคำสั่งที่ใช้งานบ่อย คัดลอกไปรันบน Terminal ได้ทันที
                            </Typography>

                            <Grid container spacing={2}>
                                {[
                                    {
                                        title: "เริ่มต้นทำ Feature Branch",
                                        cmd: "git checkout develop\ngit pull --ff-only origin develop\ngit checkout -b feature/ABC-123-short-name",
                                    },
                                    {
                                        title: "ซิงค์ดึงข้อมูลแบบ Rebase (Branch เดี่ยว)",
                                        cmd: "git fetch origin\ngit rebase origin/develop",
                                    },
                                    {
                                        title: "ซิงค์ดึงข้อมูลแบบ Merge (Branch กลุ่ม)",
                                        cmd: "git fetch origin\ngit merge origin/develop",
                                    },
                                    {
                                        title: "อัปโหลดขึ้นเซิร์ฟเวอร์หลัก",
                                        cmd: "git push origin feature/ABC-123-short-name",
                                    },
                                    { title: "อัปโหลดทับหลัง Rebase (ปลอดภัย)", cmd: "git push --force-with-lease" },
                                    { title: "เก็บพักงานด่วนชั่วคราว", cmd: "git stash\ngit stash pop" },
                                    {
                                        title: "เลือกดึงเฉพาะบาง Commit มาใช้",
                                        cmd: "git checkout release/target-branch\ngit cherry-pick <commit-hash>",
                                    },
                                    { title: "เลือก Add เฉพาะบางบรรทัด", cmd: "git add -p" },
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
                                🤝 ร่วมสร้างมาตรฐานให้ทีม Dev
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: colors.textSecondary, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
                            >
                                การรักษามาตรฐานโค้ดไม่ใช่เรื่องของทูลส์ Git เท่านั้น
                                แต่คือวินัยและสัญญาร่วมใจในการพัฒนาระบบร่วมกัน มาร่วมสร้างและลดความวุ่นวายตอน merge
                                งานกันเถอะ!
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
                            title: "สารบัญนำทาง",
                            html: `
                                <div style="text-align: left; font-family: 'Prompt', sans-serif;">
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('summary-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">Summary สรุปสั้นๆ</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('goals-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">1. เป้าหมายแนวทาง</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('strategy-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">2. Branch Strategy</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('rules-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">3. กติกาหลักของทีม</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('daily-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">4. Daily Workflows</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('pr-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">5. PR Practice</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('collab-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">6. ร่วมมือระหว่างทีม</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('scaffold-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">9-10. EF & API Codegen</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('faq-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">15. FAQ</button>
                                    <button class="swal2-confirm swal2-styled" onclick="window.scrollTo(0, document.getElementById('commands-section').offsetTop - 120); Swal.close();" style="width: 100%; margin: 4px 0; background-color: ${colors.accent};">16. Quick Commands</button>
                                </div>
                            `,
                            showConfirmButton: false,
                            showCancelButton: true,
                            cancelButtonText: "ปิด",
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
