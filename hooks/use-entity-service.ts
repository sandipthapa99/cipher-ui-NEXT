import { async } from "@firebase/util";
import { useMutation } from "@tanstack/react-query";
import urls from "constants/urls";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const useEntityService = (is_requested: string) => {
    return useMutation(async ({ id, data }: any) => {
        if (id) {
            await axiosClient
                .patch<ITask>(`${urls.task.list}${id}/`, data)
                .then((response) => response.data)
                .catch((error) => {
                    const message = Object.values(error?.response?.data).join(
                        "\n"
                    );
                    throw new Error(message ?? "Failed to post task");
                });
        } else {
            await axiosClient
                .post<ITask>(
                    `${urls.task.list}?is_requested=${is_requested}/`,
                    data
                )
                .then((response) => response.data)
                .catch((error) => {
                    const message = Object.values(error?.response?.data).join(
                        "\n"
                    );
                    throw new Error(message ?? "Failed to post task");
                });
        }
    });
};
