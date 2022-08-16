import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export interface BookMarkTasksResponse {
    count: number;
    next: string;
    previous: string;
    results: BookmarkTask[];
}

export interface BookmarkTask {
    id: number;
    user: string;
    type: string;
    data: string;
    created_at: string;
    updated_at: string;
    object_id: string;
    content_type: number;
}
export const useBookmarkTasks = () => {
    return useQuery(["bookmarked-tasks"], async () => {
        try {
            const { data } = await axiosClient.get<BookMarkTasksResponse>(
                "/task/bookmark/"
            );
            return data;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ??
                    "Failed to fetch bookmarked tasks.Try again later!"
            );
        }
    });
};
