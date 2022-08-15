import { faComment, faHeart } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import type { CommunityActivityCardProps } from "types/community";

import SaveIcon from "./SaveIcon";

const CommunityActivityCard = ({
    cardImage,
    cardDescription,
    cardTitle,
    react,
    comments,
    name,
    position,
}: CommunityActivityCardProps) => {
    const [isSaveClicked, setIsSaveClicked] = useState(false);

    const handleSaveClick = () => {
        setIsSaveClicked(!isSaveClicked);
    };
    return (
        <div className="activitycard-block">
            <div className="activitycard-block__card-content">
                <h2 className="activitycard-title">{cardTitle}</h2>

                <p className="activitycard-block__card-description">
                    {cardDescription}
                </p>
                <div className="activitycard-block__card-status">
                    <div className="personal-information">
                        <figure className="thumbnail-img">
                            <Image
                                src={cardImage}
                                layout="fill"
                                // height={300}
                                objectFit="cover"
                                alt="guideline-card-image"
                            />
                        </figure>
                        <div className="name-position">
                            <p className="name">{name}</p>
                            <p className="position">{position}</p>
                        </div>
                    </div>

                    <div className="reacts-status">
                        <div className="heart-status">
                            <SaveIcon
                                onSubmit={handleSaveClick}
                                isSaveClicked={isSaveClicked}
                            />
                            <span>{react}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faComment}
                                className="svg-icon share"
                            />
                            <span>{comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CommunityActivityCard;
