import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BookNowModalCardProps } from "types/bookNow";

const ModalCard = ({
    title,
    price,
    description,
    image,
    show,
    handleClose,
}: BookNowModalCardProps) => {
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>
                <div className="modal-body-content">
                    <div className="details">
                        <div className="title d-flex">
                            <h4 className="title-name">
                                Title: <span>{title}</span>
                            </h4>
                        </div>
                        <div className="price d-flex">
                            <h4 className="title-name">
                                Price: <span>{price}</span>
                            </h4>
                        </div>
                        <p className="description">{description}</p>
                    </div>

                    <div className="problem">
                        <h4>Problem Description</h4>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                {/* <Form.Label>Example textarea</Form.Label> */}
                                <Form.Control as="textarea" rows={1} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="completion">
                        <Row>
                            <Col md={6}>
                                <h4>Completion Date</h4>

                                <Form.Control
                                    type="date"
                                    name="datepic"
                                    placeholder="07/27/2022"
                                    //value={date}
                                    //onChange={(e) => setDate(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <h4>Estimated Time(hr)</h4>
                                <Form.Control type="number" />
                            </Col>
                        </Row>
                    </div>
                    <div className="gallery">
                        <h4>Gallery</h4>
                        <p>Add relevant images or videos</p>

                        <Row>
                            <Col md={3}>
                                <figure className="thumbnail-img">
                                    <Image
                                        src={image}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="serviceprovider-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={3} className="drag-drop">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/service-details/file-upload.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="serviceprovider-image"
                                    />
                                </figure>
                                <p className="info">
                                    Drag or <span>Browse</span>
                                    <br />
                                    Image/Video
                                </p>
                                <p className="size">Maximum size 200MB</p>

                                {/* <input type="file" className="drag-drop-input" /> */}
                            </Col>
                        </Row>
                        <div className="size-warning">
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="svg-icon"
                            />
                            <p>
                                Images and videos should not be more than 200MB
                            </p>
                        </div>
                    </div>
                </div>

                <Modal.Footer>
                    <Button className="btn close-btn" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button
                        className="btn card-btn book-btn"
                        onClick={handleClose}
                    >
                        Book Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ModalCard;
