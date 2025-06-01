export interface MeetParticipant {
    id: string;
    name: string;
}

export interface MeetDTO {
    meetId: string;
    startAt: string; // ISO string
    endAt: string;
    participants: MeetParticipant[];
}

export interface HomeRoom {
    homeRoomId: string;
    cycleStart: string;
    cycleEnd: string;
    meets: MeetDTO[];
}

// Detay sayfası için ek alanlar gerekiyorsa burada tutabilirsin:
export interface HomeRoomDetail extends HomeRoom {
    // Örneğin: feedback verildi/ verilmedi bilgisi, ek özel alanlar
}
