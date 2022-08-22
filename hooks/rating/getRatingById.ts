import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export const useGetRatingBYId = (uuid: string) => {
    return useQuery(["rating", uuid], async () => {
        try {
            const { data } = await axiosClient.get(`/task/rating/list/${uuid}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
