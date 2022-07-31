import CardBtn from "@components/common/CardBtn";
import ToastMessage from "@components/common/Toasts";
import Image from "next/image";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { rewardCardContent } from "staticData/rewardCard";

const RewardCard = () => {
    const [copySuccess, setCopySuccess] = useState("");
    // your function to copy here

    const copyToClipBoard = async (copyMe: any) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess("Copied!");
        } catch (err) {
            setCopySuccess("Failed to copy!");
        }
    };
    return (
        <div className="rewards">
            <Row className="d-flex align-items-stretch">
                {rewardCardContent &&
                    rewardCardContent.map((info) => (
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
                                        src={info.rewardImage}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="reward-image"
                                    />
                                </figure>
                                {info.isAvailable ? (
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
                                    <h2>
                                        {info.haveDiscount
                                            ? `${info.discount}% Off ${info.title}`
                                            : `${info.title}`}
                                    </h2>
                                    <p>{info.description}</p>
                                    {info.haveCouponCode ? (
                                        <div className="coupon">
                                            {info.isCouponCodeAvailable ? (
                                                <div className="code">
                                                    <p>{info.couponCode}</p>
                                                </div>
                                            ) : (
                                                <div className="disabled disabled-color">
                                                    <p>{info.couponCode}</p>
                                                </div>
                                            )}

                                            <div
                                                className={`${
                                                    info.isCouponCodeAvailable
                                                        ? "abled"
                                                        : "disabled-copy-btn"
                                                } copy-btn`}
                                                onClick={() =>
                                                    copyToClipBoard(
                                                        info.couponCode
                                                    )
                                                }
                                            >
                                                Copy
                                            </div>
                                        </div>
                                    ) : (
                                        <CardBtn
                                            btnTitle={`${info.btnText}`}
                                            backgroundColor="primary-color"
                                        />
                                    )}
                                </div>
                            </div>
                        </Col>
                    ))}
            </Row>
        </div>
    );
};
export default RewardCard;
