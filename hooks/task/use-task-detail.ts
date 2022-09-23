import { useQuery } from "@tanstack/react-query";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useTaskDetail = (id: string) => {
    return useQuery(
        [ReactQueryKeys.TASK_DETAIL, id],
        () =>
            axiosClient
                .get<ITask>(`/task/entity/service/${id}`)
                .then((response) => response.data),
        { enabled: !!id }
    );
};
