import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
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
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ShareButtonProps } from "types/shareButton";

const ShareModal = ({ show, handleClose }: ShareButtonProps) => {
    return (
        <div className="share-modal">
            {/* Modal component */}
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <div className="share-modal__modal-body-content">
                    <h1>Share With</h1>
                    <div className="media-wrapper">
                        <div className="social-media">
                            <FacebookShareButton
                                url={"https://github.com/next-share"}
                                quote={
                                    "next-share is a social share buttons for your next React apps."
                                }
                                hashtag={"#nextshare"}
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
                            <TwitterShareButton
                                url={"https://github.com/next-share"}
                                hashtags={["#nextshare"]}
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="svg-icon twitter"
                                />
                            </TwitterShareButton>
                        </div>
                        <div className="social-media">
                            <InstapaperShareButton
                                url={"https://github.com/next-share"}
                                description={
                                    "next-share is a social share buttons for your next React apps."
                                }
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="svg-icon instagram"
                                />
                            </InstapaperShareButton>
                        </div>
                        <div className="social-media">
                            <LinkedinShareButton
                                url={"https://github.com/next-share"}
                            >
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
