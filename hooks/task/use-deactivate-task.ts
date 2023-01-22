import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface DeactivateTaskPayload {
    id: string;
}
export interface DeactivateTaskResponse {
    message: string;
}
export const useDeactivateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<string, AxiosError, DeactivateTaskPayload>(
        ({ id }) =>
            axiosClient
                .patch<DeactivateTaskResponse>(`/task/uuid/${id}/`, {
                    is_active: false,
                })
                .then((response) => response.data.message),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["all-tasks"]);
            },
        }
    );
};
