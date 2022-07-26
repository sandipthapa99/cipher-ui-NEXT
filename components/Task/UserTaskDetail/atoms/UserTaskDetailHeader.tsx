import { RatingStars } from "@components/common/RatingStars";
import {
    faBadgeCheck,
    faEllipsisVertical,
    faHeart,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { TaskDetail } from "staticData/taskDetail";

import { UserStats } from "./UserStats";

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
                            size="6x"
                            color="#3EAEFF"
                            className="svg-icon td-user-image-container__badge"
                            icon={faBadgeCheck}
                        />
                    )}
                </div>
            </Col>
            <Col md={6}>
                <h4
                    className="td-user-name"
                    data-is-online={JSON.stringify(taskDetail.user.isOnline)}
                >
                    {taskDetail.title}
                </h4>
                <p>{taskDetail.category}</p>
                <RatingStars value={taskDetail.totalRatings} />
                <UserStats {...taskDetail.user} />
            </Col>
            <Col>
                <Row>
                    <Col>
                        <FontAwesomeIcon
                            color="#FE5050"
                            className="svg-icon"
                            icon={faHeart}
                        />
                    </Col>
                    <Col>
                        <FontAwesomeIcon
                            color="#3EAEFF"
                            className="svg-icon"
                            icon={faShare}
                        />
                    </Col>
                    <Col>
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faEllipsisVertical}
                        />
                    </Col>
                </Row>
                <p className="td-text my-4">{taskDetail.charge}</p>
                <button className="td-hire-me-btn" type="button">
                    Hire Me
                </button>
            </Col>
        </Row>
    );
};
