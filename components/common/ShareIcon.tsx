import { faHeart, faShare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

interface ShareIconProps {
    showModal: boolean;
    handleOnClick: (show: any) => void;
}

const ShareIcon = ({ showModal, handleOnClick }: ShareIconProps) => {
    return (
        <FontAwesomeIcon
            icon={faShare}
            onClick={() => handleOnClick(showModal)}
            className="svg-icon share"
            style={{ height: "2rem", width: "2rem", color: "color: #3EAEFF" }}
        />
    );
};
export default ShareIcon;
