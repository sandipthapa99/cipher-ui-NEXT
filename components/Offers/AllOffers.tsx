import ShareIcon from "@components/common/ShareIcon";
import { url } from "inspector";
import Image from "next/image";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import OfferCard from "./OfferCard";

export const AllOffers = () => {
    const data = [
        {
            url: "/offers/dress.png",
            description: "Home Cleaning - Flat Rs 200 Cashback",
            price: 200,
        },
        {
            url: "/offers/dress.png",
            description: "Home Cleaning - Flat Rs 200 Cashback",
            price: 200,
        },
        {
            url: "/offers/dress.png",
            description: "Home Cleaning - Flat Rs 200 Cashback",
            price: 200,
        },
        {
            url: "/offers/dress.png",
            description: "Home Cleaning - Flat Rs 200 Cashback",
            price: 200,
        },
    ];

    const scratch = [
        "/offers/scratch.png",
        "/offers/scratch1.png",
        "/offers/scratch2.png",
        "/offers/scratch3.png",
    ];

    const gifts = [
        "/offers/purple.png",
        "/offers/brown.png",
        "/offers/blackgift.png",
        "/offers/bluegift.png",
    ];

    const anothergift = [
        "/offers/gift2.png",
        "/offers/gift2.png",
        "/offers/giftwithribon.png",
        "/offers/giftwithcherr.png",
    ];
    return (
        <div className="alloffers">
            <Row className="alloffers__container">
                {data.map((item, index) => (
                    <Col key={index} md={3} sm={12} xs={12} lg={3}>
                        <OfferCard
                            description={item.description}
                            price={item.price}
                            url={item.url}
                        />
                    </Col>
                ))}
            </Row>
            <div className="recommend">
                <Row className="recommend__container mt-5">
                    {scratch.map((item, index) => (
                        <Col key={index} md={3} sm={12} xs={12} lg={3}>
                            <figure className="offer-img">
                                <Image
                                    src={item}
                                    height={400}
                                    width={648}
                                    alt={"voucher"}
                                />
                            </figure>
                        </Col>
                    ))}
                </Row>
            </div>
            <Row className="alloffers__container mt-5">
                {data.map((item, index) => (
                    <Col key={index} md={3} sm={12} xs={12} lg={3}>
                        <OfferCard
                            description={item.description}
                            price={item.price}
                            url={item.url}
                        />
                    </Col>
                ))}
            </Row>
            <div className="recommend">
                <Row className="recommend__container mt-5">
                    {gifts.map((item, index) => (
                        <Col key={index} md={3} sm={12} xs={12} lg={3}>
                            <figure className="offer-img">
                                <Image
                                    src={item}
                                    height={400}
                                    width={648}
                                    alt={"voucher"}
                                />
                            </figure>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="dashain mb-5">
                <figure className="offer-img">
                    <Image
                        src={"/offers/dashainoffer.png"}
                        height={400}
                        width={1300}
                        alt={"voucher"}
                        objectFit="cover"
                    />
                </figure>
            </div>
            <div className="recommend">
                <Row className="recommend__container mt-5">
                    {anothergift.map((item, index) => (
                        <Col key={index} md={3} sm={12} xs={12} lg={3}>
                            <figure className="offer-img">
                                <Image
                                    src={item}
                                    height={400}
                                    width={648}
                                    alt={"voucher"}
                                />
                            </figure>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};