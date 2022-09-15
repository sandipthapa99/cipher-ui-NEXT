import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";
export type KYCResponse = {
    id: number | string;
    created_at: string;
    updated_at: string;
    full_name: string;
    is_company: boolean;
    organization_name: string;
    address: string;
    is_kyc_verified: boolean;
    is_address_verified: boolean;
    is_company_kyc_verified: boolean;
    is_company_address_verified: boolean;
    company: string;
    country: { id: number; name: string };
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
