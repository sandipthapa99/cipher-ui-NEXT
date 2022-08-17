import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import type { ServiceCardProps } from "types/serviceCard";

import CardBtn from "./CardBtn";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

const ServiceCard = ({
    serviceImage,
    serviceTitle,
    serviceProvider,
    serviceProviderLocation,
    serviceDescription,
    serviceRating,
    servicePrice,
    hasOffer,
    discountRate,
    proService,
}: // discountOn,
ServiceCardProps) => {
    return (
        <div className="service-card-block">
            <Link href="/service-detail">
                <a>
                    <div className="card-img">
                        <figure className="thumbnail-img">
                            <Image
                                src={serviceImage}
                                layout="fill"
                                objectFit="cover"
                                alt="servicecard-image"
                            />
                        </figure>
                        {hasOffer && (
                            <div className="offer">
                                <p className="discount-rate">
                                    {discountRate}% OFF
                                </p>
                                {/* <p className="discount-on">{discountOn}</p> */}
                            </div>
                        )}
                    </div>
                </a>
            </Link>
            <div className="card-content">
                <Link href="/service-detail">
                    <a>
                        <div className="d-flex pro-title-wrapper justify-content-between">
                            <h2 className="card-title">{serviceTitle}</h2>
                            {proService ? (
                                <div className="pro-service">
                                    <p>PRO</p>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <h3 className="card-subtitle">
                            <span>{serviceProvider}</span> |{" "}
                            {serviceProviderLocation}
                        </h3>
                        <p className="card-description">
                            {`${serviceDescription.substring(0, 80)}...`}
                        </p>
                        <div className="ratings-wrapper d-flex align-items-center justify-content-between">
                            <p className="ratings d-flex align-items-sm-center justify-content-sm-center">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="svg-icon star"
                                />
                                {serviceRating}
                            </p>
                            <p className="price">${servicePrice}/hr</p>
                        </div>
                    </a>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-around justify-content-md-between mb-3 mb-sm-0">
                        <SaveIcon />
                        <ShareIcon url={""} quote={""} hashtag={""} />
                    </div>
                    <CardBtn btnTitle="Book Now" backgroundColor="#211D4F" />
                </div>
            </div>
        </div>
    );
};
export default ServiceCard;
