import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { KYCFormProps } from "types/kycFormProps";
import { axiosClient } from "utils/axiosClient";

export const useKYC = () => {
    return useMutation<{ id: number }, Error, any>(async (kycPayload) => {
        try {
            const { data } = await axiosClient.post("/tasker/kyc/", kycPayload);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Kyc failed");
        }
    });
};
