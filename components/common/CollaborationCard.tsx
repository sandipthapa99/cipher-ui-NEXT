import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import {
    faEllipsisVertical,
    faGrinBeam,
    faAward,
    faHeart,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";

export const CollaborationCard = () => {
    return (
        <div className="collaboration-card">
            <div className="image-and-name">
                <figure className="collaboration-image">
                    <Image
                        src={"/community/blog2.png"}
                        alt="collaboration-image"
                        height={80}
                        width={80}
                    />
                </figure>
                <div className="name-and-icon">
                    <h6>Jane Copper</h6>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
                <p>
                    <span>Teacher</span> | Balaju, KTM
                </p>
                <div className="rating-section">
                    <FontAwesomeIcon icon={faStar} />
                    <span>4.0(400)</span>

                    <FontAwesomeIcon icon={faGrinBeam} />
                    <span>200</span>

                    <FontAwesomeIcon icon={faAward} />
                    <span>90%</span>
                </div>
            </div>
            <p>
                I’m punctual and hardworking person. I love teaching what I. We
                want a garden cleaner for our bunglow.
            </p>
            <div className="footer-section">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faShare} />
            </div>
        </div>
    );
};
