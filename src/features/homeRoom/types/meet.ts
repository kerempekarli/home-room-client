export interface MeetParticipant {
    id: string;
    name: string;
}

export interface MeetItem {
    meetId: string;
    startAt: string;
    endAt: string;
    participants: MeetParticipant[];
}
