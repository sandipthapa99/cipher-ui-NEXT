import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export type CurrencyResponse = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        name: string;
        code: string;
        is_active: boolean;
        current_value: number;
        is_default: boolean;
        enable_currency_configuration: boolean;
    }>;
};

export const useCurrency = () => {
    const { data } = useUser();
    return useQuery<CurrencyResponse>(
        ["currency"],
        async () => {
            try {
                const { data } = await axiosClient.get<CurrencyResponse>(
                    "/locale/cms/currency/"
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Something went wrong");
            }
        },
        { enabled: !!data }
    );
};
