import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useTasks = () => {
    return useQuery(["all-tasks"], async () => {
        try {
            const { data } = await axiosClient.get<ITaskApiResponse>("/task");
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Failed to fetch tasks");
        }
    });
};
