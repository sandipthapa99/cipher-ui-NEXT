import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'
import Image from 'next/image'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { ShareButtonProps } from 'types/shareButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCopy } from '@fortawesome/pro-regular-svg-icons'
import { faLink } from '@fortawesome/pro-solid-svg-icons'
const ShareModal = ({
    show,
    handleClose,
}: ShareButtonProps) => {
    return (
        <div className='share-modal'>
            {/* Modal component */}
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <div className="share-modal__modal-body-content">

                    <h1>Share With</h1>
                    <div className="media-wrapper">
                        <div className="social-media">
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="svg-icon facebook" />

                            </Link>
                        </div>
                        <div className="social-media" style={{ background: "#0072B1" }}>
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="svg-icon twitter" />

                            </Link>
                        </div>
                        <div className="social-media">
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="svg-icon instagram" />

                            </Link>
                        </div>
                        <div className="social-media">
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="svg-icon linkedin" />

                            </Link>
                        </div>
                        <div className="social-media">
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    className="svg-icon copy" />

                            </Link>
                        </div>
                        <div className="social-media">
                            <Link href="#!">
                                <FontAwesomeIcon
                                    icon={faLink}
                                    className="svg-icon share-link" />

                            </Link>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
export default ShareModal
