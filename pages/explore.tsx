import Breadcrum from "@components/common/Breadcrum";
import CategoryCard from "@components/common/CategoryCard";
import DiscountCard from "@components/common/discountCard";
import RecommendationChips from "@components/common/RecommendationChips";
import ServiceCard from "@components/common/ServiceCard";
import Layout from "@components/Layout";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { serviceCategory } from "staticData/serviceCategory";
import { servicesDiscover } from "staticData/services";
import { services } from "staticData/services";
import { withAuth } from "utils/Auth/withAuth";
const ExploreServices: NextPage = () => {
    return (
        <Layout title="Explore Services | Cipher">
            <Container fluid="xl">
                <section className="explore-services">
                    <Breadcrum currentPage="Explore Services" />

                    {/* Explore top container start */}
                    <section className="explore-services__top-container">
                        <div className="gradient"></div>
                        <figure className="thumbnail-img">
                            <Image
                                src="/exploreservices/home.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="oppurtunities-page-main-image"
                            />
                        </figure>
                        <div className="overlay pb-3">
                            <h1>
                                Discover &amp; Hire Our <br /> Quality Service{" "}
                                <br /> Providers
                            </h1>
                            <div className="bottom-content">
                                <p>Find the best services</p>
                                <div className="search">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Find your Services"
                                    />

                                    <button className="search-btn">
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="icon"
                                        />
                                    </button>
                                </div>
                                <div className="recommendation">
                                    <RecommendationChips title="Garden Cleaner" />
                                    <RecommendationChips title="Plumber" />
                                    <RecommendationChips title="Electrician" />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Explore top container end */}
                    {/* Explore special offer section start */}
                    <section className="explore-services__offers">
                        <h1>Special Offers &amp; Discount</h1>

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
                    </section>
                    {/* explore special offer section end */}

                    {/* Services near you section start */}
                    <section
                        id="services-near-you"
                        className="explore-services__services"
                    >
                        <Row className="gx-5">
                            {servicesDiscover &&
                                servicesDiscover.map((service) => {
                                    return (
                                        <Col
                                            className="discover-col"
                                            sm={6}
                                            md={6}
                                            lg={3}
                                            key={service.id}
                                        >
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
                                        </Col>
                                    );
                                })}
                        </Row>
                        <Row className="gx-5 more-services">
                            {services &&
                                services.map((service) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={service.id}
                                        >
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
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                    {/* Services near you section end */}

                    {/* Advertisements section start */}
                    <section
                        className="explore-services__advertisement"
                        id="advertisement"
                    >
                        <figure className="thumbnail-img">
                            <Image
                                src="/exploreservices/gardening.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="earth-image"
                            />
                        </figure>
                    </section>
                    {/* Advertisement section end */}

                    {/* Services near you section start */}
                    <section
                        id="services-near-you"
                        className="explore-services__services"
                    >
                        <Row className="gx-5">
                            {servicesDiscover &&
                                servicesDiscover.map((service) => {
                                    return (
                                        <Col
                                            className="discover-col"
                                            sm={6}
                                            md={6}
                                            lg={3}
                                            key={service.id}
                                        >
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
                                        </Col>
                                    );
                                })}
                        </Row>
                        <Row className="gx-5 more-services">
                            {services &&
                                services.map((service) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={service.id}
                                        >
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
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                    {/* Services near you section end */}
                </section>
            </Container>
            {/* Browse service by category section start */}
            <section
                //id="browse-category"
                className="explore-services__browse-category"
            >
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
            {/* Browse service by category section end */}
        </Layout>
    );
};

export default withAuth(ExploreServices);
