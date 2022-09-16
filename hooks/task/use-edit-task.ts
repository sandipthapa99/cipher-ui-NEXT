import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface EditTaskPayload {
    id: string;
    data: any;
}
export interface EditTaskResponse {
    status: string;
    message: string;
}
export const useEditTask = () => {
    return useMutation<string, AxiosError, EditTaskPayload>(({ id, data }) =>
        axiosClient
            .put<EditTaskResponse>(`/task/uuid/${id}/`, data)
            .then((response) => response.data.message)
    );
};
