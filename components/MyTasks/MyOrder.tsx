import { OtherBookedTaskCard } from "@components/Cards/OtherBookedTaskCard";
import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import { MyOrderItem } from "@components/common/MyOrderItem";
import {
    useClearSearchedTaskers,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import { SearchCategory } from "@components/SearchTask/SearchCategory";
import { Button, Col, Grid, Pagination, Skeleton } from "@mantine/core";
import { useOrder } from "hooks/use-order";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import type { MyOrderProps } from "types/myOrderProps";

export const MyOrder = () => {
    const [searchParam, setSearchParam] = useState<
        string | string[] | undefined
    >("");
    const clearSearchedTaskers = useClearSearchedTaskers();
    const clearSearchQuery = useClearSearchQuery();

    const router = useRouter();
    useEffect(() => {
        setSearchParam(router.query.name);
    }, [router.query.name]);

    console.log(
        "🚀 ~ file: MyOrder.tsx ~ line 17 ~ MyOrder ~ searchParam",
        searchParam
    );

    const [bookingPageNo, setBookingPageNo] = useState<number>(1);

    const { data: myOrderPage, isLoading } = useOrder(
        searchParam,
        bookingPageNo
    );

    const orders = myOrderPage?.result;

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
                <SearchCategory
                    searchModal="booking"
                    onSearchParamChange={handleSearchParamChange}
                    onFilterClear={() => setSearchParam("")}
                />
            </Grid>
            {/* <h3>My Bookings</h3> */}
            <div className="my-task">
                {/* <h3>My Tasks</h3> */}

                <div className="my-task__each-orders">
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
                    {!isLoading &&
                        orders &&
                        orders?.map(
                            (
                                item: MyOrderProps["result"][0],
                                index: number
                            ) => (
                                <div
                                    className="task-wrapper my-task-order bg-light"
                                    key={index}
                                >
                                    <div className="d-flex justify-content-between align-items-center order-section">
                                        <span className="order-id">
                                            Order ID: #{item?.id.slice(0, 8)}
                                        </span>
                                        {/* <p>{item.status}</p> */}
                                        <span className="ordered-date">
                                            <Button
                                                variant="light"
                                                disabled={
                                                    !(
                                                        item?.status ===
                                                            "saved" ||
                                                        item?.status ===
                                                            "awaiting_approval"
                                                    )
                                                }
                                                onClick={() =>
                                                    router.push({
                                                        pathname: "/checkout/",
                                                        query: {
                                                            id: item?.id,
                                                        },
                                                    })
                                                }
                                            >
                                                Pay Now
                                            </Button>
                                        </span>
                                    </div>
                                    <MyOrderItem orderItem={item?.order_item} />
                                </div>
                            )
                        )}
                </div>
                {!isLoading && orders?.length <= 0 && (
                    <div className="bg-white p-5 text-center">
                        <figure className="position-relative">
                            <Image
                                src={"/orderEmpty.png"}
                                alt="order-empty-img"
                                height={243}
                                width={243}
                            />
                        </figure>
                        <p className="mb-3" style={{ fontSize: "2.4rem" }}>
                            You Have No Approved Bookings Yet.
                        </p>
                        <p>
                            <Link href={"/home?activeTab=1"}>
                                <a>Click here </a>
                            </Link>
                            to see your booking details.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};
