// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import urls from "constants/urls";
// import { useEffect, useState } from "react";
// import type { MyBookingServiceProps } from "types/myBookingProps";
// import { axiosClient } from "utils/axiosClient";

// export const useBooking = (searchParam?: string, page?: number) => {
//     const queryClient = useQueryClient();
//     const [changePage, setChangePage] = useState<number>(0);
//     const [totalPage, setTotalPage] = useState<number>(0);
//     console.log(
//         "🚀 ~ file: use-bookings.ts ~ line 11 ~ useBooking ~ totalPage",
//         totalPage
//     );
//     useEffect(() => {
//         totalPage < changePage &&
//             queryClient.prefetchQuery(
//                 ["Booking", searchParam, changePage + 1],
//                 () =>
//                     axiosClient
//                         .get<MyBookingServiceProps>(
//                             `${
//                                 urls.profile.other_bookings
//                             }?${searchParam}&page_size=9&page=${changePage + 1}`
//                         )
//                         .then((response) => {
//                             setTotalPage(response.data.total_pages);
//                             return response.data;
//                         })
//                         .catch((error) => error && setChangePage(1))
//             );

//         page && setChangePage(page);
//     }, [changePage, page, queryClient, searchParam, totalPage]);

//     return useQuery(["Booking", searchParam, changePage], () =>
//         axiosClient
//             .get<MyBookingServiceProps>(
//                 `${urls.profile.other_bookings}?${searchParam}&page_size=9&page=${changePage}`
//             )
//             .then((response) => response.data)
//             .catch((error) => error && setChangePage(1))
//     );
// };

import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useEffect, useState } from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";
import { axiosClient } from "utils/axiosClient";
export const useBooking = (searchParam?: string, page?: number) => {
    const [changePage, setChangePage] = useState<number>();
    useEffect(() => {
        setChangePage(page);
    }, [page]);
    return useQuery(["my-Booking", searchParam, changePage], () =>
        axiosClient
            .get<MyBookingServiceProps>(
                `${urls.profile.other_bookings}?${searchParam}&page_size=9&page=${changePage}`
            )
            .then((response) => response.data)
            .catch((error) => error && setChangePage(1))
    );
};
