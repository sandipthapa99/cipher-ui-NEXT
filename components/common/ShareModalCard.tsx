import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button, CopyButton, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons";
import {
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from "next-share";
import Modal from "react-bootstrap/Modal";
import type { ShareButtonProps } from "types/shareButton";
import { toast } from "utils/toast";

const ShareModal = ({
    show,
    handleClose,
    url,
    quote,
    hashtag,
}: ShareButtonProps) => {
    return (
        <>
            {/* Modal component */}
            <Modal
                centered
                show={show}
                className="share-modal"
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton></Modal.Header>
                <div className="share-modal__modal-body-content">
                    <h1>Share With</h1>
                    <div className="media-wrapper">
                        <div className="social-media facebook">
                            <FacebookShareButton
                                url={url}
                                quote={quote}
                                hashtag={hashtag}
                            >
                                <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="svg-icon facebook-icon"
                                />
                            </FacebookShareButton>
                        </div>
                        <div className="social-media twitter">
                            <TwitterShareButton url={url} hashtags={[hashtag]}>
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="svg-icon twitter-icon"
                                />
                            </TwitterShareButton>
                        </div>
                        <div className="social-media instagram">
                            <InstapaperShareButton
                                url={url}
                                description={quote}
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="svg-icon instagram-icon"
                                />
                            </InstapaperShareButton>
                        </div>
                        <div className="social-media linkedin">
                            <LinkedinShareButton url={url}>
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="svg-icon linkedin-icon"
                                />
                            </LinkedinShareButton>
                        </div>
                        <div className="social-media copy">
                            <CopyButton value={url} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip
                                        label={copied ? "Copied" : "Copy"}
                                        withArrow
                                        position="right"
                                    >
                                        <ActionIcon
                                            color={copied ? "teal" : "gray"}
                                            onClick={copy}
                                            className="svg-icon copy-icon"
                                        >
                                            {copied ? (
                                                <IconCheck size={30} />
                                            ) : (
                                                <IconCopy size={30} />
                                            )}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ShareModal;
