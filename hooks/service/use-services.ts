import { useInfiniteQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { ReactQueryKeys } from "types/queryKeys";
import type { ServiceApiResponse } from "types/service";
import { axiosClient } from "utils/axiosClient";
import { getNextPageParam } from "utils/getNextPageParam";

export const useServices = (searchParam?: string) => {
    return useInfiniteQuery(
        [ReactQueryKeys.SERVICES, searchParam],
        ({ pageParam = 1 }) =>
            axiosClient
                .get<ServiceApiResponse>(
                    `${urls.task.service}&${searchParam}&page=${pageParam}`
                )
                .then((response) => response.data),
        { getNextPageParam }
    );
};
