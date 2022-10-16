import { LoginPrompt } from "@components/model/LoginPrompt";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { useWithLogin } from "store/use-login-prompt-store";
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
    const withLogin = useWithLogin();

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
                    <a
                        onClick={withLogin(toggleShowPostTaskModal)}
                        type="button"
                    >
                        {title}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="svg-icon"
                        />
                    </a>
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
            <LoginPrompt />
        </div>
    );
};
export default CipherCard;
