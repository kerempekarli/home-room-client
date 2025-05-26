/** Home-Room çekirdek modeli */
export interface HomeRoom {
    id: string;
    name: string;
    startDate: string;      // ISO-8601
    endDate: string;
    status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED';
    participantCount: number;
    createdAt: string;
    updatedAt: string;
}

/** Sayfalama metadatası (backend’in ortak yapısına uygun) */
export interface PaginationMeta {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
}

export interface HomeRoomListResponse {
    items: HomeRoom[];
    meta: PaginationMeta;
}

/** Oluşturma input’u */
export interface CreateHomeRoomInput {
    name: string;
    startDate: string;
    endDate: string;
}
