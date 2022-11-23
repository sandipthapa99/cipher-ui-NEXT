import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

interface EarningHistory {
    total_pages: number;
    result: Array<{
        id: number;
        sender: string;
        receiver: string;
        created_at: string;
        updated_at: string;
        amount: number;
        wallet: number;
        transaction: string;
        task_title: string;
    }>;
}

const queryClient = new QueryClient();
export const useGetEarningHistory = (
    pageNumber?: number,
    pageSize?: string
) => {
    return useQuery(["GET-EARNING-HISTORY", pageNumber, pageSize], async () => {
        try {
            const { data } = await axiosClient.get<EarningHistory>(
                `/wallet/wallethistory/?page=${pageNumber}&page_size=${pageSize}`
            );
            queryClient.invalidateQueries(["GET-EARNING-HISTORY"]);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
