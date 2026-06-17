/// <reference types="vite/client" />

export interface ImportMetaEnv {
    ///// APP INFO /////

    /**
     * ชื่อ App
     */
    readonly VITE_APP_NAME: string;

    /**
     * เวอร์ชั่น App
     */
    readonly VITE_APP_VERSION: string;

    /**
     * วันที่เริ่มพัฒนา App
     */
    readonly VITE_APP_SINCE: string;

    /**
     * รายละเอียด App
     */
    readonly VITE_APP_DESCRIPTION: string;

    /**
     * URL ในการติดต่อผู้พัฒนา
     */
    readonly VITE_APP_CONTACT_URL: string;

    ///// VERSION CHECKER /////

    /**
     * ตัวเลือกเกี่ยวกับการตรวจสอบเวอร์ชั่น
     * ถ้าเป็น true จะใช้งานการตรวจสอบเวอร์ชั่น
     * ถ้าเป็น false จะไม่ใช้งานการตรวจสอบเวอร์ชั่น
     */
    readonly VITE_VERSION_CHECKER_ENABLE: boolean;

    /**
     * ตัวเลือกเกี่ยวกับการตรวจสอบเวอร์ชั่น
     * ถ้าเป็น true จะแสดงข้อความแจ้งเตือนเมื่อมีเวอร์ชั่นใหม่
     * ถ้าเป็น false จะไม่แสดงข้อความแจ้งเตือนเมื่อมีเวอร์ชั่นใหม่
     */
    readonly VITE_VERSION_CHECKER_CONFIRM: boolean;

    /**
     * ตัวเลือกเกี่ยวกับการตรวจสอบเวอร์ชั่น
     * ระยะเวลาในการตรวจสอบเวอร์ชั่น (นาที)
     */
    readonly VITE_VERSION_CHECKER_CHECK_INTEVAL_MIN: number;

    ///// BASE URL /////

    /**
     * URL ของเว็บไซต์ เปลี่ยนไปตาม Environment ที่เราต้องการ
     *
     * - .env.local (Local) ใช้ URL https://localhost:3000
     * - .env.dev (Development) ใช้ Development base URL
     * - .env.uat (UAT) ใช้ UAT base URL
     * - .env (Production) ใช้ Production base URL
     */
    readonly VITE_BASE_URL: string;

    /**
     * URL ของ API
     *
     * - .env.local (Local) ใช้ URL https://localhost:3000
     * - .env.dev (Development) ใช้ Development API URL
     * - .env.uat (UAT) ใช้ UAT API URL
     * - .env (Production) ใช้ Production API URL
     */
    readonly VITE_API_URL: string;

    /**
     * URL ของ API GATEWAY
     *
     * - .env.local (Local) ใช้ Local API gateway URL
     * - .env.dev (Development) ใช้ Development API gateway URL
     * - .env.uat (UAT) ใช้ UAT API gateway URL
     * - .env (Production) ใช้ Production API gateway URL
     */

    readonly VITE_APIGW_BASEURL: string;

    /**
     * หากมี API เพิ่มเติม สามารถเพิ่มได้ตามต้องการ
     *
     * ตัวอย่างเช่น
     *
     * readonly VITE_DEMOPOSAPI_URL: string
     *
     * และในไฟล์ .env ให้เพิ่ม
     *
     * VITE_EXAMPLE_API_URL=https://api.example.com
     */

    readonly VITE_DEMOPOSAPI_URL: string;

    ///// SSO /////

    /**
     * URL ของ Identity Server
     *
     * - .env.local (Local) ใช้ Local identity server URL
     * - .env.dev (Development) ใช้ Development identity server URL
     * - .env.uat (UAT) ใช้ UAT identity server URL
     * - .env (Production) ใช้ Production identity server URL
     */
    readonly VITE_SSO_ISSUER: string;

    /**
     * Client ID ของ App
     */
    readonly VITE_SSO_CLIENT_ID: string;

    /**
     * Scope ของ App
     */
    readonly VITE_SSO_SCOPE: string;

    ///// External Services /////

    /**
     * URL ของ DocStorage
     */
    readonly VITE_DOCSTORAGE_URL: string;

    /**
     * URL ของ Queue
     */

    readonly VITE_QUEUE_URL: string;

    /**
     * URL ของ Queue API
     */
    readonly VITE_QUEUE_API_URL: string;

    /**
     * เวลาในการ Refetch ข้อมูลจาก Queue (วินาที)
     */
    readonly VITE_QUEUE_REFETCH_INTERVAL: number;
}
