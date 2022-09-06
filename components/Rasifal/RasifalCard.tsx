import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface RasifalCardProps {
    title: string;
    description: string;
    image: string;
}

export const RasifalCard = ({
    title,
    description,
    image,
}: RasifalCardProps) => {
    return (
        <div className="each-rasifal-card">
            <Row>
                <Col md={3}>
                    <figure className="d-flex justify-content-center align-items-center w-100 h-100 each-rasifal-card__image">
                        <Image
                            src={image}
                            alt={"rasifal-image"}
                            height={60}
                            width={60}
                        />
                    </figure>
                </Col>

                <Col md={9}>
                    <div className="each-rasifal-card__details">
                        <h5>{title}</h5>
                        <p>{description}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
