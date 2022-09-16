import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import Link from "next/link";
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
    currency,
    merchantId,
}: MerchantCardProps) => {
    const id = merchantId ? merchantId : "";
    const isTaskerBookmarked = useIsBookmarked("user", id.toString());
    const queryClient = useQueryClient();

    return (
        <div className="merchant-card-block">
            <Link href={`/tasker/${merchantId}`}>
                <a>
                    <div className="d-flex flex-column flex-sm-row align-items-center merchant-intro">
                        <figure className="thumbnail-img">
                            {merchantImage ? (
                                <Image
                                    src={
                                        merchantImage ??
                                        "/userprofile/unknownPerson.jpg"
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt="merchant-image"
                                />
                            ) : (
                                ""
                            )}
                        </figure>
                        <div className="merchant-name">
                            {merchantName ? (
                                <h2 className="card-title">{`${
                                    merchantName.length > 17
                                        ? `${merchantName.substring(0, 17)}...`
                                        : merchantName
                                }`}</h2>
                            ) : (
                                ""
                            )}

                            <h3 className="card-subtitle">
                                <span>{merchantCategory}</span> |{" "}
                                {merchantLocation}
                            </h3>
                        </div>
                    </div>
                </a>
            </Link>
            <div className="card-content">
                <Link href={`/tasker/${merchantId}`}>
                    <a>
                        <div className="merchant-description">
                            {merchantDescription ? (
                                <p className="card-description">
                                    {`${
                                        merchantDescription.length > 100
                                            ? `${merchantDescription.substring(
                                                  0,
                                                  100
                                              )}...`
                                            : merchantDescription
                                    }`}
                                </p>
                            ) : (
                                ""
                            )}
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
                                {merchantRating && merchantRating > 0
                                    ? merchantRating
                                    : 0}
                            </p>
                            <p className="price">
                                {currency}
                                &nbsp;{merchantPrice}/hr
                            </p>
                        </div>
                    </a>
                </Link>
                <div className="d-flex justify-content-between align-items-md-center">
                    <div className="d-flex align-items-center justify-content-around justify-content-md-between mb-3 mb-sm-0">
                        <SaveIcon
                            object_id={String(merchantId)}
                            model={"user"}
                            filled={isTaskerBookmarked}
                            onSuccess={() =>
                                queryClient.invalidateQueries([
                                    "bookmarks",
                                    "user",
                                ])
                            }
                        />
                        <ShareIcon url={""} quote={""} hashtag={""} />
                    </div>
                    <Link href={`/tasker/${merchantId}`}>
                        <a>
                            <CardBtn
                                btnTitle="Hire Me"
                                backgroundColor="#211D4F"
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default MerchantCard;
