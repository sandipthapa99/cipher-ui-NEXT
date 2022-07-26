import { faBadgeCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { TaskDetail } from "staticData/taskDetail";

interface UserTaskDetailHeaderProps {
    taskDetail: TaskDetail;
}

export const UserTaskDetailHeader = ({
    taskDetail,
}: UserTaskDetailHeaderProps) => {
    return (
        <Row>
            <Col>
                <div className="td-user-image-container">
                    <Image
                        src={taskDetail.user.profileImage}
                        width="148px"
                        height="148px"
                        objectFit="cover"
                        alt={`${taskDetail.title}'s profile`}
                        className="rounded-circle"
                    />
                    {taskDetail.user.isVerified && (
                        <FontAwesomeIcon
                            fill="#00a8ff"
                            color="#3EAEFF"
                            className="svg-icon td-user-image-container__badge"
                            icon={faBadgeCheck}
                        />
                    )}
                </div>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
    );
};
