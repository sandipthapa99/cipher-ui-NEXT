import { faLocationDot, faUser } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

import type { ServiceNearYouCardProps } from "../../types/serviceNearYouCard";

export type ServiceProvider = {
    id: string;
    is_active: boolean;
    is_verified: boolean;
    groups: Array<{
        id: number;
        name: string;
        permissions: Array<any>;
    }>;
    permissions: Array<any>;
    onServiceClick?: () => void;
};

const ServiceNearYouCard = ({
    image,
    budget_from,
    budget_to,
    budget_type,
    serviceProvider,
    serviceProviderLocation,
    serviceRating,
    serviceTitle,
    haveDiscount,
    serviceSlug,
    discountOn,
    discount,
    currency,
    onServiceClick,
}: ServiceNearYouCardProps) => {
    const router = useRouter();
    const path = router.query.slug;

    return (
        <div
            data-active={JSON.stringify(path === serviceSlug)}
            className="service-card-block service-near-you-card-block active"
            onClick={() => onServiceClick}
        >
            <Row>
                <Col md={5}>
                    {image && (
                        <figure className="thumbnail-img">
                            <Image
                                src={
                                    typeof image === "string"
                                        ? image
                                        : image[0].media
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="servicecard-image"
                            />
                        </figure>
                    )}
                    {!image && (
                        <figure className="thumbnail-img">
                            <Image
                                src={"/placeholder/taskPlaceholder.png"}
                                layout="fill"
                                objectFit="contain"
                                alt="servicecard-image"
                            />
                        </figure>
                    )}
                </Col>
                <Col md={7}>
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
                                <p>
                                    {serviceProviderLocation &&
                                    serviceProviderLocation.length > 1
                                        ? serviceProviderLocation
                                        : "Location not available"}
                                </p>
                            </div>

                            <div className="success-rate type d-flex flex-col">
                                <div className="star d-flex align-items-center flex-row">
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="star svg-icon"
                                    />

                                    <p>{serviceRating ?? "0(0)"}</p>
                                </div>
                            </div>
                            <div></div>
                            <h1 className="price">
                                {currency + " "}
                                {budget_to}
                                {budget_from !== 0 && " - " + budget_from}
                                {budget_type === "Hourly"
                                    ? "/hr"
                                    : budget_type === "Monthly"
                                    ? "/mn"
                                    : ""}
                            </h1>
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
