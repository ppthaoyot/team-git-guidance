/**
 * iOS Safari มีปัญหาที่ document.fonts.load() จะ resolve ก่อนที่ฟอนต์จะพร้อมใช้จริงใน Canvas context
 * ทำให้ Canvas ใช้ fallback font วาดข้อความ ส่งผลให้ text metrics (ความกว้าง/ความสูง) ผิดพลาด
 * และทำให้ textAlign: "center" คำนวณตำแหน่งไม่ถูกต้อง
 *
 * วิธีแก้: บังคับให้ browser "render" ฟอนต์จริงผ่าน DOM element ก่อน
 * แล้วรอ requestAnimationFrame เพื่อให้ฟอนต์เข้าสู่ rendering pipeline อย่างสมบูรณ์
 * จากนั้นค่อยวาดลง Canvas
 */

const FONT_SPECS = [
    "normal 15px 'Sarabun'",
    "bold 15px 'Sarabun'",
    "bold 21px 'Sarabun'",
    "bold 12.5px 'Sarabun'",
    "bold 14.5px 'Sarabun'",
    "bold 11.5px 'Sarabun'",
    "bold 42px 'Sarabun'",
];

/** รอ requestAnimationFrame แบบ Promise */
const waitFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/**
 * โหลดและบังคับให้ฟอนต์ Sarabun พร้อมใช้ใน Canvas ก่อนวาดภาพ
 * ใช้วิธี DOM-probe เพื่อให้ Safari/iOS ต้อง rasterize ฟอนต์จริงๆ
 */
export const ensureSarabunFont = async (): Promise<void> => {
    // 1. สร้าง DOM element ชั่วคราวที่ใช้ฟอนต์ Sarabun ทุก weight
    //    เพื่อบังคับให้ browser โหลดและ render ฟอนต์จริงๆ
    const probeElements: HTMLSpanElement[] = [];
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.visibility = "hidden";
    container.style.pointerEvents = "none";

    for (const spec of FONT_SPECS) {
        const el = document.createElement("span");
        el.style.font = spec;
        // ใช้ข้อความภาษาไทยเพื่อให้ browser โหลด glyph ภาษาไทย
        el.textContent = "กขคงจฉชซ วงเงินค่ารักษาพยาบาล 0123456789";
        container.appendChild(el);
        probeElements.push(el);
    }

    document.body.appendChild(container);

    // 2. เรียก document.fonts.load() สำหรับทุก spec ที่ต้องการ
    try {
        await Promise.all(FONT_SPECS.map((spec) => document.fonts.load(spec)));
    } catch {
        // บาง browser ไม่ support Font Loading API — ไม่เป็นไร
    }

    // 3. รอ document.fonts.ready เพื่อยืนยันว่า font queue ว่างแล้ว
    await document.fonts?.ready;

    // 4. รอ 2 animation frame เพื่อให้ browser commit ฟอนต์เข้า rendering pipeline
    //    (iOS Safari ต้องการอย่างน้อย 1 frame; ใช้ 2 เพื่อความปลอดภัย)
    await waitFrame();
    await waitFrame();

    // 5. ลบ DOM probe ออก
    document.body.removeChild(container);
};
