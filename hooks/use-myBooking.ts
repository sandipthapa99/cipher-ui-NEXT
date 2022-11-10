import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useEffect, useState } from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";
import { axiosClient } from "utils/axiosClient";
export const useMyBooking = (searchParam?: string, page?: number) => {
    const [changePage, setChangePage] = useState<number>();
    useEffect(() => {
        setChangePage(page);
    }, [page]);
    return useQuery(["my-Booking", searchParam, changePage], () =>
        axiosClient
            .get<MyBookingServiceProps>(
                `${urls.profile.my_bookings}?${searchParam}&page_size=9&page=${changePage}`
            )
            .then((response) => response.data)
            .catch((error) => error && setChangePage(1))
    );
};
