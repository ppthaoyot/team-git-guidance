import { QueryClient } from "@tanstack/react-query";
import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { PermissionList } from "../../Const";
import { NoticePage, PermissionCondition, SigninCallback, SilentCallback } from "../modules/_auth";
import StudentSearch from "../pages/StudentSearch";
import StudentCard from "../pages/StudentCard";
import GitWorkflow from "../pages/GitWorkflow";

/**
 * ใช้ในการกำหนด ข้อมูล ของ route
 **/
export type RouteMapType = {
    /**
     * รายการของ route ย่อย
     **/
    children?: RouteMapType[];
} & Omit<RouteObject, "children" | "loader"> &
    RouteHandleType;

/**
 * ใช้ในการกำหนด ข้อมูล ของ route handle
 */
export type RouteHandleType = {
    /**
     * ชื่อของหน้า
     **/
    title: string;

    /**
     * สิทธิ์การเข้าถึงหน้า (ถ้าไม่มี จะไม่มีการเช็คสิทธิ์)
     * ตั้งค่าที่ Const.ts
     **/
    permissions?: PermissionList[];

    /**
     * เงื่อนไขการเช็คสิทธิ์ (ถ้าไม่มี จะเช็คแบบ OR)
     **/
    condition?: PermissionCondition;

    icon?: string | React.ReactNode;

    loader?: (queryClient: QueryClient) => ({ params }: any) => Promise<any | undefined>;

    getTitle?: (data: any) => string;
};

export const createRouteObject = (route: RouteMapType, queryClient: QueryClient): RouteObject => {
    if (route.index) {
        return {
            index: route.index,
            element: route.element,
            loader: route.loader ? route.loader(queryClient) : undefined,
            handle: {
                title: route.title ?? undefined,
                permissions: route.permissions ?? undefined,
                condition: route.condition ?? undefined,
                getTitle: route.getTitle ?? undefined,
                icon: route.icon ?? undefined,
            },
        };
    }

    return {
        path: route.path ?? undefined,
        element: route.element ?? false,
        children: route.children?.map((child) => createRouteObject(child, queryClient)) ?? undefined,
        loader: route.loader ? route.loader(queryClient) : undefined,
        handle: {
            title: route.title ?? undefined,
            permissions: route.permissions ?? undefined,
            condition: route.condition ?? undefined,
            getTitle: route.getTitle ?? undefined,
            icon: route.icon ?? undefined,
        },
    };
};

export const AuthRoutes: RouteMapType[] = [
    { path: "/home", title: "Home", element: <Navigate to="/" /> },
    {
        path: "/signin-callback",
        title: "Signin Callback",
        element: <SigninCallback />,
    },
    {
        path: "/silent-callback",
        title: "Silent Callback",
        element: <SilentCallback />,
    },
    {
        path: "/not-found",
        title: "Not Found",
        element: <NoticePage title="404 Not Found" body="ไม่พบเพจที่คุณต้องการ" />,
    },
    {
        path: "/student/search",
        title: "ค้นหาบัตรประกัน PA นักเรียน",
        element: <StudentSearch />,
    },
    {
        path: "/student/card/:citizenId",
        title: "บัตรประกันภัยอุบัติเหตุ",
        element: <StudentCard />,
    },
    {
        path: "/git-workflow",
        title: "Git Workflow Practice สำหรับทีม Dev",
        element: <GitWorkflow />,
    },
];
