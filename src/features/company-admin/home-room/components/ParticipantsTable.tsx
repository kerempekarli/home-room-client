import type { HomeRoomParticipant } from "../types";

interface Props {
  data: HomeRoomParticipant[];
}

export default function ParticipantsTable({ data }: Props) {
  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-3 py-2 text-left">Ad Soyad</th>
            <th className="px-3 py-2 text-left">E-posta</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-3 py-2">
                {p.user.firstName} {p.user.lastName}
              </td>
              <td className="px-3 py-2">{p.user.email}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={2} className="px-3 py-4 text-center text-muted-foreground">
                Henüz katılımcı yok
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
