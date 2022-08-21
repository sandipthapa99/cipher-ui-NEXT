import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import type { CommunityGuidelineCardProps } from "types/community";
const CommunityBlogCard = ({
    cardImage,
    cardDescription,
    cardTitle,
}: CommunityGuidelineCardProps) => {
    return (
        <div className="find-hire-card-block">
            <figure className="thumbnail-img">
                <Image src={cardImage} layout="fill" objectFit="cover" alt="" />
            </figure>

            <div className="card-content">
                <h2>{cardTitle}</h2>

                <p className="card-description">
                    {/* {`${aboutDescription.substring(0, 80)}...`} */}
                    {cardDescription}
                </p>
                <Link href={`/blogs/}`}>
                    <a>
                        See More
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="svg-icon"
                        />
                    </a>
                </Link>
            </div>
        </div>
    );
};
export default CommunityBlogCard;
