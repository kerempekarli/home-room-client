// src/features/auth/api.ts
import { api } from '@/lib/axios';
import type { LoginPayload, LoginData, ApiResponse } from './types';

export const loginRequest = async (
  payload: LoginPayload,
): Promise<LoginData> => {
  const { data } = await api.post<ApiResponse<LoginData>>(
    '/auth/login',
    payload,
  );

  if (!data.success) throw new Error(data.message || 'Giriş başarısız');

  return data.data; // <-- artık net LoginData dönüyor
};
