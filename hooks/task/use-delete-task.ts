import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface DeleteTaskPayload {
    id: string;
}
export interface DeleteTaskResponse {
    message: string;
}
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation<string, AxiosError, DeleteTaskPayload>(
        ({ id }) =>
            axiosClient
                .delete<DeleteTaskResponse>(`/task/uuid/${id}`)
                .then((response) => response.data.message),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["all-tasks"]);
            },
        }
    );
};
