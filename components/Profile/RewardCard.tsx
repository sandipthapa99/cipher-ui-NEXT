import CardBtn from "@components/common/CardBtn";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import type { OfferListingProps } from "types/offerListingProps";

const RewardCard = () => {
    // your function to copy here
    const { data: redeemList } = useData<OfferListingProps>(
        ["reedem-offers"],
        urls.offer.list,
        true
    );

    const router = useRouter();

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
                            <div className="find-hire-card-block reward-card">
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

                                    <CardBtn
                                        btnTitle={`Redeem`}
                                        backgroundColor="primary-color"
                                        handleClick={() =>
                                            router.push("/service")
                                        }
                                    />
                                </div>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    );
};
export default RewardCard;
