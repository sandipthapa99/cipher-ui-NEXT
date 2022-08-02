import Image from "next/image";
import type { CommonCardProps } from "types/commonCard";

const AboutCard = ({
    cardImage,
    cardDescription,
    cardTitle,
}: CommonCardProps) => {
    return (
        <div className="about-card-block">
            <figure className="thumbnail-img">
                <Image
                    src={cardImage}
                    layout="fill"
                    objectFit="cover"
                    alt="about-card-image"
                />
            </figure>
            <div className="card-content">
                <h2 className="card-title">{cardTitle}</h2>

                <p className="card-description">
                    {/* {`${cardDescription.substring(0, 80)}...`} */}
                    {cardDescription}
                </p>
            </div>
        </div>
    );
};
export default AboutCard;
