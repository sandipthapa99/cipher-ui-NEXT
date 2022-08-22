import { BreadCrumb } from "@components/common/BreadCrumb";
import DiscountCard from "@components/common/discountCard";
import RecommendationChips from "@components/common/RecommendationChips";
import ServiceCard from "@components/common/ServiceCard";
import Layout from "@components/Layout";
import { ServiceCategories } from "@components/services/ServiceCategories";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";

const ExploreServices: NextPage = () => {
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <Layout title="Explore Services | Cipher">
            <Container fluid="xl" className="px-0 px-sm-5">
                <section className="explore-services">
                    <BreadCrumb currentPage="Explore Services" />

                    {/* Explore top container start */}
                    <div className="explore-services__top-container">
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
                    </div>
                    {/* Explore top container end */}
                    {/* Explore special offer section start */}
                    <div className="explore-services__offers">
                        <h1>Special Offers</h1>

                        <Row className="gx-5">
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
                    {/* explore special offer section end */}

                    {/* Services near you section start */}
                    <h2>Trending Services</h2>
                    <div
                        id="services-near-you"
                        className="explore-services__services"
                    >
                        <Row className="gx-5">
                            {servicesData &&
                                servicesData?.data?.result?.map(
                                    (service, key) => {
                                        return (
                                            <Col
                                                className="discover-col"
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
                        <h2 className="mt-4">Services Near You</h2>
                        <Row className="gx-5 more-services">
                            {servicesData &&
                                servicesData?.data?.result?.map((service) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={service.id}
                                        >
                                            <ServiceCard
                                                serviceCard={service}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
                    {/* Services near you section end */}

                    {/* Advertisements section start */}
                    <h2>Advertisement of Merchants</h2>
                    <div
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
                    </div>
                    {/* Advertisement section end */}

                    {/* Services near you section start */}
                    <h2>All Services</h2>
                    <div
                        id="services-near-you"
                        className="explore-services__services"
                    >
                        <Row className="gx-5">
                            {servicesData &&
                                servicesData?.data?.result?.map(
                                    (service, key) => {
                                        return (
                                            <Col
                                                className="discover-col"
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
                        <Row className="gx-5 more-services">
                            {servicesData &&
                                servicesData?.data?.result?.map((service) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={service.id}
                                        >
                                            <ServiceCard
                                                serviceCard={service}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
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
                    <ServiceCategories />
                    {/* Service category listing end */}
                </Container>
            </section>
            {/* Browse service by category section end */}
        </Layout>
    );
};

export default ExploreServices;
