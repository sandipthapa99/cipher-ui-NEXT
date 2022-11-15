import { faShareNodes } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import couponWrapperBlack from "public/offers/bar1.png";
import React from "react";
import { Card } from "react-bootstrap";

interface OfferCardProps {
    url: string;
    description: string;
    price: number;
}
export default function OfferCard({ url, description, price }: OfferCardProps) {
    return (
        <Card
            className="offer-card"
            style={{
                borderRadius: "4px 4px 0px 0px",
            }}
        >
            <figure className="offer-img">
                <Image
                    src={"/offers/dress.png"}
                    height={500}
                    width={648}
                    alt={"voucher"}
                />
            </figure>
            <Card.Body>
                <Card.Title className="offer-card__title">
                    Rs.200 <span>CashBack</span>
                </Card.Title>
                <p className="description">
                    Home Cleaning - Flat Rs 200 Cashback
                </p>
                <div
                    className="coupon-wrapper mt-3"
                    style={{
                        backgroundImage: `url(${couponWrapperBlack.src})`,
                        backgroundSize: "cover",
                    }}
                >
                    <p>Show Coupon Code</p>
                </div>
                <div className="footer d-flex justify-content-between align-items-center">
                    <span className="view">View Details</span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faShareNodes} size="sm" />
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
}
