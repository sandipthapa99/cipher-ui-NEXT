import TaskCard from "@components/common/TaskCard";
import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { Alert } from "@mantine/core";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";

export const TaskYouMayLike = () => {
    const { data: recommendedTasksData, isLoading: taskLoading } =
        useData<ITaskApiResponse>(
            ["like-tasks"],
            `${urls.task.service}&recommendation=Task You May Like`
        );

    return (
        <Row className="gx-5">
            {taskLoading ? (
                <SkeletonTaskCard />
            ) : recommendedTasksData?.data?.result?.length ? (
                recommendedTasksData?.data?.result?.map((task: any, key) => (
                    <Col md={12} key={key}>
                        <TaskCard task={task} />
                    </Col>
                ))
            ) : (
                <Alert title="NO DATA AVAILABLE !!!" color="orange">
                    Sorrry, You have no task data to show
                </Alert>
            )}
        </Row>
    );
};
