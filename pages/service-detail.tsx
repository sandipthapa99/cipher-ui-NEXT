import Breadcrum from "@components/common/Breadcrum";
import PackageOffersCard from "@components/common/packageCard";
import Reviews from "@components/common/Reviews";
import SelectInputField from "@components/common/SelectInputField";
import ServiceCard from "@components/common/ServiceCard";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ServiceProviderCard from "@components/common/serviceProviderCard";
import Tags from "@components/common/Tags";
import Layout from "@components/Layout";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import {
    faEllipsisVertical,
    faHeart,
    faShare,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { withAuth } from "hoc/withAuth";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { PackageCard } from "staticData/packageCard";
import { reviewsContent } from "staticData/reviews";
import { serviceHighlights } from "staticData/serviceHighlights";
import { serviceProviders } from "staticData/serviceProvider";
import { servicesDiscover } from "staticData/services";
import HomeSearchSchema from "utils/formValidation/homeSearchValidation";
import { HomeSearchdata } from "utils/homeSearchData";
import { reviewType } from "utils/options";

const ServiceDetail: NextPage = () => {
    return (
        <Layout title="Service Details | Cipher">
            <Container fluid="xl">
                <section className="service-details">
                    <Breadcrum
                        currentPage="Service Details"
                        subPage="Detail"
                        hasSubPage={true}
                    />
                    {/* Explore top container start */}
                    <section className="service-details__top-container">
                        <h1>Garden Cleaning</h1>
                        <Row>
                            <Col md={8}>
                                <div className="information">
                                    <p className="provider-name">
                                        By Harry Smith, Gardener
                                    </p>
                                    <div className="reactions">
                                        <div className="d-flex flex-col save">
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                className="svg-icon heart"
                                            />
                                            <p className="name">Save</p>
                                        </div>
                                        <div className="d-flex flex-col share">
                                            <FontAwesomeIcon
                                                icon={faShare}
                                                className="svg-icon share-icon"
                                            />
                                            <p className="name">Share</p>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faEllipsisVertical}
                                            className="svg-icon option"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/service-details/Garden.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="garden-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={4} className="gardener-col">
                                {serviceProviders &&
                                    serviceProviders.map((provider) => (
                                        <ServiceProviderCard
                                            image={provider.image}
                                            key={provider.id}
                                            name={provider.name}
                                            views={provider.views}
                                            address={provider.address}
                                            happyClients={provider.happyClients}
                                            successRate={provider.successRate}
                                            speciality={provider.speciality}
                                            startingPrice={
                                                provider.startingPrice
                                            }
                                        />
                                    ))}
                            </Col>
                        </Row>
                    </section>
                    {/* Explore top container end */}
                    <section className="service-details__description">
                        <Row>
                            <Col md={8}>
                                <h1>Description</h1>
                                <p>
                                    Hiring a reputable professional landscape
                                    gardener entail paying for their knowledge,
                                    experience, time, equipment, and materials.
                                    They will be able to discuss your vision and
                                    tailor your garden design to your exact
                                    needs, taking into account your taste,
                                    lifestyle, budget.
                                </p>
                            </Col>
                            <Col md={4}>
                                <h1>Tags</h1>
                                <div className="tags-wrapper">
                                    <Tags title="Gardener" />
                                    <Tags title="Garden Cleaner" />
                                    <Tags title="Garden Service" />
                                    <Tags title="Garden" />
                                    <Tags title="Garden Service" />
                                </div>
                            </Col>
                        </Row>
                    </section>
                    {/* Service details highlights section start*/}
                    <section className="service-details__highlights">
                        <h1>Highlights</h1>

                        <Row className="content flex-column">
                            {serviceHighlights &&
                                serviceHighlights.map((name) => (
                                    // <div >
                                    <Col key={name.id}>
                                        <ServiceHighlights title={name.title} />
                                    </Col>

                                    // </div>
                                ))}
                        </Row>
                    </section>
                    {/* Service details highlights section end*/}
                    {/* Service details package and offers start */}
                    <section className="service-details__offers">
                        <h1>Packages &amp; Offers</h1>
                        <Row className="gx-4 d-flex align-items-stretch">
                            {PackageCard &&
                                PackageCard.map((offer) => (
                                    <Col
                                        className="align-items-stretch"
                                        lg={3}
                                        md={4}
                                        sm={6}
                                        key={offer.id}
                                    >
                                        <PackageOffersCard
                                            title={offer.title}
                                            price={offer.price.toString()}
                                            offers={offer.offers}
                                            isRecommended={offer.isRecommended}
                                            isPermium={offer.isPermium}
                                            advantage={offer.advantage}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </section>

                    {/* Service detail reviews section start */}
                    <section className="service-details__reviews">
                        <div className="head-container">
                            <h3>
                                My Reviews <span>(3,0003)</span>{" "}
                            </h3>
                            <Formik
                                initialValues={HomeSearchdata}
                                validationSchema={HomeSearchSchema}
                                onSubmit={async (values) => {
                                    console.log(values);
                                }}
                            >
                                <div className="dropdown-wrapper">
                                    <div className="dropdown">
                                        <SelectInputField
                                            name="review"
                                            options={reviewType}
                                            placeholder="Most Relevant"
                                            fieldRequired
                                        />
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            className="svg-icon"
                                        />
                                    </div>
                                </div>
                            </Formik>
                        </div>
                        <div className="review-container">
                            <Row>
                                {reviewsContent &&
                                    reviewsContent.map((review) => (
                                        <Col md={8} key={review.id}>
                                            <Reviews
                                                name={review.name}
                                                ratings={review.ratings}
                                                description={review.description}
                                                time={review.time}
                                                image={review.image}
                                            />
                                        </Col>
                                    ))}
                            </Row>
                            <Link href="#!">See all reviews</Link>
                        </div>
                    </section>
                    {/* Service detail reviews setion end */}

                    {/* Services near you section start */}
                    <section
                        id="services-near-you"
                        className="service-details__services"
                    >
                        <div className="title-wrapper d-flex justify-content-between">
                            {/* <h2 className="heading-title">Community activity</h2> */}
                            <h1>Popular on Cipher</h1>
                            <a href="#!" className="view-more">
                                view more{" "}
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="svg-icon"
                                />
                            </a>
                        </div>
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
                    </section>
                    {/* Services near you section end */}
                </section>
            </Container>
        </Layout>
    );
};

export default withAuth(ServiceDetail);
