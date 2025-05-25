import { api } from "@/lib/axios";

/* ---- Tenant listesi ---- */
export const fetchTenants = async () => {
  const res = await api.get("/tenants");
  return res.data;            // backend dizi döndürmeli
};
