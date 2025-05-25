import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createTenantSchema,
    type CreateTenantForm,
} from "../types";
import { useCreateTenantThenAdmin } from "../hooks";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function TenantFormModal({ open, onClose }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateTenantForm>({
        resolver: zodResolver(createTenantSchema),
    });

    const { mutateAsync } = useCreateTenantThenAdmin();

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    const onSubmit = async (values: CreateTenantForm) => {
        try {
            await mutateAsync(values);
            toast("Şirket ve Admin oluşturuldu");
            onClose();
        } catch (err: any) {
            toast.error("Hata", {
                description: err?.response?.data?.message || "İşlem başarısız",
            });

        };

    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Yeni Şirket + Admin</DialogTitle>
                </DialogHeader>

                <form
                    id="tenant-form"
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Tenant */}
                    <div>
                        <Label>Şirket Adı</Label>
                        <Input {...register("companyName")} />
                        {errors.companyName && (
                            <p className="text-sm text-red-600">
                                {errors.companyName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Slug</Label>
                        <Input {...register("slug")} />
                        {errors.slug && (
                            <p className="text-sm text-red-600">{errors.slug.message}</p>
                        )}
                    </div>

                    <hr />

                    {/* Admin */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Ad</Label>
                            <Input {...register("adminFirstName")} />
                            {errors.adminFirstName && (
                                <p className="text-sm text-red-600">
                                    {errors.adminFirstName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label>Soyad</Label>
                            <Input {...register("adminLastName")} />
                            {errors.adminLastName && (
                                <p className="text-sm text-red-600">
                                    {errors.adminLastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input type="email" {...register("adminEmail")} />
                        {errors.adminEmail && (
                            <p className="text-sm text-red-600">
                                {errors.adminEmail.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label>Şifre</Label>
                        <Input type="password" {...register("adminPassword")} />
                        {errors.adminPassword && (
                            <p className="text-sm text-red-600">
                                {errors.adminPassword.message}
                            </p>
                        )}
                    </div>
                </form>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Vazgeç
                    </Button>
                    <Button
                        type="submit"
                        form="tenant-form"
                        disabled={isSubmitting}
                    >
                        Kaydet
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
