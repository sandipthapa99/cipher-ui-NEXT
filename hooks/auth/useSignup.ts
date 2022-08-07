import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClientSignUpValueProps } from "types/clientSignUp";
import { axiosClient } from "utils/axiosClient";

export const useSignup = () => {
    return useMutation<void, Error, ClientSignUpValueProps>(
        async (signupPayload) => {
            try {
                const { data } = await axiosClient.post(
                    "/user/signup/",
                    signupPayload
                );
                console.log("Signup data", data);
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(
                        error?.response?.data?.email[0] ??
                            error?.response?.data?.message?.password
                    );
                }
                throw new Error("Signup failed");
            }
        }
    );
};
