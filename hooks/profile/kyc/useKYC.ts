import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { KYCFormProps } from "types/kycFormProps";
import { axiosClient } from "utils/axiosClient";

export const useKYC = () => {
    return useMutation<void, Error, any>(async (kycPayload) => {
        try {
            const { data } = await axiosClient.post("/tasker/kyc/", kycPayload);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Kyc failed");
        }
    });
};
