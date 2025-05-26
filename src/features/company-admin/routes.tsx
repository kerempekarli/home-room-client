// src/features/company-admin/routes.tsx
import { lazy } from "react";
import { RequireRole } from "@/router/guards";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import type { RouteObject } from "react-router-dom";

/* --- Lazy-loaded pages --- */
const UsersPage = lazy(() => import("./users/pages/UsersPage"));

/**
 * Company-Admin’e ait tüm alt route ağacı.
 * Ana router (src/router/router.tsx) içine tek satırla eklenir.
 */
const CompanyAdminRoutes: RouteObject = {
  path: "admin",
  element: <RequireRole roles={["ADMIN"]} />, // şirket yöneticisi
  children: [
    {
      element: <AdminLayout />,               // sidebar + header
      children: [
        { index: true, element: <UsersPage /> },      // /admin
        { path: "users", element: <UsersPage /> },    // /admin/users
        // → İleride: { path: "home-rooms", element: <HomeRoomsPage /> }
      ],
    },
  ],
};

export default CompanyAdminRoutes;
