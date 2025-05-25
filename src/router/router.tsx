// src/router/index.tsx (veya nerede tanımlıyorsan)
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/features/auth/LoginPage";
import UnauthorizedPage from "@/router/pages/UnauthorizedPage";
import { RequireAuth, RequireRole } from "./guards";

/* Layout’lar */
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";

/* Sayfalar */
import UsersPage from "@/features/user/pages/UsersPage";
// (istersen SuperAdmin’e özel ayrı bir Dashboard ekleyebilirsin)
import SuperAdminDashboard from "@/features/super-admin/pages/SuperAdminPage"; // optional

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* ---- PUBLIC ---- */
      { path: "login", element: <LoginPage /> },
      { path: "unauthorized", element: <UnauthorizedPage /> },

      /* ---- PROTECTED (login) ---- */
      {
        element: <RequireAuth />,
        children: [
          /* ---------- ADMIN + SUPER_ADMIN ---------- */
          {
            path: "admin",
            element: <RequireRole roles={["ADMIN", "SUPER_ADMIN"]} />,
            children: [
              {
                element: <AdminLayout />, // sidebar + header
                children: [
                  { index: true, element: <UsersPage /> }, // /admin
                  { path: "users", element: <UsersPage /> },
                  /* ... başka admin route’ları ... */
                ],
              },
            ],
          },

          /* ---------- Sadece SUPER_ADMIN ---------- */
          {
            path: "super-admin",
            element: <RequireRole roles={["SUPER_ADMIN"]} />,
            children: [
              {
                element: <AdminLayout />, // aynı layout’u reuse edelim
                children: [
                  { index: true, element: <SuperAdminDashboard /> }, // /super-admin
                  { path: "tenants", element: <SuperAdminDashboard /> },     // /super-admin/tenants
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
