import SaveIcon from "@components/common/SaveIcon";
import {
    faAward,
    faEllipsisVertical,
    faFaceGrinBeam,
    faLocationArrow,
} from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import type { Tasker } from "types/tasks";

import BigButton from "./Button";
import ShareIcon from "./ShareIcon";

interface Props {
    taskers?: Tasker;
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
}

export const TeamMembersCard = ({
    collabButton,
    handleButtonClick,
    image,
    name,
    speciality,
    rating,
    happyClients,
    awardPercentage,
    location,
    distance,
    bio,
    charge,
    ...rest
}: Props) => {
    const userId = rest.taskers?.user.id;
    const isBookmarked = useIsBookmarked("user", userId);
    return (
        <div className="team-members-card">
            <div className="d-flex w-100 image-and-title">
                <figure className="team-member-card-image">
                    <Image
                        src={image ?? "/community/gallery2.png"}
                        alt="team-member-card-image"
                        height={80}
                        width={80}
                    />
                </figure>
                <div className="w-100 name-post-count">
                    <div className="d-flex justify-content-between title-and-dots">
                        <h5>{name}</h5>
                        <FontAwesomeIcon
                            className="ellipsis-vertical"
                            icon={faEllipsisVertical}
                        />
                    </div>
                    <h6>
                        <span>{speciality} </span>| {location}
                    </h6>
                    <div className="d-flex justify-content-between align-items-center emoji-section">
                        <span className="star">
                            <FontAwesomeIcon className="star" icon={faStar} />
                            {rating}
                        </span>
                        <span className="emoji">
                            <FontAwesomeIcon
                                className="emoji"
                                icon={faFaceGrinBeam}
                            />
                            {happyClients}
                        </span>
                        <span className="award">
                            <FontAwesomeIcon className="award" icon={faAward} />
                            {awardPercentage}
                        </span>
                        <span className="location">
                            <FontAwesomeIcon
                                className="location"
                                icon={faLocationArrow}
                            />
                            {distance}
                        </span>
                    </div>
                </div>
            </div>

            <p>{bio}</p>
            <div className="d-flex justify-content-between footer-section">
                <span className="share-and-like">
                    <SaveIcon
                        model="user"
                        object_id={userId}
                        filled={isBookmarked}
                    />
                    <ShareIcon url={""} quote={""} hashtag={""} />
                </span>

                {collabButton == true ? (
                    <BigButton
                        btnTitle={"Collab"}
                        backgroundColor={"#211D4F"}
                        handleClick={handleButtonClick}
                    />
                ) : (
                    <span className="task-price"> {charge}</span>
                )}
            </div>
        </div>
    );
};
