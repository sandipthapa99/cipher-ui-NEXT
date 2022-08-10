import { useMutation } from "@tanstack/react-query";
import type { KYCFormProps } from "types/kycFormProps";
import { axiosClient } from "utils/axiosClient";

export const useKYC = () => {
    return useMutation<void, Error, KYCFormProps>(async (kycPayload) => {
        try {
            const { data } = await axiosClient.post("/tasker/kyc/", kycPayload);
            return data;
        } catch (error) {
            throw new Error("KYC failed");
        }
    });
};
