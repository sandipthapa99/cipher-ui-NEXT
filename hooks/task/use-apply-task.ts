import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface ApplyTaskPayload {
    entity_service: string;
    description: string;
    budget_to: number;
}
export interface ApplyTaskResponse {
    task: string;
}
export const useApplyTask = () => {
    const queryClient = useQueryClient();
    return useMutation<
        ApplyTaskResponse,
        AxiosError<{ task: any }>,
        ApplyTaskPayload
    >(
        (applyTaskPayload) =>
            axiosClient
                .post("/task/application/", applyTaskPayload)
                .then((res) => res.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["applied-tasks"]);
            },
        }
    );
};
