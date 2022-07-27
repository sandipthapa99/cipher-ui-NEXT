import { UserTaskCard } from "@components/Task/UserTaskCard/UserTaskCard";
import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { taskDetails } from "staticData/taskDetail";
import { DUMMY_TASKS } from "types/tasks";

export const Collaboration = () => {
    const [onToogle, setOnToogle] = useState(false);
    return (
        <div className="collaboration-tab">
            <div className="d-flex justify-content-between collaboration-header">
                <div className="header-right">
                    <h4>Open for Collaboration</h4>
                    <p>
                        You can collaborate with other freelancer to complete
                        the task.
                    </p>
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        onChange={(event) => setOnToogle(event.target.checked)}
                    />
                </div>
            </div>

            {onToogle && (
                <Row>
                    {DUMMY_TASKS.map((item, index) => (
                        <Col md={6} sm={12} key={index}>
                            <UserTaskCard
                                task={item}
                                onTaskClick={() => {}}
                                isButton={true}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};
