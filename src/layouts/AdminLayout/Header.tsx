// src/layouts/AdminLayout/Header.tsx
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth.store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
    const { user, setToken, setUser } = useAuth();
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <header className="flex items-center justify-between border-b bg-background px-4 py-2">
            <h1 className="text-lg font-medium">Admin Panel</h1>

            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarFallback>
                        {user?.email?.[0]?.toUpperCase() ?? 'A'}
                    </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm">{user?.email}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                    Çıkış
                </Button>
            </div>
        </header>
    );
}
