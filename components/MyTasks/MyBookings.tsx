import { Alert, Col, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import Link from "next/link";
import React from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export const MyBookings = () => {
    const { data: myBookingData, isLoading } = useQuery(
        ["my-booking"],
        async () => {
            const response = await axiosClient.get<MyBookingServiceProps>(
                urls.profile.my_bookings
            );
            return response.data.result;
        }
    );

    return (
        <div className="my-task">
            <h3>My Bookings</h3>
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
                {myBookingData?.length ? (
                    myBookingData?.map((item, index) => (
                        <div className="booking-wrapper" key={index}>
                            <Link
                                href={{
                                    pathname: "/checkout/",
                                    query: { id: item?.entity_service?.id },
                                }}
                            >
                                <a>
                                    <MyTaskOrder
                                        task_id={item?.entity_service?.id}
                                        assigner_id={String(
                                            item?.entity_service?.created_by?.id
                                        )}
                                        created_at={item?.created_at}
                                        image={
                                            item?.images[0]?.media
                                                ? item?.images[0]?.media
                                                : "/placeholder/taskPlaceholder.png"
                                        }
                                        title={item?.entity_service?.title}
                                        assigner_name={`${
                                            item?.entity_service?.created_by
                                                ?.first_name
                                        } ${
                                            item?.created_by?.user?.middle_name
                                                ? item?.created_by?.user
                                                      ?.middle_name
                                                : ""
                                        } ${item?.created_by?.user?.last_name}`}
                                        budget_from={item?.budget_from}
                                        budget_to={item?.budget_to}
                                        budget_type={
                                            item?.entity_service?.budget_type
                                        }
                                        status={item?.status}
                                        currency={
                                            item?.entity_service?.currency
                                                ?.symbol
                                        }
                                    />
                                </a>
                            </Link>
                        </div>
                    ))
                ) : (
                    <Alert title="NO DATA AVAILABLE !!!" color="orange">
                        Sorry, You have no booking to show.
                    </Alert>
                )}
            </div>
        </div>
    );
};
