import { Loader2 } from "lucide-react";
import { useHomeRooms } from "../hooks";
import HomeRoomCard from "../components/HomeRoomCard";
import HomeRoomFormModal from "../components/HomeRoomFormModal";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function HomeRoomListPage() {
    const { data, isLoading } = useHomeRooms();
    const [search, setSearch] = useState("");
    console.log("HomeRoomListPage Data ", data)
    const filtered = data?.filter((r) =>
        r.id.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Ara…"
                    className="w-56"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <HomeRoomFormModal />
            </div>

            {isLoading ? (
                <div className="flex justify-center p-10">
                    <Loader2 className="animate-spin" />
                </div>
            ) : !filtered?.length ? (
                <p className="text-center text-muted-foreground mt-10">
                    Henüz Home-Room yok
                </p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((room) => (
                        <HomeRoomCard key={room.id} room={room} />
                    ))}
                </div>
            )}
        </div>
    );
}
