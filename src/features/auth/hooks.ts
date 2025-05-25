// src/features/auth/hooks.ts
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from './api';
import { useAuth } from '@/store/auth.store';
import type { LoginPayload, LoginData } from './types';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { setToken, setRefreshToken, setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation<LoginData, Error, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUser(data.user);
      navigate(data.user.role === 'ADMIN' ? '/admin/users' : '/');
    },
  });
};
