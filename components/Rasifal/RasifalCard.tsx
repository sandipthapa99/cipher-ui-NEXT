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
                    <figure className="d-flex justify-content-center each-rasifal-card__image">
                        {image && (
                            <Image
                                src={image ?? "/horoscope/image1.png"}
                                alt={"rasifal-image"}
                                height={102}
                                width={120}
                                objectFit="cover"
                            />
                        )}
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
