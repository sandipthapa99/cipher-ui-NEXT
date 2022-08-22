import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const useGetProfileById = (id: string | undefined) => {
    return useQuery(["profile", id], async () => {
        try {
            const { data } = await axiosClient.get(`/tasker/profile/${id}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
