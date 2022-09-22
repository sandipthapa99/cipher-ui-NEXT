import SaveIcon from "@components/common/SaveIcon";
import {
    faAward,
    faFaceGrinBeam,
    faLocationArrow,
} from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import type { Tasker } from "types/tasks";
import { axiosClient } from "utils/axiosClient";

import BigButton from "../common/Button";
import ShareIcon from "../common/ShareIcon";

interface Props {
    taskers?: Tasker;
    tasker: string;
    collabButton?: boolean;
    onTaskClick?: (taskerId: string) => void;
    handleButtonClick?: () => void;
    image?: string;
    name?: string;
    speciality?: string;
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
    collabButton,
    handleButtonClick,
    image,
    name,
    speciality,
    rating,
    happyClients,
    awardPercentage,
    location,
    tasker,
    distance,
    bio,
    charge,
    bookingId,
    isApproved,
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
    // console.log("bookibgid", bookingId);

    return (
        <div
            data-active={JSON.stringify(path === tasker)}
            className="team-members-card mb-5 active"
        >
            <Link href={`/tasker/${tasker}/`}>
                <a>
                    <div className="d-flex w-100 image-and-title">
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
                        {!image ||
                            (image.length <= 0 && (
                                <figure className="team-member-card-image">
                                    <Image
                                        src={
                                            "/placeholder/profilePlaceholder.png"
                                        }
                                        alt="team-member-card-image"
                                        height={80}
                                        width={80}
                                    />
                                </figure>
                            ))}

                        <div className="w-100 name-post-count">
                            <div className="d-flex justify-content-between title-and-dots text-dark">
                                <h5>{name}</h5>
                                {/* <FontAwesomeIcon
                            className="ellipsis-vertical"
                            icon={faEllipsisVertical}
                        /> */}
                            </div>
                            <h6 className="text-dark">
                                <span>
                                    {speciality ? JSON.parse(speciality) : ""}{" "}
                                </span>
                                | {location}
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
                </a>
            </Link>
            <div className="d-flex justify-content-between footer-section">
                <div className="d-flex share-and-like">
                    <SaveIcon
                        model="user"
                        object_id={userId}
                        filled={isBookmarked}
                        onSuccess={() =>
                            queryClient.invalidateQueries(["bookmarks", "user"])
                        }
                        className={"me-3"}
                    />
                    <ShareIcon url={""} quote={""} hashtag={""} />
                </div>
                <div className="d-flex align-items-center gap-3">
                    {isApproved === false && (
                        <BigButton
                            btnTitle={"Decline"}
                            backgroundColor={"#fff"}
                            handleClick={() => {
                                sendBookReject.mutate(
                                    { booking: bookingId },
                                    {
                                        onSuccess: () => {
                                            toast.success("Booking Rejected");
                                            queryClient.invalidateQueries([
                                                "get-my-bookings",
                                            ]);
                                            router.push("/home");
                                        },
                                        onError: (error: any) => {
                                            console.log(error);
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
                                        console.log(error);
                                        toast.error(
                                            error.response.data.booking.message
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
    );
};