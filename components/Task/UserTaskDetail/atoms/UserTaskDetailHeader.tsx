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
import type { TaskerDetails } from "staticData/taskDetail";
import { safeParse } from "utils/safeParse";

import { UserStats } from "./UserStats";

interface UserTaskDetailHeaderProps {
    taskerDetail: TaskerDetails;
    activeTaskId: string;
    maxHeaderWidth?: string;
}

export const UserTaskDetailHeader = ({
    taskerDetail,
    activeTaskId,
    maxHeaderWidth,
}: UserTaskDetailHeaderProps) => {
    const [showHireMerchantModal, setShowHireMerchantModal] = useState(false);
    const [showMenu, toggleShowMenu] = useToggle([false, true]);

    const userType = safeParse({
        rawString: taskerDetail?.user_type,
        initialData: [],
    }).join(", ");
    return (
        <>
            <HireMerchantModal
                show={showHireMerchantModal}
                onHide={() => setShowHireMerchantModal(false)}
            />
            <Row style={{ maxWidth: maxHeaderWidth ?? undefined }}>
                <Col>
                    <div className="td-user-image-container">
                        <Image
                            src={
                                taskerDetail?.profile_image ??
                                "/community/gallery2.png"
                            }
                            width={148}
                            height={148}
                            objectFit="cover"
                            alt={"profile"}
                            className="rounded-circle"
                        />
                        {taskerDetail?.is_profile_verified && (
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
                        data-is-online={JSON.stringify(true)}
                    >
                        {taskerDetail?.full_name}
                    </h4>
                    <p className="td-text mb-4">{userType}</p>
                    <RatingStars value={taskerDetail?.stats?.user_reviews} />
                    <UserStats
                        happyCustomers={taskerDetail?.stats?.happy_clients}
                        rewardPercentage={taskerDetail?.stats?.success_rate}
                        taskCompleted={taskerDetail?.stats?.task_completed}
                        rank={"12"}
                    />
                </Col>
                <Col>
                    <div className="td-task-detail-header-icons">
                        <SaveIcon />
                        <ShareIcon
                            url={`http://localhost:3005/tasker?taskerId=${activeTaskId}`}
                            quote={"Tasker from cipher project"}
                            hashtag={"cipher-tasker"}
                        />
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
                    <p className="td-task-charge my-4">
                        {taskerDetail?.charge_currency}{" "}
                        {taskerDetail?.hourly_rate}/hr
                    </p>
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
