import SaveIcon from "@components/common/SaveIcon";
import {
    faAward,
    faCircleInfo,
    faFaceGrinBeam,
    faLocationArrow,
} from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Tasker } from "types/tasks";
import { axiosClient } from "utils/axiosClient";

import BigButton from "../common/Button";
import ShareIcon from "../common/ShareIcon";
import BookingDetails from "./BookingDetails";

interface Props {
    taskers?: Tasker;
    tasker: string;
    collabButton?: boolean;
    onTaskClick?: (taskerId: string) => void;
    handleButtonClick?: () => void;
    image?: string;
    name?: string;
    designation?: string;
    rating?: number;
    happyClients?: number;
    awardPercentage?: string | number;
    location?: string;
    distance?: string;
    bio?: string;
    charge?: string;
    bookingId?: number | undefined;
    isApproved: boolean | undefined;
}

export const MyBookingsCard = ({
    image,
    name,
    rating,
    happyClients,
    awardPercentage,
    location,
    tasker,
    distance,
    bio,
    bookingId,
    isApproved,
    designation,
}: Props) => {
    const userId = tasker;
    const isBookmarked = useIsBookmarked("user", userId);
    const queryClient = useQueryClient();

    const router = useRouter();
    const path = router.query.id;
    const sendBookApproval = useMutation(
        (data: { booking: number | undefined }) =>
            axiosClient.post("/task/entity/service-booking/approval/", data)
    );
    const sendBookReject = useMutation(
        (data: { booking: number | undefined }) =>
            axiosClient.post("/task/entity/service-booking/reject/", data)
    );

    const [opened, setOpened] = useState(false);

    return (
        <>
            <div
                data-active={JSON.stringify(path === tasker)}
                className="team-members-card mb-5 active"
            >
                <div
                    className="d-flex w-100 image-and-title"
                    onClick={() => setOpened(true)}
                    role="button"
                >
                    {image && (
                        <figure className="team-member-card-image">
                            <Image
                                src={image}
                                alt="team-member-card-image"
                                height={80}
                                width={80}
                            />
                        </figure>
                    )}
                    {!image && (
                        <figure className="team-member-card-image">
                            <Image
                                src={"/placeholder/profilePlaceholder.png"}
                                alt="team-member-card-image"
                                height={80}
                                width={80}
                            />
                        </figure>
                    )}

                    <div className="w-100 name-post-count">
                        <div className="d-flex align-items-start justify-content-between title-and-dots text-dark">
                            <h5>{name}</h5>
                            <ActionIcon color="yellow">
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    className="svg-icon me-0"
                                />
                            </ActionIcon>
                        </div>
                        <h6 className="text-dark">
                            <span>{designation} </span>{" "}
                            {designation && location ? " | " : ""}
                            {location ? `${location}` : ""}
                        </h6>
                        <div className="d-flex icon-wrapper-member gap-5 align-items-center emoji-section text-dark">
                            <span className="star">
                                <FontAwesomeIcon
                                    className="star"
                                    icon={faStar}
                                />
                                {rating &&
                                rating > 0 &&
                                Number.isSafeInteger(rating) ? (
                                    <span>{`${rating}.0`}</span>
                                ) : rating === null || 0 ? (
                                    <span>0</span>
                                ) : (
                                    <span>{`${rating?.toFixed(1)}`}</span>
                                )}
                            </span>

                            <span className="emoji">
                                <FontAwesomeIcon
                                    className="emoji"
                                    icon={faFaceGrinBeam}
                                />
                                <span>{happyClients}</span>
                            </span>
                            <span className="award">
                                <FontAwesomeIcon
                                    className="award"
                                    icon={faAward}
                                />
                                <span> {awardPercentage}</span>
                            </span>
                            <span className="location">
                                <FontAwesomeIcon
                                    className="location"
                                    icon={faLocationArrow}
                                />
                                <span> {distance}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <p>{bio}</p>
                <div className="d-flex justify-content-between footer-section">
                    <div className="d-flex share-and-like">
                        <SaveIcon
                            model="user"
                            object_id={userId}
                            filled={isBookmarked}
                            onSuccess={() =>
                                queryClient.invalidateQueries([
                                    "bookmarks",
                                    "user",
                                ])
                            }
                            className={"me-3"}
                        />
                        <ShareIcon url={""} quote={""} hashtag={""} />
                    </div>
                    <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                        {isApproved === false && (
                            <BigButton
                                btnTitle={"Decline"}
                                backgroundColor={"#fff"}
                                handleClick={() => {
                                    sendBookReject.mutate(
                                        { booking: bookingId },
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Booking Rejected"
                                                );
                                                queryClient.invalidateQueries([
                                                    "get-my-bookings",
                                                ]);
                                                router.push("/home");
                                            },
                                            onError: (error: any) => {
                                                toast.error(
                                                    error.response.data.booking
                                                        .message
                                                );
                                            },
                                        }
                                    );
                                }}
                                textColor={"#211D4F"}
                                border="1px solid #211D4F"
                            />
                        )}
                        <BigButton
                            btnTitle={isApproved ? "Approved" : "Approve"}
                            backgroundColor={isApproved ? "#32cd32" : "#211D4F"}
                            disabled={isApproved ? true : false}
                            loading={sendBookApproval.isLoading}
                            handleClick={() => {
                                sendBookApproval.mutate(
                                    { booking: bookingId },
                                    {
                                        onSuccess: () => {
                                            toast.success("Booking Approved");
                                            queryClient.invalidateQueries([
                                                "get-my-bookings",
                                            ]);
                                        },
                                        onError: (error: any) => {
                                            toast.error(
                                                error.response.data.booking
                                                    .message
                                            );
                                        },
                                    }
                                );
                            }}
                            textColor={"#fff"}
                        />
                    </div>
                    {/* <Link href={`/tasker/${tasker}/`}>
        <a>
            {collabButton == true ? (
                <div className="collab-button">
                    <BigButton
                        btnTitle={"Collab"}
                        backgroundColor={"#211D4F"}
                        handleClick={handleButtonClick}
                    />
                </div>
            ) : (
                <span className="task-price"> {charge}</span>
            )}
        </a>
    </Link> */}
                </div>
            </div>
            <BookingDetails
                show={opened}
                setShow={setOpened}
                bookingId={String(bookingId) ?? ""}
            />
        </>
    );
};
