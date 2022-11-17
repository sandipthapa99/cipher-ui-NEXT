import { OtherBookedTaskCard } from "@components/Cards/OtherBookedTaskCard";
import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import {
    useClearSearchedTaskers,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import SkeletonBookingCard from "@components/Skeletons/SkeletonBookingCard";
import { Grid, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import React, { useState } from "react";
import type { MyTaskProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";

export const MyService = () => {
    const [searchParam, setSearchParam] = useState("");
    const clearSearchedTaskers = useClearSearchedTaskers();
    const clearSearchQuery = useClearSearchQuery();
    const [bookingPageNo, setBookingPageNo] = useState<number>(1);

    const { data: userData } = useUser();
    const userId = userData?.id ?? "";
    const { data: myServiceData, isLoading } = useQuery(
        ["my-service", userId, searchParam, bookingPageNo],
        async () => {
            const response = await axiosClient.get(
                `${urls.task.service}&user=${userId}&${searchParam}&page_size=9&page=${bookingPageNo}`
            );
            return response.data;
        },
        {
            enabled: !!userId,
        }
    );
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
            <Grid className="d-flex align-items-center">
                <Grid.Col md={10}>
                    <SearchCategory
                        searchModal="task"
                        onSearchParamChange={handleSearchParamChange}
                        onFilterClear={() => setSearchParam("")}
                    />
                </Grid.Col>
            </Grid>
            {/* <h3>My Bookings</h3> */}
            <div className="overflow-hidden">
                {isLoading && (
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
                        {!isLoading &&
                            myServiceData.result &&
                            myServiceData?.result?.length >= 0 &&
                            myServiceData?.result.map(
                                (item: MyTaskProps, index: number) => (
                                    <Grid.Col lg={4} sm={6} key={index}>
                                        <OtherBookedTaskCard
                                            linkTo={`/service/${item?.slug}`}
                                            myTask={item}
                                        />
                                    </Grid.Col>
                                )
                            )}
                    </>
                </Grid>
                {myServiceData?.result && (
                    <span className="d-flex justify-content-center mt-4">
                        <Pagination
                            total={myServiceData?.total_pages}
                            color="yellow"
                            initialPage={bookingPageNo}
                            onChange={(value) => {
                                setBookingPageNo(value);
                            }}
                        />
                    </span>
                )}
            </div>
            {!isLoading && myServiceData?.result?.length <= 0 && (
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
