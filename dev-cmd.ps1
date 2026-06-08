# Siam Smile Project Development CLI helper
Clear-Host
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Siam Smile PA Card Project Developer CLI " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "1. Start Development Server (npm start)"
Write-Host "2. Generate API Clients (npm run codegen)"
Write-Host "3. Run ESLint & Fix Issues (npm run lint:fix)"
Write-Host "4. Build Project for Development (npm run build:dev)"
Write-Host "5. Build Project for UAT (npm run build:uat)"
Write-Host "6. Build Project for Production (npm run build:prod)"
Write-Host "q. Exit"
Write-Host "=========================================" -ForegroundColor Cyan

$choice = Read-Host "Select an option [1-6, q]"

switch ($choice) {
    "1" { npm start }
    "2" { npm run codegen }
    "3" { npm run lint:fix }
    "4" { npm run build:dev }
    "5" { npm run build:uat }
    "6" { npm run build:prod }
    "q" { Write-Host "Goodbye!" -ForegroundColor Yellow; break }
    default { Write-Host "Invalid option!" -ForegroundColor Red }
}
