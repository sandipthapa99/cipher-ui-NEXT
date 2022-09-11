import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

interface Location {
    status: string;
    data: {
        country: string;
        city: string;
        longitude: number;
        latitude: number;
    };
}

export const useLocation = () => {
    return useQuery<Location>(["location"], async () => {
        try {
            const { data } = await axiosClient.get<Location>(
                "/locale/iplocation/"
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
