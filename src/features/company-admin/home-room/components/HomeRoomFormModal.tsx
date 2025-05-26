import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import { useCreateHomeRoom } from "../hooks";

export default function HomeRoomFormModal() {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(dayjs().format("YYYY-MM-DD"));
  const [end, setEnd] = useState(dayjs().add(13, "day").format("YYYY-MM-DD"));
  const { mutate: createRoom, isPending } = useCreateHomeRoom();

  const handleSubmit = () => {
    createRoom(
      { cycleStart: new Date(start).toISOString(), cycleEnd: new Date(end).toISOString() },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Yeni Home-Room</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Home-Room Oluştur</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="start">Başlangıç</Label>
            <Input
              id="start"
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="end">Bitiş</Label>
            <Input
              id="end"
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} disabled={isPending} className="w-full">
            {isPending ? "Oluşturuluyor…" : "Oluştur"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
