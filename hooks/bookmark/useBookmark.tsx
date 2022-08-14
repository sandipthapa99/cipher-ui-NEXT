import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { BookmarkResult, BookmarkValueProps } from "types/bookmark";
import { axiosClient } from "utils/axiosClient";

export const useBookmark = () => {
    return useMutation<BookmarkResult, Error, BookmarkValueProps>(
        async ({ object_id, model }) => {
            try {
                const { data } = await axiosClient.post<BookmarkResult>(
                    "/task/bookmark/",
                    { object_id, model }
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
