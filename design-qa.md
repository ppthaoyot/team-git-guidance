# PA Card Figma QA

Date: 2026-06-08

## Result

Passed for the requested Layout + Content fidelity pass against `docs/reference/figma_extracted`.

## Verified Screens

- Admin table: `output/playwright/admin-table-v2.png`
- QR modal: `output/playwright/qr-modal-v2.png`
- Mobile empty state: `output/playwright/student-empty-v2.png`
- Mobile result top: `output/playwright/student-result-top-v2.png`
- Mobile result full: `output/playwright/student-result-full-v2.png`

## Notes

- The admin page keeps the existing application shell/sidebar/header while the Figma QA scope was applied to the filter panel, table content, table rows, status pill, and QR action.
- The mobile public search/card flow now uses the Figma mock school and citizen ID content, public route auth bypass, fixed call center footer, and the updated benefit/detail layout.
- Browser console checks showed no application errors on `/student/search` and `/electronic-card?demo=true`; one existing Emotion duplicate-instance warning remains non-blocking.
- QR poster download was verified through the modal action; the browser produced `QR_โรงเรียนก้อนแก้วพิทยาคม.png` with no download failure.

## Remaining Visual Tolerance

- Card text overlays are aligned for QA against the provided screenshots, but the raster template itself controls some tiny text density and cannot be pixel-perfect without a separate layered card asset.
