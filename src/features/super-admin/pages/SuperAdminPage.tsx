import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TenantTable } from "../components/TenantTable";
import { TenantFormModal } from "../components/TenantFormModal";

export default function SuperAdminPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Şirketler</h1>
        <Button onClick={() => setOpen(true)}>+ Yeni Şirket</Button>
      </div>

      <TenantTable />
      <TenantFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
