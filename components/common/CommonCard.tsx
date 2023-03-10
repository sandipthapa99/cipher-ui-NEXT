import Image from "next/image";
import type { CommonCardProps } from "types/commonCard";

const CommonCard = ({
    cardImage,
    cardDescription,
    cardTitle,
}: CommonCardProps) => {
    return (
        <div className="card-block align-items-center">
            <figure className="thumbnail-img">
                <Image
                    src={cardImage}
                    layout="fill"
                    // height={300}
                    //objectFit="cover"
                    alt="referral-card-image"
                />
            </figure>

            <div className="card-block__card-content">
                <h2 className="card-title">{cardTitle}</h2>
                <div className="card-description">{cardDescription}</div>
            </div>
        </div>
    );
};
export default CommonCard;
