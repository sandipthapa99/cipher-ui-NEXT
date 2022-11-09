import { MyBookedTaskCard } from "@components/Cards/MyBookedTaskCard";
import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import {
    useClearSearchedTaskers,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { Alert, Col, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useServices } from "hooks/service/use-services";
import { useBooking } from "hooks/use-bookings";
import { useInViewPort } from "hooks/use-in-viewport";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Col as BootCol, Row } from "react-bootstrap";
import type { MyBookingServiceProps } from "types/myBookingProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export const MyBookings = () => {
    const [searchParam, setSearchParam] = useState("");
    console.log(
        "🚀 ~ file: MyBookings.tsx ~ line 35 ~ MyBookings ~ searchParam",
        searchParam
    );
    const clearSearchedTaskers = useClearSearchedTaskers();
    const clearSearchQuery = useClearSearchQuery();

    const {
        data: bookingPages,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useBooking(searchParam, "true");

    const bookings = useMemo(
        () =>
            bookingPages?.pages
                .map((servicePage) => servicePage.result)
                .flat() ?? [],
        [bookingPages?.pages]
    );
    console.log(
        "🚀 ~ file: MyBookings.tsx ~ line 53 ~ MyBookings ~ bookings",
        bookings
    );

    const totalbookings = bookings?.length;

    const searchQuery = useSearchQuery();

    const handleSearchParamChange = (searchParam: string) => {
        // clear the existing search data when searchparam changes and has value
        if (searchParam) {
            clearSearchedTaskers();
            clearSearchQuery();
        }
        setSearchParam(searchParam);
    };

    return (
        <>
            <SearchCategory
                searchModal="booking"
                onSearchParamChange={handleSearchParamChange}
                onFilterClear={() => setSearchParam("")}
            />
            {/* <h3>My Bookings</h3> */}
            <div className="">
                {isLoading && (
                    <Grid className="p-5">
                        <Col span={3}>
                            <Skeleton height={150} mb="xl" />
                        </Col>
                        <Col span={9}>
                            <Skeleton
                                height={50}
                                radius="sm"
                                className="mb-4"
                            />
                            <Skeleton height={50} radius="sm" />
                        </Col>
                    </Grid>
                )}
                <Grid>
                    {!isLoading &&
                        bookings &&
                        bookings?.length >= 0 &&
                        bookings?.map((item, index) => (
                            <Grid.Col lg={4} sm={6} key={index}>
                                <MyBookedTaskCard item={item} />
                            </Grid.Col>
                        ))}
                </Grid>
            </div>
            {!isLoading && bookings && bookings?.length <= 0 && (
                <ApplyPostComponent
                    model="service"
                    title="No Bookings Available"
                    subtitle="Book a service to the marketplace and let merchant come to you."
                    buttonText="Book a service"
                />
            )}
        </>
    );
};
