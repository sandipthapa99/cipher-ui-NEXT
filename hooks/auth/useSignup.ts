import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ClientSignUpValueProps } from "types/clientSignUp";
import { axiosClient } from "utils/axiosClient";

export const useSignup = () => {
    return useMutation<void, Error, ClientSignUpValueProps>(
        async (signupPayload) => {
            try {
                await axiosClient.post("/user/signup/", signupPayload);
            } catch (error) {
                if (error instanceof AxiosError) {
                    const values = Object.values(error.response?.data);
                    throw new Error(values.join("\n"));
                }
                throw new Error("An unknown error occurred.");
            }
        }
    );
};
