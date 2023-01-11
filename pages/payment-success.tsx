import Layout from "@components/Layout";
import { PaymentSuccessSkeleton } from "@components/Skeletons/PaymentSuccessSkeleton";
import { Alert, Box, Button } from "@mantine/core";
import { DashboardOutlined, ErrorOutlineOutlined } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

const ORDER_ALREADY_PROCESSED_MESSAGE = "The order has already been processed";

export interface SuccessPageQuery {
    pidx?: string;
    payment_intent?: string;
    token?: string;
    refId?: string;
    oid?: string;
}
export enum PaymentMethods {
    khalti = "khalti",
    stripe = "stripe",
    paypal = "paypal",
    esewa = "esewa",
}
export type PaymentPayload = {
    verification_id: string;
    intent_id?: string;
};

export type CompleteOrderPayload = PaymentPayload;

const PaymentSuccess = () => {
    const router = useRouter();

    const [showSuccess, setShowSuccess] = useState(false);
    const [orderAlreadyProcessed, setOrderAlreadyProcessed] = useState(false);

    const navigateToDashboard = () => router.push("/home");

    const { pidx, payment_intent, token, refId, oid } =
        router.query as SuccessPageQuery;

    let provider: string;
    // const provider = payment_intent
    //     ? PaymentMethods.stripe
    //     : PaymentMethods.khalti;
    if (pidx) {
        provider = PaymentMethods.khalti;
    }
    if (payment_intent) {
        provider = PaymentMethods.stripe;
    }
    if (token) {
        provider = PaymentMethods.paypal;
    }
    if (refId) {
        provider = PaymentMethods.esewa;
    }

    const { mutate: completeOrderMutation, isLoading } = useMutation<
        string,
        AxiosError<{ order: string[] }>,
        CompleteOrderPayload
    >(async (payload) => {
        const { data } = await axiosClient.post<{ message: string }>(
            `/payment/verify/${provider}/`,
            payload
        );
        return data.message;
    });
    useEffect(() => {
        let payload;
        if (pidx) {
            payload = { verification_id: pidx } as PaymentPayload;
        }
        if (payment_intent) {
            payload = { verification_id: payment_intent } as PaymentPayload;
        }
        if (token) {
            payload = { verification_id: token } as PaymentPayload;
        }
        if (refId) {
            payload = {
                verification_id: refId,
                intent_id: oid,
            } as PaymentPayload;
        }

        if (!payload) return;

        completeOrderMutation(payload, {
            onSuccess: (data) => {
                toast.success(data);
                setShowSuccess(true);
            },
            onError: (error) => {
                const errorArray = error?.response?.data?.order;
                if (errorArray && errorArray.length > 0) {
                    const firstError = errorArray[0];
                    if (firstError === ORDER_ALREADY_PROCESSED_MESSAGE) {
                        setOrderAlreadyProcessed(true);
                        setShowSuccess(true);
                    }
                }
            },
        });
    }, [completeOrderMutation, payment_intent, pidx, token, refId, oid]);

    return (
        <>
            <Layout
                title="Payment Verification | Homaale"
                description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them.
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
                keywords="homaale, airtasker-nepali,nepali-working-platform, homaale-payment, ecommerce, homaale-feeback, business, online-business"
            >
                <Container fluid="xl" className="px-4">
                    {isLoading || !showSuccess ? (
                        <PaymentSuccessSkeleton />
                    ) : (
                        <>
                            <div>
                                {orderAlreadyProcessed ? (
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Alert
                                            icon={
                                                <ErrorOutlineOutlined className="svg-icon me-0" />
                                            }
                                            color="yellow"
                                            title="Payment already processed"
                                        >
                                            Your payment has already been
                                            processed.
                                        </Alert>
                                    </Box>
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center flex-column"
                                        style={{
                                            backgroundColor: "#Fff",
                                            borderRadius: "0.4rem",
                                            margin: "3.2rem",
                                            padding: "3.2rem",
                                        }}
                                    >
                                        <Image
                                            src="/payment_success.svg"
                                            width={400}
                                            height={400}
                                            alt="payment success screen"
                                        />
                                        <h1>Payment Successful</h1>
                                        <p className="mb-0">
                                            Thank you for your payment.
                                        </p>
                                        <p>
                                            You can checkout invoice in next
                                            step.
                                        </p>
                                        <Button
                                            color="yellow"
                                            onClick={navigateToDashboard}
                                            leftIcon={
                                                <DashboardOutlined className="svg-icon me-0" />
                                            }
                                        >
                                            Go to Dashboard
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </Container>
            </Layout>
        </>
    );
};

export default PaymentSuccess;
