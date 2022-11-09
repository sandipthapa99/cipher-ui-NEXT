import { useInfiniteQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import type { MyBookingServiceProps } from "types/myBookingProps";
import { axiosClient } from "utils/axiosClient";
import { getNextPageParam } from "utils/getNextPageParam";

export const useBooking = (searchParam?: string, is_req?: string) => {
    return useInfiniteQuery(
        ["Booking", searchParam],
        ({ pageParam = 1 }) =>
            axiosClient
                .get<MyBookingServiceProps>(
                    `${urls.profile.my_bookings}?${searchParam}`
                )
                .then((response) => response.data),
        { getNextPageParam }
    );
};
