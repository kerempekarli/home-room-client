import { api } from "@/lib/axios";
import type {
    AssignParticipantsForm,
    CreateHomeRoomForm,
    HomeRoom,
    HomeRoomParticipant,
} from "./types";

/* ---- Home-Room listesi ---- */
export const fetchHomeRooms = async (): Promise<HomeRoom[]> => {
    const res = await api.get("/home-rooms");
    console.log("RES ", res)
    console.log("RES.DATA ", res.data)
    return res.data.data;
};

/* ---- Home-Room oluştur ---- */
export const createHomeRoom = async (input: CreateHomeRoomForm): Promise<HomeRoom> => {
    const res = await api.post("/home-rooms", input);
    return res.data;
};

/* ---- Katılımcı atama ---- */
export const assignParticipants = async (
    id: string,
    input: AssignParticipantsForm,
): Promise<HomeRoomParticipant[]> => {
    const res = await api.post(`/home-rooms/${id}/participants`, input);
    return res.data;
};

/* ---- Katılımcı listesi ---- */
export const fetchParticipants = async (
    id: string,
): Promise<HomeRoomParticipant[]> => {
    const res = await api.get(`/home-rooms/${id}/participants`);
    return res.data;
};
