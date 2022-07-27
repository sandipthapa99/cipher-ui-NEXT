import { faCircleInfo } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { ShareButtonProps } from 'types/shareButton'

const ShareModal = ({
    show,
    handleClose,
}: ShareButtonProps) => {
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Share With</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button className="btn close-btn" onClick={handleClose}>
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ShareModal
