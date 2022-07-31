import {
    faAward,
    faEllipsisVertical,
    faFaceGrinBeam,
    faHeart,
    faLocationArrow,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { DUMMY_TASKS } from "types/tasks";
import { Task } from "types/tasks";

import BigButton from "./Button";

interface Props {
    task: Task;
    collabButton?: boolean;
}

export const TeamMembersCard = ({ task, collabButton }: Props) => {
    return (
        <div className="team-members-card">
            <div className="d-flex w-100 image-and-title">
                <figure className="team-member-card-image">
                    <Image
                        src={task?.user?.profileImage}
                        alt="team-member-card-image"
                        height={80}
                        width={80}
                    />
                </figure>
                <div className="w-100 name-post-count">
                    <div className="d-flex justify-content-between title-and-dots">
                        <h5>Jane Cooper</h5>
                        <FontAwesomeIcon
                            className="ellipsis-vertical"
                            icon={faEllipsisVertical}
                        />
                    </div>
                    <h6>
                        <span>Teacher </span>| Balaju, KTM
                    </h6>
                    <div className="d-flex justify-content-between align-items-center emoji-section">
                        <span className="star">
                            <FontAwesomeIcon className="star" icon={faStar} />
                            4.0
                        </span>
                        <span className="emoji">
                            <FontAwesomeIcon
                                className="emoji"
                                icon={faFaceGrinBeam}
                            />
                            200
                        </span>
                        <span className="award">
                            <FontAwesomeIcon className="award" icon={faAward} />
                            90%
                        </span>
                        <span className="location">
                            <FontAwesomeIcon
                                className="location"
                                icon={faLocationArrow}
                            />
                            2 km
                        </span>
                    </div>
                </div>
            </div>

            <p>
                I’m punctual and hardworking person. I love teaching what I. We
                want a garden cleaner for our bunglow.
            </p>
            <div className="d-flex justify-content-between footer-section">
                <span className="share-and-like">
                    <FontAwesomeIcon className="heart" icon={faHeart} />
                    <FontAwesomeIcon className="share" icon={faShare} />
                </span>
                <span>
                    {collabButton == true ? (
                        <BigButton
                            btnTitle={"Collab"}
                            backgroundColor={"#211D4F"}
                        />
                    ) : (
                        "Rs 600"
                    )}
                </span>
            </div>
        </div>
    );
};
