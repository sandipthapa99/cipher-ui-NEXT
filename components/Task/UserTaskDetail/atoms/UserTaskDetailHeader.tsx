import CardBtn from "@components/common/CardBtn";
import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { RatingStars } from "@components/common/RatingStars";
import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import { HireMerchantModal } from "@components/Task/UserTaskDetail/atoms/HireMerchantModal";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToggle } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { TaskerDetails } from "staticData/taskDetail";
import { safeParse } from "utils/safeParse";

import { UserStats } from "./UserStats";

interface UserTaskDetailHeaderProps {
    taskerDetail: TaskerDetails;
    maxHeaderWidth?: string;
}

export const UserTaskDetailHeader = ({
    taskerDetail,
    maxHeaderWidth,
}: UserTaskDetailHeaderProps) => {
    const router = useRouter();
    const { data: user } = useUser();
    const [showHireMerchantModal, setShowHireMerchantModal] = useState(false);
    const [showMenu, toggleShowMenu] = useToggle([false, true]);

    const userType = safeParse({
        rawString: taskerDetail?.user_type,
        initialData: [],
    }).join(", ");

    const isBookmarked = useIsBookmarked("user", taskerDetail?.user?.id);
    const isSelf = user?.id === taskerDetail?.user?.id;
    const queryClient = useQueryClient();

    return (
        <>
            <HireMerchantModal
                show={showHireMerchantModal}
                onHide={() => setShowHireMerchantModal(false)}
                taskerDetail={taskerDetail}
            />
            <Row style={{ maxWidth: maxHeaderWidth ?? undefined }}>
                <Col md={8} className="d-flex">
                    <div className="td-user-image-container">
                        <Image
                            src={
                                taskerDetail?.profile_image ??
                                "/userprofile/unknownPerson.jpg"
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
                    <div>
                        <h4
                            className="td-user-name"
                            data-is-online={JSON.stringify(true)}
                        >
                            {taskerDetail?.full_name}
                        </h4>
                        <p className="td-text mb-4">{userType}</p>

                        <RatingStars value={taskerDetail?.rating?.avg_rating} />

                        <UserStats
                            happyCustomers={taskerDetail?.stats?.happy_clients}
                            rewardPercentage={taskerDetail?.stats?.success_rate}
                            taskCompleted={taskerDetail?.stats?.task_completed}
                            rank={"12"}
                        />
                    </div>
                </Col>
                <Col md={4} className="d-flex flex-column">
                    <div className="td-task-detail-header-icons">
                        <SaveIcon
                            model="user"
                            object_id={taskerDetail?.user?.id}
                            filled={isBookmarked}
                            onSuccess={() =>
                                queryClient.invalidateQueries([
                                    "bookmarks",
                                    "user",
                                ])
                            }
                        />
                        <ShareIcon
                            url={`http://localhost:3005/tasker?taskerId=${taskerDetail?.user?.id}`}
                            quote={"Tasker from cipher project"}
                            hashtag={"cipher-tasker"}
                        />
                        {/* <EllipsisDropdown
                            showModal={showMenu}
                            handleOnClick={() => toggleShowMenu()}
                        >
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                className="svg-icon option"
                            />
                        </EllipsisDropdown> */}
                    </div>
                    <p className="td-task-charge my-4">
                        {taskerDetail?.charge_currency?.code}{" "}
                        {taskerDetail?.hourly_rate}/hr
                    </p>
                    {isSelf ? (
                        <CardBtn
                            color="#fff"
                            backgroundColor="#FE5050"
                            btnTitle="View Profile"
                            handleClick={() => router.push("/profile")}
                        />
                    ) : (
                        <CardBtn
                            handleClick={() => setShowHireMerchantModal(true)}
                            // className="td-hire-me-btn"
                            // type="button"
                            color="#111"
                            btnTitle="Hire Me"
                            backgroundColor="#FFCA6A"
                        />
                    )}
                </Col>
            </Row>
        </>
    );
};
