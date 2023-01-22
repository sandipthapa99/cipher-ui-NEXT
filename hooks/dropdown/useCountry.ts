import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export type Country = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        code: string;
        currency: {
            code: string;
            name: string;
            symbol: string;
        };
        language: {
            code: string;
            name: string;
        };
        is_active: boolean;
        name: string;
        local_name: string;
        phone_code: string;
    }>;
};

export const useCountry = () => {
    const { data } = useUser();
    return useQuery<Country>(
        ["country"],
        async () => {
            try {
                const { data } = await axiosClient.get<Country>(
                    "/locale/cms/country/?page_size=1000"
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
