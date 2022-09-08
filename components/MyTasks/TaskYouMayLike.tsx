import TaskCard from "@components/common/TaskCard";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";

export const TaskYouMayLike = () => {
    const { data: recommendedTasksData, isLoading: taskLoading } =
        useData<ITaskApiResponse>(
            ["all-tasks"],
            "/task/?recommendation=you may like"
        );

    return (
        <Row className="gx-5">
            {recommendedTasksData?.data?.result?.map((task: any, key) => (
                <Col md={12} key={key}>
                    <TaskCard task={task} />
                </Col>
            ))}
        </Row>
    );
};
