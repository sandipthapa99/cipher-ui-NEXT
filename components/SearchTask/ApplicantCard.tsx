import SaveIcon from "@components/common/SaveIcon";
import { ActionIcon } from "@mantine/core";
import {
    ErrorOutlineOutlined,
    SentimentVerySatisfiedOutlined,
    StarRounded,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import { useState } from "react";
import type { MyBookings } from "types/bookings";
import { RenderDifferentButton } from "utils/AcceptRejectBtn";

import ShareIcon from "../common/ShareIcon";
import BookingDetails from "./BookingDetails";

export const ApplicantCard = ({ card }: { card: MyBookings["result"][0] }) => {
    const { created_by, location, id, status } = card;

    const {
        user: { first_name, middle_name, last_name, id: userId },
        designation,
        rating: { avg_rating },
        stats: { happy_clients },
        bio,
        profile_image,
    } = created_by ?? {};

    const isBookmarked = useIsBookmarked("user", userId);
    const queryClient = useQueryClient();

    const [opened, setOpened] = useState(false);

    return (
        <>
            <div className="team-members-card mb-5 active">
                <div
                    className="d-flex w-100 image-and-title"
                    onClick={() => setOpened(true)}
                    role="button"
                >
                    {profile_image && (
                        <figure className="team-member-card-image">
                            <Image
                                src={profile_image}
                                alt="team-member-card-image"
                                height={80}
                                width={80}
                            />
                        </figure>
                    )}
                    {!profile_image && (
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
                            <h5>
                                {first_name} {middle_name} {last_name}
                            </h5>
                            <ActionIcon color="yellow">
                                <ErrorOutlineOutlined className="svg-icon me-0" />
                            </ActionIcon>
                        </div>
                        <h6 className="text-dark">
                            <span>{designation} </span>{" "}
                            {designation && location ? " | " : ""}
                            {location ? `${location}` : ""}
                        </h6>
                        <div className="d-flex icon-wrapper-member gap-5 align-items-center emoji-section text-dark">
                            <span className="star">
                                <StarRounded className="star" />
                                {avg_rating &&
                                avg_rating > 0 &&
                                Number.isSafeInteger(avg_rating) ? (
                                    <span>{`${avg_rating}.0`}</span>
                                ) : avg_rating === null || 0 ? (
                                    <span>0</span>
                                ) : (
                                    <span>{`${avg_rating?.toFixed(1)}`}</span>
                                )}
                            </span>

                            <span className="emoji">
                                <SentimentVerySatisfiedOutlined className="emoji" />
                                <span>{happy_clients}</span>
                            </span>
                            {/* <span className="award">
                                <MilitaryTechOutlined className="award" />
                                <span> {awardPercentage}</span>
                            </span> */}
                            {/* {distance && (
                                <span className="location">
                                    <NearMeOutlined className="location" />
                                    <span> {distance}</span>
                                </span>
                            )} */}
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
                        <ShareIcon
                            url={
                                typeof window !== "undefined"
                                    ? window.location.origin +
                                      `/tasker/${userId}`
                                    : ""
                            }
                            quote={""}
                            hashtag={""}
                        />
                    </div>
                    <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                        {RenderDifferentButton(status, String(id))}
                    </div>
                </div>
            </div>
            <BookingDetails
                show={opened}
                setShow={setOpened}
                bookingId={String(id) ?? ""}
            />
        </>
    );
};
