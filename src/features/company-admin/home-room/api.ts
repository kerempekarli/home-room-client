import { api } from "@/lib/axios";
import type {
  ApiResponse,
  HomeRoom,
  HomeRoomParticipant,
  AssignParticipantsForm,
  CreateHomeRoomForm,
} from "./types";

/* ---- Liste ---- */
export const fetchHomeRooms = async (): Promise<HomeRoom[]> => {
  const res = await api.get<ApiResponse<HomeRoom[]>>("/home-rooms");
  return res.data.data;
};

/* ---- Detay ---- */
export const fetchHomeRoomById = async (): Promise<HomeRoom> => {
  const res = await api.get<ApiResponse<HomeRoom>>(`/home-rooms`);
  return res.data.data;
};

/* ---- Katılımcı listesi ---- */
export const fetchParticipants = async (
  id: string,
): Promise<HomeRoomParticipant[]> => {
  const res = await api.get<ApiResponse<HomeRoomParticipant[]>>(
    `/home-rooms/${id}/participants`,
  );
  return res.data.data;
};

/* ---- Katılımcı atama ---- */
export const assignParticipants = async (
  id: string,
  input: AssignParticipantsForm,
): Promise<HomeRoomParticipant[]> => {
  const res = await api.post<ApiResponse<HomeRoomParticipant[]>>(
    `/home-rooms/${id}/participants`,
    input,
  );
  return res.data.data;
};

/* ---- Oluştur ---- */
export const createHomeRoom = async (
  input: CreateHomeRoomForm,
): Promise<HomeRoom> => {
  const res = await api.post<ApiResponse<HomeRoom>>("/home-rooms", input);
  return res.data.data;
};
