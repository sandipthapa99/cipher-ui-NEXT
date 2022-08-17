import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";
export type KYCResponse = {
    id: number;
    created_at: string;
    updated_at: string;
    full_name: string;
    is_company: boolean;
    organization_name: any;
    identity_type: string;
    identity_id: string;
    identity_card_file: any;
    identity_issuer_organization: string;
    identity_issued_date: string;
    identity_valid_through: string;
    is_personal_kyc_verified: boolean;
    is_personal_address_verified: boolean;
    pan_number: number;
    pan_issued_from: string;
    pan_issued_date: string;
    pan_card_file: any;
    passport_size_photo: any;
    personal_address_verification_document: any;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
    company_registration_number: any;
    company_registration_from: any;
    company_registration_date: any;
    company_pan_number: any;
    company_pan_issued_from: any;
    company_pan_issued_date: any;
    company_pan_card_file: any;
    social_links: any;
    company_logo: any;
    company_adddress_verification_document: any;
    is_company_kyc_verified: boolean;
    is_company_address_verified: boolean;
    company: any;
};

export const useGetKYC = () => {
    return useQuery<KYCResponse>(["GET_KYC"], async () => {
        try {
            const { data } = await axiosClient.get<KYCResponse>(
                `/tasker/my-kyc/`
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
