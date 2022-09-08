import TaskCard from "@components/common/TaskCard";
import { useMyTasks } from "hooks/task/use-my-tasks";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const Recent = () => {
    const { data: recentTask } = useMyTasks();
    //for tasks

    return (
        <div className="recommended-tab">
            <Row>
                {recentTask?.result?.map((task: any, key: any) => (
                    <Col sm="12" key={key}>
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
                            slug={`/task/${task?.slug}`}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
