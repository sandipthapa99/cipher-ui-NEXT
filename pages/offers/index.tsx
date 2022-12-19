import { BreadCrumb } from "@components/common/BreadCrumb";
import { Tab } from "@components/common/Tab";
import Layout from "@components/Layout";
import { AllOffers } from "@components/Offers/AllOffers";
import { CouponsList } from "@components/Offers/CouponsList";
import { OffersList } from "@components/Offers/OffersList";
import urls from "constants/urls";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { AllOffersProps } from "types/allOffersProps";
import { axiosClient } from "utils/axiosClient";

const Offers: NextPage<{ allOffers: AllOffersProps }> = ({ allOffers }) => {
    const [activeTabIdx, setActiveTabIdx] = useState<number | undefined>(0);

    return (
        <Layout
            title="Homaale | Offers"
            description="Browse and enjoy offers of Homaale"
            keywords="homaale-offfers"
        >
            <section className="offers">
                <Container fluid="xl" className="px-4">
                    <BreadCrumb currentPage={"Offers"} />
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
                    <div className="offer-wrapper d-flex gap-5">
                        <figure className="offer-img">
                            <Image
                                src={"/offers/offer1.png"}
                                height={400}
                                width={648}
                                alt={"voucher"}
                                objectFit="contain"
                            />
                        </figure>
                        <figure className="offer-img">
                            <Image
                                src={"/offers/offer2.png"}
                                height={400}
                                width={648}
                                alt={"voucher"}
                            />
                        </figure>
                    </div>
                    <div className="recommend">
                        <h2 className="mt-5 mb-4">Recommend</h2>
                        <Row className="recommend__container">
                            <Col md={3} sm={12} xs={12} lg={3}>
                                <figure className="offer-img">
                                    <Image
                                        src={"/offers/offervoucher.png"}
                                        height={400}
                                        width={648}
                                        alt={"voucher"}
                                    />
                                </figure>
                            </Col>
                            <Col md={3} sm={12} xs={12} lg={3}>
                                <figure className="offer-img">
                                    <Image
                                        src={"/offers/scratch.png"}
                                        height={400}
                                        width={648}
                                        alt={"voucher"}
                                    />
                                </figure>
                            </Col>
                            <Col md={3} sm={12} xs={12} lg={3}>
                                <figure className="offer-img">
                                    <Image
                                        src={"/offers/gift.png"}
                                        height={400}
                                        width={648}
                                        alt={"voucher"}
                                    />
                                </figure>
                            </Col>
                            <Col md={3} sm={12} xs={12} lg={3}>
                                <figure className="offer-img">
                                    <Image
                                        src={"/offers/gift2.png"}
                                        height={400}
                                        width={648}
                                        alt={"voucher"}
                                    />
                                </figure>
                            </Col>
                        </Row>
                    </div>

                    <div className="tab-wrapper">
                        <Tab
                            items={[
                                {
                                    title: "All",
                                    content: (
                                        <AllOffers
                                            allOffers={allOffers?.result}
                                        />
                                    ),
                                },
                                {
                                    title: "Coupon Code",
                                    content: (
                                        <CouponsList
                                            allOffers={allOffers?.result}
                                        />
                                    ),
                                },
                                {
                                    title: "Scratch Cards",
                                    content: (
                                        <OffersList
                                            allOffers={allOffers?.result}
                                        />
                                    ),
                                },
                                // {
                                //     title: "Gift Cards",
                                //     content: <AllOffers />,
                                // },
                                // {
                                //     title: "Offers",
                                //     content: <AllOffers />,
                                // },
                                // {
                                //     title: "Daily Rewards",
                                //     content: <AllOffers />,
                                // },
                            ]}
                            activeIndex={activeTabIdx}
                            onTabClick={setActiveTabIdx}
                        />
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default Offers;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: allOffers } = await axiosClient.get(urls.offer.all);

        return {
            props: { allOffers },
            revalidate: 10,
        };
    } catch (error) {
        return {
            props: [],
            revalidate: 10,
        };
    }
};
