# AI Agent Instructions

Use this file as the primary instruction source for AI coding agents working in this repository. The guidance is intentionally project-neutral so this template can be reused across different products.

## Root Directory

- Treat the repository root as the directory that contains `package.json`, `vite.config.ts`, `src/`, and `public/`.
- Run all project commands from the repository root unless a task explicitly says otherwise.
- Do not rely on the local folder name as the project name. Read `package.json`, existing code, and user-provided context before naming features, pages, branches, or releases.

## Technology Stack

- React 18 with TypeScript and Vite.
- Material UI v5 for UI components and theme.
- React Router v6 for routing.
- Redux Toolkit and Redux Persist for app-level UI state.
- TanStack React Query v4 for server state.
- Formik and Zod for forms and validation.
- Axios for HTTP requests.
- `oidc-client-ts` for OpenID Connect authentication.
- Day.js for date handling.
- NSwag for OpenAPI/Swagger client generation when configured.

## Project Structure

- `src/App.tsx`: route composition.
- `src/AppRoot.tsx`: provider composition.
- `src/Const.ts`: runtime configuration from `window.__CONST__ENV__`.
- `src/redux/`: global Redux setup and typed hooks.
- `src/app/layout/`: app shell, sidebar, app bar, menu, and theme.
- `src/app/routes/`: public and protected route definitions.
- `src/app/pages/`: route-level page components.
- `src/app/modules/_auth/`: authentication, authorization, route guards, and auth pages.
- `src/app/modules/_common/`: shared helpers, validators, alerts, types, and reusable components.
- `src/app/modules/<feature>/`: feature-specific code for larger features.
- `public/`: static assets and generated runtime configuration.
- `docs/`: reference material and design/archive documents.

## Development Commands

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

Prefer the exact scripts in `package.json` over inventing new commands.

## Coding Guidelines

- Follow existing file naming, folder layout, import style, formatting, and component patterns.
- Keep page components thin. Move reusable business logic, API hooks, and feature helpers into modules.
- Use TypeScript types for request, response, form, and component contracts.
- Use React Query for API data and cache behavior.
- Use Redux only for shared UI/app state, not ordinary server data.
- Use Formik wrapper components from `_common/components/CustomFormik/` when building forms.
- Use Zod schemas for form and request validation.
- Use shared alert helpers such as `swalError`, `swalSuccess`, `swalWarning`, `swalInfo`, and `swalConfirm` instead of `window.alert`.
- Use existing shared components such as `PageWrapper`, `StandardDataTable`, and common layout utilities when they fit.
- Do not hardcode environment-specific URLs, secrets, or tokens. Read runtime config through `Const.ts` or the existing configuration pattern.
- Do not introduce project-specific names, brands, domains, or business terms into template-level docs unless the user explicitly asks.

## API Pattern

- Put feature API code in `src/app/modules/<feature>/<feature>Api.ts`.
- Define request and response types close to the API hooks.
- Use `ServiceResponse<T>` or the repository's existing shared response type.
- Build stable React Query keys, for example `["feature", "list", params]`.
- Let the auth layer inject authorization headers through the existing Axios interceptor.
- Use shared client helpers for success/error handling when available.

## Routing Pattern

- Add public routes to `src/app/routes/AuthRoutes.tsx`.
- Add authenticated routes to `src/app/routes/Routes.tsx`.
- Use route titles and permission metadata consistently with existing route definitions.
- Keep route-level pages in `src/app/pages/` unless a feature module already owns that route.

## UI Pattern

- Use MUI components and the app theme before adding custom CSS.
- Prefer the `sx` prop for local styling and MUI `styled()` for reusable styled components.
- Keep layouts responsive with MUI breakpoints.
- Preserve accessibility basics: semantic elements, useful labels, keyboard-friendly controls, and meaningful image `alt` text.

## Verification

Before handing work back, run the most relevant checks for the change:

- Documentation-only change: no build required unless links or generated docs are affected.
- TypeScript or React change: run `npm run lint` and `npm run build` when practical.
- Formatting-only or small local change: run the narrowest useful validation.

If a command cannot be run, explain why and describe the remaining risk.

## Git Safety

- Do not revert user changes unless explicitly asked.
- Check `git status --short` before and after edits.
- Keep changes scoped to the user's request.
- Do not commit, branch, push, or open a pull request unless the user asks.
