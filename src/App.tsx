import { useQueryClient } from "@tanstack/react-query";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import GitWorkflow from "./app/pages/GitWorkflow";
import { AuthRoutes, createRouteObject } from "./app/routes";

function App() {
    const queryClient = useQueryClient();
    const githubPagesBase = window.location.pathname.split("/").filter(Boolean)[0];

    const routeConfig = [
        ...AuthRoutes,
        {
            path: "/",
            title: "Git Workflow Practice",
            element: <GitWorkflow />,
        },
        {
            path: "*",
            title: "Not Found",
            element: <Navigate to="/" />,
        },
    ];

    const routeObjects = routeConfig.map((route) => createRouteObject(route, queryClient));

    const router = createBrowserRouter(routeObjects, {
        basename: window.location.hostname.includes("github.io") && githubPagesBase ? `/${githubPagesBase}` : "/",
    });

    return <RouterProvider router={router} />;
}

export default App;
