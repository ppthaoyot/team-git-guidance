Write-Host "Initializing Git Repository..." -ForegroundColor Cyan
git init

# Configure default branch name to main
git branch -M main

Write-Host "Staging template baseline..." -ForegroundColor Cyan
# Add everything, then unstage our custom additions/changes
git add .
git reset src/app/pages/ElectronicCard.tsx
git reset src/app/pages/StudentSearch.tsx
git reset src/app/pages/StudentCard.tsx
git reset src/app/modules/_common/mockStudentData.ts
git reset dev-cmd.ps1
git reset project_instruction.md
git reset .vscode/tasks.json
git reset docs/
git reset public/template-card.png
git reset public/template-bg-qr-code.png
git reset package.json
git reset .env
git reset index.html
git reset src/app/routes/Routes.tsx
git reset src/app/routes/AuthRoutes.tsx
git reset src/app/routes/ASideMenuList.tsx
git reset Readme.md
git reset .gitignore

Write-Host "Committing template baseline..." -ForegroundColor Cyan
git commit -m "chore: initialize react typescript template baseline"

Write-Host "Committing project metadata..." -ForegroundColor Cyan
git add package.json .env index.html .gitignore
git commit -m "chore: configure project metadata and environment settings"

Write-Host "Committing developer tools..." -ForegroundColor Cyan
git add project_instruction.md dev-cmd.ps1 .vscode/tasks.json Readme.md
git commit -m "docs: add project instructions, developer CLI, and task automation"

Write-Host "Committing mock database..." -ForegroundColor Cyan
git add src/app/modules/_common/mockStudentData.ts
git commit -m "feat: implement mock student database with lookup filters"

Write-Host "Committing teacher dashboard..." -ForegroundColor Cyan
git add src/app/pages/ElectronicCard.tsx src/app/routes/Routes.tsx src/app/routes/ASideMenuList.tsx
git commit -m "feat: implement electronic card portal and qr code poster generator for teachers"

Write-Host "Committing mobile search..." -ForegroundColor Cyan
git add src/app/pages/StudentSearch.tsx src/app/routes/AuthRoutes.tsx
git commit -m "feat: implement mobile student search form and benefits overview"

Write-Host "Committing mobile digital card..." -ForegroundColor Cyan
git add src/app/pages/StudentCard.tsx public/template-card.png public/template-bg-qr-code.png
git commit -m "feat: implement mobile digital PA card view with canvas download"

Write-Host "Committing reference docs..." -ForegroundColor Cyan
git add docs/
git commit -m "docs: archive template zip and figma design screenshots"

Write-Host "All commits completed successfully!" -ForegroundColor Green
git log --oneline
