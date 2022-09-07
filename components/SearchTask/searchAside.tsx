import { faLocationDot, faUser } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

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
    onServiceClick,
}: ServiceNearYouCardProps) => {
    // const { data } = useQuery(
    //     ["service-provider-user", serviceProvider],
    //     async () => {
    //         const { data } = await axiosClient.get<ServiceProvider>(
    //             `/user/${serviceProvider}`
    //         );
    //         return data;
    //     }
    // );

    // const providerName = data?.groups[0]?.name;

    const router = useRouter();
    const path = router.query.slug;

    return (
        <div
            data-active={JSON.stringify(path === serviceSlug)}
            className="service-card-block service-near-you-card-block active"
            onClick={() => onServiceClick}
        >
            <Row>
                <Col md="5">
                    {image && Array.isArray(image) ? (
                        <figure className="thumbnail-img">
                            <Image
                                src={
                                    image
                                        ? image[0].media
                                        : "/service-details/garden-cleaning.png"
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="servicecard-image"
                            />
                        </figure>
                    ) : (
                        <figure className="thumbnail-img">
                            <Image
                                src={
                                    image
                                        ? image
                                        : "/service-details/garden-cleaning.png"
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="servicecard-image"
                            />
                        </figure>
                    )}
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
                            <div></div>
                            <h1 className="price">
                                $ {budget_from}
                                {budget_to && "-" + budget_to}
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
