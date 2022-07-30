import { TeamMembersCard } from "@components/common/TeamMembersCard";
import { UserTaskCard } from "@components/Task/UserTaskCard/UserTaskCard";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DUMMY_TASKS } from "types/tasks";

import { CollaborationRequestForm } from "./CollaborationRequestForm";

export const Collaboration = () => {
    const [onToogle, setOnToogle] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleOpen = () => {
        setShow(true);
    };

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
                <Row className="g-5">
                    {DUMMY_TASKS.map((item, index) => (
                        <Col lg={6} md={12} sm={12} key={index}>
                            {/* <UserTaskCard
                                task={item}
                                onTaskClick={() => {}}
                                isButton={true}
                                handleButtonClick={handleOpen}
                            /> */}

                            <TeamMembersCard task={item} collabButton={true} />
                        </Col>
                    ))}
                </Row>
            )}

            <CollaborationRequestForm show={show} handleClose={handleClose} />
        </div>
    );
};