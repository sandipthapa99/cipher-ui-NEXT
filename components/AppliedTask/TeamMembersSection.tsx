import { TeamMembersCard } from "@components/common/TeamMembersCard";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { DUMMY_TASKS } from "types/tasks";

export const TeamMembersSection = () => {
    return (
        <div className="team-members-section">
            <h3>Team Members({DUMMY_TASKS?.length})</h3>
            <Row className="g-5 d-flex">
                {DUMMY_TASKS?.map((item, index) => (
                    <Col sm={12} md={6} lg={6} key={index}>
                        <TeamMembersCard task={item} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
