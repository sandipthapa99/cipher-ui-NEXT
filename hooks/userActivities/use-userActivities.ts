import { useInfiniteQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { ReactQueryKeys } from "types/queryKeys";
import type { IUserActivityApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";
import { getNextPageParam } from "utils/getNextPageParam";

export const useUserActivities = () => {
    return useInfiniteQuery(
        [ReactQueryKeys.USER_ACTIVITIES],
        ({ pageParam = 1 }) =>
            axiosClient
                .get<IUserActivityApiResponse>(
                    `${urls.user.activity}?page=${pageParam}`
                )
                .then((response) => response.data),
        {
            getNextPageParam,
        }
    );
};
