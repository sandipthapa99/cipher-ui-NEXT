import { East } from "@mui/icons-material";
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
                <h2>{blogData?.title}</h2>
                {blogData && (
                    <div className="card-description">
                        {parse(`${blogData?.content.substring(0, 130)}...`)}
                    </div>
                )}
                <Link href={`/blogs/${blogData?.slug}`}>
                    <a>
                        See More
                        <East className="svg-icon" />
                    </a>
                </Link>
            </div>
        </div>
    );
};
export default CommunityBlogCard;
