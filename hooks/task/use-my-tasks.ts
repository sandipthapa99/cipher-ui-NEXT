import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { RecentProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

export const useMyTasks = (taskerId: string) => {
    return useQuery<RecentProps>(["my-tasks"], async () => {
        try {
            const { data } = await axiosClient.get<RecentProps>(
                `/task/entity/my-entity-services/?is_requested=true&tasker=${taskerId}`
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
