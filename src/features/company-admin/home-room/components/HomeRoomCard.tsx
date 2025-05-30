import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { HomeRoom } from "../types";

export const getStatus = (room: HomeRoom) => {
    const now = dayjs();
    if (now.isBefore(room.cycleStart)) return "SCHEDULED";
    if (now.isAfter(room.cycleEnd)) return "COMPLETED";
    return "ONGOING";
};

const statusColor: Record<ReturnType<typeof getStatus>, string> = {
    SCHEDULED: "bg-blue-500",
    ONGOING: "bg-green-500",
    COMPLETED: "bg-gray-400",
};

interface Props {
    room: HomeRoom;
}

export default function HomeRoomCard({ room }: Props) {
    const navigate = useNavigate();
    const status = getStatus(room);

    return (
        <Card
            className="cursor-pointer transition hover:shadow-lg"
            onClick={() => navigate(`/admin/home-rooms/${room.id}`)}
        >
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                    <span>
                        {dayjs(room.cycleStart).format("DD.MM.YYYY")} →{" "}
                        {dayjs(room.cycleEnd).format("DD.MM.YYYY")}
                    </span>
                    <Badge className={statusColor[status]}>{status}</Badge>
                </CardTitle>
                <CardDescription>
                    Oluşturulma: {dayjs(room.createdAt).format("DD.MM.YYYY")}
                </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Başlangıç</p>
                    <p>{dayjs(room.cycleStart).format("DD.MM.YYYY")}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Bitiş</p>
                    <p>{dayjs(room.cycleEnd).format("DD.MM.YYYY")}</p>
                </div>
            </CardContent>
        </Card>
    );
}
