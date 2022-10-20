import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import urls from "constants/urls";
import { axiosClient } from "utils/axiosClient";

export const useFacebook = () => {
    return useMutation<{ access: string; refresh: string }, Error, any>(
        async (facebookPayload) => {
            try {
                const { data } = await axiosClient.post(
                    urls.user.facebook,
                    facebookPayload
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data);
                }
                throw new Error("Profile failed");
            }
        }
    );
};
