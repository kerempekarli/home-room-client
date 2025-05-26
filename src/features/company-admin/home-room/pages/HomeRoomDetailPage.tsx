import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useHomeRooms } from "../hooks";
import { getStatus } from "../components/HomeRoomCard";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function HomeRoomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: rooms, isLoading } = useHomeRooms();
  const room = rooms?.find((r) => r.id === id);

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!room) return <p>Home-Room bulunamadı.</p>;

  const status = getStatus(room);

  return (
    <div className="space-y-6">
      <Link to="/company-admin/home-rooms" className="inline-flex items-center gap-2">
        <ArrowLeft size={16} /> Geri dön
      </Link>

      <h2 className="text-2xl font-semibold flex items-center gap-4">
        Home-Room Detayı
        <Badge>{status}</Badge>
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-muted-foreground">Başlangıç</p>
          <p>{dayjs(room.cycleStart).format("DD.MM.YYYY")}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Bitiş</p>
          <p>{dayjs(room.cycleEnd).format("DD.MM.YYYY")}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Oluşturulma</p>
          <p>{dayjs(room.createdAt).format("DD.MM.YYYY HH:mm")}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Güncellenme</p>
          <p>{dayjs(room.updatedAt).format("DD.MM.YYYY HH:mm")}</p>
        </div>
      </div>
    </div>
  );
}
