import BigButton from "@components/common/Button";
import Layout from "@components/Layout";
import {
    faCalendar,
    faClock,
    faLocationDot,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Text } from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
    const [opened, setOpened] = useState(false);
    const [paymentType, setPaymentType] = useState("esewa");
    const { data: stripeData } = useQuery(["stripe-data"], async () => {
        const response = await axiosClient.post("/payment/intent/stripe/", {
            scope: "task",
            pk: "4c1dbe76-3c76-4b52-9602-5cf5fbe1f8aa",
        });
        return response;
    });

    const appearance = {
        theme: "stripe",
        // labels: "floating",

        variables: {
            colorPrimary: "#0570de",
            colorBackground: "#ffffff",
            colorText: "#30313d",
            colorDanger: "#fe5050",
            fontFamily: "Poppins, system-ui",
            spacingUnit: "5px",
            borderRadius: "4px",
        },
    };

    const options = {
        clientSecret: stripeData?.data?.data?.client_secret,
        appearance,
    };

    const staticPayments = {
        wallets: [
            {
                partner: "esewa",
                url: "/payment/esewa.png",
            },
            {
                partner: "khalti",
                url: "/payment/khalti.png",
            },
            {
                partner: "connect",
                url: "/payment/connect.png",
            },
            {
                partner: "namaste",
                url: "/payment/namaste.png",
            },
            {
                partner: "ime",
                url: "/payment/ime.png",
            },
        ],

        credit: [
            {
                partner: "visacard",
                url: "/payment/visacard.png",
            },
            {
                partner: "discover",
                url: "/payment/discover.png",
            },
        ],

        international: [
            {
                partner: "paypal",
                url: "/payment/paypal.png",
            },
            {
                partner: "stripe",
                url: "/payment/stripe.png",
            },
        ],
    };

    return (
        <Layout>
            <Container>
                <h2 className="pageName">Checkout</h2>
                <Row className="checkout-row">
                    <Col md={7} className="left">
                        <h3>Payment Method</h3>
                        <p className="titles">Digital Wallets</p>
                        <div className="digital-wallet d-flex gap-4 flex-wrap">
                            {staticPayments.wallets.map((item, index) => {
                                return (
                                    <figure
                                        key={index}
                                        className="payment"
                                        onClick={(e) => {
                                            setOpened(true);
                                            setPaymentType(item.partner);
                                        }}
                                    >
                                        <Image
                                            src={item.url}
                                            objectFit="contain"
                                            width={190}
                                            height={100}
                                            alt="oppurtunities-page-main-image"
                                        />
                                        {item.partner === paymentType && (
                                            <figure className="verified">
                                                <Image
                                                    src={
                                                        "/payment/verified.png"
                                                    }
                                                    height={24}
                                                    width={24}
                                                    alt={"verified"}
                                                />
                                            </figure>
                                        )}
                                    </figure>
                                );
                            })}
                        </div>
                        <p className="titles">Cards Debit/Credit</p>
                        <div className="digital-wallet d-flex gap-4 flex-wrap">
                            {staticPayments.credit.map((item, index) => {
                                return (
                                    <figure
                                        key={index}
                                        className="payment"
                                        onClick={(e) => {
                                            setOpened(true);
                                            setPaymentType(item.partner);
                                        }}
                                    >
                                        <Image
                                            src={item.url}
                                            objectFit="contain"
                                            width={190}
                                            height={100}
                                            alt="oppurtunities-page-main-image"
                                        />{" "}
                                        {item.partner === paymentType && (
                                            <figure className="verified">
                                                <Image
                                                    src={
                                                        "/payment/verified.png"
                                                    }
                                                    height={24}
                                                    width={24}
                                                    alt={"verified"}
                                                />
                                            </figure>
                                        )}
                                    </figure>
                                );
                            })}
                        </div>
                        <p className="titles">International Payment Method</p>
                        <div className="digital-wallet d-flex gap-4 flex-wrap">
                            {staticPayments.international.map((item, index) => {
                                return (
                                    <figure
                                        key={index}
                                        className="payment"
                                        onClick={(e) => {
                                            setOpened(true);
                                            setPaymentType(item.partner);
                                        }}
                                    >
                                        <Image
                                            src={item.url}
                                            objectFit="contain"
                                            width={190}
                                            height={100}
                                            alt="oppurtunities-page-main-image"
                                        />{" "}
                                        {item.partner === paymentType && (
                                            <figure className="verified">
                                                <Image
                                                    src={
                                                        "/payment/verified.png"
                                                    }
                                                    height={24}
                                                    width={24}
                                                    alt={"verified"}
                                                />
                                            </figure>
                                        )}
                                    </figure>
                                );
                            })}
                        </div>
                    </Col>
                    <Col md={4} className="right mb-5">
                        <h1>Task List</h1>
                        <Row className="item-detail">
                            <Col md={4} className="left">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/hireinnepal/footer.png"
                                        layout="fill"
                                        objectFit="cover"
                                        height={116}
                                        width={116}
                                        alt="img"
                                    />
                                </figure>
                            </Col>
                            <Col md={8} className="inner-right">
                                <h2>Need a garden cleaner</h2>
                                <p>
                                    <span className="icon location-icon">
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </span>{" "}
                                    Bagbazzar, Kathmandu
                                </p>
                                <div className="d-flex">
                                    <p>
                                        <span className="icon calendar-icon">
                                            <FontAwesomeIcon
                                                icon={faCalendar}
                                            />
                                        </span>{" "}
                                        June 02, 2022
                                    </p>
                                    <p className="mx-5">
                                        <span className="icon clock-icon">
                                            <FontAwesomeIcon icon={faClock} />
                                        </span>{" "}
                                        03:30 AM
                                    </p>
                                </div>
                                <h3>Rs 1,200</h3>
                            </Col>
                        </Row>

                        <div className="sub-total fee d-flex justify-content-between">
                            <p>Sub Total</p>
                            <p>Rs 1,200</p>
                        </div>
                        <div className="platform-fee fee d-flex justify-content-between">
                            <p>Platform Fee</p>
                            <p>Rs 200</p>
                        </div>
                        <div className="tax fee d-flex justify-content-between">
                            <p>Tax (13% inclusive)</p>
                            <p>Rs 1,200</p>
                        </div>
                        <div className="grand-total d-flex justify-content-between">
                            <p>Grand Total</p>
                            <p>Rs 1,400</p>
                        </div>
                        <Button
                            className="checkout-btn"
                            onClick={(e) => {
                                alert(paymentType);
                            }}
                        >
                            Proceed to Confirm
                        </Button>
                    </Col>
                </Row>
            </Container>
            {/*<Modal
                opened={opened}
                onClose={() => {
                    setOpened(false);
                    setPaymentType("esewa");
                }}
            >
                {paymentType !== "stripe" ? (
                    <Text>{paymentType} is comming soon</Text>
                ) : (
                    ""
                )}
                {paymentType === "stripe" && (
                    <div className="App mt-5 mb-5">
                        {options.clientSecret && (
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm />
                            </Elements>
                        )}
                    </div>
                )}
            </Modal>*/}
        </Layout>
    );
}
