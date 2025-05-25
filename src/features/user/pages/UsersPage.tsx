// src/features/user/pages/UsersPage.tsx
import UserTable from '../components/UserTable';

export default function UsersPage() {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Kullanıcılar</h1>
                {/* İstersen yeni kullanıcı diyaloğunu burada aktif edebilirsin */}
                {/* <CreateUserDialog /> */}
            </div>

            <UserTable />
        </section>
    );
}
