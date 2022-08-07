import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";

export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginSuccessResponse {
    refresh: string;
    access: string;
}
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, LoginPayload>(
        async (loginPayload) => {
            try {
                const { data } = await axiosClient.post<LoginSuccessResponse>(
                    "/user/login/",
                    loginPayload
                );
                autoLogin(data.access);
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Something went wrong");
            }
        },
        { onSuccess: () => queryClient.invalidateQueries(["user"]) }
    );
};
