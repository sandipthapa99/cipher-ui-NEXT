import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";
import { getNextPageParam } from "utils/getNextPageParam";

export interface CreatedFor {
    id: string;
    full_name: string;
    profile_image: string;
}

export interface ContentObject {
    entity_service: EntityService;
    id: string;
    title: string;
    is_requested: boolean;
    slug: string;
    created_by: string;
}

export interface EntityService {
    id: string;
    title: string;
    is_requested: boolean;
    slug: string;
    created_by: string;
}
export type NotificationResponse = {
    result: Array<{
        id: number;
        user: string;
        created_for: CreatedFor;
        content_object: ContentObject;
        title: string;
        created_date: string;
        read_date: string;
    }>;
    unread_count: number;
};

export const useGetNotification = () => {
    return useInfiniteQuery(
        ["notifications"],
        async ({ pageParam = 1 }) => {
            const res = await axiosClient.get(
                "/notification/?page=" + pageParam
            );
            return res.data;
        },
        {
            getNextPageParam,
        }
    );
};
