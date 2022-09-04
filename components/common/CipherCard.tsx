import { PostTaskModal } from "@components/Task/PostTaskModal";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
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
    redirectTo: string;
}) => {
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const { data: user } = useUser();

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

                {redirectTo == "/post-task" ? (
                    <Button
                        onClick={toggleShowPostTaskModal}
                        className="nav-cta-tn"
                    >
                        Post Task
                    </Button>
                ) : (
                    <Link href={redirectTo}>
                        <a>
                            {title}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </Link>
                )}
            </div>
            <PostTaskModal />
        </div>
    );
};
export default CipherCard;
