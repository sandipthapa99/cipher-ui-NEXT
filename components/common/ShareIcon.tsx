import { faShare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ShareIconProps {
    showModal: boolean;
    handleOnClick: (show: any) => void;
}

const ShareIcon = ({ showModal, handleOnClick }: ShareIconProps) => {
    return (
        <FontAwesomeIcon
            icon={faShare}
            onClick={() => handleOnClick(showModal)}
            className="svg-icon svg-icon-share"
        />
    );
};
export default ShareIcon;
