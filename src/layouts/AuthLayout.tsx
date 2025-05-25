// src/layouts/AuthLayout.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Home-Room
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Outlet /> {/* LoginForm, ResetPasswordForm vs. */}
        </CardContent>
      </Card>
    </main>
  );
}
