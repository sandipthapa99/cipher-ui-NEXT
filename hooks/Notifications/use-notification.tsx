import { NumberInputProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export type NotificationResponse = {
    result: Array<{
        id: number;
        user: string;
        type: string;
        title: string;
        object: string;
        created_date: string;
        read_date: any;
        content: any;
        object_slug: string;
        object_id: string;
        created_for: string;
        is_requested: boolean;
    }>;
    unread_count: number;
};

export const useGetNotification = () => {
    return useQuery<NotificationResponse>(["notification"], async () => {
        try {
            const { data } = await axiosClient.get<NotificationResponse>(
                "/notification/"
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
