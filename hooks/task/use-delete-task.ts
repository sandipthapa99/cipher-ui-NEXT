import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface DeleteTaskPayload {
    id?: string;
}
export interface DeleteTaskResponse {
    message: string;
}
export const useDeleteTask = () => {
    return useMutation<string, AxiosError, DeleteTaskPayload>(
        ({ id }) =>
            axiosClient
                .delete<DeleteTaskResponse>(`/task/entity/service/${id}`)
                .then((response) => response.data.message),
        {}
    );
};
