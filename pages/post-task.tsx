import CategoryCard from "@components/common/CategoryCard";
import DiscountCard from "@components/common/discountCard";
import ServiceCard from "@components/common/ServiceCard";
import WelcomeUser from "@components/common/WelcomeUser";
import Footer from "@components/Footer";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "@components/Header";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import {
    getSearchBody,
    getServiceCategory,
    getServices,
} from "services/commonServices";

import SearchHeader from "../components/SearchTask/searchHeader";

// this gets rid of the hydration error
// since the data required for this component comes from localstorage, there's no need for ssr
const ApplyPost = dynamic(() => import("../components/PostTask/ApplyPost"), {
    ssr: false,
});
const PostTask: NextPage = () => {
    const SearchBodyData = getSearchBody();
    const serviceCategory = getServiceCategory();
    const services = getServices();
    return (
        <section className="post-task">
            <SearchHeader />
            <Header />

            <section className="post-task__search-header">
                <WelcomeUser />
            </section>
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
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Popular on Cipher</h1>
                        <a href="/pages" className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </div>
                    <Row>
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
                </div>
            </Container>
            <section id="browse-category" className="browse-category">
                <Container fluid="xl" className="px-5">
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
            <Container fluid="xl" className="px-5">
                <div className="post-task__service-recommendation">
                    <div className="title-wrapper d-flex justify-content-between">
                        {/* <h2 className="heading-title">Community activity</h2> */}
                        <h1>Our Recommendation</h1>
                        <a href="/pages" className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </div>
                    <Row>
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
                </div>
            </Container>

            <Footer />
        </section>
    );
};

export default PostTask;
