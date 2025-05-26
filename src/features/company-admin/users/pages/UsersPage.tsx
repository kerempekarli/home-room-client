// src/features/company-admin/users/pages/UsersPage.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserTable from "../components/UserTable";
import AddUserDialog from "../components/AddUserDialog";
import { Pagination } from "@/components/ui/pagination";
import { useUsers } from "../hooks";
import { useAuth } from "@/store/auth.store";
import UserImportButton from "../components/UserImportButton";

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const tenantId = (user as any)?.tenantId ?? "";

    const { data, isLoading } = useUsers(page, search, limit);

    if (isLoading) return <div>Yükleniyor…</div>;
    console.log("USER DATA ", data)
    const users = data?.items ?? [];  // ✅ 'data' içindeki diziye erişiyoruz
    const total = data?.meta?.itemCount ?? 0;



    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Input
                    className="w-64"
                    placeholder="İsim veya email ara…"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />
                <Button onClick={() => setOpen(true)}>Yeni Kullanıcı</Button>
                <div className="flex gap-2">
                    <UserImportButton />
                    <Button onClick={() => setOpen(true)}>Yeni Kullanıcı</Button>
                </div>
            </div>

            <UserTable users={users} />

            <Pagination
                page={page}
                limit={limit}
                total={total}
                onPageChange={setPage}
            />

            <AddUserDialog
                open={open}
                onOpenChange={setOpen}
                tenantId={tenantId}
            />
        </div>
    );
}
