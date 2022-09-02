import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export interface PostTaskResponse {
    status: "success" | "error";
    message: string;
    task_id: string;
}
export const usePostTask = () => {
    return useMutation<PostTaskResponse, Error, FormData>((postTaskPayload) =>
        axiosClient
            .post<PostTaskResponse>("/task/", postTaskPayload)
            .then((res) => res.data)
            .catch((error) => {
                const message = Object.values(error?.response?.data).join("\n");
                throw new Error(message ?? "Failed to post task");
            })
    );
};
