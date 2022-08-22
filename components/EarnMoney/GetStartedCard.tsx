import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const GetStartedCard = () => {
    return (
        <div className="get-started-card">
            <Row>
                <Col md={6} sm={12}>
                    <div className="d-flex justify-content-center flex-column description-section">
                        <h2>1. Complete your Profile</h2>
                        <ul>
                            <li>
                                Select your skills and expertise Upload a
                                professional profile photo. Go through the
                                Verification Center checklist
                            </li>
                            <li>
                                Select your skills and expertise Upload a
                                professional profile photo. Go through the
                                Verification Center checklist
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={6} sm={12}>
                    <figure className="d-flex align-items-center get-started-card__image">
                        <Image
                            src={"/earn-money/earnmoney1.png"}
                            alt="get-started-image"
                            height={400}
                            width={648}
                        />
                    </figure>
                </Col>
            </Row>
        </div>
    );
};
