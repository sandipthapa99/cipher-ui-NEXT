import { useInfiniteQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

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
            getNextPageParam: (lastpage) => {
                try {
                    const url = new URL(lastpage.next);
                    const nextPage = url.searchParams.get("page");
                    return nextPage ? parseInt(nextPage) : undefined;
                } catch {
                    return undefined;
                }
            },
        }
    );
};
