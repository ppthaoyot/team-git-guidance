# Project Instruction: pa-student-card

ยินดีต้อนรับสู่โปรเจกต์ **pa-student-card** (ระบบค้นหาบัตรประกัน PA นักเรียน) โปรเจกต์นี้เริ่มต้นขึ้นโดยใช้ **Siam Smile React TypeScript Template 2023**

---

## 🛠️ Stack & Technologies

1. **Core Framework**: React 18, Vite 4, TypeScript 5
2. **UI Framework**: Material UI (MUI) v5 (`@mui/material`, `@mui/x-date-pickers`)
3. **Form Management**: Formik + Zod (พร้อม Zod-Formik Adapter)
4. **State Management**: Redux Toolkit + React Redux + Redux Persist
5. **Data Fetching / Caching**: `@tanstack/react-query` (React Query v4) + Axios
6. **Authentication & SSO**: `oidc-client-ts` (เชื่อมต่อกับระบบ Siam Smile SSO)
7. **Routing**: React Router Dom v6 (รองรับ Permission-based Routes)
8. **API Client Generator**: NSwag (รองรับการแปลง Swagger/OpenAPI เป็น TypeScript clients)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
pa-student-card/
├── public/                 # Static assets (Favicon, Web.config)
├── src/
│   ├── app/
│   │   ├── api/            # API clients ที่สร้างโดย NSwag (codegen)
│   │   ├── layout/         # UI Layout, Sidebar Navigation, Theme (MUI) และ Slice
│   │   ├── modules/        # โมดูลฟังก์ชันหลักของระบบ
│   │   │   ├── _auth/      # การล็อกอินและการจัดการ callback ของ SSO
│   │   │   └── _common/    # คอมโพเนนต์และฟังก์ชันช่วยเหลือส่วนกลาง เช่น
│   │   │       ├── components/DataTable (StandardDataTable)
│   │   │       ├── components/CustomFormik (FormikTextField, FormikDatePicker ฯลฯ)
│   │   │       └── sweetAlert.ts, dayjsHelpers.ts, zodHelpers.ts
│   │   ├── pages/          # หน้าเว็บทั่วไป (Home, BlankPage, TestPermission)
│   │   └── routes/         # ระบบจัดการ Routes (Routes.tsx, AuthRoutes.tsx)
│   ├── redux/              # Redux Store, Root Reducers และ custom hooks
│   ├── App.tsx             # จุดเริ่มต้นส่วนแสดงผลและ Auth Boundary
│   ├── AppRoot.tsx         # Root component ครอบด้วย Providers ต่างๆ
│   └── main.tsx            # Entrypoint หลักของโปรแกรม
├── .env*                   # ไฟล์ตั้งค่าสิ่งแวดล้อม (Local, Dev, UAT, Prod)
├── code-generator.cjs      # สคริปต์รัน NSwag เพื่อทำ API codegen
├── package.json            # ไฟล์จัดการ Dependencies และ Scripts
└── tsconfig.json           # การตั้งค่า TypeScript compiler
```

---

## 🚀 วิธีการติดตั้งและรันระบบ (Setup & Running)

### 1. การติดตั้ง Dependencies
เปิด Command Prompt หรือ Terminal ที่โฟลเดอร์โปรเจกต์ แล้วรันคำสั่ง:
```bash
npm install
```

### 2. รันในโหมดพัฒนา (Development Mode)
```bash
npm start
```
ระบบจะรันบนหน้าเว็บที่ [http://localhost:3000](http://localhost:3000) (อิงตามค่า `VITE_BASE_URL` ใน `.env`)

### 3. การสร้าง Build สำหรับ Deploy แต่ละ Environment
- **Development (Dev)**: `npm run build:dev`
- **UAT / Staging**: `npm run build:uat`
- **Production (Prod)**: `npm run build:prod`

---

## 🔄 ระบบ API Codegen (NSwag openapi2tsclient)

โปรเจกต์นี้รองรับการสร้างโค้ดสำหรับเชื่อมต่อ API โดยตรงจาก Swagger JSON
1. ตรวจสอบค่า `VITE_API_URL` ในไฟล์ `.env` หรือ `.env.local` (สามารถใส่หลาย API endpoint คั่นด้วยเครื่องหมายจุลภาค `,` ได้)
2. รันคำสั่งด้านล่างเพื่อสร้างไฟล์ client TypeScript ภายใต้โฟลเดอร์ `src/app/api`:
```bash
npm run codegen
```
*ตัวอย่าง: ไฟล์ผลลัพธ์จะเป็น `<hostname>.api.ts` ซึ่งจะมี class สำหรับเรียก API ทั้งหมดตาม Swagger*

---

## 🔐 การจัดการเส้นทาง (Routing) และสิทธิ์ใช้งาน (Permissions)

การเพิ่มหน้าใหม่จะต้องทำที่ไฟล์ `src/app/routes/Routes.tsx` หรือ `src/app/routes/AuthRoutes.tsx`
คุณสามารถระบุสิทธิ์ในการเข้าถึงหน้าต่างๆ ได้ผ่านฟิลด์ `permissions` ใน Route Object:

```typescript
{
  path: "/some-feature",
  title: "ฟีเจอร์ตัวอย่าง",
  element: <SomeFeaturePage />,
  permissions: [PermissionList.example_permission], // สิทธิ์ที่ต้องการใช้งาน
}
```

โดยค่าสิทธิ์ทั้งหมดสามารถประกาศได้ที่ Enum `PermissionList` ในไฟล์ `src/Const.ts`

---

## 🎨 แนวทางและข้อเสนอแนะในการพัฒนา (Guidelines)

1. **การสร้าง Form**: ให้ใช้งาน Custom Formik components ใน `src/app/modules/_common/components/CustomFormik/` (เช่น `FormikTextField`, `FormikDatePicker`, `FormikDropdown`) ร่วมกับ Zod schema validation ในการพัฒนาฟอร์ม
2. **การทำตารางแสดงผล**: ให้ใช้งาน `StandardDataTable` ใน `src/app/modules/_common/components/DataTable/` ซึ่งรองรับการทำ Pagination, Filter, Sorting ที่จัดเตรียมไว้แล้วอย่างสวยงาม
3. **การตกแต่งและ UI**: ใช้ Material UI theme (`src/app/layout/theme.ts`) ในการปรับแต่งเฉดสีหลักตามคู่มือแบรนด์ของ Siam Smile (หลีกเลี่ยงการ hardcode สไตล์สีและขนาดตัวอักษร)
