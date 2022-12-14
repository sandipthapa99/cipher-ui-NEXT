import InputField from "@components/common/InputField";
import Layout from "@components/Layout";
import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import {
    faCalendar,
    faClock,
    faLocationDot,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import {
    Button,
    Group,
    Loader,
    Modal,
    Select,
    Skeleton,
    Text,
} from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import urls from "constants/urls";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useData } from "hooks/use-data";
import { useForm } from "hooks/use-form";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { forwardRef, Fragment, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { CheckoutDataProps } from "types/checkoutDataProps";
import type { CheckoutOffersProps } from "types/checkoutOffersProps";
import type { PaymentMethodProps } from "types/paymentMethods";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

export interface OfferSelectProps extends CheckoutOffersProps {
    label: string;
    image: string;
}

const getStripeApiKey = () => {
    const url = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (url === undefined)
        throw new Error(
            "Please specify an Stripe API key in the environment variable NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
        );
    return url;
};
const stripePromise = loadStripe(getStripeApiKey());

const renderLoadingSkeletons = () => {
    return (
        <Fragment>
            {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonTaskCard key={index} />
            ))}
        </Fragment>
    );
};

export default function Checkout() {
    const router = useRouter();
    const query = router.query.id;

    const [opened, setOpened] = useState(false);
    const [paymentType, setPaymentType] = useState("");

    const [offer, setOffer] = useState<boolean>();

    const { mutate, isLoading: applyPromoLoader } = useForm(
        urls.offer.offerCode
    );

    const { mutate: discountMutate } = useForm(urls.offer.reedem);

    const { data } = useData<CheckoutOffersProps[]>(
        ["sdsd", query],
        `${urls.offer.list}${query}`,
        !!query
    );

    const SelectItem = forwardRef<HTMLDivElement, OfferSelectProps>(
        ({ label, image, id, ...rest }: OfferSelectProps, ref) => (
            <div
                ref={ref}
                {...rest}
                className={"d-flex gap-3 px-3 pb-2"}
                role={"button"}
            >
                <Group noWrap>
                    <Image
                        src={image ? image : "/logo/playstore.png"}
                        alt="qr"
                        height={36}
                        width={36}
                    />

                    <div>
                        <Text size="md">{label}</Text>
                    </div>
                </Group>
            </div>
        )
    );

    const OfferSelect: SelectItem[] = data?.data
        ? data?.data.map((offer) => ({
              id: offer.id,
              label: offer?.offer?.title,
              value: offer.id.toString(),
              image: offer.offer.image,
              group: "Available Offers :",
          }))
        : [];

    SelectItem.displayName = "SelectItem";

    const { data: paymentData, refetch } = useQuery<any, AxiosError, any>(
        ["payment-data", query, paymentType],
        async () => {
            try {
                const response = await axiosClient.post(
                    `${urls.payment.intent}${paymentType.toLowerCase()}/`,
                    {
                        order: query,
                    }
                );
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data?.message);
                    throw new Error(error?.response?.data?.message);
                }
            }
        },
        { enabled: !!paymentType }
    );

    const { data: servicesCheckoutData, isLoading: checkoutLoading } =
        useData<CheckoutDataProps>(
            ["all-services-checkout"],
            `/payment/order/${query}/`,
            !!query
        );
    const queryClient = useQueryClient();

    // Stripe Appereance settings
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
        clientSecret: paymentData?.data?.data?.client_secret,
        appearance,
    };

    const { data: paymentMethods, isLoading } = useQuery(
        ["payment-methods", query],
        async () => {
            const response = await axiosClient.get(urls.payment.method);
            return response;
        }
    );
    const grandTotal = servicesCheckoutData?.data?.grand_total;

    return (
        <Layout
            title="Checkout | Homaale "
            description="Homaale Checkout page after completing tasks. We have Khalti, Paypal and International payment methods for easy transactions."
            keywords="homaale, airtasker-nepali, nepali-working-platform programs payment"
        >
            <Container>
                <h2 className="pageName">Checkout</h2>
                <Row className="checkout-row">
                    <Col md={7} className="left">
                        <h3>Payment Method</h3>
                        <p className="titles">Digital Wallets</p>
                        {isLoading && renderLoadingSkeletons()}
                        {!isLoading && (
                            <Row className="digital-wallet gx-0">
                                {paymentMethods?.data?.result
                                    .filter(
                                        (item: PaymentMethodProps) =>
                                            item.type == "wallet"
                                    )
                                    .map((item: PaymentMethodProps) => {
                                        return (
                                            <Col
                                                md={6}
                                                lg={4}
                                                key={item.id}
                                                className="wrapper mb-3 d-flex align-items-center"
                                                onClick={() => {
                                                    // setOpened(true);
                                                    setPaymentType(item.name);
                                                }}
                                            >
                                                {item.name === paymentType && (
                                                    <figure className="verified">
                                                        <Image
                                                            src={
                                                                "/payment/verified.png"
                                                            }
                                                            height={18}
                                                            width={18}
                                                            alt={"verified"}
                                                        />
                                                    </figure>
                                                )}
                                                <figure className="payment">
                                                    <Image
                                                        src={item.logo}
                                                        objectFit="contain"
                                                        width={36}
                                                        height={48}
                                                        alt="oppurtunities-page-main-image"
                                                    />
                                                </figure>
                                                <p>{item.name}</p>
                                            </Col>
                                        );
                                    })}
                            </Row>
                        )}

                        <p className="titles">International Payment Method</p>
                        <Row className="digital-wallet gx-0">
                            {paymentMethods?.data?.result
                                .filter(
                                    (item: PaymentMethodProps) =>
                                        item.type == "card"
                                )
                                .map((item: PaymentMethodProps) => (
                                    <Col
                                        className="wrapper d-flex align-items-center justify-content-center"
                                        md={4}
                                        key={item.id}
                                        onClick={() => {
                                            // setOpened(true);
                                            setPaymentType(item.name);
                                        }}
                                    >
                                        {item.name === paymentType && (
                                            <figure className="verified">
                                                <Image
                                                    src={
                                                        "/payment/verified.png"
                                                    }
                                                    height={18}
                                                    width={18}
                                                    alt={"verified"}
                                                />
                                            </figure>
                                        )}
                                        <figure className="payment2">
                                            <Image
                                                src={item.logo}
                                                // height={48}
                                                layout="fill"
                                                objectFit="contain"
                                                // width={240}
                                                alt="oppurtunities-page-main-image"
                                            />
                                        </figure>
                                    </Col>
                                ))}
                        </Row>
                    </Col>
                    {checkoutLoading && (
                        <Col md={4} className="right mb-5">
                            <Skeleton height={50} mb="xl" />
                            <Skeleton height={150} />
                            <Skeleton height={20} mt={30} />
                            <Skeleton height={20} mt={20} />
                            <Skeleton height={20} mt={10} />
                            <Skeleton height={40} mt={30} />
                            <Skeleton height={50} mt={30} />
                        </Col>
                    )}

                    {servicesCheckoutData?.data?.order_item &&
                        servicesCheckoutData?.data?.order_item?.map(
                            (item, key) => {
                                return (
                                    <Col
                                        md={4}
                                        className="right mb-5"
                                        key={key}
                                    >
                                        <h1>Task List</h1>
                                        <Row className="item-detail">
                                            <Fragment key={key}>
                                                <Col
                                                    md={4}
                                                    className="inner-left"
                                                >
                                                    {item?.item?.entity_service
                                                        ?.images.length <=
                                                        0 && (
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
                                                    {item?.item?.entity_service
                                                        ?.images?.length >
                                                        0 && (
                                                        <>
                                                            <figure className="thumbnail-img">
                                                                <Image
                                                                    src={
                                                                        item
                                                                            ?.item
                                                                            ?.entity_service
                                                                            ?.images[0]
                                                                            ?.media
                                                                    }
                                                                    height={116}
                                                                    width={116}
                                                                    alt="img"
                                                                />
                                                            </figure>
                                                        </>
                                                    )}
                                                </Col>
                                                <Col
                                                    md={8}
                                                    className="inner-right"
                                                >
                                                    <h2>{item?.item?.title}</h2>
                                                    <p>
                                                        <span className="icon location-icon">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faLocationDot
                                                                }
                                                            />
                                                        </span>{" "}
                                                        {item?.item?.location}
                                                    </p>
                                                    <div className="d-flex">
                                                        <p>
                                                            <span className="icon calendar-icon">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCalendar
                                                                    }
                                                                />
                                                            </span>{" "}
                                                            {format(
                                                                new Date(
                                                                    item?.created_at
                                                                ),
                                                                "PP"
                                                            )}
                                                        </p>
                                                        <p className="mx-5">
                                                            <span className="icon clock-icon">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faClock
                                                                    }
                                                                />
                                                            </span>{" "}
                                                            {format(
                                                                new Date(
                                                                    item?.created_at
                                                                ),
                                                                "p"
                                                            )}
                                                        </p>
                                                    </div>
                                                    <h3>
                                                        {
                                                            item?.item?.currency
                                                                ?.symbol
                                                        }
                                                        {item?.amount}
                                                    </h3>
                                                </Col>
                                            </Fragment>
                                        </Row>

                                        <div className="sub-total fee d-flex justify-content-between">
                                            <p>Sub Total</p>
                                            <p>
                                                {item?.item?.currency?.symbol}{" "}
                                                {item?.amount}
                                            </p>
                                        </div>
                                        {!item?.offer && offer && (
                                            <p
                                                className="text-primary m-2"
                                                role={"button"}
                                                onClick={() => {
                                                    setOffer(false);
                                                }}
                                            >
                                                Add promotion code
                                            </p>
                                        )}

                                        {!item?.offer && !offer && (
                                            <Formik
                                                initialValues={{
                                                    code: "",
                                                    offer_type: "",
                                                    order: "",
                                                }}
                                                onSubmit={async (
                                                    values,
                                                    actions
                                                ) => {
                                                    const postTaskPayload = {
                                                        ...values,
                                                        offer_type:
                                                            "promo_code",
                                                        order: query,
                                                    };
                                                    mutate(postTaskPayload, {
                                                        onSuccess: () => {
                                                            actions.resetForm();

                                                            toast.success(
                                                                "Promo code added"
                                                            );
                                                            queryClient.invalidateQueries(
                                                                [
                                                                    "all-services-checkout",
                                                                ]
                                                            );
                                                        },
                                                        onError: () => {
                                                            actions.setFieldError(
                                                                "code",
                                                                "Error in promo code"
                                                            );
                                                        },
                                                    });
                                                }}
                                            >
                                                {({ isSubmitting, errors }) => (
                                                    <Form className="d-flex justify-content-between align-items-center gap-4 w-100 mt-4">
                                                        <InputField
                                                            name="code"
                                                            placeHolder="Apply a Promo Code"
                                                            className="mb-0"
                                                            error={errors.code}
                                                        />

                                                        <Button
                                                            variant="default"
                                                            type="submit"
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                            className={
                                                                "close-btn"
                                                            }
                                                        >
                                                            {applyPromoLoader ? (
                                                                <Loader size="sm" />
                                                            ) : (
                                                                "Apply"
                                                            )}
                                                        </Button>
                                                    </Form>
                                                )}
                                            </Formik>
                                        )}
                                        {!item?.offer && !offer && (
                                            <p
                                                className="text-primary m-2"
                                                role={"button"}
                                                onClick={() => {
                                                    setOffer(true);
                                                }}
                                            >
                                                Add Offer
                                            </p>
                                        )}

                                        {offer && (
                                            <Formik
                                                initialValues={{
                                                    redeem_offer: "",
                                                }}
                                                onSubmit={async (
                                                    values,
                                                    actions
                                                ) => {
                                                    let offerPayload;

                                                    if (
                                                        data?.data.find(
                                                            (item) =>
                                                                item.offer
                                                                    .free !==
                                                                null
                                                        )
                                                    ) {
                                                        offerPayload = {
                                                            ...values,
                                                            bookings: [
                                                                item?.item
                                                                    ?.booking,
                                                            ],
                                                        };
                                                    } else {
                                                        offerPayload = {
                                                            ...values,
                                                        };
                                                    }
                                                    discountMutate(
                                                        offerPayload,
                                                        {
                                                            onSuccess: () => {
                                                                actions.resetForm();

                                                                toast.success(
                                                                    "Promo code added"
                                                                );
                                                                queryClient.invalidateQueries(
                                                                    [
                                                                        "all-services-checkout",
                                                                    ]
                                                                );
                                                            },
                                                            onError: () => {
                                                                actions.setFieldError(
                                                                    "code",
                                                                    "Error in promo code"
                                                                );
                                                            },
                                                        }
                                                    );
                                                }}
                                            >
                                                {({
                                                    isSubmitting,
                                                    setFieldValue,
                                                }) => (
                                                    <Form className="d-flex justify-content-between gap-4 w-100 mt-4 mb-4">
                                                        <Select
                                                            placeholder="pick an offer"
                                                            name="redeem_offer"
                                                            size="md"
                                                            itemComponent={
                                                                SelectItem
                                                            }
                                                            data={OfferSelect}
                                                            searchable
                                                            maxDropdownHeight={
                                                                400
                                                            }
                                                            onChange={(data) =>
                                                                setFieldValue(
                                                                    "redeem_offer",
                                                                    data
                                                                )
                                                            }
                                                            nothingFound="No offers availabe"
                                                            filter={(
                                                                value,
                                                                item
                                                            ) =>
                                                                item.label
                                                                    ? item.label
                                                                          .toLowerCase()
                                                                          .includes(
                                                                              value
                                                                                  .toLowerCase()
                                                                                  .trim()
                                                                          )
                                                                    : "" ||
                                                                      item.description
                                                                          .toLowerCase()
                                                                          .includes(
                                                                              value
                                                                                  .toLowerCase()
                                                                                  .trim()
                                                                          )
                                                            }
                                                        />

                                                        <Button
                                                            variant="default"
                                                            type="submit"
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                            className={
                                                                "close-btn"
                                                            }
                                                        >
                                                            {applyPromoLoader ? (
                                                                <Loader size="sm" />
                                                            ) : (
                                                                "Reedem"
                                                            )}
                                                        </Button>
                                                    </Form>
                                                )}
                                            </Formik>
                                        )}

                                        {item.offer_value !== 0 && (
                                            <>
                                                <div className="platform-fee fee d-flex justify-content-between">
                                                    <p>Promo Code Discount</p>
                                                    <p>
                                                        {
                                                            item?.item?.currency
                                                                ?.symbol
                                                        }
                                                        {item.offer_value}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        <div className="platform-fee fee d-flex justify-content-between mt-0">
                                            <p>Platform Fee</p>
                                            <p>
                                                {item?.item?.currency?.symbol}{" "}
                                                {item?.platform_charge}
                                            </p>
                                        </div>
                                        <div className="tax fee d-flex justify-content-between">
                                            <p>Tax (13% inclusive)</p>
                                            <p>
                                                {item?.item?.currency?.symbol}{" "}
                                                {item?.revision_charges}
                                            </p>
                                        </div>
                                        <div className="grand-total d-flex justify-content-between">
                                            <p>Grand Total</p>
                                            <p>
                                                {item?.item?.currency?.symbol}{" "}
                                                {grandTotal}
                                            </p>
                                        </div>
                                        <Button
                                            className="checkout-btn"
                                            disabled={paymentType === ""}
                                            onClick={async () => {
                                                await refetch();

                                                switch (paymentType) {
                                                    case "Khalti":
                                                        router.push(
                                                            paymentData
                                                                ? paymentData
                                                                      ?.data
                                                                      ?.data
                                                                      ?.payment_url
                                                                : ""
                                                        );
                                                        break;
                                                    case "Paypal":
                                                        router.push(
                                                            paymentData?.data
                                                                ?.data?.links[1]
                                                                ?.href
                                                        );
                                                        break;
                                                    default:
                                                        setOpened(true);
                                                }

                                                // if (paymentType === "Khalti") {
                                                //     router.push(
                                                //         paymentData?.data?.data
                                                //             ?.payment_url
                                                //     );
                                                // } else if (
                                                //     paymentType === "Paypal"
                                                // ) {
                                                //     router.push(
                                                //         paymentData?.data?.data
                                                //             ?.links[1]?.href
                                                //     );
                                                //     console.log(
                                                //         paymentData?.data?.data
                                                //     );
                                                // } else {
                                                //     setOpened(true);
                                                // }
                                            }}
                                        >
                                            Proceed to Confirm
                                        </Button>
                                    </Col>
                                );
                            }
                        )}
                </Row>
            </Container>
            <Modal
                opened={opened}
                withCloseButton={false}
                onClose={() => {
                    setOpened(false);
                    // setPaymentType("esewa");
                }}
            >
                {/* {paymentType == "Esewa" ? (
                    <Text>{paymentType} is comming soon!</Text>
                ) : (
                    ""
                )} */}
                {paymentType === "Stripe" && (
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
