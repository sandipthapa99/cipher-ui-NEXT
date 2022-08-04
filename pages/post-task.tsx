import CategoryCard from "@components/common/CategoryCard";
import DiscountCard from "@components/common/discountCard";
import ServiceCard from "@components/common/ServiceCard";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchBody } from "@components/SearchTask/searchBody";
import { withAuth } from "hoc/withAuth";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { SearchBodyData } from "staticData/searchBody";
import { serviceCategory } from "staticData/serviceCategory";
import { services } from "staticData/services";

import SearchHeader from "../components/SearchTask/searchHeader";

// this gets rid of the hydration error
// since the data required for this component comes from localstorage, there's no need for ssr
const ApplyPost = dynamic(() => import("../components/PostTask/ApplyPost"), {
    ssr: false,
});
const PostTask: NextPage = () => {
    return (
        <>
            <SearchHeader />
            <Header />
            <Container>
                <Row className="user-stats">
                    <Col md={7} className="user-details">
                        <div className="user-name">
                            <h1>Hi Harry!</h1>
                            <h1>Welcome Back!</h1>
                        </div>
                    </Col>
                    <Col md={5} className="user-stat-card">
                        {SearchBodyData.map((data) => {
                            return (
                                <SearchBody
                                    key={data.id}
                                    number={data.number}
                                    color={data.color}
                                    textOne={data.textOne}
                                    textColor={data.textColor}
                                />
                            );
                        })}
                    </Col>
                </Row>
            </Container>
            <Container>
                <ApplyPost />
                <h4>Special Offers & Discount</h4>
                <Row className="discount-card">
                    <Col>
                        <DiscountCard />
                    </Col>
                    <Col>
                        <DiscountCard />
                    </Col>
                    <Col>
                        <DiscountCard />
                    </Col>
                </Row>
                <Row className="gx-5">
                    <Row>
                        <Col>
                            <h4>Popular on Cipher</h4>
                        </Col>
                        <Col md={1}>
                            <Link href="/">view more</Link>
                        </Col>
                    </Row>

                    {services &&
                        services.map((service) => {
                            return (
                                <Col sm={6} md={4} lg={3} key={service.id}>
                                    <Link href="/service-detail">
                                        <a>
                                            <ServiceCard
                                                serviceImage={
                                                    service.serviceImage
                                                }
                                                serviceTitle={
                                                    service.serviceTitle
                                                }
                                                serviceProvider={
                                                    service.serviceProvider
                                                }
                                                serviceProviderLocation={
                                                    service.serviceProviderLocation
                                                }
                                                serviceDescription={
                                                    service.serviceDescription
                                                }
                                                serviceRating={
                                                    service.serviceRating
                                                }
                                                servicePrice={
                                                    service.servicePrice
                                                }
                                                hasOffer={service.hasOffer}
                                                discountRate={
                                                    service.discountRate
                                                }
                                                discountOn={service.discountOn}
                                            />
                                        </a>
                                    </Link>
                                </Col>
                            );
                        })}
                </Row>
            </Container>
            <section id="browse-category" className="browse-category">
                <Container fluid="xl">
                    <h1 className="section-main-title">
                        Our services by category
                    </h1>
                    <Row className="gx-5">
                        {serviceCategory &&
                            serviceCategory.map((category) => {
                                return (
                                    <Col xs={6} sm={4} lg={2} key={category.id}>
                                        <CategoryCard
                                            categoryTitle={
                                                category.categoryTitle
                                            }
                                            categoryIcon={category.categoryIcon}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                    <Row className="gx-5">
                        {serviceCategory &&
                            serviceCategory.map((category) => {
                                return (
                                    <Col xs={6} sm={4} lg={2} key={category.id}>
                                        <CategoryCard
                                            categoryTitle={
                                                category.categoryTitle
                                            }
                                            categoryIcon={category.categoryIcon}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                    {/* Service category listing end */}
                </Container>
            </section>
            <Container>
                <Row className="gx-5">
                    <Row>
                        <Col md={11}>
                            <h4>Popular on Cipher</h4>
                        </Col>
                        <Col md={1}>
                            <Link href="/">view more</Link>
                        </Col>
                    </Row>

                    {services &&
                        services.map((service) => {
                            return (
                                <Col sm={6} md={4} lg={3} key={service.id}>
                                    <Link href="/service-detail">
                                        <a>
                                            <ServiceCard
                                                serviceImage={
                                                    service.serviceImage
                                                }
                                                serviceTitle={
                                                    service.serviceTitle
                                                }
                                                serviceProvider={
                                                    service.serviceProvider
                                                }
                                                serviceProviderLocation={
                                                    service.serviceProviderLocation
                                                }
                                                serviceDescription={
                                                    service.serviceDescription
                                                }
                                                serviceRating={
                                                    service.serviceRating
                                                }
                                                servicePrice={
                                                    service.servicePrice
                                                }
                                                hasOffer={service.hasOffer}
                                                discountRate={
                                                    service.discountRate
                                                }
                                                discountOn={service.discountOn}
                                            />
                                        </a>
                                    </Link>
                                </Col>
                            );
                        })}
                </Row>
            </Container>

            <Footer />
        </>
    );
};

export default PostTask;
