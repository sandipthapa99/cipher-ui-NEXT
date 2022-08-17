import { faShare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ShareButtonProps } from "types/shareButton";

import ShareModal from "./ShareModalCard";

const ShareIcon = ({ url, quote, hashtag }: ShareButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    const handleOnClick = () => {
        setShowModal(!showModal);
    };
    return (
        <>
            <FontAwesomeIcon
                icon={faShare}
                onClick={() => handleOnClick()}
                className="svg-icon svg-icon-share"
            />
            <div className="share-modal">
                <ShareModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    url={url}
                    quote={quote}
                    hashtag={hashtag}
                />
            </div>
        </>
    );
};
export default ShareIcon;
