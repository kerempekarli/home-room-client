// src/components/ui/pagination.tsx
import { Button } from "./button";

interface Props {
  page: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
}

export function Pagination({ page, total, limit, onPageChange }: Props) {
  const pageCount = Math.ceil(total / limit);
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ‹
      </Button>
      <span className="text-sm">
        {page}/{pageCount}
      </span>
      <Button
        size="sm"
        variant="outline"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        ›
      </Button>
    </div>
  );
}
