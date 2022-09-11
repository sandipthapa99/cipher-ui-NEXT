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
                    <TaskCard
                        title={task?.title}
                        id={task?.id}
                        charge={task?.charge}
                        description={task?.description}
                        location={task?.location}
                        start_date={task?.start_date}
                        start_time={task?.start_time}
                        status={task?.status}
                        currency={task?.currency}
                        slug={`/${task?.slug}`}
                    />
                </Col>
            ))}
        </Row>
    );
};
