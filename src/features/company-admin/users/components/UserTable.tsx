// src/features/company-admin/users/components/UserTable.tsx   🔄 GÜNCEL TAM SÜRÜM
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { UserDto } from "../types";
import { useRemoveUser } from "../hooks";

interface Props {
  users: UserDto[];
}

export default function UserTable({ users }: Props) {
  const { mutate: removeUser } = useRemoveUser();
  console.log("Component users ", users)
  function handleRemove(id: string) {
    if (confirm("Kullanıcıyı silmek istediğine emin misin?")) removeUser(id);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ad Soyad</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead className="w-1" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.isArray(users) && users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{`${u.firstName} ${u.lastName}`}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>
              <Badge variant="outline">{u.role}</Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreHorizontal size={16} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => alert("Edit coming soon")}>
                    Düzenle
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleRemove(u.id)}
                    className="text-destructive"
                  >
                    Sil
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
