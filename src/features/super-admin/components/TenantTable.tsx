import { useTenants } from "../hooks";

export function TenantTable() {
  const { data, isLoading, error } = useTenants();

  if (isLoading) return <p>Yükleniyor…</p>;
  if (error) return <p>Hata oluştu</p>;

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">Şirket</th>
            <th className="px-3 py-2 text-left">Slug</th>
            <th className="px-3 py-2 text-left">Oluşturulma</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((t: any) => (
              <tr key={t.id} className="border-t">
                <td className="px-3 py-2">{t.name}</td>
                <td className="px-3 py-2">{t.slug}</td>
                <td className="px-3 py-2">
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
