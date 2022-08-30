import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/pro-regular-svg-icons";
import { faLink } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from "next-share";
import Modal from "react-bootstrap/Modal";
import type { ShareButtonProps } from "types/shareButton";

const ShareModal = ({
    show,
    handleClose,
    url,
    quote,
    hashtag,
}: ShareButtonProps) => {
    const copyToClipBoard = async (copyMe: any) => {
        try {
            await navigator.clipboard.writeText(copyMe);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className="share-modal">
            {/* Modal component */}
            <Modal centered show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton></Modal.Header>
                <div className="share-modal__modal-body-content">
                    <h1>Share With</h1>
                    <div className="media-wrapper">
                        <div className="social-media">
                            <FacebookShareButton
                                url={url}
                                quote={quote}
                                hashtag={hashtag}
                            >
                                <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="svg-icon facebook"
                                />
                            </FacebookShareButton>
                        </div>
                        <div
                            className="social-media"
                            style={{ background: "#0072B1" }}
                        >
                            <TwitterShareButton url={url} hashtags={[hashtag]}>
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="svg-icon twitter"
                                />
                            </TwitterShareButton>
                        </div>
                        <div className="social-media">
                            <InstapaperShareButton
                                url={url}
                                description={quote}
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="svg-icon instagram"
                                />
                            </InstapaperShareButton>
                        </div>
                        <div className="social-media">
                            <LinkedinShareButton url={url}>
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="svg-icon linkedin"
                                />
                            </LinkedinShareButton>
                        </div>
                        <div className="social-media">
                            <Link href="/">
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    onClick={() =>
                                        copyToClipBoard("https://cipher.com/")
                                    }
                                    className="svg-icon copy"
                                />
                            </Link>
                        </div>
                        <div className="social-media">
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faLink}
                                    className="svg-icon share-link"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default ShareModal;
