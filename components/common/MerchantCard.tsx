import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import type { MerchantCardProps } from "types/merchantCard";

import CardBtn from "./CardBtn";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

const MerchantCard = ({
    merchantImage,
    merchantName,
    merchantCategory,
    merchantLocation,
    merchantDescription,
    merchantRating,
    merchantPrice,
    happyClients,
    successRate,
    onClick,
}: MerchantCardProps) => {
    return (
        <div onClick={onClick} className="merchant-card-block">
            <div className="d-flex flex-column flex-sm-row align-items-center merchant-intro">
                <figure className="thumbnail-img">
                    <Image
                        src={merchantImage}
                        layout="fill"
                        objectFit="cover"
                        alt="merchant-image"
                    />
                </figure>
                <div className="merchant-name">
                    <h2 className="card-title">{`${
                        merchantName.length > 17
                            ? `${merchantName.substring(0, 17)}...`
                            : merchantName
                    }`}</h2>
                    <h3 className="card-subtitle">
                        <span>{merchantCategory}</span> | {merchantLocation}
                    </h3>
                </div>
            </div>
            <div className="card-content">
                <div className="merchant-description">
                    <p className="card-description">
                        {`${
                            merchantDescription.length > 100
                                ? `${merchantDescription.substring(0, 100)}...`
                                : merchantDescription
                        }`}
                    </p>
                </div>
                <div className="analytics d-flex justify-content-between">
                    <div className="happy-clients d-flex flex-column">
                        <div className="count d-flex flex-row">
                            <figure className="thumbnail-img">
                                <Image
                                    src="/icons/happy-face.svg"
                                    layout="fill"
                                    objectFit="contain"
                                    alt="Happy Face"
                                />
                            </figure>
                            <p>{happyClients}</p>
                        </div>
                        <div className="analytics-title">
                            <p>Happy Clients</p>
                        </div>
                    </div>
                    <div className="success-rate d-flex flex-column">
                        <div className="count  d-flex flex-row">
                            <figure className="thumbnail-img">
                                <Image
                                    src="/icons/badge.svg"
                                    layout="fill"
                                    objectFit="contain"
                                    alt="Happy Face"
                                />
                            </figure>
                            <p>{successRate}%</p>
                        </div>
                        <div className="analytics-title">
                            <p>Success Rate</p>
                        </div>
                    </div>
                </div>
                <div className="ratings-wrapper d-flex justify-content-between">
                    <p className="ratings d-flex align-items-center justify-content-sm-center">
                        <FontAwesomeIcon
                            icon={faStar}
                            className="svg-icon star"
                        />
                        {merchantRating}
                    </p>
                    <p className="price">${merchantPrice}/hr</p>
                </div>
                <div className="d-flex justify-content-between align-items-md-center">
                    <div className="d-flex align-items-center justify-content-around justify-content-md-between mb-3 mb-sm-0">
                        <SaveIcon />
                        <ShareIcon url={""} quote={""} hashtag={""} />
                    </div>
                    <CardBtn btnTitle="Hire Me" backgroundColor="#211D4F" />
                </div>
            </div>
        </div>
    );
};
export default MerchantCard;
