import { useMutation, useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";

export interface LoginPayload {
    username: string;
    password: string;
    fcm_token: string | null;
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
                    urls.user.login,
                    loginPayload
                );
                autoLogin(data.access, data.refresh);
            } catch (error: any) {
                throw new Error("Invalid email or password");
            }
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["user"]);
            },
        }
    );
};
