import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spoiler } from "@mantine/core";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import type { ServicesValueProps } from "types/serviceCard";

import CardBtn from "./CardBtn";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

const ServiceCard = ({
    serviceCard,
}: {
    serviceCard: ServicesValueProps["result"][0];
}) => {
    return (
        <div className="service-card-block">
            <Link href={`/service/${serviceCard.slug}`}>
                <a>
                    <div className="card-img">
                        {serviceCard && serviceCard?.images && (
                            <figure className="thumbnail-img">
                                <Image
                                    src={
                                        Array.isArray(serviceCard.images)
                                            ? serviceCard.images[0].image
                                            : serviceCard.images
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt="servicecard-image"
                                />
                            </figure>
                        )}

                        {serviceCard?.is_online && (
                            <div className="offer">
                                <p className="discount-rate">{20}% OFF</p>
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
                            <h2 className="card-title">{serviceCard?.title}</h2>
                            {serviceCard?.is_professional ? (
                                <div className="pro-service">
                                    <p>PRO</p>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <h3 className="card-subtitle">
                            <Spoiler
                                maxHeight={15}
                                hideLabel={""}
                                showLabel={""}
                            >
                                <span>
                                    {serviceCard?.created_by?.full_name}
                                </span>{" "}
                                |{serviceCard?.location}
                            </Spoiler>
                        </h3>
                        <p className="card-description d-inline">
                            <Spoiler
                                maxHeight={50}
                                hideLabel={"..."}
                                showLabel={"..."}
                            >
                                {parse(serviceCard?.description)}
                            </Spoiler>
                        </p>
                        <div className="ratings-wrapper d-flex align-items-center justify-content-between">
                            <p className="ratings d-flex align-items-sm-center justify-content-sm-center">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="svg-icon star"
                                />
                                {serviceCard?.happy_clients}
                            </p>
                            <p className="price">
                                ${serviceCard?.budget_from}/hr
                            </p>
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
