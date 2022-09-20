import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import type { Bookmark, BookMarkApiResponse } from "types/bookmarks";
import { axiosClient } from "utils/axiosClient";

import { useUser } from "./auth/useUser";

export type BookmarkType = "user" | "task" | "service";

export const useBookmarks = (type: BookmarkType) => {
    const { data: user } = useUser();
    return useQuery<Bookmark[]>(
        ["bookmarks", type],
        () =>
            axiosClient
                .get<BookMarkApiResponse>(urls.bookmark)
                .then((response) =>
                    response.data.result.filter((item) => item.type === type)
                ),
        { initialData: [], enabled: !!user }
    );
};
export const useIsBookmarked = (type: BookmarkType, object_id?: string) => {
    const { data: bookmarks } = useBookmarks(type);
    return bookmarks.some((item) => item.object_id === object_id);
};
