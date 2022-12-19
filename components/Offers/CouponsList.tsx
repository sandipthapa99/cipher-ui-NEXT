import React from "react";
import { Col, Row } from "react-bootstrap";
import type { AllOffersProps } from "types/allOffersProps";

import { EmptyOffers } from "./EmptyOffers";
import { OfferBasicCard } from "./OfferBasicCard";

export const CouponsList = ({
    allOffers,
}: {
    allOffers: AllOffersProps["result"];
}) => {
    return (
        <div className="alloffers">
            {allOffers && allOffers?.length > 0 ? (
                <Row className="alloffers__container">
                    {allOffers
                        ?.filter((item) => item.offer_type === "promo_code")
                        .map((item, index) => (
                            <Col key={index} md={3} sm={12} xs={12} lg={3}>
                                <OfferBasicCard offerBasic={item} />
                            </Col>
                        ))}
                </Row>
            ) : (
                <EmptyOffers />
            )}
        </div>
    );
};
