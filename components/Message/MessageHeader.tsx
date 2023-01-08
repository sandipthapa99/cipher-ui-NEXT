import { MoreVert, PhoneIphoneOutlined } from "@mui/icons-material";
import Image from "next/image";

interface MessageHeaderProps {
    username: string;
    profileImage: string;
}

export const MessageHeader = ({
    username,
    profileImage,
}: MessageHeaderProps) => {
    return (
        <div className="message-header">
            <div className="message-header__left">
                <div className="message-header__left--user">
                    <Image
                        src={
                            profileImage
                                ? profileImage
                                : "/placeholder/profilePlaceholder.png"
                        }
                        width={50}
                        height={50}
                        alt="Contact profile image"
                        className="rounded-circle mb-0"
                    />
                    <div>
                        <h4 className="title mb-0">{username}</h4>
                        {/* <p className="text">{lastMessage}</p> */}
                    </div>
                </div>
            </div>
            <div className="message-header__right">
                {/* <GoBack
                    type="button"
                    text="Back to Task"
                /> */}
                <PhoneIphoneOutlined style={{ color: "#868E96" }} />
                {/* <FontAwesomeIcon
                    color="#FE5050"
                    icon={isFavorite ? faHeartFilled : faHeartOutlined}
                /> */}
                <MoreVert style={{ color: "#868E96" }} />
            </div>
        </div>
    );
};
