import { TeamMembersCard } from "@components/common/TeamMembersCard";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { DUMMY_TASKS } from "types/tasks";

export const TaskersTab = () => {
    return (
        <div className="tasker-tab-taskdetail">
            <Row className="g-5">
                {DUMMY_TASKS.map((item, index) => (
                    <Col md={12} lg={6} key={index}>
                        <TeamMembersCard task={item} collabButton={false} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
