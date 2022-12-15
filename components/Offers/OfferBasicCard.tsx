import format from "date-fns/format";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import type { AllOffersProps } from "types/allOffersProps";
import type { OfferListingProps } from "types/offerListingProps";
import { DISCOUNT_TYPES_OPTIONS, OFFER_TYPES_OPTIONS } from "utils/OffersTypes";

import { OfferModel } from "./OfferModel";

export const OfferBasicCard = ({
    offerData,
    offerBasic,
}: {
    offerData?: OfferListingProps[0];
    setShow?: Dispatch<SetStateAction<boolean>>;
    offerBasic?: AllOffersProps["result"][0];
}) => {
    const { offer } = offerData ?? ({} as OfferListingProps[0]);
    const {
        title,
        image,
        offer_type,
        end_date,
        free,
        discount,
        discount_type,
        discount_limit,
    } = offer ?? offerBasic ?? ({} as AllOffersProps["result"][0]);

    const [show, setShow] = useState(false);

    const renderOfferType = () => {
        switch (offer_type) {
            case OFFER_TYPES_OPTIONS.Basic:
                return "Offer";

            case OFFER_TYPES_OPTIONS.Promocode:
                return "Code";
            default:
                return "Default";
        }
    };

    const renderDiscountType = () => {
        switch (discount_type) {
            case DISCOUNT_TYPES_OPTIONS.Percentage:
                return "%";
            case DISCOUNT_TYPES_OPTIONS.Amount:
                return " Rs";
            default:
                return null;
        }
    };

    return (
        <>
            <div
                className="find-hire-card-block reward-card"
                onClick={() => setShow && setShow(true)}
                role="button"
            >
                <figure className="thumbnail-img">
                    <Image
                        src={image ?? "/placeholder/profilePlaceholder.png"}
                        layout="fill"
                        objectFit="cover"
                        alt="reward-image"
                    />
                </figure>
                <div className="card-content">
                    <h2>{title}</h2>
                    {free && <p>FREE</p>}
                    {discount && (
                        <p>
                            {discount}{" "}
                            {discount_limit ? `- ${discount_limit}` : null}
                            {renderDiscountType()}
                        </p>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                        {end_date && (
                            <span>
                                Expires On {format(new Date(end_date), "PP")}
                            </span>
                        )}

                        <div className="card-content__tag">
                            {renderOfferType()}
                        </div>
                    </div>
                </div>
            </div>
            <OfferModel
                setShow={setShow}
                show={show}
                offerBasic={offerBasic}
                offerDetail={offerData}
            />
        </>
    );
};
