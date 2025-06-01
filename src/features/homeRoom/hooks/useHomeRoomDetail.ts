import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { HomeRoomDetail } from '../types/homeRoom';

export const useHomeRoomDetail = (homeRoomId: string) =>
    useQuery<HomeRoomDetail>({
        queryKey: ['homeRoomDetail', homeRoomId],
        queryFn: async () => {
            const { data } = await api.get(`/home-rooms/${homeRoomId}`);
            return data;
        },
        enabled: !!homeRoomId,
    });
