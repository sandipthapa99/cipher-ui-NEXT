import { useMutation } from "@tanstack/react-query";
import urls from "constants/urls";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

export const usePostTask = () => {
    return useMutation<ITask, Error, unknown>((postTaskPayload) =>
        axiosClient
            .post<ITask>(urls.task.list, postTaskPayload)
            .then((response) => response.data)
            .catch((error) => {
                const message = Object.values(error?.response?.data).join("\n");
                throw new Error(message ?? "Failed to post task");
            })
    );
};
