import Image from "next/image";
import type { Key } from "react";
import type { PacakageCardProps } from "types/packageCard";

import CardBtn from "./CardBtn";
import PackageServiceHighlights from "./PackageServiceHighlights";
const PackageOffersCard = ({
    title,
    price,
    offers,
    isPermium,
    advantage,
    isRecommended,
    isFromAddService,
}: PacakageCardProps) => {
    return (
        <div
            className={`package-card-block ${
                isRecommended ? "card-block-border-color" : ""
            }`}
        >
            <div className="top-container">
                <h3 className="package-title">{title}</h3>
                {isPermium ? (
                    <figure className="thumbnail-img">
                        <Image
                            src="/service-details/premium.svg"
                            layout="fill"
                            objectFit="cover"
                            alt="premium-image"
                        />
                    </figure>
                ) : (
                    ""
                )}
                <h1 className="price">
                    Rs{price}
                    <span>/mo</span>{" "}
                </h1>
                <div className="save-recommend">
                    {/* {isRecommended ? (
                        <p className="recommended">{advantage}</p>
                    ) : (
                        <p className="saving">{advantage}</p>
                    )} */}
                    ----TO DO FROM API---
                </div>
            </div>
            <div className="offers">
                {/* {offers?.map((offer, key) => (
                    <PackageServiceHighlights
                        key={key}
                        title={offer.text}
                        isChecked={offer.strike}
                    />
                ))} */}
            </div>

            <div className="btn-wrapper">
                {isFromAddService ? (
                    <span className="edit-button">
                        <CardBtn btnTitle="Edit" backgroundColor="#fff" />
                    </span>
                ) : (
                    <CardBtn
                        btnTitle="Buy Now"
                        backgroundColor="primary-color"
                    />
                )}
            </div>
        </div>
    );
};
export default PackageOffersCard;
