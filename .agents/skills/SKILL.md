# SKILL - แนวทางการพัฒนา React TypeScript Template

เอกสารนี้เป็นแนวทางสำหรับ AI Agent และนักพัฒนาที่ทำงานกับโปรเจกต์ที่สร้างจาก template นี้ โดยตั้งใจให้ใช้ซ้ำได้กับหลายโปรเจกต์ ไม่ผูกกับชื่อโปรเจกต์ โฟลเดอร์ โลโก้ โดเมน หรือ business domain เฉพาะ

## Root Directory

- ให้ถือว่า root directory คือโฟลเดอร์ที่มี `package.json`, `vite.config.ts`, `src/`, และ `public/`
- ให้รันคำสั่ง development, build, lint, และ codegen จาก root directory
- ห้ามใช้ชื่อโฟลเดอร์บนเครื่องเป็นชื่อโปรเจกต์ ให้ดูจาก `package.json` หรือคำสั่งผู้ใช้ล่าสุดแทน

## Technology Stack

| หมวด | เทคโนโลยี |
| --- | --- |
| Core Framework | React + Vite + TypeScript |
| UI Framework | Material UI v5 |
| Form Management | Formik + Zod + zod-formik-adapter |
| UI State | Redux Toolkit + Redux Persist |
| Server State | TanStack React Query v4 |
| HTTP Client | Axios |
| Auth / SSO | oidc-client-ts |
| Routing | React Router DOM v6 |
| Alerts | SweetAlert2 |
| Date | Day.js |
| API Codegen | NSwag |

## Project Structure

```text
src/
├── App.tsx
├── AppRoot.tsx
├── Callback.tsx
├── Const.ts
├── main.tsx
├── index.css
├── redux/
└── app/
    ├── layout/
    ├── modules/
    │   ├── _auth/
    │   ├── _common/
    │   └── <feature>/
    ├── pages/
    └── routes/
```

## Development Pattern

- `pages/` ใช้สำหรับ route-level page components
- `modules/_common/` ใช้สำหรับ shared components, helpers, validators, alerts, และ types
- `modules/_auth/` ใช้สำหรับ authentication และ authorization logic
- `modules/<feature>/` ใช้สำหรับ feature ที่มี API, hooks, types, หรือ logic ของตัวเอง
- `layout/` ใช้สำหรับ app shell, sidebar, topbar, menu, theme, และ layout state
- `routes/` ใช้สำหรับ public/protected routes
- `redux/` ใช้สำหรับ global UI/app state เท่านั้น

## Naming Conventions

| ประเภท | รูปแบบ | ตัวอย่าง |
| --- | --- | --- |
| Component | `PascalCase.tsx` | `UserSearch.tsx` |
| Utility/Helper | `camelCase.ts` | `clientHelpers.ts` |
| Type Declaration | `*.d.ts` | `auth.d.ts` |
| Redux Slice | `camelCase.ts` | `layoutSlice.ts` |
| React Hook | `use` prefix | `useAuth` |
| Event Handler | `handle` prefix | `handleSearch` |
| Constants | `UPPER_SNAKE_CASE` | `API_URL` |

## API Pattern

- สร้าง API service ต่อ feature ที่ `src/app/modules/<feature>/<feature>Api.ts`
- กำหนด request/response types ใกล้กับ API function
- ใช้ shared response type ของโปรเจกต์ เช่น `ServiceResponse<T>`
- ใช้ React Query สำหรับ API calls และ cache
- ตั้ง query key ให้ stable และอ่านง่าย เช่น `["feature", "detail", id]`
- ให้ auth layer หรือ axios interceptor จัดการ authorization header
- ใช้ shared client helpers และ SweetAlert helpers สำหรับ success/error handling

## Form Pattern

- ใช้ Formik สำหรับ form state
- ใช้ Zod สำหรับ schema validation
- ใช้ Formik wrapper components จาก `_common/components/CustomFormik/` เมื่อมีอยู่
- แสดง error message ที่ผู้ใช้เข้าใจได้ หลีกเลี่ยง technical error ตรง ๆ

## Route Pattern

- เพิ่ม public routes ใน `src/app/routes/AuthRoutes.tsx`
- เพิ่ม authenticated routes ใน `src/app/routes/Routes.tsx`
- ใช้ route title และ permission metadata ให้สอดคล้องกับ route เดิม
- ถ้าเป็นหน้าใน Layout ให้ใช้ page wrapper หรือ layout pattern ที่โปรเจกต์มีอยู่

## Styling Pattern

- ใช้ MUI components และ theme ก่อนเพิ่ม custom CSS
- ใช้ `sx` สำหรับ styling เฉพาะ component
- ใช้ MUI `styled()` สำหรับ reusable styled components
- ใช้ theme color token แทนการ hardcode สีเมื่อเป็นสีมาตรฐานของระบบ
- ออกแบบ responsive ด้วย MUI breakpoints

## Runtime Configuration

- ใช้ runtime config ผ่าน `window.__CONST__ENV__` และ `Const.ts`
- ห้าม hardcode API URLs, environment URLs, tokens, secrets, หรือ project-specific domains ใน source code
- ให้เปลี่ยนค่า environment ผ่าน `.env`, `.env.dev`, `.env.uat`, `.env.production` หรือ deployment config ตาม pattern เดิม

## Common Commands

```bash
npm install
npm start
npm run start:uat
npm run lint
npm run lint:fix
npm run build
npm run build:dev
npm run build:uat
npm run build:prod
npm run codegen
npm run serve
```

## Checklist เมื่อสร้างหน้าใหม่

- [ ] สร้าง page component ใน `src/app/pages/` หรือ feature module ที่เหมาะสม
- [ ] เพิ่ม route ใน `Routes.tsx` หรือ `AuthRoutes.tsx`
- [ ] เพิ่มเมนู ถ้าหน้านั้นต้องแสดงใน sidebar
- [ ] ใช้ shared form, table, alert, loading, และ layout components เมื่อเหมาะสม
- [ ] ใช้ React Query hooks สำหรับ data fetching
- [ ] ใช้ Zod validation สำหรับ form/request input
- [ ] ทดสอบ responsive behavior บน mobile และ desktop
- [ ] รัน lint/build ที่เกี่ยวข้องก่อนส่งงาน
