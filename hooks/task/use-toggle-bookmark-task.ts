import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import urls from "constants/urls";
import { axiosClient } from "utils/axiosClient";

export interface BookmarkTaskPayload {
    model: string;
    object_id: string;
}
export interface BookmarkTaskResponse {
    status: string;
    message: string;
}

export const useToggleBookmarkTask = () => {
    const queryClient = useQueryClient();
    return useMutation<BookmarkTaskResponse, Error, BookmarkTaskPayload>(
        async (payload) => {
            try {
                const { data } = await axiosClient.post<BookmarkTaskResponse>(
                    urls.bookmark,
                    payload
                );
                await queryClient.invalidateQueries(["bookmarked-tasks"]);
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Failed to bookmark task.Try again later!");
            }
        }
    );
};
