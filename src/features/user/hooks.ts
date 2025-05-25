import { useQuery, useMutation, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { getUsers, deleteUser } from './api';
import type { PaginatedResult, User } from './types';

export const useUsers = (
    page: number,
    limit = 10,
): UseQueryResult<PaginatedResult<User>> =>
    useQuery({
        queryKey: ['users', page],
        queryFn: () => getUsers(page, limit),
    });

export const useDeleteUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
    });
};
