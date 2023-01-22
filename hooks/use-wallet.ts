import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

interface MyEarningsType {
    id: number;
    currency: string;
    last_received: number;
    last_paid: number;
    total_income: number;
    total_withdrawals: number;
    available_balance: number;
    frozen_amount: number;
    user: string;
    merchant: any;
}

export const useMyWallet = () => {
    return useQuery(["my-earning"], async () => {
        try {
            const { data } = await axiosClient.get<MyEarningsType[]>(
                `/wallet/mywallet/`
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
