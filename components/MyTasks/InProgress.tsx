import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import { ReviewModal } from "@components/Review/ReviewModal";
import { Col, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import React from "react";
import type { ApprovedTaskProps } from "types/approvedTaskProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export const InProgress = () => {
    const { data: userData } = useUser();
    const userId = userData?.id ?? "";
    const { data: mytaskData, isLoading } = useQuery(
        ["assinged-task"],
        async () => {
            const response = await axiosClient.get(
                `${urls.task.approvedTaskList}/?assigned_to_me=true`
            );
            return response.data.result;
        },
        {
            enabled: !!userId,
        }
    );
    console.log(mytaskData);

    return (
        <div className="my-task">
            {/* <h3>My Tasks</h3> */}

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
                    mytaskData?.map(
                        (
                            item: ApprovedTaskProps["result"][0],
                            index: number
                        ) => (
                            <>
                                <div className="task-wrapper" key={index}>
                                    <MyTaskOrder
                                        task_id={item?.entity_service?.id}
                                        applied_id={item?.id}
                                        assigner_id={item?.assigner?.id}
                                        created_at={item?.created_at}
                                        image={
                                            item?.entity_service?.images[0]
                                                ?.media
                                        }
                                        title={item?.title}
                                        assigner_name={
                                            item?.assigner?.first_name
                                        }
                                        budget_type={
                                            item?.entity_service?.budget_type
                                        }
                                        status={item?.status}
                                        currency={item?.currency?.symbol}
                                        budget_to={item?.charge}
                                        completed_on={item?.completed_on}
                                        taskID={item?.id}
                                    />
                                </div>
                            </>
                        )
                    )
                ) : (
                    <ApplyPostComponent
                        model="task"
                        title="No Tasks Available"
                        subtitle="Post a task to the marketplace and let merchant come to you."
                        buttonText="Post a Task"
                    />
                    // <Alert title="NO DATA AVAILABLE !!!" color="orange">
                    //     Sorry, You have no task data to show
                    // </Alert>
                )}
            </div>
        </div>
    );
};
