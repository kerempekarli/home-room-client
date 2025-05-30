export interface MeetingWindow {
    start: number; // 0-23
    end: number;   // 1-24
}

export interface Setting {
    cycleLengthDays: number;
    matchesPerUser: number;
    tz: string;
    meetingWindow: MeetingWindow;
    location?: string;
}

export type UpdateSettingDto = Setting;
