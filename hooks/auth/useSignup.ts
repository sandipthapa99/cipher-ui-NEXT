import { useMutation } from "@tanstack/react-query";
import type { ClientSignUpValueProps } from "types/clientSignUp";
import { axiosClient } from "utils/axiosClient";

export const useSignup = () => {
    return useMutation<void, Error, ClientSignUpValueProps>(
        async (signupPayload) => {
            try {
                await axiosClient.post("/user/signup/", signupPayload);
            } catch (error) {
                throw new Error("Signup failed");
            }
        }
    );
};
