// src/features/company-admin/users/api.ts
import { api } from "@/lib/axios";
import type { Paginated } from "@/lib/types/pagination";
import type { UserDto, CreateUserInput } from "./types";

/* ---------- ENDPOINTS ---------- */

/** GET /users */
export async function fetchUsers(
  page = 1,
  limit = 10,
  search = "",
): Promise<Paginated<UserDto>> {
  const { data } = await api.get("/users", {
    params: { page, limit, search },
  });
  return data.data;
}

/** POST /users */
export async function createUser(payload: CreateUserInput) {
  const { data } = await api.post<UserDto>("/users", payload);
  return data;
}

/** PATCH /users/:id/remove */
export async function removeUser(id: string) {
  await api.patch(`/users/${id}/remove`);
}
