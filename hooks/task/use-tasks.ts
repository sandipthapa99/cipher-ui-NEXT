import { useInfiniteQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";
import { getNextPageParam } from "utils/getNextPageParam";

export const useTasks = (searchParam?: string) => {
    return useInfiniteQuery(
        [ReactQueryKeys.TASKS, searchParam],
        ({ pageParam = 1 }) =>
            axiosClient
                .get<ITaskApiResponse>(
                    `/task/entity/service?page=${pageParam}&${searchParam}`
                )
                .then((response) => response.data),
        {
            getNextPageParam,
        }
    );
};
