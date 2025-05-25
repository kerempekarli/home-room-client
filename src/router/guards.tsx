import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/auth.store';

export function RequireAuth() {
    const { token } = useAuth();
    const loc = useLocation();

    if (!token) return <Navigate to="/login" state={{ from: loc }} replace />;
    return <Outlet />;
}

export function RequireRole({ roles }: { roles: string[] }) {
    const { user } = useAuth();
    const loc = useLocation();

    if (!user || !roles.includes(user.role))
        return <Navigate to="/unauthorized" state={{ from: loc }} replace />;

    return <Outlet />;
}
