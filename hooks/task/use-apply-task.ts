import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface ApplyTaskPayload {
    task: string;
    remarks: string;
    charge: number;
    pre_requisites: string;
}
export interface ApplyTaskResponse {
    task: string;
}
export const useApplyTask = () =>
    useMutation<ApplyTaskResponse, AxiosError<{ task: any }>, ApplyTaskPayload>(
        (applyTaskPayload) =>
            axiosClient
                .post("/task/application/", applyTaskPayload)
                .then((res) => res.data)
    );
