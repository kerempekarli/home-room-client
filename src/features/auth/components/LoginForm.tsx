import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

const schema = z.object({
    email: z.string().email({ message: 'Geçersiz e-posta' }),
    password: z.string().min(6, { message: 'En az 6 karakter' }),
});
type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
    const { mutate, isPending, error } = useLogin();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: '', password: '' },
    });

    return (
        <main className="grid min-h-screen place-items-center bg-muted/40 px-4">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Giriş Yap</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((v) => mutate(v))}
                            className="space-y-5"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input placeholder="you@email.com" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            type="password"
                                            placeholder="••••••"
                                            {...field}
                                            autoComplete="current-password"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <p className="text-sm text-destructive">
                                    {(error as any).response?.data?.message ?? 'Giriş başarısız'}
                                </p>
                            )}

                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? '...' : 'Giriş'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}
