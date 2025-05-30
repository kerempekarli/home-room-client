import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchHomeRooms,
    fetchHomeRoomById,
    fetchParticipants,
    assignParticipants,
    createHomeRoom,
} from "./api";
import type {
    AssignParticipantsForm,
    HomeRoom,
    HomeRoomParticipant,
} from "./types";

/* ---- Liste ---- */
export const useHomeRooms = () =>
    useQuery<HomeRoom[]>({ queryKey: ["homeRooms"], queryFn: fetchHomeRooms });

/* ---- Detay ---- */
export const useHomeRoomById = () =>
    useQuery<HomeRoom>({

        queryKey: ["homeRoom"],
        queryFn: () => fetchHomeRoomById(),
    });

/* ---- Katılımcılar ---- */
export const useHomeRoomParticipants = (id?: string | null) =>
    useQuery<HomeRoomParticipant[]>({
        enabled: !!id,
        queryKey: ["homeRoomParticipants", id],
        queryFn: () => fetchParticipants(id as string),
    });

/* ---- Katılımcı ekleme ---- */
export const useAssignParticipants = (id: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (input: AssignParticipantsForm) =>
            assignParticipants(id, input),
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: ["homeRoomParticipants", id] }),
    });
};

/* ---- Oluşturma ---- */
export const useCreateHomeRoom = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createHomeRoom,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["homeRooms"] }),
    });
};
