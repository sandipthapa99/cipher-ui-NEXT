import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from "next-share";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
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
            navigator.clipboard.writeText(copyMe);
            toast.success("Link copied to clipboard.");
        } catch (err) {
            //  console.log(err.message);
        }
    };

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
                            <FontAwesomeIcon
                                icon={faCopy}
                                onClick={() => copyToClipBoard(url)}
                                className="svg-icon copy-icon"
                            />
                        </div>
                        {/* <div className="social-media share">
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faLink}
                                    className="svg-icon share-link"
                                />
                            </Link>
                        </div> */}
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ShareModal;
