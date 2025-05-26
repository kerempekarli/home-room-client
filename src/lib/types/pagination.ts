// src/lib/types/pagination.ts

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}
