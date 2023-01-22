import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";
interface KYCDocumentType {
    id: number;
    created_at: string;
    updated_at: string;
    document_type: string;
    document_id: string;
    file: string;
    issuer_organization: string;
    issued_date: string;
    valid_through: any;
    is_verified: boolean;
    is_company: boolean;
    comment: any;
}

export const useGetKYCDocument = () => {
    return useQuery<KYCDocumentType[]>(["KYC-document"], async () => {
        try {
            const { data } = await axiosClient.get<KYCDocumentType[]>(
                "/tasker/kyc-document"
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
