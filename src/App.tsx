import { useQueryClient } from "@tanstack/react-query";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./app/layout/Layout";
import { NoticePage } from "./app/modules/_auth";
import Home from "./app/pages/Home";
import { AuthRoutes, RouteMapType, createRouteObject } from "./app/routes";
import Routes from "./app/routes/Routes";

function App() {
    const queryClient = useQueryClient();
    const githubPagesBase = window.location.pathname.split("/").filter(Boolean)[0];

    const CombineRouteConfig: RouteMapType[] = [
        ...AuthRoutes,
        {
            path: "/",
            element: <Layout />,
            title: "Home",
            children: [
                { index: true, title: "Home", element: <Home />, icon: "home" },
                {
                    path: "/unauthorized",
                    title: "Unauthorized",
                    element: (
                        <NoticePage title="401 Unauthorized" body="You do not have permission to access this page" />
                    ),
                },
                ...Routes,
            ],
        },
        {
            path: "*",
            title: "Not Found",
            element: <Navigate to="/not-found" />,
        },
    ];

    const routeObjects = CombineRouteConfig.map((route) => createRouteObject(route, queryClient));

    const router = createBrowserRouter(routeObjects, {
        basename: window.location.hostname.includes("github.io") && githubPagesBase ? `/${githubPagesBase}` : "/",
    });

    return <RouterProvider router={router} />;
}

export default App;
