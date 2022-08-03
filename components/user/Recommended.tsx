import TaskCard from "@components/common/TaskCard";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { tasks } from "staticData/task";

export const Recommended = () => {
    return (
        <div className="recommended-tab">
            <Row>
                {tasks?.map((task, key) => (
                    <Col sm="12" key={key}>
                        <TaskCard
                            title={task.title}
                            charge={task.charge}
                            description={task.description}
                            location={task.location}
                            date={task.date}
                            time={task.time}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
