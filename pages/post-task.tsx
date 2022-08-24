import DiscountCard from "@components/common/discountCard";
import ServiceCard from "@components/common/ServiceCard";
import WelcomeUser from "@components/common/WelcomeUser";
import Layout from "@components/Layout";
import { ServiceCategories } from "@components/services/ServiceCategories";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
// this gets rid of the hydration error
// since the data required for this component comes from localstorage, there's no need for ssr
const ApplyPost = dynamic(() => import("../components/PostTask/ApplyPost"), {
    ssr: false,
});
const PostTask: NextPage = () => {
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <Layout title="Post task | Cipher">
            <section className="post-task">
                <div className="post-task__search-header">
                    <Container fluid="xl">
                        <WelcomeUser />
                    </Container>
                </div>
                <Container fluid="xl" className="px-5">
                    <ApplyPost />

                    <div className="post-task__discount-card">
                        <h1>Special Offers & Discount</h1>
                        <Row>
                            <Col md={4}>
                                <DiscountCard />
                            </Col>
                            <Col md={4}>
                                <DiscountCard />
                            </Col>
                            <Col md={4}>
                                <DiscountCard />
                            </Col>
                        </Row>
                    </div>
                    <div className="post-task__popular-services">
                        <div className="title-wrapper d-flex justify-content-between">
                            <h1 className="heading-title">Popular on Cipher</h1>
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
                        <Row>
                            {servicesData &&
                                servicesData?.data?.result?.map(
                                    (service, key) => {
                                        return (
                                            <Col sm={6} md={4} lg={3} key={key}>
                                                <Link href="/service-detail">
                                                    <a>
                                                        <ServiceCard
                                                            serviceCard={
                                                                service
                                                            }
                                                        />
                                                    </a>
                                                </Link>
                                            </Col>
                                        );
                                    }
                                )}
                        </Row>
                    </div>
                </Container>
                <section id="browse-category" className="browse-category">
                    <Container fluid="xl" className="px-5">
                        <h1 className="section-main-title">
                            Our services by category
                        </h1>
                        <ServiceCategories />
                    </Container>
                </section>
                <Container fluid="xl" className="px-5">
                    <div className="post-task__service-recommendation">
                        <div className="title-wrapper d-flex justify-content-between">
                            <h1 className="heading-title">
                                Our Recommendation
                            </h1>
                            <a href="/pages" className="view-more">
                                view more{" "}
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="svg-icon"
                                />
                            </a>
                        </div>
                        <Row>
                            {servicesData &&
                                servicesData?.data?.result?.map((service) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={service.id}
                                        >
                                            <Link href="/service-detail">
                                                <ServiceCard
                                                    serviceCard={service}
                                                />
                                            </Link>
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default PostTask;
