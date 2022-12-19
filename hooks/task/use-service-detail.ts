import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "types/queryKeys";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useServiceDetail = (id: string) => {
    return useQuery(
        [ReactQueryKeys.SERVICE_DETAIL, id],
        () =>
            axiosClient
                .get<ServicesValueProps["result"][0]>(
                    `/task/entity/service/${id}`
                )
                .then((response) => response.data),
        { enabled: !!id }
    );
};
