import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    assignParticipants,
    createHomeRoom,
    fetchHomeRooms,
    fetchParticipants,
} from "./api";
import type {
    AssignParticipantsForm,
    HomeRoom,
    HomeRoomParticipant,
} from "./types";

/* ---- Home-Room listesi ---- */
export const useHomeRooms = () =>
    useQuery<HomeRoom[]>({ queryKey: ["homeRooms"], queryFn: fetchHomeRooms });

/* ---- Home-Room oluştur ---- */
export const useCreateHomeRoom = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createHomeRoom,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["homeRooms"] }),
    });
};

/* ---- Katılımcı listesi ---- */
export const useHomeRoomParticipants = (id?: string | null) =>
    useQuery<HomeRoomParticipant[]>({
        enabled: !!id,
        queryKey: ["homeRoomParticipants", id],
        queryFn: () => fetchParticipants(id as string),
    });

/* ---- Katılımcı atama ---- */
export const useAssignParticipants = (id: string) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (input: AssignParticipantsForm) => assignParticipants(id, input),
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: ["homeRoomParticipants", id] }),
    });
};
