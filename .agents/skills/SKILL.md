# 📘 SKILL — แนวทางการพัฒนา Siam Smile React TypeScript Template

> เอกสารนี้สรุปแนวทางการออกแบบ โครงสร้าง การตั้งชื่อ การเชื่อมต่อ API และแนวปฏิบัติ Modern Web
> อ้างอิงจาก **Siam Smile React TypeScript Template 2023** (v1.1) ใช้กับโปรเจกต์ `pa-student-card` และโปรเจกต์อื่นๆ ที่ใช้ template เดียวกัน

---

## สารบัญ

- [1. Technology Stack](#1-technology-stack)
- [2. โครงสร้างโปรเจกต์](#2-โครงสร้างโปรเจกต์-project-structure)
- [3. แนวทางการออกแบบ](#3-แนวทางการออกแบบ-design-patterns)
- [4. การตั้งชื่อ](#4-การตั้งชื่อ-naming-conventions)
- [5. การเชื่อมต่อ API](#5-การเชื่อมต่อ-api-api-connection-patterns)
- [6. Component Patterns](#6-component-patterns)
- [7. การจัดการ State](#7-การจัดการ-state-state-management)
- [8. Authentication & Authorization](#8-authentication--authorization)
- [9. Styling & Theme](#9-styling--theme)
- [10. Modern Web Best Practices](#10-modern-web-best-practices)
- [11. Performance & Security](#11-performance--security)
- [12. คำสั่งที่ใช้บ่อย](#12-คำสั่งที่ใช้บ่อย)

---

## 1. Technology Stack

| หมวด | เทคโนโลยี | เวอร์ชัน |
|------|-----------|---------|
| Core Framework | React + Vite + TypeScript | 18 / 4 / 5 |
| UI Framework | Material UI (MUI) | v5 |
| Form Management | Formik + Zod + zod-formik-adapter | — |
| State (UI) | Redux Toolkit + Redux Persist | — |
| State (Server) | TanStack React Query v4 | — |
| HTTP Client | Axios | — |
| Auth / SSO | oidc-client-ts (OpenID Connect) | — |
| Routing | React Router Dom v6 | — |
| Alerts | SweetAlert2 | — |
| Date | Day.js + Buddhist Era | — |
| API Codegen | NSwag (Swagger → TypeScript) | — |
| Font | Sarabun (Google Fonts) | — |

---

## 2. โครงสร้างโปรเจกต์ (Project Structure)

```text
src/
├── App.tsx                  # Route config: รวม AuthRoutes + Routes → createBrowserRouter
├── AppRoot.tsx               # Root component: Auth → Redux → ReactQuery → MUI Theme Providers
├── Callback.tsx              # OIDC signin/silent callback handler
├── Const.ts                  # ค่าคงที่จาก window.__CONST__ENV__ (API URLs, SSO config)
├── main.tsx                  # React entrypoint
├── index.css                 # Global CSS
│
├── redux/                    # Redux Toolkit Store
│   ├── store.ts              # configureStore + redux-persist
│   ├── rootReducer.ts        # combineReducers
│   ├── hook.ts               # useAppDispatch, useAppSelector (typed hooks)
│   └── ReduxProvider.tsx     # Provider + PersistGate wrapper
│
└── app/
    ├── layout/               # App Shell: Sidebar, TopBar, Theme
    │   ├── Layout.tsx         # Layout หลัก: Sidebar + AppBar + Outlet + permission guard
    │   ├── layoutSlice.ts     # Redux slice: drawerOpen, darkMode, currentTitle
    │   ├── theme.ts           # MUI createTheme + custom palette
    │   ├── theme.d.ts         # Type augmentation สำหรับ palette สี custom
    │   ├── menuApi.ts         # React Query hooks: เมนูจาก API ภายนอก
    │   └── components/        # TitleAppBar, UserMenu, MenuItem, etc.
    │
    ├── modules/
    │   ├── _auth/             # 🔐 Authentication Module
    │   │   ├── auth.ts         # AuthContext, useAuth hook, checkPermissions
    │   │   ├── auth.d.ts       # Types: AuthContextType, CustomClaims
    │   │   ├── authRedirect.ts # Guard ป้องกัน redirect ซ้ำ
    │   │   ├── components/
    │   │   │   └── AuthProvider.tsx  # OIDC lifecycle, axios interceptor, demo mode
    │   │   └── pages/
    │   │       ├── PageWrapper.tsx    # Container มาตรฐาน: title + divider + back link
    │   │       ├── NoticePage.tsx     # Error/notice display
    │   │       └── SigninCallback.tsx # Callback handler
    │   │
    │   └── _common/           # 🧰 Shared Utilities & Components
    │       ├── clientHelpers.ts       # Axios helpers: handleSuccess/handleError, download
    │       ├── commonFunctions.ts     # useWidth, encodeURLWithParams, formatters
    │       ├── commonValidators.ts    # validateThaiCitizenID, validatePhoneNumber
    │       ├── dayjsHelpers.ts        # Date helpers: Buddhist Era, C# date conversion
    │       ├── zodHelpers.ts          # Zod helpers: zodInitLazy, Thai ID/Phone validators
    │       ├── sweetAlert.ts          # swalInfo, swalWarning, swalConfirm, swalError, swalSuccess
    │       ├── canvasFontLoader.ts    # Canvas font loader (iOS Safari fix)
    │       ├── types.ts               # ServiceResponse<T>, PaginationResultDto
    │       └── components/
    │           ├── CustomFormik/      # 22 Formik wrapper components
    │           ├── DataTable/         # StandardDataTable + column helpers
    │           ├── MobileFooter.tsx   # Footer สำหรับ mobile view
    │           └── LoadingPlaceHolder.tsx
    │
    ├── pages/                 # 📄 Page Components (1 page = 1 route)
    │   ├── Home.tsx
    │   ├── ElectronicCard.tsx
    │   ├── StudentSearch.tsx
    │   └── StudentCard.tsx
    │
    └── routes/                # 🛣️ Route Configuration
        ├── AuthRoutes.tsx      # Public/auth routes (ไม่ต้อง login)
        ├── Routes.tsx          # Authenticated routes (ต้อง login + อยู่ใน Layout)
        └── ASideMenuList.tsx   # Sidebar menu definition
```

### หลักการจัดโครงสร้าง

- **`pages/`** — Page component เดียวต่อ 1 route (ไม่มี business logic ซับซ้อน)
- **`modules/_common/`** — Utility/Helper/Component ที่ใช้ร่วมกันทั้งระบบ
- **`modules/_auth/`** — เฉพาะ authentication logic
- **`modules/<feature>/`** — เมื่อมี feature ใหม่ ให้สร้าง module แยก (เช่น `modules/student/`)
- **`layout/`** — App shell (sidebar, topbar, theme, Redux UI state)
- **`routes/`** — Route config แยกเป็น public routes (`AuthRoutes`) vs protected routes (`Routes`)
- **`redux/`** — Redux store setup ส่วนกลาง (ใช้สำหรับ UI state เท่านั้น)

---

## 3. แนวทางการออกแบบ (Design Patterns)

### 3.1 Route Definition

Routes ใช้ type `RouteMapType` ที่ extend จาก React Router:

```typescript
// AuthRoutes.tsx — Public routes (ไม่ต้อง login, ไม่มี Layout)
export const AuthRoutes: RouteMapType[] = [
    { path: "/not-found", element: <NoticePage />, title: "Not Found" },
    { path: "/student/search", element: <StudentSearch />, title: "ค้นหาบัตร" },
    { path: "/student/card/:citizenId", element: <StudentCard />, title: "บัตรประกัน" },
];

// Routes.tsx — Protected routes (ต้อง login, มี Layout wrap)
export const Routes: RouteMapType[] = [
    {
        path: "/electronic-card",
        element: <ElectronicCard />,
        title: "บัตรประกันอิเล็กทรอนิกส์",
        permissions: [PermissionList.some_permission],
        condition: "AND",
    },
];
```

การรวม routes ใน `App.tsx`:

```typescript
const CombineRouteConfig: RouteMapType[] = [
    ...AuthRoutes,                          // Public routes (top-level)
    {
        path: "/",
        element: <Layout />,                // Protected routes (wrapped with Layout)
        children: [
            { index: true, element: <Home /> },
            ...Routes,
        ],
    },
    { path: "*", element: <Navigate to="/not-found" /> },
];
```

### 3.2 Page Wrapper Pattern

ทุกหน้าที่อยู่ใน Layout ควรใช้ `PageWrapper`:

```tsx
const SomePage = () => (
    <PageWrapper title="ชื่อหน้า">
        {/* เนื้อหาของหน้า */}
    </PageWrapper>
);
```

`PageWrapper` จะ render: title, divider, ปุ่มย้อนกลับ (ถ้าเป็น nested route), และ children ใน MUI Paper

### 3.3 Provider Chain

`AppRoot.tsx` เรียง Provider ตามลำดับ:

```
AuthProvider → ReduxProvider → ReactQueryProvider → MUI ThemeProvider → App
```

---

## 4. การตั้งชื่อ (Naming Conventions)

### 4.1 ไฟล์

| ประเภท | รูปแบบ | ตัวอย่าง |
|--------|--------|---------|
| Component | `PascalCase.tsx` | `FormikTextField.tsx`, `StudentSearch.tsx` |
| Utility/Helper | `camelCase.ts` | `clientHelpers.ts`, `zodHelpers.ts` |
| Type Declaration | `*.d.ts` | `auth.d.ts`, `theme.d.ts` |
| Redux Slice | `camelCase.ts` | `layoutSlice.ts` |
| Index (barrel) | `index.ts` | ทุก directory ควรมี `index.ts` |

### 4.2 Component & Function

| ประเภท | รูปแบบ | ตัวอย่าง |
|--------|--------|---------|
| React Component | `PascalCase` | `StudentSearch`, `CardPreview` |
| React Hook | `use` prefix | `useAuth`, `useAppDispatch`, `useWidth` |
| Event Handler | `handle` prefix | `handleSearch`, `handleDownloadCard` |
| API Hook | `useGet/usePost/useUpdate` | `useGetQueueCountByUserId` |
| Alert Helper | `swal` prefix | `swalError`, `swalConfirm` |
| Validator | `validate` prefix | `validateThaiCitizenID` |

### 4.3 ตัวแปร

| ประเภท | รูปแบบ | ตัวอย่าง |
|--------|--------|---------|
| State | `camelCase` | `foundStudent`, `hasSearched` |
| Boolean State | `is/has/should` prefix | `isAuthenticated`, `hasSearched` |
| Constants | `UPPER_SNAKE_CASE` | `API_URL`, `VITE_BASE_URL` |
| Enum | `PascalCase` | `PermissionList` |

---

## 5. การเชื่อมต่อ API (API Connection Patterns)

### 5.1 สถาปัตยกรรมภาพรวม

```
┌─────────────────┐    ┌────────────────┐    ┌──────────────┐
│  React Component│───▶│  React Query   │───▶│    Axios      │
│  (useQuery)     │    │  (Cache/Retry) │    │  (Interceptor)│
└─────────────────┘    └────────────────┘    └──────┬───────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │  Backend API │
                                              │  (REST)      │
                                              └──────────────┘
```

### 5.2 Runtime Configuration (ไม่ใช่ Build-time)

โปรเจกต์ใช้ **runtime config** เพื่อให้ build เดียวใช้ได้ทุก environment:

1. `vite.config.ts` สร้างไฟล์ `public/configuration.js` ที่เขียน `VITE_*` env vars ลง `window.__CONST__ENV__`
2. `Const.ts` อ่านค่าจาก `window.__CONST__ENV__`
3. Deploy แต่ละ environment แค่เปลี่ยนไฟล์ config

```typescript
// Const.ts
const { VITE_API_URL, VITE_APIGW_BASEURL, ... } = window.__CONST__ENV__;
export const API_URL = VITE_API_URL;
export const APIGW_URL = VITE_APIGW_BASEURL;
```

### 5.3 Standard API Response Type

ทุก API ตอบกลับในรูปแบบ `ServiceResponse<T>`:

```typescript
export type ServiceResponse<T> = {
    data?: T;
    isSuccess?: boolean;
    message?: string;
    code?: number;
    exceptionMessage?: string;
    serverDateTime?: string;
};

export type ServiceResponsePagination<T> = ServiceResponse<T> & PaginationResultDto;
```

### 5.4 API Service Pattern (แนะนำ)

สร้างไฟล์ API service แยกต่อ module:

```typescript
// modules/student/studentApi.ts
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { API_URL } from "../../../Const";
import { ServiceResponse, ServiceResponsePagination } from "../_common/types";

// 1. กำหนด Types
interface StudentDto {
    id: number;
    firstName: string;
    lastName: string;
    citizenId: string;
}

interface SearchStudentRequest {
    keyword?: string;
    page?: number;
    recordsPerPage?: number;
}

// 2. สร้าง API Function
const searchStudents = async (params: SearchStudentRequest) => {
    const response = await axios.get<ServiceResponsePagination<StudentDto[]>>(
        `${API_URL}/api/students/search`,
        { params }
    );
    return response.data;
};

const getStudentById = async (id: number) => {
    const response = await axios.get<ServiceResponse<StudentDto>>(
        `${API_URL}/api/students/${id}`
    );
    return response.data;
};

const createStudent = async (data: Partial<StudentDto>) => {
    const response = await axios.post<ServiceResponse<StudentDto>>(
        `${API_URL}/api/students`,
        data
    );
    return response.data;
};

// 3. สร้าง React Query Hooks
export const useSearchStudents = (params: SearchStudentRequest) => {
    return useQuery(
        ["students", "search", params],
        () => searchStudents(params),
        { enabled: !!params.keyword }
    );
};

export const useGetStudentById = (id: number) => {
    return useQuery(
        ["students", "detail", id],
        () => getStudentById(id),
        { enabled: id > 0 }
    );
};

export const useCreateStudent = () => {
    return useMutation(createStudent);
};
```

### 5.5 Error Handling Pattern

```typescript
import { clientHelpers } from "../_common/clientHelpers";
import { swalError, swalSuccess } from "../_common/sweetAlert";

// ใน Component
const { data, isLoading, error } = useSearchStudents(params);

// จัดการ response
useEffect(() => {
    if (data) {
        clientHelpers.reactQuery.response.handleSuccess(
            (response) => {
                // ✅ สำเร็จ
                setStudents(response.data);
            },
            (errorMsg) => {
                // ❌ isSuccess = false
                swalError("เกิดข้อผิดพลาด", errorMsg);
            },
            data
        );
    }
}, [data]);

// จัดการ error (network/server error)
useEffect(() => {
    if (error) {
        swalError("ไม่สามารถเชื่อมต่อ API ได้", (error as Error).message);
    }
}, [error]);
```

### 5.6 Token Injection (อัตโนมัติ)

`AuthProvider.tsx` ตั้ง axios interceptor ให้อัตโนมัติ:

```typescript
axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.access_token}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
});
```

> ⚠️ ไม่ต้องเพิ่ม Authorization header เอง — interceptor จัดการให้แล้ว

### 5.7 NSwag API Codegen

สำหรับ API ที่มี Swagger/OpenAPI spec:

```bash
# 1. ตั้งค่า VITE_API_URL ใน .env ให้ชี้ไปที่ API server
# 2. รัน codegen
npm run codegen

# 3. ไฟล์ client จะถูกสร้างที่ src/app/api/<hostname>.api.ts
```

---

## 6. Component Patterns

### 6.1 CustomFormik Components (22 ตัว)

ทุก form ควรใช้ Formik wrapper components จาก `_common/components/CustomFormik/`:

```tsx
import { FormikTextField, FormikDropdown, FormikDatePicker } from "../modules/_common/components/CustomFormik";

const MyForm = () => {
    const formik = useFormik({
        initialValues: { name: "", type: "", date: null },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: (values) => { /* ... */ },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormikTextField name="name" label="ชื่อ" formik={formik} />
            <FormikDropdown name="type" label="ประเภท" formik={formik} options={options} />
            <FormikDatePicker name="date" label="วันที่" formik={formik} />
        </form>
    );
};
```

**Components ที่มี:**
`FormikTextField`, `FormikTextNumber`, `FormikTextMask`, `FormikTextMaskCardId`, `FormikTextMaskPhone`, `FormikDropdown`, `FormikDropdownMultiple`, `FormikAutocomplete`, `FormikAutocompleteApi`, `FormikAutocompleteMultiple`, `FormikCheckbox`, `FormikCheckboxGroup`, `FormikRadioGroup`, `FormikDateField`, `FormikDatePicker`, `FormikDateTimePicker`, `FormikTimePicker`, `FormikMobileTimePicker`, `FormikFileUploader`, `FormikRating`, `FormikSlider`, `FormikSwitch`

### 6.2 Zod Validation

```typescript
import { z } from "zod";
import { zodTypes } from "../modules/_common/zodHelpers";

const studentSchema = z.object({
    firstName: z.string().min(1, "กรุณากรอกชื่อ"),
    lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
    citizenId: zodTypes.string.isThaiCitizenID(),
    phoneNumber: zodTypes.string.isPhoneNumber(),
    birthDate: zodTypes.dayjs("กรุณาระบุวันเกิด"),
    schoolId: zodTypes.number.supportDropdown(),
});

// ใช้กับ Formik
const { initialValues, validationSchema } = zodTypes.helpers.zodInitLazy(
    studentSchema,
    { firstName: "", lastName: "", citizenId: "", phoneNumber: "", birthDate: null, schoolId: 0 }
);
```

### 6.3 StandardDataTable

```tsx
import StandardDataTable from "../modules/_common/components/DataTable/StandardDataTable";
import { ColumnDateTime, ColumnIsActive } from "../modules/_common/components/DataTable";

const columns = [
    { name: "firstName", label: "ชื่อ" },
    { name: "lastName", label: "นามสกุล" },
    ColumnDateTime({ name: "createdAt", label: "วันที่สร้าง" }),
    ColumnIsActive({ name: "isActive", label: "สถานะ" }),
];

<StandardDataTable
    title="รายชื่อนักเรียน"
    data={students}
    columns={columns}
    totalAmountRecords={pagination.totalAmountRecords}
    currentPage={pagination.currentPage}
    recordsPerPage={pagination.recordsPerPage}
    onChangePage={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
    onChangeRowsPerPage={(rows) => setPagination(prev => ({ ...prev, recordsPerPage: rows }))}
/>
```

### 6.4 SweetAlert Patterns

```typescript
import { swalConfirm, swalSuccess, swalError, swalWarning, swalInfo } from "../modules/_common/sweetAlert";

// Confirm dialog
swalConfirm("ยืนยันการลบ", "ต้องการลบข้อมูลนี้หรือไม่?", async () => {
    await deleteStudent(id);
    swalSuccess("สำเร็จ", "ลบข้อมูลเรียบร้อยแล้ว");
});

// Error alert
swalError("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้");

// Warning
swalWarning("คำเตือน", "ข้อมูลจะถูกเปลี่ยนแปลง");
```

---

## 7. การจัดการ State (State Management)

### 7.1 แนวทางการเลือกใช้

```
┌─────────────────────┐
│  UI State เท่านั้น   │ → Redux Toolkit + Redux Persist
│  (drawer, darkMode) │   (เก็บลง localStorage อัตโนมัติ)
├─────────────────────┤
│  Server State       │ → React Query (TanStack Query)
│  (API data, cache)  │   (auto-refetch, stale-while-revalidate)
├─────────────────────┤
│  Form State         │ → Formik + Zod
│  (inputs, errors)   │   (validation, dirty tracking)
├─────────────────────┤
│  Local/Page State   │ → useState / useReducer
│  (modal open, etc.) │
└─────────────────────┘
```

### 7.2 Redux Hooks

```typescript
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setDrawerOpen, setCurrentTitle } from "../layout/layoutSlice";

const dispatch = useAppDispatch();
const drawerOpen = useAppSelector((state) => state.layout.drawerOpen);

dispatch(setCurrentTitle("หน้าแรก"));
dispatch(setDrawerOpen(false));
```

---

## 8. Authentication & Authorization

### 8.1 Flow

```
User เข้าเว็บ → AuthProvider ตรวจสอบ
    ├── มี token → ตั้ง axios interceptor → แสดงหน้า
    ├── ไม่มี token → signinSilent() → signinRedirect()
    └── Public route (/student/*) → ข้ามการ login
```

### 8.2 การใช้งาน useAuth

```typescript
import { useAuth } from "../modules/_auth";

const MyComponent = () => {
    const { isAuthenticated, user, permissions, roles } = useAuth();

    if (!isAuthenticated) return <div>กรุณาเข้าสู่ระบบ</div>;

    return <div>ยินดีต้อนรับ {user?.profile?.name}</div>;
};
```

### 8.3 Permission-based Route

```typescript
// Routes.tsx
{
    path: "/admin/settings",
    element: <SettingsPage />,
    title: "ตั้งค่าระบบ",
    permissions: [PermissionList.admin_access, PermissionList.settings_manage],
    condition: "AND",  // ต้องมีทุก permission | "OR" = มีอย่างน้อย 1
}
```

### 8.4 Demo Mode

ระบบรองรับ demo mode สำหรับ testing:
- Deploy บน GitHub Pages → เปิด demo อัตโนมัติ
- เพิ่ม `?demo=true` ที่ URL → ใช้ mock credentials

---

## 9. Styling & Theme

### 9.1 MUI Theme

theme หลักอยู่ที่ `src/app/layout/theme.ts`:

```typescript
const defaultTheme = createTheme({
    palette: {
        primary:   { main: "#007AC1" },  // Siam Smile Blue
        secondary: { main: "#01579B" },  // Dark Blue
        submit:    { main: "#388E3C" },  // Green (custom)
        unapprove: { main: "#BF360C" },  // Red (custom)
        edit:      { main: "#fbc02d" },  // Yellow (custom)
    },
    typography: {
        fontFamily: ["Sarabun", "sans-serif"].join(","),
    },
});
```

### 9.2 แนวทางการ Styling

| ลำดับ | วิธี | เมื่อไหร่ |
|-------|------|----------|
| 1 | MUI `sx` prop | สำหรับ component-level styling ทั่วไป |
| 2 | MUI `styled()` API | สำหรับ reusable styled components |
| 3 | MUI Theme overrides | สำหรับ global component defaults |
| 4 | `index.css` | สำหรับ global base styles เท่านั้น |

```tsx
// ✅ ใช้ sx prop
<Box sx={{ display: "flex", gap: 2, p: 1.5 }}>

// ✅ ใช้ theme colors
<Button color="submit">บันทึก</Button>
<Button color="unapprove">ยกเลิก</Button>

// ❌ ห้าม hardcode สี
<Button sx={{ bgcolor: "#388E3C" }}>บันทึก</Button>  // ❌ ใช้ color="submit" แทน
```

### 9.3 Responsive Design

```tsx
<Box sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },  // mobile: แนวตั้ง, desktop: แนวนอน
    gap: { xs: 1, md: 2 },
    p: { xs: 1, sm: 2, md: 3 },
}}>
```

---

## 10. Modern Web Best Practices

### 10.1 Performance

- **Code Splitting**: ใช้ `React.lazy()` + `Suspense` สำหรับ page-level splitting
- **Image Optimization**: ใช้ Canvas แทน DOM rendering สำหรับ complex graphics
- **Font Loading**: ใช้ DOM-probe technique สำหรับ Canvas font rendering (รองรับ iOS Safari)
- **Memoization**: ใช้ `useMemo`/`useCallback` เฉพาะเมื่อมี expensive computation
- **Vite Production Build**: Drop `console` + `debugger` อัตโนมัติ

```typescript
// canvasFontLoader.ts — DOM-probe technique สำหรับ iOS Safari
// สร้าง hidden DOM element → document.fonts.load() → รอ 2 rAF → วาดลง Canvas
import { ensureSarabunFont } from "../modules/_common/canvasFontLoader";

await ensureSarabunFont();  // เรียกก่อน Canvas drawing เสมอ
```

### 10.2 Security

- **OIDC/PKCE**: ใช้ Authorization Code flow with PKCE (ไม่ใช่ implicit flow)
- **Token Storage**: เก็บ token ใน `localStorage` ผ่าน `WebStorageStateStore`
- **CORS Headers**: ตั้งผ่าน axios interceptor
- **External Links**: ใส่ `rel="noopener noreferrer"` เสมอ
- **Input Validation**: ใช้ Zod schema ตรวจสอบทุก input
- **XSS Prevention**: ไม่ใช้ `dangerouslySetInnerHTML` (ใช้ React JSX เท่านั้น)

### 10.3 Accessibility

- **Semantic HTML**: ใช้ MUI components ที่มี ARIA attributes built-in
- **Keyboard Navigation**: MUI จัดการ focus management ให้อัตโนมัติ
- **Color Contrast**: ใช้ theme palette ที่มี `contrastText` คู่กับ `main` เสมอ
- **Alt Text**: ทุก `<img>` ต้องมี `alt` attribute

### 10.4 UX/UI Guidelines

- **SweetAlert2**: ใช้สำหรับ user-facing alerts ทุกประเภท (ไม่ใช้ `window.alert`)
- **Loading States**: แสดง loading indicator ขณะรอ API (`Swal.showLoading()` หรือ `LoadingPlaceHolder`)
- **Error States**: แสดงข้อความผิดพลาดที่ผู้ใช้เข้าใจได้ (ไม่แสดง technical error)
- **Mobile-First**: ออกแบบสำหรับ mobile ก่อน ขยายไป desktop ด้วย responsive breakpoints
- **Smooth Transitions**: ใช้ `transition` และ `animation` สำหรับ UI state changes
- **Typography**: ใช้ font Sarabun ขนาดเหมาะสม (12-16px สำหรับ body, 18-24px สำหรับ heading)

---

## 11. Performance & Security

### 11.1 Build Optimization (vite.config.ts)

```typescript
build: {
    minify: "terser",
    terserOptions: {
        compress: {
            drop_console: true,   // ลบ console.log ใน production
            drop_debugger: true,  // ลบ debugger ใน production
        },
    },
}
```

### 11.2 React Query Defaults

```typescript
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: 5000,
            staleTime: 5 * 60 * 1000,  // 5 นาที
        },
    },
});
```

### 11.3 Environment Variables

| Environment | File | Base URL |
|-------------|------|----------|
| Local | `.env` | `http://localhost:3000` |
| Development | `.env.dev` | `https://*.devsiamsmile.com` |
| UAT | `.env.uat` | `https://*.uatsiamsmile.com` |
| Production | `.env.production` | `https://*.siamsmile.co.th` |

---

## 12. คำสั่งที่ใช้บ่อย

```bash
# Development
npm install              # ติดตั้ง dependencies
npm start                # รัน dev server (localhost:3000)
npm run start:uat        # รัน dev server ด้วย .env.uat

# Build
npm run build            # Build production
npm run build:dev        # Build development
npm run build:uat        # Build UAT
npm run build:prod       # Build production (alias)

# Quality
npm run lint             # ตรวจสอบ ESLint
npm run lint:fix         # แก้ไข ESLint อัตโนมัติ

# API
npm run codegen          # สร้าง API client จาก Swagger

# Version
npm run release          # Release version (release-it)
```

---

## 📋 Checklist เมื่อสร้างหน้าใหม่

- [ ] สร้าง Page component ที่ `src/app/pages/<PageName>.tsx`
- [ ] เพิ่ม route ที่ `Routes.tsx` (protected) หรือ `AuthRoutes.tsx` (public)
- [ ] เพิ่มเมนูที่ `ASideMenuList.tsx` (ถ้าต้องการแสดงใน sidebar)
- [ ] ใช้ `PageWrapper` ครอบ content (สำหรับ protected pages)
- [ ] ใช้ `FormikTextField` / `FormikDropdown` สำหรับ form inputs
- [ ] ใช้ `StandardDataTable` สำหรับแสดงตาราง
- [ ] ใช้ `swalConfirm` / `swalSuccess` สำหรับ user interactions
- [ ] ใช้ React Query hooks สำหรับ data fetching
- [ ] ใช้ Zod schema สำหรับ validation
- [ ] ทดสอบบน mobile browser (Safari / Chrome)
- [ ] รัน `npm run lint:fix` ก่อน commit

---

## 📋 Checklist เมื่อสร้าง API Service ใหม่

- [ ] สร้างไฟล์ `<module>Api.ts` ใน `src/app/modules/<module>/`
- [ ] กำหนด TypeScript types สำหรับ request/response
- [ ] สร้าง async function สำหรับแต่ละ endpoint
- [ ] ใช้ `ServiceResponse<T>` type สำหรับ response
- [ ] สร้าง React Query hooks (`useQuery` / `useMutation`)
- [ ] ใช้ query key ที่ unique และ descriptive (เช่น `["students", "search", params]`)
- [ ] จัดการ error ด้วย `clientHelpers.reactQuery.response.handleSuccess/handleError`
- [ ] แสดง user-facing error ด้วย `swalError`
