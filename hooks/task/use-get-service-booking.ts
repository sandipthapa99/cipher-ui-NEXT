import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import urls from "constants/urls";
import type { MyBookings } from "types/bookings";
import { axiosClient } from "utils/axiosClient";

export const useGetMyBookings = (
    service_id: string | undefined,
    applied_count: number
) => {
    return useQuery<MyBookings>(
        ["get-my-bookings", service_id],
        async () => {
            try {
                const { data } = await axiosClient.get<MyBookings>(
                    `/task/entity/service-booking/?entity_service=${service_id}`
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errors = Object.values(error.response?.data).join(
                        "\n"
                    );
                    throw new Error(errors);
                }
                throw new Error("Something went wrong");
            }
        },
        {
            enabled: !!service_id && applied_count > 0,
        }
    );
};

export const useGetTasks = () => {
    const url = `${urls.task.requested_task}`;

    return useQuery<MyBookings>(["get-my-bookings"], async () => {
        try {
            const { data } = await axiosClient.get<MyBookings>(url);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
