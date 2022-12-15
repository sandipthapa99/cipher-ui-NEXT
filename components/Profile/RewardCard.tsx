import { OfferModel } from "@components/Offers/OfferModel";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { OfferListingProps } from "types/offerListingProps";

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
                    redeemList?.data?.map((info) => (
                        <Col
                            key={info.id}
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
                                </div>
                                <span>{info?.offer?.code}</span>
                            </div>
                        </Col>
                    ))}
            </Row>
            <OfferModel setShow={setShow} show={show} />
        </div>
    );
};
export default RewardCard;
