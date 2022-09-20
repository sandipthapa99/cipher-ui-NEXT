import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface EditServiceResponse {
    status: string;
    message: string;
}

export interface EditServicePayload {
    id: string;
    data: any;
}

export const useEditService = () => {
    return useMutation<string, AxiosError, EditServicePayload>(({ id, data }) =>
        axiosClient
            .patch<EditServiceResponse>(`/task/entity/service/${id}/`, data)
            .then(() => "Successfully edited service")
    );
};
