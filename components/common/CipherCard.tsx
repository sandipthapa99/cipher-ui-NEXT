import { PostTaskModal } from "@components/Task/PostTaskModal";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";

const CipherCard = ({
    thumbnailImg,
    title,
    description,
    redirectTo,
}: {
    thumbnailImg: string;
    title: string;
    description: string;
    redirectTo?: string;
}) => {
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const [showModal, setShowModal] = useState(false);

    {
        redirectTo == "/post-modal" ?? setShowModal(true);
    }
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

                {/* {redirectTo !== "/post-task" ? (
                    <Link
                        href={redirectTo}
                        onClick={setShowModal ?? toggleShowPostTaskModal}
                    >
                        <a>
                            {title}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </Link>
                ) : (
                    <a>
                        {title}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="svg-icon"
                        />
                    </a>
                )} */}
            </div>
            <PostTaskModal />
        </div>
    );
};
export default CipherCard;
