import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export const useBookmarks = (type: BookmarkType) => {
    return useQuery<Result[]>(
        ["bookmarks", type],
        () =>
            axiosClient
                .get<BookmarkApiResponse>("/task/bookmark")
                .then((response) =>
                    response.data.result.filter((item) => item.type === type)
                ),
        { initialData: [] }
    );
};
export const useIsBookmarked = (type: BookmarkType, object_id?: string) =>
    useBookmarks(type).data.some((item) => item.object_id === object_id);

export type BookmarkType = "user" | "task";
export interface BookmarkApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Result[];
}

export interface Result {
    id: number;
    user: string;
    type: string;
    data?: string;
    created_at: string;
    updated_at: string;
    object_id: string;
    content_type: number;
}
