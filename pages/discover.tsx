import AboutCard from "@components/common/AboutCard";
import AllCategoryCard from "@components/common/AllCategoryCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import MerchantAdviceCard from "@components/common/MerchantAdviceCard";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { AllCategoryCardContent } from "staticData/categoryCardContent";
import { merchantAdvice } from "staticData/merchantAdvice";
import { merchants } from "staticData/merchants";
import { oppurtunitiesCardContent } from "staticData/oppurtunities";
import type { ServicesValueProps } from "types/serviceCard";
const Discover: NextPage = () => {
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <Layout title="Discover | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="discover-page">
                    <BreadCrumb currentPage="Discover" />

                    {/* Discover top container start */}
                    <section className="discover-page__top-container">
                        <GradientBanner
                            title="Looking to earn money quickly?"
                            subTitle="It doesn't even take a minute to sign up"
                            image="/gradient-updated.png"
                        />
                    </section>
                    {/* Discover top container end */}
                    {/* Services near you section start */}
                    <section
                        id="services-near-you"
                        className="discover-page__services-section"
                    >
                        {" "}
                        <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between">
                            <h1>Popular On Cipher</h1>

                            <Link href="/service">
                                <a className="view-more">
                                    view more{" "}
                                    <FontAwesomeIcon
                                        icon={faAngleRight}
                                        className="svg-icon"
                                    />
                                </a>
                            </Link>
                        </div>
                        <Row className="gx-5 d-flex align-items-stretch">
                            {servicesData &&
                                servicesData?.data?.result?.map(
                                    (service, key) => {
                                        return (
                                            <Col
                                                className="discover-col d-fle align-items-stretch"
                                                sm={6}
                                                md={6}
                                                lg={3}
                                                key={key}
                                            >
                                                <ServiceCard
                                                    serviceCard={service}
                                                />
                                            </Col>
                                        );
                                    }
                                )}
                        </Row>
                    </section>
                    {/* Services near you section end */}

                    {/* Our categories section started */}
                    <section className="discover-page__categories">
                        <h1>Our categories</h1>
                        <p>Choose category according to your needs.</p>
                        <Row className="gy-4 gx-5 align-tems-stretch">
                            {AllCategoryCardContent &&
                                AllCategoryCardContent.map((category) => {
                                    return (
                                        <Col
                                            className="gx-4 align-items-stretch"
                                            sm={4}
                                            xs={12}
                                            md={3}
                                            // lg={4}
                                            key={category.id}
                                        >
                                            <AllCategoryCard
                                                categoryImage={category.image}
                                                categoryTitle={category.name}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                    {/* Our categories section ended */}
                    {/* merchants section start */}
                    <section className="discover-page__merchants">
                        <h1>Top Merchants</h1>
                        <Row className="gx-5">
                            {merchants &&
                                merchants.map((merchant) => {
                                    return (
                                        <Col
                                            sm={6}
                                            lg={4}
                                            xl={3}
                                            key={merchant.id}
                                        >
                                            <MerchantCard
                                                merchantImage={
                                                    merchant.merchantImage
                                                }
                                                merchantName={
                                                    merchant.merchantName
                                                }
                                                merchantCategory={
                                                    merchant.merchantCategory
                                                }
                                                merchantLocation={
                                                    merchant.merchantLocation
                                                }
                                                merchantDescription={
                                                    merchant.merchantDescription
                                                }
                                                merchantRating={
                                                    merchant.merchantRating
                                                }
                                                merchantPrice={
                                                    merchant.merchantPrice
                                                }
                                                happyClients={
                                                    merchant.happyClients
                                                }
                                                successRate={
                                                    merchant.successRate
                                                }
                                                merchantId={merchant.id}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                    {/* merchants section ended */}

                    {/* grap oppurtunities section start */}
                    <section className="discover-page__oppurtunities">
                        <h1>Grab Oppurtunities</h1>
                        <p>Choose the most suitable tasks and get paid</p>
                        <Row className="gx-5">
                            {oppurtunitiesCardContent &&
                                oppurtunitiesCardContent.map(
                                    (oppurtunities) => {
                                        return (
                                            <Col
                                                // sm={6}
                                                md={4}
                                                // lg={4}
                                                key={oppurtunities.id}
                                            >
                                                <AboutCard
                                                    cardImage={
                                                        oppurtunities.cardImage
                                                    }
                                                    cardTitle={
                                                        oppurtunities.cardTitle
                                                    }
                                                    cardDescription={
                                                        oppurtunities.cardDescription
                                                    }
                                                />
                                            </Col>
                                        );
                                    }
                                )}
                        </Row>
                    </section>
                    {/* grab oppurtunities section end */}

                    <section className="discover-page__merchant-advice">
                        {merchantAdvice &&
                            merchantAdvice.map((advice) => {
                                return (
                                    <MerchantAdviceCard
                                        image={advice.image}
                                        title={advice.title}
                                        subtitle={advice.subtitle}
                                        key={advice.id}
                                        description={advice.description}
                                    />
                                );
                            })}
                    </section>
                </section>
            </Container>
        </Layout>
    );
};

export default Discover;
