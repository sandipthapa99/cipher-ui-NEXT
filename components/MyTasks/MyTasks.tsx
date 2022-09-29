import { Alert, Col, Grid, Loader, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { useRouter } from "next/router";
import React from "react";
import type { MyTaskProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export const MyTasks = () => {
    const { data: userData } = useUser();
    const userId = userData?.id ?? "";
    const { data: mytaskData, isLoading } = useQuery(
        ["my-task", userId],
        async () => {
            const response = await axiosClient.get(
                `/task/entity/service/?user=${userId}`
            );
            return response.data.result;
        },
        { enabled: !!userId }
    );

    const router = useRouter();

    return (
        <div className="my-task">
            <h3>My Tasks</h3>

            <div className="my-task__each-orders">
                {isLoading ? (
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
                ) : mytaskData?.length ? (
                    mytaskData?.map((item: MyTaskProps, index: number) => (
                        <div
                            className="task-wrapper"
                            key={index}
                            onClick={() =>
                                router.push({
                                    pathname: `/task/${item?.slug}`,
                                })
                            }
                        >
                            <MyTaskOrder
                                task_id={item?.id}
                                assigner_id={item?.assigner?.id}
                                created_at={item?.created_at}
                                image={item?.images[0]?.media}
                                title={item?.title}
                                assigner_name={item?.assigner?.first_name}
                                budget_from={item?.budget_from}
                                budget-to={item?.budget_to}
                                budget_type={item?.budget_type}
                                status={item?.status}
                                currency={item?.currency?.symbol}
                                budget_to={item?.budget_to}
                            />
                        </div>
                    ))
                ) : (
                    <Alert title="NO DATA AVAILABLE !!!" color="orange">
                        Sorry, You have no task data to show
                    </Alert>
                )}
            </div>
        </div>
    );
};
