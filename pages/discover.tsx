import AboutCard from "@components/common/AboutCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import MerchantAdviceCard from "@components/common/MerchantAdviceCard";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import { faAngleRight, faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";
import { useData } from "hooks/use-data";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { merchantAdvice } from "staticData/merchantAdvice";
import { oppurtunitiesCardContent } from "staticData/oppurtunities";
import type { ServicesValueProps } from "types/serviceCard";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";
const Discover: NextPage<{ taskerData: TaskerProps }> = ({ taskerData }) => {
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
                    {/* merchants section start */}
                    <section className="discover-page__merchants">
                        <h1>Top Merchants</h1>
                        {taskerData.result && taskerData.result.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="Taskers Unavailable"
                                variant="filled"
                                color="yellow"
                            >
                                No tasks available at the moment{""}
                            </Alert>
                        )}
                        <Row className="gx-5">
                            {taskerData?.result &&
                                taskerData?.result?.map((merchant, key) => {
                                    return (
                                        <Col sm={6} lg={4} xl={3} key={key}>
                                            <MerchantCard
                                                merchantImage={
                                                    merchant?.user
                                                        ?.profile_image
                                                }
                                                merchantName={
                                                    merchant?.user?.first_name
                                                }
                                                merchantCategory={
                                                    merchant?.designation
                                                }
                                                merchantLocation={
                                                    merchant?.address_line1 +
                                                    " " +
                                                    merchant?.address_line2
                                                }
                                                merchantDescription={
                                                    merchant?.bio
                                                }
                                                merchantRating={
                                                    merchant?.rating?.avg_rating
                                                }
                                                merchantPrice={
                                                    merchant?.hourly_rate
                                                }
                                                currency={
                                                    merchant?.charge_currency
                                                        ?.code
                                                }
                                                happyClients={
                                                    merchant?.stats
                                                        ?.happy_clients
                                                }
                                                successRate={
                                                    merchant?.stats
                                                        ?.success_rate
                                                }
                                                merchantId={merchant?.user?.id}
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

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: taskerData } = await axiosClient.get(
            "/tasker/top-tasker/"
        );
        return {
            props: { taskerData },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: { taskerData: [] },
            revalidate: 10,
        };
    }
};
