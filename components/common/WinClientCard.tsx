import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";

import BigButton from "./Button";

interface winClientCardProps {
    image: string;
    description?: string;
    title?: string;
    buttonText: string;
}

export const WinClientCard = ({
    image,
    description,
    title,
    buttonText,
}: winClientCardProps) => {
    return (
        <div className="win-client-card">
            <Row>
                <Col md={5} sm={12} className="win-client-card__left">
                    <figure className="win-client-image">
                        <Image
                            src={image}
                            height={465}
                            width={570}
                            alt="growyourbusiness-image"
                        />
                    </figure>
                </Col>
                <Col md={7} sm={12} className="win-client-card__left">
                    <div className="d-flex flex-column justify-content-center  win-client-card-content">
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <div className="btn-wrapper">
                            <BigButton
                                btnTitle={buttonText}
                                backgroundColor="#fff"
                                textColor="#111"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
