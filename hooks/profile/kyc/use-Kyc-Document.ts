import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const useDocumentKYC = () => {
    return useMutation<void, Error, any>(async (kycDocumnetPayload) => {
        try {
            const { data } = await axiosClient.post(
                "/tasker/kyc-document/",
                kycDocumnetPayload
            );
            
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("KYC Document failed");
        }
    });
};
