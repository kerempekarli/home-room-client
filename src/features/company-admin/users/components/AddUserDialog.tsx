// src/features/company-admin/users/components/AddUserDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateUser } from "../hooks";
import type { CreatableRole } from "../types";
import { toast } from "sonner";

const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["EMPLOYEE", "ADMIN"]),
});

type FormData = z.infer<typeof userSchema>;

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  tenantId: string;
}

export default function AddUserDialog({ open, onOpenChange, tenantId }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "EMPLOYEE",
    },
  });

  /* ----- 1.  status -> isLoading  ----- */
  const { mutate, status } = useCreateUser();
  const isLoading = status === "pending";

  function onSubmit(data: FormData) {
    mutate(
      { ...data, tenantId } as any,
      {
        onSuccess: () => {
          toast("Kullanıcı eklendi");
          form.reset();
          onOpenChange(false);
        },
        onError: (err: any) =>
          toast("Hata"
            , err
          ),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-2"
        >
          <Input
            placeholder="Ad"
            {...form.register("firstName")}
            disabled={isLoading}
          />
          <Input
            placeholder="Soyad"
            {...form.register("lastName")}
            disabled={isLoading}
          />
          <Input
            type="email"
            placeholder="E-posta"
            {...form.register("email")}
            disabled={isLoading}
          />
          <Input
            type="password"
            placeholder="Parola (min 8)"
            {...form.register("password")}
            disabled={isLoading}
          />

          <Select
            value={form.watch("role")}
            onValueChange={(v: CreatableRole) => form.setValue("role", v)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EMPLOYEE">EMPLOYEE</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Vazgeç
            </Button>
            <Button type="submit" disabled={isLoading}>
              Kaydet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
