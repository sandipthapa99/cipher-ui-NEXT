import { useMutation } from "@tanstack/react-query";
import type { ClientSignUpValueProps } from "types/clientSignUp";
import { axiosClient } from "utils/axiosClient";

export const useForm = (api: string, values: any) => {
    return useMutation<void, Error, ClientSignUpValueProps>(async (values) => {
        try {
            const { data } = await axiosClient.post(api, values);
            console.log("Signup data", data);
        } catch (error) {
            throw new Error("Signup failed");
        }
    });
};
