import Layout from "@components/Layout";
import {
    faCalendar,
    faClock,
    faLocationDot,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Text } from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { format } from "date-fns";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";

import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

const getStripeApiKey = () => {
    const url = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (url === undefined)
        throw new Error(
            "Please specify an Stripe API key in the environment variable NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
        );
    return url;
};

const stripePromise = loadStripe(getStripeApiKey());

export default function Checkout() {
    const router = useRouter();
    const query = router.query.id;

    const [opened, setOpened] = useState(false);
    const [paymentType, setPaymentType] = useState("esewa");
    const { data: stripeData } = useQuery(
        ["stripe-data", query],
        async () => {
            const response = await axiosClient.post("/payment/intent/stripe/", {
                scope: "entityservice",
                pk: query,
            });
            return response;
        },
        { enabled: !!query }
    );

    const { data: servicesCheckoutData } = useData<
        ServicesValueProps["result"][0]
    >(["all-services-checkout"], `${urls.task.list}${query}/`, !!query);
    const appearance = {
        theme: "stripe" as const,
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
                                            // setOpened(true);
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
                        {/* <p className="titles">Cards Debit/Credit</p>
                        <div className="digital-wallet d-flex gap-4 flex-wrap">
                            {staticPayments.credit.map((item, index) => {
                                return (
                                    <figure
                                        key={index}
                                        className="payment"
                                        onClick={(e) => {
                                            // setOpened(true);
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
                        </div> */}
                        <p className="titles">International Payment Method</p>
                        <div className="digital-wallet d-flex gap-4 flex-wrap">
                            {staticPayments.international.map((item, index) => {
                                return (
                                    <figure
                                        key={index}
                                        className="payment"
                                        onClick={(e) => {
                                            // setOpened(true);
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
                        {servicesCheckoutData?.data && (
                            <Row className="item-detail">
                                <Col md={4} className="left">
                                    {servicesCheckoutData?.data?.images
                                        .length <= 0 && (
                                        <>
                                            <figure className="position-relative">
                                                <Image
                                                    src="/placeholder/taskPlaceholder.png"
                                                    height={116}
                                                    width={116}
                                                    alt="img"
                                                />
                                            </figure>
                                        </>
                                    )}
                                    {servicesCheckoutData?.data?.images.length >
                                        0 && (
                                        <>
                                            <figure className="thumbnail-img">
                                                <Image
                                                    src={
                                                        servicesCheckoutData
                                                            ?.data?.images[0]
                                                            .media
                                                    }
                                                    height={116}
                                                    width={116}
                                                    alt="img"
                                                />
                                            </figure>
                                        </>
                                    )}
                                </Col>
                                <Col md={8} className="inner-right">
                                    <h2>{servicesCheckoutData?.data?.title}</h2>
                                    <p>
                                        <span className="icon location-icon">
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                            />
                                        </span>{" "}
                                        {servicesCheckoutData?.data?.location}
                                    </p>
                                    <div className="d-flex">
                                        <p>
                                            <span className="icon calendar-icon">
                                                <FontAwesomeIcon
                                                    icon={faCalendar}
                                                />
                                            </span>{" "}
                                            {format(
                                                new Date(
                                                    servicesCheckoutData?.data?.created_at
                                                ),
                                                "PP"
                                            )}
                                        </p>
                                        <p className="mx-5">
                                            <span className="icon clock-icon">
                                                <FontAwesomeIcon
                                                    icon={faClock}
                                                />
                                            </span>{" "}
                                            {format(
                                                new Date(
                                                    servicesCheckoutData?.data?.created_at
                                                ),
                                                "p"
                                            )}
                                        </p>
                                    </div>
                                    <h3>
                                        {
                                            servicesCheckoutData?.data?.currency
                                                .symbol
                                        }
                                        {servicesCheckoutData?.data?.budget_to}
                                    </h3>
                                </Col>
                            </Row>
                        )}

                        <div className="sub-total fee d-flex justify-content-between">
                            <p>Sub Total</p>
                            <p>
                                {servicesCheckoutData?.data?.currency.symbol}{" "}
                                {servicesCheckoutData?.data?.budget_to}
                            </p>
                        </div>
                        <div className="platform-fee fee d-flex justify-content-between">
                            <p>Platform Fee</p>
                            <p>Rs 200</p>
                        </div>
                        <div className="tax fee d-flex justify-content-between">
                            <p>Tax (13% inclusive)</p>
                            <p>
                                {servicesCheckoutData?.data?.currency.symbol}{" "}
                                {servicesCheckoutData?.data?.budget_to *
                                    (13 / 100)}
                            </p>
                        </div>
                        <div className="grand-total d-flex justify-content-between">
                            <p>Grand Total</p>
                            <p>
                                {servicesCheckoutData?.data?.currency.symbol}{" "}
                                {servicesCheckoutData?.data?.budget_to +
                                    servicesCheckoutData?.data?.budget_to *
                                        (13 / 100) +
                                    200}
                            </p>
                        </div>
                        <Button
                            className="checkout-btn"
                            onClick={() => {
                                setOpened(true);
                            }}
                        >
                            Proceed to Confirm
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Modal
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
            </Modal>
        </Layout>
    );
}
