import { faShare } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button } from "@mantine/core";
import { useState } from "react";
import type { ShareButtonProps } from "types/shareButton";

import ShareModal from "./ShareModalCard";

const ShareIcon = ({ url, quote, hashtag, showText }: ShareButtonProps) => {
    const [showModal, setShowModal] = useState(false);
    const handleOnClick = () => setShowModal(!showModal);

    return (
        <>
            {showText ? (
                <Button
                    variant="subtle"
                    leftIcon={
                        <FontAwesomeIcon
                            className="svg-icon me-0"
                            icon={faShare}
                        />
                    }
                    onClick={handleOnClick}
                >
                    {showText ? "Share" : ""}
                </Button>
            ) : (
                <ActionIcon color="blue" onClick={handleOnClick}>
                    <FontAwesomeIcon className="svg-icon me-0" icon={faShare} />
                </ActionIcon>
            )}
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
