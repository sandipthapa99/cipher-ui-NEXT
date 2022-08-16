import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface BookmarkTaskPayload {
    model: string;
    object_id: string;
}
export interface BookmarkTaskResponse {
    status: string;
    message: string;
}

export const useBookmarkTask = () => {
    return useMutation<BookmarkTaskResponse, Error, BookmarkTaskPayload>(
        async (payload) => {
            try {
                const { data } = await axiosClient.post<BookmarkTaskResponse>(
                    "/task/bookmark/",
                    payload
                );
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
