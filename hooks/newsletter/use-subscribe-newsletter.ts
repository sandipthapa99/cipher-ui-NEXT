import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export const useSubscribeNewsletter = () => {
    return useMutation<any, Error, string>(async (email) => {
        try {
            const response = await axiosClient.post<{ message: string }>(
                "support/newsletter/subscribe",
                {
                    email,
                }
            );
            return response.data.message;
        } catch (error: any) {
            throw new Error(error.response.data?.email[0]);
        }
    });
};
