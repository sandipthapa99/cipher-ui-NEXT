import Image from "next/image";
import { CommonCardProps } from "types/commonCard";
import { ProfileTaskCardProps } from "types/profileTaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";

const TasksProfileCard = ({
    title,
    price,
    cardImage,
    address,
    rating,
    description,
}: ProfileTaskCardProps) => {
    return (
        <div className="about-card-block profile-task">
            <figure className="thumbnail-img">
                <Image
                    src={cardImage}
                    layout="fill"
                    objectFit="cover"
                    alt="about-card-image"
                />
            </figure>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>

                <p className="address">{address}</p>
                <p className="description">
                    {/* {`${cardDescription.substring(0, 80)}...`} */}
                    {description}
                </p>

                <div className="bottom d-flex justify-content-between">
                    <div className="rating d-flex align-items-center">
                        <FontAwesomeIcon icon={faStar} className="svg-icon" />
                        <p className="value">{rating}</p>
                    </div>
                    <p className="price">${price}/hr</p>
                </div>
            </div>
        </div>
    );
};
export default TasksProfileCard;
