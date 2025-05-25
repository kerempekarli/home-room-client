import type { User } from '../types';
import { useDeleteUser } from '../hooks';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/auth.store';

export default function UserRowActions({ user }: { user: User }) {
  const { user: currentUser } = useAuth();
  const { mutate, isPending } = useDeleteUser();

  if (currentUser?.role !== 'ADMIN') return null;

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => mutate(user.id)}
    >
      Sil
    </Button>
  );
}
