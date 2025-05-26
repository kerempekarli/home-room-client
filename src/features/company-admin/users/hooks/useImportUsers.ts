// src/features/company-admin/users/hooks/useImportUsers.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useImportUsers() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (file: File) => {
            const fd = new FormData();
            fd.append("file", file);
            return api.post("/users/import", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            // tüm kullanıcı sorgularını tazele
            qc.invalidateQueries({ queryKey: ["users"] });
        },
    });
}
