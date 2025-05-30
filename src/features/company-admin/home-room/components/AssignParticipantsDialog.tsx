    import {
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import { useState } from "react";
    import { Input } from "@/components/ui/input";
    import { useAssignParticipants } from "../hooks";

    interface Props {
        homeRoomId: string;
    }

    export default function AssignParticipantsDialog({ homeRoomId }: Props) {
        const [open, setOpen] = useState(false);
        const [userIds, setUserIds] = useState<string>(""); // virgülle girilen id'ler
        const { mutate, isPending } = useAssignParticipants(homeRoomId);

        const handleSave = () => {
            const ids = userIds
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
            mutate({ userIds: ids }, { onSuccess: () => setOpen(false) });
        };

        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="secondary">Katılımcı Ekle</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Katılımcı Ekle</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">
                        Geçici demo: Kullanıcı UUID’lerini virgülle ayırarak gir.
                    </p>

                    <Input
                        placeholder="uuid1, uuid2, uuid3"
                        value={userIds}
                        onChange={(e) => setUserIds(e.target.value)}
                    />

                    <Button className="w-full mt-4" disabled={isPending} onClick={handleSave}>
                        Kaydet
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }
