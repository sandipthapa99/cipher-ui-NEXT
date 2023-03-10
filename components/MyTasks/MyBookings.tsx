import { MyBookingTaskCard } from "@components/Cards/MyBookingTaskCard";
import { OtherBookedTaskCard } from "@components/Cards/OtherBookedTaskCard";
import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import {
    useClearSearchedTaskers,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import SkeletonBookingCard from "@components/Skeletons/SkeletonBookingCard";
import { Grid, Pagination, Select } from "@mantine/core";
import { useBooking } from "hooks/use-bookings";
import { useMyBooking } from "hooks/use-myBooking";
import { debounce } from "lodash";
import React, { useState } from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";

export const MyBookings = () => {
    const [searchParam, setSearchParam] = useState("");
    const clearSearchedTaskers = useClearSearchedTaskers();
    const clearSearchQuery = useClearSearchQuery();

    const [value, setValue] = useState<string | null>("me");

    const [bookingPageNo, setBookingPageNo] = useState<number>(1);
    const [myBookingPageNo, setMyBookingPageNo] = useState<number>(1);

    //----------For other booking------------
    const { data: bookingPages, isLoading: bookingLoading } = useBooking(
        searchParam,
        bookingPageNo
    );

    const bookings = bookingPages?.result;

    //----------For other booking------------
    //----------For my bookings------------
    const { data: myBookingPages, isLoading: myBookingLoading } = useMyBooking(
        searchParam,
        myBookingPageNo
    );

    const mybookings = myBookingPages?.result;

    const handleSearchParamChange = debounce((searchParam: string) => {
        // clear the existing search data when searchparam changes and has value
        if (searchParam) {
            clearSearchedTaskers();
            clearSearchQuery();
        }
        setSearchParam(searchParam);
    }, 500);

    return (
        <>
            <Grid className="d-flex align-items-center">
                <Grid.Col lg={10} md={9}>
                    <SearchCategory
                        searchModal="booking"
                        onSearchParamChange={handleSearchParamChange}
                        onFilterClear={() => setSearchParam("")}
                    />
                </Grid.Col>
                <Grid.Col lg={2} sm={3}>
                    <Select
                        value={value}
                        onChange={setValue}
                        data={[
                            { value: "me", label: "By Me" },
                            { value: "other", label: "By Other" },
                        ]}
                    />
                </Grid.Col>
            </Grid>
            {/* <h3>My Bookings</h3> */}
            <div className="overflow-hidden">
                {bookingLoading && (
                    <Grid>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <Grid.Col lg={4} sm={6} key={index}>
                                <SkeletonBookingCard />
                            </Grid.Col>
                        ))}
                    </Grid>
                )}
                {myBookingLoading && (
                    <Grid>
                        {Array.from({ length: 9 }).map((_, index) => (
                            <Grid.Col lg={4} sm={6} key={index}>
                                <SkeletonBookingCard />
                            </Grid.Col>
                        ))}
                    </Grid>
                )}
                <Grid>
                    <>
                        {!bookingLoading &&
                            value === "other" &&
                            bookings &&
                            bookings?.length >= 0 &&
                            bookings?.map(
                                (
                                    item: MyBookingServiceProps["result"][0],
                                    index: number
                                ) => (
                                    <Grid.Col lg={4} sm={6} key={index}>
                                        <OtherBookedTaskCard
                                            item={item}
                                            linkTo={"#!"}
                                        />
                                    </Grid.Col>
                                )
                            )}
                    </>
                    <>
                        {!myBookingLoading &&
                            value === "me" &&
                            mybookings &&
                            mybookings?.length >= 0 &&
                            mybookings?.map(
                                (
                                    item: MyBookingServiceProps["result"][0],
                                    index: number
                                ) => (
                                    <Grid.Col lg={4} sm={6} key={index}>
                                        <MyBookingTaskCard item={item} />
                                    </Grid.Col>
                                )
                            )}
                    </>
                </Grid>
                {value === "other" && bookings?.length > 0 && (
                    <span className="d-flex justify-content-center mt-4">
                        <Pagination
                            total={bookingPages?.total_pages}
                            color="yellow"
                            initialPage={bookingPageNo}
                            onChange={(value) => {
                                setBookingPageNo(value);
                            }}
                        />
                    </span>
                )}
                {value === "me" && mybookings?.length > 0 && (
                    <span className="d-flex justify-content-center mt-4">
                        <Pagination
                            total={myBookingPages?.total_pages}
                            color="yellow"
                            initialPage={myBookingPageNo}
                            onChange={(value) => {
                                setMyBookingPageNo(value);
                            }}
                        />
                    </span>
                )}
            </div>
            {value === "other" &&
                !bookingLoading &&
                bookings &&
                bookings?.length <= 0 && (
                    <ApplyPostComponent
                        model="service"
                        title="No Bookings Available"
                        subtitle="Book a service to the marketplace and let merchant come to you."
                        buttonText="Book a service"
                        href="/service"
                    />
                )}
            {value === "me" &&
                !myBookingLoading &&
                mybookings &&
                mybookings?.length <= 0 && (
                    <ApplyPostComponent
                        model="service"
                        title="No Bookings Available"
                        subtitle="Book a service to the marketplace and let merchant come to you."
                        buttonText="Book a service"
                        href="/service"
                    />
                )}
        </>
    );
};
