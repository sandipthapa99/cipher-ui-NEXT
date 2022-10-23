import CardBtn from "@components/common/CardBtn";
import { RatingStars } from "@components/common/RatingStars";
import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import { HireMerchantModal } from "@components/Task/UserTaskDetail/atoms/HireMerchantModal";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { ITasker } from "types/tasker";
import { getPageUrl } from "utils/helpers";
import { safeParse } from "utils/safeParse";

import { UserStats } from "./UserStats";

interface UserTaskDetailHeaderProps {
    taskerDetail: ITasker;
    maxHeaderWidth?: string;
}

export const UserTaskDetailHeader = ({
    taskerDetail,
    maxHeaderWidth,
}: UserTaskDetailHeaderProps) => {
    const router = useRouter();
    const { data: user } = useUser();
    const [showHireMerchantModal, setShowHireMerchantModal] = useState(false);

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
                    {/* {taskerDetail?.profile_image && (
                        <div className="td-user-image-container">
                            <Image
                                src={
                                    taskerDetail?.profile_image
                                        ? taskerDetail?.profile_image
                                        : "/placeholder/profilePlaceholder.png"
                                }
                                width={148}
                                height={148}
                                objectFit="cover"
                                placeholder="blur"
                                // blurDataURL="/placeholder/profilePlaceholder.png"
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
                    )}
                    {!taskerDetail?.profile_image ||
                        (taskerDetail?.profile_image?.length <= 0 && (
                            <div className="td-user-image-container">
                                <Image
                                    src={"/placeholder/profilePlaceholder.png"}
                                    alt="team-member-card-image"
                                    height={80}
                                    width={80}
                                />
                            </div>
                        ))} */}
                    <figure className="td-user-image-container">
                        {taskerDetail?.is_profile_verified ? (
                            <FontAwesomeIcon
                                icon={faBadgeCheck}
                                className="badge-icon"
                            />
                        ) : (
                            ""
                        )}

                        {/* <div className="img-dragdrop d-flex align-items-center justify-content-center">
                            <label
                                htmlFor="choosefile"
                                className="browse text-primary"
                                role="button"
                            >
                                <FontAwesomeIcon
                                    icon={faCamera}
                                    className="camera-icon"
                                />
                            </label>

                            <input
                                hidden
                                id="choosefile"
                                type="file"
                                ref={inputRef}
                                name="image"
                                onChange={(event: any) => {
                                    const files = event.target.files;
                                    field?.("image", (files ?? [])[0]);
                                    setImage(files[0]);
                                    
                                    setShowEditForm(!showEditForm);
                                }}
                            />
                        </div> */}

                        <Image
                            src={
                                taskerDetail?.profile_image
                                    ? taskerDetail?.profile_image
                                    : "/userprofile/unknownPerson.jpg"
                            }
                            alt="profile-pic"
                            className="rounded-circle"
                            objectFit="cover"
                            height={150}
                            width={150}
                            priority={true}
                        />
                    </figure>

                    <div>
                        <h4
                            className="td-user-name"
                            data-is-online={JSON.stringify(true)}
                        >
                            {`${taskerDetail?.user?.first_name} ${taskerDetail?.user?.middle_name} ${taskerDetail?.user?.last_name}`}
                        </h4>
                        <p className="td-text mb-4">{userType}</p>

                        <RatingStars
                            value={
                                taskerDetail?.rating?.avg_rating > 0
                                    ? taskerDetail?.rating?.avg_rating
                                    : 0
                            }
                        />

                        <UserStats
                            happyCustomers={taskerDetail?.stats?.happy_clients}
                            rewardPercentage={taskerDetail?.stats?.success_rate}
                            taskCompleted={taskerDetail?.stats?.task_completed}
                            rank={"12"}
                        />
                    </div>
                </Col>
                <Col md={4} className="d-flex flex-column align-items-end">
                    <div className="td-task-detail-header-icons">
                        <SaveIcon
                            showText
                            model="user"
                            object_id={taskerDetail?.user?.id}
                            filled={isBookmarked}
                            onSuccess={() =>
                                queryClient.invalidateQueries([
                                    "bookmarks",
                                    "user",
                                ])
                            }
                        />{" "}
                        <ShareIcon
                            showText
                            url={getPageUrl()}
                            quote={"Tasker from Homaale project"}
                            hashtag={"Homaale-tasker"}
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
                        {taskerDetail?.charge_currency?.symbol}{" "}
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
                        // (
                        //     <CardBtn
                        //         handleClick={() => setShowHireMerchantModal(true)}
                        //         // className="td-hire-me-btn"
                        //         // type="button"
                        //         color="#111"
                        //         btnTitle="Hire Me"
                        //         backgroundColor="#FFCA6A"
                        //     />
                        // )
                        ""
                    )}
                </Col>
            </Row>
        </>
    );
};
