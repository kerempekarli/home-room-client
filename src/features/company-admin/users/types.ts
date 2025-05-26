// src/features/company-admin/users/types.ts

export type Role = "EMPLOYEE" | "ADMIN" | "SUPER_ADMIN";
export type CreatableRole = "EMPLOYEE" | "ADMIN";

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface CreateUserInput {
  /** backend CreateUserDto alanları */
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;           // ADMIN, EMPLOYEE
  tenantId: string;
}
