import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginSuccessResponse {
    accessToken: string;
}
export const useLogin = () => {
    return useMutation<string, Error, LoginPayload>(async (loginPayload) => {
        try {
            const { data } = await axiosClient.post<LoginSuccessResponse>(
                "/user/login/",
                loginPayload
            );
            return data.accessToken;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};