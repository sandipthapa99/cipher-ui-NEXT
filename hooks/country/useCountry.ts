import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export type CountryResponse = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        name: string;
        local_name: string;
        iso_code: string;
        phone_code: string;
        currency: number;
        language: number;
    }>;
};

export const useCountry = () => {
    return useQuery<CountryResponse>(["country"], async () => {
        try {
            const { data } = await axiosClient.get<CountryResponse>(
                "/locale/cms/country/"
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
