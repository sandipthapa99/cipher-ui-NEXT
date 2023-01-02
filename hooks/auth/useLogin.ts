import { useMutation } from "@tanstack/react-query";
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
    has_profile: boolean;
}

export const useLogin = () => {
    return useMutation<boolean, Error, LoginPayload>(async (loginPayload) => {
        // try {
        const { data } = await axiosClient.post<LoginSuccessResponse>(
            urls.user.login,
            loginPayload
        );
        autoLogin(data.access, data.refresh);

        return data.has_profile;
        // } catch (error: any) {
        //     // if (error instanceof AxiosError) {
        //     //     throw new Error(error.response?.data);
        //     // }
        //     throw new Error(
        //         error.response.data.username
        //             ? error.response.data.username
        //             : error.response.data.password
        //             ? error.response.data.password
        //             : ""
        //     );
        // }
    });
};
