import { Alert } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import type { MyBookingProps } from "types/myBookingProps";
import type { MyTaskProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export const MyBookings = () => {
    const { data: myBookingData } = useQuery(["my-booking"], async () => {
        const response = await axiosClient.get("/task/service/my-booking/");
        return response.data.result;
    });
    const router = useRouter();

    return (
        <div className="my-task">
            <h3>My Bookings</h3>

            <div className="my-task__each-orders">
                {myBookingData?.length ? (
                    myBookingData?.map(
                        (item: MyBookingProps, index: number) => (
                            <div
                                className="booking-wrapper"
                                key={index}
                                onClick={() =>
                                    router.push({
                                        pathname: `/service/${item?.service?.slug}`,
                                    })
                                }
                            >
                                <MyTaskOrder
                                    task_id={item?.service?.id}
                                    assigner_id={item?.service?.created_by?.id}
                                    created_at={item?.created_at}
                                    image={item?.service?.images[0]?.media}
                                    title={item?.service?.title}
                                    assigner_name={
                                        item?.service?.created_by?.full_name
                                    }
                                    budget_from={item?.service?.budget_from}
                                    budget_to={item?.service?.budget_to}
                                    budget_type={item?.service?.budget_type}
                                    status={item?.status}
                                    currency={item?.service?.currency?.code}
                                />
                            </div>
                        )
                    )
                ) : (
                    <Alert title="NO DATA AVAILABLE !!!" color="orange">
                        Sorrry, You have no booking data to show
                    </Alert>
                )}
            </div>
        </div>
    );
};
