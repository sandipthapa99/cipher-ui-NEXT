import { useInfiniteQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { ReactQueryKeys } from "types/queryKeys";
import type { TaskerApiResponse } from "types/tasker";
import { axiosClient } from "utils/axiosClient";
import { getNextPageParam } from "utils/getNextPageParam";

export const useTaskers = (searchParam?: string) => {
    return useInfiniteQuery(
        [ReactQueryKeys.TASKERS, searchParam],
        ({ pageParam = 1 }) =>
            axiosClient
                .get<TaskerApiResponse>(
                    `${urls.tasker.list}?${searchParam}&page=${pageParam}`
                )
                .then((response) => response.data),
        { getNextPageParam }
    );
};
