import { api } from '@/lib/axios';
import type { HomeRoom } from '../types/homeRoom';

export const fetchHomeRooms = async (): Promise<HomeRoom[]> => {
    const { data } = await api.get('/home-rooms/me');
    return data;
};

export const fetchHomeRoomDetail = async (id: string): Promise<HomeRoom> => {
    const { data } = await api.get(`/home-rooms/${id}`);
    return data;
};
