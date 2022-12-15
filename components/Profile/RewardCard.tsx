import { OfferModel } from "@components/Offers/OfferModel";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { OfferListingProps } from "types/offerListingProps";

export const OFFER_TYPES_OPTIONS = {
    Basic: "basic",
    Gift_Card: "gift_card",
    Promocode: "promo_code",
    Voucher: "voucher",
    Coupon: "coupon",
    Scratch_Card: "scratch_card",
};

const RewardCard = () => {
    const { data: redeemList } = useData<OfferListingProps>(
        ["reedem-offers"],
        urls.offer.list,
        true
    );

    const [show, setShow] = useState(false);

    return (
        <div className="rewards">
            <Row className="d-flex align-items-stretch">
                {redeemList?.data &&
                    redeemList?.data?.map((info, key) => {
                        const renderSwitch = () => {
                            switch (info?.offer?.offer_type) {
                                case OFFER_TYPES_OPTIONS.Basic:
                                    return "Offer";
                                default:
                                    return "Default";
                            }
                        };

                        return (
                            <>
                                <Col
                                    key={key}
                                    className="d-flex gx-4 align-items-stretch"
                                    lg={3}
                                    md={4}
                                    sm={6}
                                >
                                    <div
                                        className="find-hire-card-block reward-card"
                                        onClick={() => setShow(true)}
                                        role="button"
                                    >
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={
                                                    info?.offer?.image ??
                                                    "/placeholder/profilePlaceholder.png"
                                                }
                                                layout="fill"
                                                objectFit="cover"
                                                alt="reward-image"
                                            />
                                        </figure>
                                        {info?.is_active ? (
                                            ""
                                        ) : (
                                            <figure className="expired-img">
                                                <Image
                                                    src="/userprofile/rewards/expired.svg"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt="expired-image"
                                                />
                                            </figure>
                                        )}
                                        <div className="card-content">
                                            <h2>{info?.offer?.title}</h2>
                                            <p>{info?.offer?.description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>
                                                    Expires On Dec 20 2023
                                                </span>
                                                <div className="card-content__tag">
                                                    {renderSwitch()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <OfferModel
                                    setShow={setShow}
                                    show={show}
                                    offerDetail={info}
                                />
                            </>
                        );
                    })}
            </Row>
        </div>
    );
};
export default RewardCard;
