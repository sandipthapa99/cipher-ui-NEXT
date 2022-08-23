import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface GetStartedCardProps {
    heading: string;
    firstPoint: string;
    secondPoint?: string;
    image: string;
    index: number;
}

export const GetStartedCard = ({
    heading,
    firstPoint,
    secondPoint,
    image,
    index,
}: GetStartedCardProps) => {
    if (index % 2 === 0)
        return (
            <div className="d-flex get-started-card">
                <Row>
                    <Col md={6} sm={12}>
                        <div className="d-flex justify-content-center flex-column description-section">
                            <h2>{heading}</h2>
                            <ul>
                                <li>{firstPoint}</li>
                                {secondPoint && <li>{secondPoint}</li>}
                            </ul>
                        </div>
                    </Col>
                    <Col md={6} sm={12}>
                        <figure className="d-flex align-items-center get-started-card__image">
                            <Image
                                src={image}
                                alt="get-started-image"
                                height={400}
                                width={648}
                            />
                        </figure>
                    </Col>
                </Row>
            </div>
        );
    else
        return (
            <div className="d-flex get-started-card">
                <Row>
                    <Col md={6} sm={12}>
                        <figure className="d-flex align-items-center get-started-card__image">
                            <Image
                                src={image}
                                alt="get-started-image"
                                height={400}
                                width={648}
                            />
                        </figure>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="d-flex justify-content-center flex-column description-section">
                            <h2>{heading}</h2>
                            <ul>
                                <li>{firstPoint}</li>
                                {secondPoint && <li>{secondPoint}</li>}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        );
};
