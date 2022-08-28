import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const useGetCountryBYId = (id: number | undefined | string) => {
    return useQuery(["country", id], async () => {
        try {
            const { data } = await axiosClient.get(`/locale/cms/country/${id}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
