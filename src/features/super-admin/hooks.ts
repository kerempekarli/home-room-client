import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTenants } from "./api";
import { type CreateTenantForm } from "./types";
import { api } from "@/lib/axios";

/* ---- Tenant listesini getir ---- */
export const useTenants = () =>
  useQuery({ queryKey: ["tenants"], queryFn: fetchTenants });

/* ---- Önce Tenant, sonra Admin user ---- */
export const useCreateTenantThenAdmin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTenantForm) => {
      /* 1) Tenant */
      const tenant = await api
        .post("/tenants", {
          name: input.companyName,
          slug: input.slug,
        })
        .then((r) => r.data); // { id, ... }

      /* 2) Admin user */
      await api.post(
        "/users",
        {
          email: input.adminEmail,
          password: input.adminPassword,
          role: "ADMIN",
          firstName: input.adminFirstName,
          lastName: input.adminLastName,
          tenantId: tenant.id
        }
      );

      return tenant;
    },

    onSuccess: () => qc.invalidateQueries({ queryKey: ["tenants"] }),
  });
};
