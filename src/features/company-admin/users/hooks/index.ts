// src/features/company-admin/users/hooks.ts  🔄 TAM SÜRÜM (güncel)

/* eslint-disable import/order */
import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryKey,          // <- type-only import
} from "@tanstack/react-query";
import { fetchUsers, createUser, removeUser } from "../api";
import type { CreateUserInput } from "../types";
import type { Paginated } from "@/lib/types/pagination";
import type { UserDto } from "../types";

/* ---------------- Query Keys ---------------- */
const usersListKey = (
  page: number,
  search: string,
  limit: number,
): QueryKey => ["users", page, search, limit];

/* ---------------- Queries ------------------- */
export function useUsers(page: number, search: string, limit: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: usersListKey(page, search, limit),
    queryFn: () => fetchUsers(page, limit, search),

    /** v5 yerine: önceki veriyi placeholder olarak göster */
    placeholderData: () =>
      qc.getQueryData<Paginated<UserDto>>(usersListKey(page, search, limit)),
  });
}

/* ------------- Mutations -------------------- */
export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useRemoveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}
