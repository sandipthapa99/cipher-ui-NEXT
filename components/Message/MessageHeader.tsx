import { GoBack } from "@components/common/GoBack";
import {} from "@fortawesome/pro-regular-svg-icons";
import {
    faEllipsisVertical,
    faHeart as faHeartOutlined,
    faPhone,
} from "@fortawesome/pro-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface MessageHeaderProps {
    username: string;
    profileImage: string;
    isOnline: boolean;
    isFavorite: boolean;
    lastMessage: string;
    onBackClick: () => void;
}

export const MessageHeader = ({
    username,
    profileImage,
    lastMessage,
    isFavorite,
    onBackClick,
}: MessageHeaderProps) => {
    return (
        <div className="message-header">
            <div className="message-header__left">
                <div className="message-header__left--user">
                    <Image
                        src={profileImage ?? "/userprofile/unknownPerson.jpg"}
                        width="50px"
                        height="50px"
                        alt="Contact profile image"
                        className="rounded-circle mb-0"
                    />
                    <div>
                        <h4 className="title mb-0">{username}</h4>
                        <p className="text">{lastMessage}</p>
                    </div>
                </div>
            </div>
            <div className="message-header__right">
                <GoBack
                    type="button"
                    text="Back to Task"
                    onClick={onBackClick}
                />
                <FontAwesomeIcon icon={faPhone} color="#868E96" />
                <FontAwesomeIcon
                    color="#FE5050"
                    icon={isFavorite ? faHeartFilled : faHeartOutlined}
                />
                <FontAwesomeIcon color="#868E96" icon={faEllipsisVertical} />
            </div>
        </div>
    );
};
