import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import CardBtn from "./CardBtn";

interface AdvertisementCardProps {
    title: string;
    type: string;
    price: string;
    currency: string;
    buttonTitle: string;
    cardImage: string;
}
const AdvertisementCard = ({
    title,
    type,
    price,
    cardImage,
    currency,
    buttonTitle,
}: AdvertisementCardProps) => {
    //book now modal

    const [showModal, setShowModal] = useState(false);
    const handleBookNow = () => {
        setShowModal(true);
    };

    return (
        <div className="advertisement-card">
            <div className="advertisement-card__content">
                <div className="buttons"></div>

                <Row className="d-flex justify-content-between">
                    <Col md={9}>
                        <div className="advertisement-card__content--info">
                            <figure className="thumbnail-img">
                                <Image
                                    src={cardImage}
                                    layout="fill"
                                    alt="advertisement-image"
                                    objectFit="cover"
                                />
                            </figure>

                            <div className="main-info">
                                <div className="title">
                                    <h3>
                                        {title} : {type}
                                    </h3>
                                </div>
                                <p>{type}</p>
                                <div className="price">
                                    {currency} {price}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col
                        md={3}
                        className="d-flex align-items-end justify-content-end"
                    >
                        <CardBtn
                            btnTitle={buttonTitle}
                            backgroundColor="#5C84F0"
                            handleClick={handleBookNow}
                        />
                    </Col>
                </Row>
                {/* <BookNowModalCard
                    price={price}
                    show={showModal}
                    title={title}
                    setShow={() => setShowModal(false)}
                /> */}
            </div>
        </div>
    );
};
export default AdvertisementCard;
