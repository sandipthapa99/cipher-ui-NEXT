import Layout from "@components/Layout";
import { PaymentSuccessSkeleton } from "@components/Skeletons/PaymentSuccessSkeleton";
import { faDashboard, faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Box, Button, createStyles, Text, Title } from "@mantine/core";
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
    purchase_order_id?: string;
    pidx?: string;
    payment_intent?: string;
}
export enum PaymentMethods {
    khalti = "khalti",
    stripe = "stripe",
}
export type KhaltiPayload = {
    type: PaymentMethods.khalti;
    order: string;
    detail: { pidx: string };
};
export type StripePayload = {
    type: PaymentMethods.stripe;
    payment_intent: string;
};

export type CompleteOrderPayload = KhaltiPayload | StripePayload;

const PaymentSuccess = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const [showSuccess, setShowSuccess] = useState(false);
    const [orderAlreadyProcessed, setOrderAlreadyProcessed] = useState(false);

    const navigateToDashboard = () => router.push("/home");

    const {
        purchase_order_id: order,
        pidx,
        payment_intent,
    } = router.query as SuccessPageQuery;

    const provider = payment_intent
        ? PaymentMethods.stripe
        : PaymentMethods.khalti;

    const { mutate: completeOrderMutation, isLoading } = useMutation<
        string,
        AxiosError<{ order: string[] }>,
        CompleteOrderPayload
    >(async (payload) => {
        const { type, ...rest } = payload;
        const { data } = await axiosClient.post<{ message: string }>(
            `/payment/verify/${provider}/`,
            rest
        );
        return data.message;
    });
    useEffect(() => {
        const payload =
            order && pidx
                ? ({
                      type: PaymentMethods.khalti,
                      order,
                      detail: { pidx },
                  } as KhaltiPayload)
                : payment_intent
                ? ({
                      type: PaymentMethods.stripe,
                      payment_intent,
                  } as StripePayload)
                : undefined;
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
    }, [completeOrderMutation, order, payment_intent, pidx, provider]);

    return (
        <>
            <Layout title="Payment Success | Homaale">
                <Container fluid="xl" className="px-5">
                    {isLoading || !showSuccess ? (
                        <PaymentSuccessSkeleton />
                    ) : (
                        <div className={classes.wrapper}>
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
                                            <FontAwesomeIcon
                                                icon={faWarning}
                                                className="svg-icon me-0"
                                            />
                                        }
                                        color="yellow"
                                        title="Payment already processed"
                                    >
                                        Your payment has already been processed.
                                    </Alert>
                                </Box>
                            ) : (
                                <>
                                    <div className={classes.body}>
                                        <Title
                                            sx={{ color: "green" }}
                                            className={classes.title}
                                        >
                                            Payment Successful !
                                        </Title>
                                        <Text
                                            sx={{
                                                maxWidth: "45rem",
                                                lineHeight: "2.5rem",
                                            }}
                                            size="md"
                                            color="dimmed"
                                        >
                                            Thank you for your payment. Your
                                            payment has been successfully
                                            processed and a receipt for your
                                            purchase has been emailed to you.You
                                            can visit your dashboard to view
                                            your orders.
                                        </Text>
                                        <div className={classes.controls}>
                                            <Button
                                                color="yellow"
                                                onClick={navigateToDashboard}
                                                leftIcon={
                                                    <FontAwesomeIcon
                                                        className="svg-icon me-0"
                                                        icon={faDashboard}
                                                    />
                                                }
                                            >
                                                Go to Dashboard
                                            </Button>
                                        </div>
                                    </div>
                                    <Image
                                        src="/payment_success.svg"
                                        width={400}
                                        height={400}
                                        alt="payment success screen"
                                        className={classes.image}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </Container>
            </Layout>
        </>
    );
};
const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlock: theme.spacing.xl,
        padding: theme.spacing.xl * 2,
        borderRadius: theme.radius.md,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        border: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[3]
        }`,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            flexDirection: "column-reverse",
            padding: theme.spacing.xl,
        },
    },
    image: {
        maxWidth: "40%",

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: "100%",
        },
    },
    body: {
        paddingRight: theme.spacing.xl * 4,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingRight: 0,
            marginTop: theme.spacing.xl,
        },
    },
    title: {
        color: theme.colorScheme === "dark" ? theme.colors.green : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },
    controls: {
        display: "flex",
        marginTop: theme.spacing.xl,
    },
    inputWrapper: {
        width: "100%",
        flex: "1",
    },
    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
    },
}));

export default PaymentSuccess;
