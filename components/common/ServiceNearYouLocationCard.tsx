import { faLocationDot, faUser } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import type { ServiceNearYouCardProps } from "types/serviceNearYouCards";

const ServiceNearYouCard = ({
    image,
    servicePrice,
    serviceProvider,
    serviceProviderLocation,
    serviceRating,
    serviceTitle,
    haveDiscount,
    discountOn,
    discount,
}: ServiceNearYouCardProps) => {
    return (
        <div className="service-card-block service-near-you-card-block">
            <Row>
                <Col md="5">
                    <figure className="thumbnail-img">
                        <Image
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            alt="servicecard-image"
                        />
                    </figure>
                </Col>
                <Col md="7">
                    <div className="content">
                        <h4>{serviceTitle}</h4>
                        <div className="information">
                            <div className="type d-flex flex-col">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="user svg-icon"
                                />

                                <p>{serviceProvider}</p>
                            </div>
                            <div className="type d-flex flex-col">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="location svg-icon"
                                />
                                <p>{serviceProviderLocation}</p>
                            </div>

                            <div className="success-rate type d-flex flex-col">
                                <div className="star d-flex flex-row">
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="star svg-icon"
                                    />

                                    <p>{serviceRating}</p>
                                </div>
                            </div>
                            <h1 className="price">Rs {servicePrice}</h1>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                {haveDiscount && (
                    <div className="offer">
                        <p className="discount-rate">{discount}% OFF</p>
                        <p className="discount-on">{discountOn}</p>
                    </div>
                )}
            </Row>
        </div>
    );
};
export default ServiceNearYouCard;
