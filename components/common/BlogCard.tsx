import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import type { BlogValueProps } from "types/blogs";
const CommunityBlogCard = ({
    blogData,
}: {
    blogData: BlogValueProps["result"][0];
}) => {
    return (
        <div className="find-hire-card-block">
            {blogData.image && (
                <figure className="thumbnail-img">
                    <Image
                        src={blogData?.image}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                    />
                </figure>
            )}

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
