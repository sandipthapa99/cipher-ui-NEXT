import Image from "next/image";
import React, { useState } from "react";
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
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore((prevShowMore) => !prevShowMore);
    };
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
                        {description?.length > 400 ? (
                            <p>
                                {!showMore
                                    ? description.substring(0, 400)
                                    : description}
                                <a onClick={() => handleShowMore()}>
                                    {showMore ? "hide" : "show more"}
                                </a>
                            </p>
                        ) : (
                            <p>{description}</p>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};
