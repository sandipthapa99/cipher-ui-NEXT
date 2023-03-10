import Image from "next/image";
import type { CommunityGuidelineCardProps } from "types/community";

const CommunityGuidelineCard = ({
    cardImage,
    cardDescription,
    cardTitle,
}: CommunityGuidelineCardProps) => {
    return (
        <div className="card-block align-items-center">
            <figure className="thumbnail-img">
                <Image
                    src={cardImage}
                    layout="fill"
                    // height={300}
                    objectFit="cover"
                    alt="guideline-card-image"
                />
            </figure>

            <div className="card-block__card-content">
                <h2
                    className="card-title"
                    style={{ borderBottom: "1px solid #dee2e6" }}
                >
                    {cardTitle}
                </h2>

                <div className="card-block__card-description">
                    {Array.isArray(cardDescription) ? (
                        <ul>
                            {cardDescription.map((guide: any) => (
                                <li key={guide.id}>{guide}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{cardDescription}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CommunityGuidelineCard;
