import { z } from "zod";

/* --------- Zod Form Şeması --------- */
export const createTenantSchema = z.object({
  companyName: z.string().min(2, "Şirket adı çok kısa"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Sadece küçük harf, rakam ve tire")
    .min(2),
  adminFirstName: z.string().min(2),
  adminLastName: z.string().min(2),
  adminEmail: z.string().email("Geçersiz e-posta"),
  adminPassword: z.string().min(8, "En az 8 karakter"),
});

export type CreateTenantForm = z.infer<typeof createTenantSchema>;
