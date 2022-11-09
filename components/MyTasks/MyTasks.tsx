import { MyBookingTaskCard } from "@components/Cards/MyBookingTaskCard";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import React from "react";
import { axiosClient } from "utils/axiosClient";

export const MyTasks = () => {
    const { data: userData } = useUser();
    const userId = userData?.id ?? "";
    const { data: mytaskData, isLoading } = useQuery(
        ["my-task", userId],
        async () => {
            const response = await axiosClient.get(
                `${urls.task.task}&user=${userId}`
            );
            return response.data.result;
        },
        {
            enabled: !!userId,
        }
    );

    return <MyBookingTaskCard />;
};
