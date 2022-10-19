import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export const useDeleteAccount = <TData = unknown, TPayload = unknown>(
    url: string
) => {
    return useMutation<TData, Error, TPayload>(async (payload) => {
        try {
            const { data } = await axiosClient.post<TData>(url, payload);
            return data;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    });
};
