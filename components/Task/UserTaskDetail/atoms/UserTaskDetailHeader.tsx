import { RatingStars } from "@components/common/RatingStars";
import { HireMerchantModal } from "@components/Task/UserTaskDetail/atoms/HireMerchantModal";
import {
    faEllipsisVertical,
    faHeart,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TaskDetail } from "staticData/taskDetail";

import { UserStats } from "./UserStats";

interface UserTaskDetailHeaderProps {
    taskDetail: TaskDetail;
}

export const UserTaskDetailHeader = ({
    taskDetail,
}: UserTaskDetailHeaderProps) => {
    const [showHireMerchantModal, setShowHireMerchantModal] = useState(false);
    return (
        <>
            <HireMerchantModal
                show={showHireMerchantModal}
                onHide={() => setShowHireMerchantModal(false)}
            />
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
                        data-is-online={JSON.stringify(
                            taskDetail.user.isOnline
                        )}
                    >
                        {taskDetail.title}
                    </h4>
                    <p className="td-text mb-4">{taskDetail.category}</p>
                    <RatingStars value={taskDetail.totalRatings} />
                    <UserStats {...taskDetail.user} />
                </Col>
                <Col>
                    <div className="td-task-detail-header-icons">
                        <FontAwesomeIcon
                            color="#FE5050"
                            className="svg-icon"
                            icon={faHeart}
                        />
                        <FontAwesomeIcon
                            color="#3EAEFF"
                            className="svg-icon"
                            icon={faShare}
                        />
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faEllipsisVertical}
                        />
                    </div>
                    <p className="td-task-charge my-4">{taskDetail.charge}</p>
                    <button
                        onClick={() => setShowHireMerchantModal(true)}
                        className="td-hire-me-btn"
                        type="button"
                    >
                        Hire Me
                    </button>
                </Col>
            </Row>
        </>
    );
};
