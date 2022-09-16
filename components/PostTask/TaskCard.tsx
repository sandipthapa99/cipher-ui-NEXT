import FullPageLoader from "@components/common/FullPageLoader";
import TaskCard from "@components/common/TaskCard";
import { useTasks } from "hooks/apply-task/useTask";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const Recommended = () => {
    const { data: recommendedTasks, isLoading } = useTasks();
    console.log("tasks data=", recommendedTasks);
    if (isLoading || !recommendedTasks) return <FullPageLoader />;
    return (
        <div className="recommended-tab">
            <Row>
                {recommendedTasks?.result?.map((task: any, key: any) => (
                    <Col sm="12" key={key}>
                        <TaskCard task={task} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
