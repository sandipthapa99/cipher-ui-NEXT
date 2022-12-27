import { useMutation } from "@tanstack/react-query";
// import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const useDocumentKYC = () => {
    return useMutation<void, Error, any>(async (kycDocumnetPayload) => {
        await axiosClient.post("/tasker/kyc-document/", kycDocumnetPayload);
    });
};
