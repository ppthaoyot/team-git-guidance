# React TypeScript Template

Reusable React, TypeScript, and Vite template with Material UI, routing, authentication support, runtime configuration, shared form helpers, API conventions, and AI-agent instructions.

## AI Agent Guide

This repository includes root-level instruction files for multiple AI coding tools:

- `AGENTS.md` - canonical instructions for AI agents.
- `CLAUDE.md` - Claude-specific entrypoint.
- `GEMINI.md` - Gemini-specific entrypoint.
- `SKILL.md` - reusable skill-style summary.

Recommended root directory: use the repository root, identified by `package.json`, `vite.config.ts`, `src/`, and `public/`. Do not depend on the local folder name.

## Quick Start

```bash
npm install
npm start
```

The Vite development server runs locally using the port configured by Vite or the environment.

## Common Commands

```bash
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

## Project Layout

- `src/` - application source code.
- `src/app/pages/` - route-level pages.
- `src/app/routes/` - public and protected route definitions.
- `src/app/modules/_auth/` - authentication and authorization.
- `src/app/modules/_common/` - shared components, helpers, validators, alerts, and types.
- `src/app/layout/` - application shell, menu, and theme.
- `src/redux/` - Redux store setup.
- `public/` - static files and runtime configuration output.
- `docs/` - reference material and template documentation.

## Template Notes

Keep template-level documentation generic. Add project-specific business names, domains, assets, and workflows only inside the consuming project when they are needed.
