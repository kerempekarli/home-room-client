// src/features/company-admin/routes.tsx
import { lazy } from "react";
import { RequireRole } from "@/router/guards";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";
import type { RouteObject } from "react-router-dom";

/* --- Lazy-loaded pages --- */
const UsersPage = lazy(() => import("./users/pages/UsersPage"));
const HomeRoomListPage = lazy(
  () => import("./home-room/pages/HomeRoomListPage"),
);
const HomeRoomDetailPage = lazy(
  () => import("./home-room/pages/HomeRoomDetailPage"),
);

/**
 * Company-Admin’e ait tüm alt route ağacı.
 * Ana router (src/router/router.tsx) içine tek satırla eklenir.
 */
const CompanyAdminRoutes: RouteObject = {
  path: "admin",
  element: <RequireRole roles={["ADMIN"]} />, // şirket yöneticisi
  children: [
    {
      element: <AdminLayout />, // ortak sidebar + header
      children: [
        /* ----- Users ----- */
        { index: true, element: <UsersPage /> }, // /admin
        { path: "users", element: <UsersPage /> }, // /admin/users

        /* ----- Home-Rooms ----- */
        { path: "home-rooms", element: <HomeRoomListPage /> }, // /admin/home-rooms
        {
          path: "home-rooms/:id",
          element: <HomeRoomDetailPage />,
        }, // /admin/home-rooms/123
      ],
    },
  ],
};

export default CompanyAdminRoutes;
