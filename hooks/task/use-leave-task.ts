import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface LeaveTaskPayload {
    id: number;
}
export interface LeaveTaskApiResponse {
    status: "success" | "error";
    message: string;
}
export const useLeaveTask = () => {
    const queryClient = useQueryClient();
    return useMutation<string, AxiosError, LeaveTaskPayload>(
        ({ id }) =>
            axiosClient
                .patch(`/task/application/cancel/${id}/`)
                .then((res) => res.data.message),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["applied-tasks"]);
            },
        }
    );
};
