import { faCircleQuestion } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const PersonalSuccessCard = () => {
    return (
        <div className="personal-success-card">
            <Row>
                <Col md={5} sm={12}>
                    <figure className="success-image">
                        <Image
                            src={"/utility-images/sakshi-shrestha.png"}
                            height={553}
                            width={502}
                            alt="growyourbusiness-image"
                        />
                    </figure>
                </Col>
                <Col md={7} sm={12}>
                    <div className="d-flex flex-column justify-content-center  personal-success-card__content">
                        <h3>Sakshi Shrestha</h3>
                        <h6>Specialities: assembly, pet care, gardening</h6>
                        <p>
                            “ Aliqua id fugiat nostrud irure ex duis ea quis id
                            quis ad et. Sunt qui esse pariatur duis deserunt
                            mollit dolore cillum minim tempor enim. Elit aute
                            irure tempor cupidatat incididunt sint deserunt ut
                            voluptate aute id deserunt nisi. Aliqua id fugiat
                            nostrud irure ex duis ea quis id quis ad et. Sunt
                            qui esse pariatur duis deserunt mollit dolore cillum
                            minim tempor enim. Elit aute irure tempor cupidatat
                            incididunt sint deserunt ut voluptate aute id
                            deserunt nisi. llum minim tempor enim. Elit aute
                            irure tempor cupidatat incididunt sint deserunt ut
                            voluptate aute id deserunt nisi.llum minim tempor
                            enim. “
                        </p>
                        <h4>Badges</h4>
                        <div className="d-flex align-items-stretch   badge-section">
                            <Image
                                src={"/utility-images/award-image.png"}
                                alt="badge image"
                                height={74}
                                width={92}
                            />

                            <div className="description">
                                <div className="d-flex title">
                                    <h5>Platinum Badge</h5>
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faCircleQuestion}
                                        />
                                    </span>
                                </div>
                                <h6>Based on Completion Rating & Earnings</h6>
                            </div>
                        </div>
                        <div className="d-flex footer">
                            <span>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span>4.5 stars from 400 reviews</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
