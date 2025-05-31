import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Setting } from '../types';
import { useSetting, useUpdateSetting } from '../api';
import { Button } from '@/components/ui/button';
import { Input2 } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import moment from 'moment-timezone';

const schema = z.object({
    cycleLengthDays: z.number().int().min(7).max(30),
    matchesPerUser: z.number().int().min(1).max(5),
    tz: z.string().min(1),
    meetingWindow: z.object({
        start: z.number().int().min(0).max(23),
        end: z.number().int().min(1).max(24),
    }).refine(({ start, end }) => start < end, {
        message: 'Bitiş saati başlangıçtan büyük olmalı',
        path: ['end'],
    }),
    location: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export const SettingForm = () => {
    const { data, isLoading } = useSetting();
    const update = useUpdateSetting();

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        values: data ?? {
            cycleLengthDays: 14,
            matchesPerUser: 2,
            tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
            meetingWindow: { start: 9, end: 18 },
            location: '',
        },
    });

    if (isLoading) return <Spinner />;

    const onSubmit = (values: FormValues) => {
        update.mutate(values as Setting);
    };

    const timeZones = moment.tz.names(); // ✅ 500+ time zone verir



    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-6 max-w-lg mx-auto"
        >
            <Input2
                label="Cycle Length (gün)"
                type="number"
                {...register('cycleLengthDays', { valueAsNumber: true })}
                error={errors.cycleLengthDays?.message}
            />

            <Input2
                label="Kullanıcı başına eşleşme"
                type="number"
                {...register('matchesPerUser', { valueAsNumber: true })}
                error={errors.matchesPerUser?.message}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input2
                    label="Toplantı Başlangıç (saat)"
                    type="number"
                    {...register('meetingWindow.start', { valueAsNumber: true })}
                    error={errors.meetingWindow?.start?.message}
                />
                <Input2
                    label="Toplantı Bitiş (saat)"
                    type="number"
                    {...register('meetingWindow.end', { valueAsNumber: true })}
                    error={errors.meetingWindow?.end?.message}
                />
            </div>

            <Controller
                control={control}
                name="tz"
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>{field.value}</SelectTrigger>
                        <SelectContent className="h-60 overflow-y-auto">
                            {timeZones.map((tz) => (
                                <SelectItem key={tz} value={tz}>
                                    {tz}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.tz && (
                <p className="text-sm text-red-500">{errors.tz.message}</p>
            )}

            <Input2
                label="Lokasyon (opsiyonel)"
                {...register('location')}
                error={errors.location?.message}
            />

            <Button type="submit" disabled={update.isPending}>
                {update.isPending ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
        </form>
    );
};
