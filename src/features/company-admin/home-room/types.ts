/** Temel Home-Room modeli (backend entity’si ile tamamen uyumlu) */
export interface HomeRoom {
  id: string;
  cycleStart: string;   // ISO 8601  → Date yerine string tutuyoruz
  cycleEnd: string;
  createdAt: string;
  updatedAt: string;
}

/** Katılımcı */
export interface HomeRoomParticipant {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

/** Oluşturma formu */
export interface CreateHomeRoomForm {
  cycleStart: string;   // ISO
  cycleEnd: string;     // ISO
}

/** Katılımcı atama formu */
export interface AssignParticipantsForm {
  userIds: string[];
}
