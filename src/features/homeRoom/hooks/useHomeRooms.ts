import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { HomeRoom } from '../types/homeRoom';

export const useHomeRooms = () =>
    useQuery<HomeRoom[]>({
        queryKey: ['homeRooms'],
        queryFn: async () => {
            const { data } = await api.get('/home-rooms/me');
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 dakikalık önbellek süresi
    });
