---
name: react-typescript-template
description: Use when working in a reusable React, TypeScript, Vite, Material UI template repository. Follow this skill for project-neutral structure, root-directory handling, coding patterns, API conventions, routing conventions, and validation steps across AI coding agents.
---

# React TypeScript Template Skill

Use this skill when building, editing, reviewing, or documenting a project based on this template.

## Start Here

- Read `AGENTS.md` as the canonical instruction file.
- Treat the repository root as the directory containing `package.json`, `vite.config.ts`, `src/`, and `public/`.
- Do not infer the project identity from the local folder name.
- Keep template documentation reusable across projects. Avoid product-specific names, domains, and business language unless requested.

## Default Workflow

1. Inspect the relevant files before making changes.
2. Reuse existing modules, shared helpers, routes, form components, API patterns, and theme conventions.
3. Make the smallest change that satisfies the request.
4. Run the most relevant validation from `package.json` when practical.
5. Report changed files and any validation that could not be completed.

## Common Commands

```bash
npm install
npm start
npm run lint
npm run lint:fix
npm run build
npm run codegen
```

Use the exact scripts present in `package.json`.
