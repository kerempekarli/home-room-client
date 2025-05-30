import type { Setting, UpdateSettingDto } from './types';
import { queryClient } from '@/lib/queryClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/axios';
import axios from 'axios';

export const useSetting = () =>
    useQuery({
        queryKey: ['setting'],
        queryFn: async () => {
            const res = await api.get<Setting>('/setting');
            return res.data;
        },
    });

export const useUpdateSetting = () =>
    useMutation({
        mutationFn: async (dto: UpdateSettingDto) => {
            const res = await api.put<Setting>('/setting', dto);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['setting'], data);
            toast.success('Ayarlar kaydedildi ✔');
        },
        onError: (err: unknown) => {
            const msg =
                axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : 'Hata oluştu';
            toast.error(msg);
        },
    });
