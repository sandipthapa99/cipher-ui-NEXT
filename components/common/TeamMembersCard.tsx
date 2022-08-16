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
import React, { useState } from "react";
import type { Task } from "types/tasks";

import BigButton from "./Button";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

interface Props {
    task: Task;
    collabButton?: boolean;
    handleButtonClick?: () => void;
}

export const TeamMembersCard = ({
    task,
    collabButton,
    handleButtonClick,
}: Props) => {
    const [isSaveClicked, setIsSaveClicked] = useState(false);

    const handleSaveClick = () => {
        setIsSaveClicked(!isSaveClicked);
    };
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
                        <h5>{task?.user?.username}</h5>
                        <FontAwesomeIcon
                            className="ellipsis-vertical"
                            icon={faEllipsisVertical}
                        />
                    </div>
                    <h6>
                        <span>{task?.user?.category} </span>|{" "}
                        {task?.user?.location}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center emoji-section">
                        <span className="star">
                            <FontAwesomeIcon className="star" icon={faStar} />
                            {task?.rating?.average}
                        </span>
                        <span className="emoji">
                            <FontAwesomeIcon
                                className="emoji"
                                icon={faFaceGrinBeam}
                            />
                            {task?.likes}
                        </span>
                        <span className="award">
                            <FontAwesomeIcon className="award" icon={faAward} />
                            {task?.rewardPercentage}
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
                I&apos;m punctual and hardworking person. I love teaching what
                I. We want a garden cleaner for our bunglow.
            </p>
            <div className="d-flex justify-content-between footer-section">
                <span className="share-and-like">
                    <SaveIcon
                        onSubmit={handleSaveClick}
                        isSaveClicked={isSaveClicked}
                    />
                    <ShareIcon />
                </span>

                {collabButton == true ? (
                    <BigButton
                        btnTitle={"Collab"}
                        backgroundColor={"#211D4F"}
                        handleClick={handleButtonClick}
                    />
                ) : (
                    <span className="task-price"> {task?.price}</span>
                )}
            </div>
        </div>
    );
};
