import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { RecentProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

export const useMyTasks = () => {
    return useQuery<RecentProps>(["my-tasks"], async () => {
        try {
            const { data } = await axiosClient.get<RecentProps>(
                `/task/my-task/`
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
