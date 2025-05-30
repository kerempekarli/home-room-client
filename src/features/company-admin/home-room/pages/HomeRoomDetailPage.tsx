import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { getStatus } from "../components/HomeRoomCard";
import {
  useHomeRoomById,
  useHomeRoomParticipants,
} from "../hooks";
import ParticipantsTable from "../components/ParticipantsTable";
import AssignParticipantsDialog from "../components/AssignParticipantsDialog";

export default function HomeRoomDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: room, isLoading: loadingRoom } = useHomeRoomById(id);
  const {
    data: participants = [],
    isLoading: loadingParts,
  } = useHomeRoomParticipants(id);

  const loading = loadingRoom || loadingParts;

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!room) return <p>Home-Room bulunamadı.</p>;

  return (
    <div className="space-y-8">
      <Link to="/admin/home-rooms" className="inline-flex items-center gap-2">
        <ArrowLeft size={16} /> Geri dön
      </Link>

      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">
          {dayjs(room.cycleStart).format("DD.MM.YYYY")} –{" "}
          {dayjs(room.cycleEnd).format("DD.MM.YYYY")}
        </h2>
        <Badge>{getStatus(room)}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-muted-foreground">Oluşturulma</p>
          <p>{dayjs(room.createdAt).format("DD.MM.YYYY HH:mm")}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Güncellenme</p>
          <p>{dayjs(room.updatedAt).format("DD.MM.YYYY HH:mm")}</p>
        </div>
      </div>

      {/* Katılımcılar */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Katılımcılar</h3>
        <AssignParticipantsDialog homeRoomId={room.id} />
      </div>
      <ParticipantsTable data={participants} />
    </div>
  );
}
