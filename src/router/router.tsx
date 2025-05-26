// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/features/auth/LoginPage";
import UnauthorizedPage from "@/router/pages/UnauthorizedPage";
import { RequireAuth, RequireRole } from "./guards";

/* Company-Admin route ağacı */
import CompanyAdminRoutes from "@/features/company-admin/routes";

/* Super-Admin sayfaları (opsiyonel) */
import SuperAdminDashboard from "@/features/super-admin/pages/SuperAdminPage";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /* ---- PUBLIC ---- */
      { path: "login", element: <LoginPage /> },
      { path: "unauthorized", element: <UnauthorizedPage /> },

      /* ---- PROTECTED ---- */
      {
        element: <RequireAuth />,
        children: [
          /* ---------- Company-Admin (ADMIN) ---------- */
          CompanyAdminRoutes,

          /* ---------- Sadece SUPER_ADMIN ---------- */
          {
            path: "super-admin",
            element: <RequireRole roles={["SUPER_ADMIN"]} />,
            children: [
              {
                element: <AdminLayout />, // Shared layout
                children: [
                  { index: true, element: <SuperAdminDashboard /> },
                  { path: "tenants", element: <SuperAdminDashboard /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
