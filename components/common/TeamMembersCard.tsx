import Image from "next/image";
import React from "react";
import { DUMMY_TASKS } from "types/tasks";
import {
    faCircleEllipsisVertical,
    faFaceGrinBeam,
    faAward,
    faLocationArrow,
    faHeart,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";

export const TeamMembersCard = () => {
    return (
        <div className="team-members-card">
            {DUMMY_TASKS?.map((item) => (
                <div className="d-flex image-and-title">
                    <figure className="team-member-card-image">
                        <Image
                            src={item?.user?.profileImage}
                            alt="team-member-card-image"
                            height={80}
                            width={80}
                        />
                    </figure>
                    <div className="name-post-count">
                        <div className="d-flex justify-content-between title-and-dots">
                            <h5>Jane Cooper</h5>
                            <FontAwesomeIcon icon={faCircleEllipsisVertical} />
                        </div>
                        <h6>Teacher | Balaju, KTM</h6>
                        <div className="d-flexemoji-section">
                            <FontAwesomeIcon icon={faStar} />
                            4.0
                            <FontAwesomeIcon icon={faFaceGrinBeam} />
                            200
                            <FontAwesomeIcon icon={faAward} />
                            90%
                            <FontAwesomeIcon icon={faLocationArrow} />2 km
                        </div>
                    </div>
                </div>
            ))}
            <p>
                I’m punctual and hardworking person. I love teaching what I. We
                want a garden cleaner for our bunglow.
            </p>
            <div className="footer-section">
                <div className="share-and-like">
                    <FontAwesomeIcon className="svg-icon" icon={faHeart} />
                    <FontAwesomeIcon icon={faShare} />
                </div>
                <span>Rs 600</span>
            </div>
        </div>
    );
};
