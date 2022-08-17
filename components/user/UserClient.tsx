import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import CategoryCard from "@components/common/CategoryCard";
import DiscountCard from "@components/common/discountCard";
import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import { WelcomeComponent } from "@components/common/WelcomeComponent";
import GettingStartedTask from "@components/Task/GettingStartedCard";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { serviceCategory } from "staticData/serviceCategory";
import { services } from "staticData/services";

import { Recommended } from "./Recommended";

export const UserClient = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    return (
        <>
            <section
                className="welcome-section-user-tasker"
                id="welcome-section-user-tasker"
            >
                <Container fluid="xl">
                    <WelcomeComponent />
                </Container>
            </section>

            <section className="user-tasker-body" id="user-tasker-body">
                <Container fluid="xl">
                    <Row>
                        <Col md={8} sm={12}>
                            <Tab
                                activeIndex={activeTabIdx}
                                onTabClick={setActiveTabIdx}
                                items={[
                                    {
                                        title: "Recent",
                                        content: <ApplyPostComponent />,
                                    },
                                    {
                                        title: "In Progress",
                                        content: <Recommended />,
                                    },
                                    {
                                        title: "History",
                                        content: <Recommended />,
                                    },
                                    {
                                        title: "Draft",
                                        content: <Recommended />,
                                    },
                                ]}
                            />
                        </Col>
                        <Col md={4} sm={12}>
                            <GettingStartedTask />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section
                className="special-offers-and-discount-section"
                id="special-offers-and-discount-section"
            >
                <Container>
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
                                                    discountOn={
                                                        service.discountOn
                                                    }
                                                />
                                            </a>
                                        </Link>
                                    </Col>
                                );
                            })}
                    </Row>
                </Container>
            </section>
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
            <section
                id="poular-on-cipher-section"
                className="popular-on-cipher-section"
            >
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
                                                    discountOn={
                                                        service.discountOn
                                                    }
                                                />
                                            </a>
                                        </Link>
                                    </Col>
                                );
                            })}
                    </Row>
                </Container>
            </section>
        </>
    );
};
