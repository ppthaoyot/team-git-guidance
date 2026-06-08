import { PermissionList } from "../../Const";
import BlankPage from "../pages/BlankPage";
import ElectronicCardPage from "../pages/ElectronicCard";
import { RouteMapType } from "./AuthRoutes";

/**
 * Config ของ route ของ Project
 *
 * รูปแบบของ Config นี้ จะมี ดังนี้
 * ```
 * {
 *         path: string,            // ที่อยู่ของ path url ที่จะใช้
 *        title: string,            // ชื่อของหน้าที่จะใช้แสดง
 *      element: JSX.Element,       // หน้าที่จะใช้แสดง
 *    children?: RouteMapType[],    // ถ้ามี children จะเป็นการกำหนด route ของหน้านั้นๆ
 *       index?: boolean,           // ถ้าเป็น true ต้ว Element จะเป็นหน้าแรกที่จะแสดง
 * permissions?: string[],          // กำหนด permission ที่จะใช้เข้าถึงหน้านี้ได้
 *   condition?: "AND" | "OR",      // กำหนดว่า permission เป็นการ AND หรือ OR
 * }
 * ```
 */

const Routes: RouteMapType[] = [
    {
        path: "/electronic-card",
        title: "บัตรประกันภัยอิเล็กทรอนิกส์",
        element: <ElectronicCardPage />,
    },
    {
        path: "/blank-page",
        title: "Blank Page",
        element: <BlankPage body="Blank Page" />,
    },
    {
        path: "/test-permission",
        title: "Test Page",
        element: <BlankPage body="Test Permission" />,
        permissions: [PermissionList.none],
        condition: "AND",
    },
];

export default Routes;
