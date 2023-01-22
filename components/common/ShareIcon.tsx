import { ActionIcon, Button } from "@mantine/core";
import { ShortcutOutlined } from "@mui/icons-material";
import { useState } from "react";

import ShareModal from "./ShareModalCard";

const ShareIcon = ({
    url,
    quote,
    hashtag,
    showText,
    className,
    ...rest
}: {
    url: string;
    quote: string;
    hashtag: string;
    showText?: boolean;
    className?: string;
}) => {
    const [showModal, setShowModal] = useState(false);
    const handleOnClick = () => setShowModal(!showModal);

    return (
        <>
            {showText ? (
                <Button
                    {...rest}
                    variant="subtle"
                    leftIcon={<ShortcutOutlined className="svg-icon me-0" />}
                    onClick={handleOnClick}
                    className={className}
                >
                    {showText ? "Share" : ""}
                </Button>
            ) : (
                <ActionIcon color="blue" onClick={handleOnClick}>
                    <ShortcutOutlined className="svg-icon me-0" />
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
