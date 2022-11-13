import { MyBookedTaskCard } from "@components/Cards/MyBookedTaskCard";
import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import {
    useClearSearchedTaskers,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import SkeletonBookingCard from "@components/Skeletons/SkeletonBookingCard";
import { Grid, Pagination, Select } from "@mantine/core";
import { useApprovedTask } from "hooks/use-approvedTask";
import React, { useState } from "react";
import type { ApprovedTaskProps } from "types/approvedTaskProps";

export const ApprovedTask = () => {
    const [searchParam, setSearchParam] = useState("");
    const clearSearchedTaskers = useClearSearchedTaskers();
    const clearSearchQuery = useClearSearchQuery();

    const [value, setValue] = useState<string | null>("true");

    const [bookingPageNo, setBookingPageNo] = useState<number>(1);

    //----------For other booking------------
    const { data: othersTaskList, isLoading: bookingLoading } = useApprovedTask(
        searchParam,
        bookingPageNo,
        value
    );
    const othersTask = othersTaskList?.result;

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
                        searchModal="booking"
                        onSearchParamChange={handleSearchParamChange}
                        onFilterClear={() => setSearchParam("")}
                    />
                </Grid.Col>
                <Grid.Col md={2}>
                    <Select
                        value={value}
                        onChange={setValue}
                        data={[
                            { value: "true", label: "By Me" },
                            { value: "false", label: "By Other" },
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
                <Grid>
                    <>
                        {!bookingLoading &&
                            othersTask &&
                            othersTask?.length >= 0 &&
                            othersTask?.map(
                                (
                                    item: ApprovedTaskProps["result"][0],
                                    index: number
                                ) => (
                                    <Grid.Col lg={4} sm={6} key={index}>
                                        <MyBookedTaskCard
                                            Approvedtask={item}
                                            linkTo={"#!"}
                                        />
                                    </Grid.Col>
                                )
                            )}
                    </>
                </Grid>
                {othersTaskList && (
                    <span className="d-flex justify-content-center mt-4">
                        <Pagination
                            total={othersTaskList?.total_pages}
                            color="yellow"
                            initialPage={bookingPageNo}
                            onChange={(value) => {
                                setBookingPageNo(value);
                            }}
                        />
                    </span>
                )}
            </div>
            {!bookingLoading && othersTask && othersTask?.length <= 0 && (
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
