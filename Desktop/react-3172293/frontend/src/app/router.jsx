// src/app/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/shared/layouts/AuthLayout";
import DashboardLayout from "@/shared/layouts/DashboardLayout";

const router = createBrowserRouter([
{
    path: "/",
    element: <Navigate to="/auth/login" replace />,
},
{
    path: "/auth",
    element: <AuthLayout />,
    children: [
    {
        path: "login",
        lazy: async () => {
            const { default: Login } = await import("@/features/auth/components/Login");
            return { Component: Login };
        },
        },
    ],
},
{
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
        {
            path: "userList",
            lazy: async () => {
                const { default: UserListPage } = await import("@/features/users/pages/UserListPage");
                return { Component: UserListPage };
            },
        },
        {
            path: "userCreate",
            lazy: async () => {
                const { default: UserRegisterForm } = await import("@/features/users/components/UserRegisterForm");
                return { Component: UserRegisterForm };
            },
        },
        {
            path: "home",
            lazy: async () => {
                const { default: HomePage } = await import("@/features/home/page/HomePage");
                return { Component: HomePage };
            },
        },
        ],
    },
]);

export default router;