import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { RatingStars } from "@components/common/RatingStars";
import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import { HireMerchantModal } from "@components/Task/UserTaskDetail/atoms/HireMerchantModal";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToggle } from "@mantine/hooks";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskDetail } from "staticData/taskDetail";

import { UserStats } from "./UserStats";

interface UserTaskDetailHeaderProps {
    taskDetail: TaskDetail;
}

export const UserTaskDetailHeader = ({
    taskDetail,
}: UserTaskDetailHeaderProps) => {
    const [showHireMerchantModal, setShowHireMerchantModal] = useState(false);
    const [showMenu, toggleShowMenu] = useToggle([false, true]);

    return (
        <>
            <HireMerchantModal
                task={taskDetail}
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
                        <SaveIcon />
                        <ShareIcon />
                        <EllipsisDropdown
                            showModal={showMenu}
                            handleOnClick={() => toggleShowMenu()}
                        >
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                className="svg-icon option"
                            />
                        </EllipsisDropdown>
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
