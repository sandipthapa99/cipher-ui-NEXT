import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { BookmarkResult, BookmarkValueProps } from "types/bookmark";
import { axiosClient } from "utils/axiosClient";

export const useBookmark = () => {
    return useMutation<BookmarkResult, Error, BookmarkValueProps>(
        async (bookmarkDetails) => {
            try {
                const { data } = await axiosClient.post<BookmarkResult>(
                    "/task/bookmark/",
                    bookmarkDetails
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Something went wrong");
            }
        }
    );
};
