import { async } from "@firebase/util";
import { useMutation } from "@tanstack/react-query";
import urls from "constants/urls";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useEntityService = (is_requested: string) => {
    return useMutation(async ({ id, data }: { id: string; data: any }) => {
        if (id !== "undefined") {
            await axiosClient
                .patch<ITask>(`${urls.task.list}${id}/`, data)
                .then((response) => response.data);
        } else {
            await axiosClient
                .post<ITask>(
                    `${urls.task.list}?is_requested=${is_requested}/`,
                    data
                )
                .then((response) => response.data);
        }
    });
};
