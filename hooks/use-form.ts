import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export const useForm = <TData = unknown, TPayload = unknown>(url: string) => {
    const queryClient = useQueryClient();
    return useMutation<TData, Error, TPayload>(async (payload) => {
        try {
            const { data } = await axiosClient.post<TData>(url, payload);
            return data;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    });
};
