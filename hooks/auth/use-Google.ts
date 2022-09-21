import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import urls from "constants/urls";
import { axiosClient } from "utils/axiosClient";

export const useGoogle = () => {
    return useMutation<{ access: string; refresh: string }, Error, any>(
        async (googlePayload) => {
            try {
                const { data } = await axiosClient.post(
                    urls.user.google,
                    googlePayload
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Profile failed");
            }
        }
    );
};
