export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string | null;
}

export interface ApiError {
  success: false;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'EMPLOYEE';
  tenantId: string | null;
}

export interface LoginData {   // <- eski LoginResponse
  accessToken: string;
  refreshToken: string;
  user: User;
}
