import { useMutation, useQueryClient } from "@tanstack/react-query";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";

type UsernameLogin = { type: "username"; username: string; password: string };
type PhoneLogin = { type: "phone"; phone: string; password: string };

export type LoginPayload = UsernameLogin | PhoneLogin;
export interface LoginSuccessResponse {
    refresh: string;
    access: string;
}
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, LoginPayload>(
        async (loginPayload) => {
            const { type, ...payload } = loginPayload;
            try {
                const { data } = await axiosClient.post<LoginSuccessResponse>(
                    "/user/login/",
                    payload
                );
                autoLogin(data.access, data.refresh);
            } catch (error: any) {
                throw new Error("Invalid email or password");
            }
        },
        { onSuccess: () => queryClient.invalidateQueries(["user"]) }
    );
};
