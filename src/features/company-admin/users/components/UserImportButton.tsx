// src/features/company-admin/users/components/UserImportButton.tsx
import { useRef } from "react";
import { toast } from "sonner";             // şadcn/ui toast
import { Button } from "@/components/ui/button";
import { useImportUsers } from "../hooks/useImportUsers";

export default function UserImportButton() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutate, isPending } = useImportUsers();

    const handleSelect = () => inputRef.current?.click();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        mutate(file, {
            onSuccess: () => toast.success("Kullanıcılar içe aktarıldı"),
            onError: () => toast.error("İçe aktarma başarısız"),
        });
        e.target.value = ""; // aynı dosyayı tekrar seçebilmek için
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleChange}
            />
            <Button variant="outline" onClick={handleSelect} disabled={isPending}>
                Excel ile İçe Aktar
            </Button>
        </>
    );
}
