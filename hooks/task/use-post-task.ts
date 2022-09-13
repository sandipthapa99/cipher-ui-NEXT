import { useMutation } from "@tanstack/react-query";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { axiosClient } from "utils/axiosClient";

export interface PostTaskResponse {
    status: "success" | "error";
    message: string;
    task_id: string;
}
export const usePostTask = () => {
    const { data: profileDetails } = useGetProfile();
    return useMutation<PostTaskResponse, Error, any>((postTaskPayload) =>
        axiosClient
            .post<PostTaskResponse>("/task/", postTaskPayload)
            .then((res) => res.data)
            .catch((error) => {
                const message = Object.values(error?.response?.data).join("\n");
                throw new Error(message ?? "Failed to post task");
            })
    );
};
