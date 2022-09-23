import TaskCard from "@components/common/TaskCard";
import { Alert, Loader } from "@mantine/core";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";

export const TaskYouMayLike = () => {
    const { data: recommendedTasksData, isLoading: taskLoading } =
        useData<ITaskApiResponse>(
            ["all-tasks"],
            "/task/entity/service/?is_requested=false&recommendation=you may like"
        );

    return (
        <Row className="gx-5">
            {taskLoading ? (
                <Loader />
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
