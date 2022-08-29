import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const useGetPortfolioById = (id: number | undefined) => {
    return useQuery(["tasker-portfolio", id], async () => {
        try {
            const { data } = await axiosClient.get(`/tasker/portfolio/${id}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
