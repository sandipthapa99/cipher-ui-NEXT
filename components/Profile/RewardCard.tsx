import { EmptyOffers } from "@components/Offers/EmptyOffers";
import { OfferBasicCard } from "@components/Offers/OfferBasicCard";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import { Col, Row } from "react-bootstrap";
import type { OfferListingProps } from "types/offerListingProps";

const RewardCard = () => {
    const { data: redeemList } = useData<OfferListingProps>(
        ["reedem-offers"],
        urls.offer.list,
        true
    );

    return (
        <div className="rewards">
            <Row className="d-flex align-items-stretch">
                {redeemList?.data && redeemList?.data?.length > 0 ? (
                    redeemList?.data?.map((info, key) => {
                        return (
                            <>
                                <Col
                                    key={key}
                                    className="d-flex gx-4 align-items-stretch"
                                    lg={3}
                                    md={4}
                                    sm={6}
                                >
                                    <OfferBasicCard offerData={info} />
                                </Col>
                            </>
                        );
                    })
                ) : (
                    <EmptyOffers />
                )}
            </Row>
        </div>
    );
};
export default RewardCard;
