import {
    faAward,
    faCircleEllipsisVertical,
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

interface Props {
    task: Task;
}

export const TeamMembersCard = ({ task }: Props) => {
    return (
        <div className="team-members-card">
            <div className="d-flex image-and-title">
                <figure className="team-member-card-image">
                    <Image
                        src={task?.user?.profileImage}
                        alt="team-member-card-image"
                        height={80}
                        width={80}
                    />
                </figure>
                <div className="name-post-count">
                    <div className="d-flex justify-content-between title-and-dots">
                        <h5>Jane Cooper</h5>
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faCircleEllipsisVertical}
                        />
                    </div>
                    <h6>Teacher | Balaju, KTM</h6>
                    <div className="d-flexemoji-section">
                        <FontAwesomeIcon className="svg-icon" icon={faStar} />
                        4.0
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faFaceGrinBeam}
                        />
                        200
                        <FontAwesomeIcon className="svg-icon" icon={faAward} />
                        90%
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faLocationArrow}
                        />
                        2 km
                    </div>
                </div>
            </div>

            <p>
                I’m punctual and hardworking person. I love teaching what I. We
                want a garden cleaner for our bunglow.
            </p>
            <div className="footer-section">
                <div className="share-and-like">
                    <FontAwesomeIcon className="svg-icon" icon={faHeart} />
                    <FontAwesomeIcon className="svg-icon" icon={faShare} />
                </div>
                <span>Rs 600</span>
            </div>
        </div>
    );
};
