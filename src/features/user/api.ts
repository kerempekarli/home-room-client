import { api } from '@/lib/axios';
import type { PaginatedResult, User } from './types';

export const getUsers = async (page = 1, limit = 10) => {
  const { data } = await api.get<PaginatedResult<User>>('/users', {
    params: { page, limit },
  });
  return data;
};

export const deleteUser = async (id: string) => {
  await api.patch(`/users/${id}/remove`);
};
