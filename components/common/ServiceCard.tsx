import { faHeart } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ServiceCardProps } from "types/serviceCard";

import CardBtn from "./CardBtn";
import ShareIcon from "./ShareIcon";
import ShareModal from "./ShareModalCard";

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
    discountOn,
}: ServiceCardProps) => {
    const [showModal, setShowModal] = useState(false);

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
                        <h2 className="card-title">{serviceTitle}</h2>
                        <h3 className="card-subtitle">
                            <span>{serviceProvider}</span> |{" "}
                            {serviceProviderLocation}
                        </h3>
                        <p className="card-description">
                            {`${serviceDescription.substring(0, 80)}...`}
                        </p>
                        <div className="ratings-wrapper d-flex flex-column flex-sm-row justify-content-between">
                            <p className="ratings d-flex align-items-sm-center justify-content-sm-center">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="svg-icon star"
                                />
                                {serviceRating}
                            </p>
                            <p className="price mt-3 mt-sm-0">
                                ${servicePrice}/hr
                            </p>
                        </div>
                    </a>
                </Link>
                <div className="d-flex justify-content-between align-items-md-center flex-column flex-sm-row">
                    <div className="d-flex align-items-center justify-content-around justify-content-md-between mb-3 mb-sm-0">
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="svg-icon svg-icon-heart me-5"
                        />

                        {/* <FontAwesomeIcon icon={faShare}
                            className="svg-icon share" /> */}
                        <ShareIcon
                            showModal={true}
                            handleOnClick={() => setShowModal(!showModal)}
                        />
                    </div>
                    <CardBtn btnTitle="Book Now" backgroundColor="#211D4F" />
                </div>
                <div className="share-modal">
                    <ShareModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                    />
                </div>
            </div>
        </div>
    );
};
export default ServiceCard;
