import { useMutation, useQueryClient } from "@tanstack/react-query";
import localforage from "localforage";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";

export interface LoginPayload {
    username: string;
    password: string;
}
export interface LoginSuccessResponse {
    refresh: string;
    access: string;
}
const getFCMTOKEN = async () => {
    if (typeof window !== "undefined") {
        const token = await localforage.getItem<string>("fcm_token");
        return token;
    }
    return null;
};
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, LoginPayload>(
        async (loginPayload) => {
            try {
                const token = await getFCMTOKEN();
                const { data } = await axiosClient.post<LoginSuccessResponse>(
                    "/user/login/",
                    loginPayload
                    // {
                    //     headers: {
                    //         FCM_TOKEN: token ?? "",
                    //     },
                    // }
                );
                autoLogin(data.access, data.refresh);
            } catch (error: any) {
                throw new Error("Invalid email or password");
            }
        },
        { onSuccess: () => queryClient.invalidateQueries(["user"]) }
    );
};
