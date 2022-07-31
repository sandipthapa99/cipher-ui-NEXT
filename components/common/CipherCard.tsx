import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const CipherCard = ({
    thumbnailImg,
    title,
    description,
    redirectTo,
}: {
    thumbnailImg: string;
    title: string;
    description: string;
    redirectTo: string;
}) => {
    return (
        <div className="cipher-card-block">
            <figure className="thumbnail-img">
                <Image
                    src={thumbnailImg}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                />
            </figure>
            <div className="card-content">
                <h2>{title}</h2>
                <p>{description}</p>

                <Link href={redirectTo}>
                    <a>
                        {title}
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
export default CipherCard;
