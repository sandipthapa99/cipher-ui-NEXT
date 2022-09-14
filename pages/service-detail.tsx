import { BreadCrumb } from "@components/common/BreadCrumb";
import EllipsisDropdown from "@components/common/EllipsisDropdown";
import sCard from "@components/common/packageCard";
import Reviews from "@components/common/Reviews";
import SaveIcon from "@components/common/SaveIcon";
import SelectInputField from "@components/common/SelectInputField";
import ServiceCard from "@components/common/ServiceCard";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ServiceProviderCard from "@components/common/serviceProviderCard";
import ShareIcon from "@components/common/ShareIcon";
import Tags from "@components/common/Tags";
import Layout from "@components/Layout";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { reviewsContent } from "staticData/reviews";
import { serviceProvider } from "staticData/serviceProvider";
import type { ServicesValueProps } from "types/serviceCard";
import HomeSearchSchema from "utils/formValidation/homeSearchValidation";
import { HomeSearchdata } from "utils/homeSearchData";
import { reviewType } from "utils/options";

const ServiceDetail: NextPage = () => {
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

    return (
        <Layout title="Service Details | Cipher">
            <BreadCrumb currentPage="Service Details" />
            <Container fluid="xl" className="px-0 px-sm-5">
                <section className="service-details">
                    {/* Explore top container start */}
                    <div className="service-details__top-container">
                        <h1>Garden Cleaning</h1>
                        <Row className="gx-5">
                            <Col md={8}>
                                <div className="d-flex justify-content-between align-items-center information">
                                    <span>By Harry Smith, Gardener</span>
                                    <div className="d-flex justify-content-between align-items-center reactions">
                                        <div className="d-flex align-items-center me-4">
                                            <SaveIcon
                                                object_id={""}
                                                model={""}
                                            />
                                            <span>Save</span>
                                        </div>
                                        <span className="d-flex align-items-center">
                                            <ShareIcon
                                                url={""}
                                                quote={""}
                                                hashtag={""}
                                            />
                                            Share
                                        </span>

                                        <EllipsisDropdown>
                                            <FontAwesomeIcon
                                                icon={faEllipsisVertical}
                                                className="svg-icon option me-0 "
                                            />
                                        </EllipsisDropdown>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="gx-5">
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
                                {serviceProvider &&
                                    serviceProvider.map((provider) => (
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
                    </div>
                    {/* Explore top container end */}
                    <div className="service-details__description">
                        <Row className="gx-5">
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
                    </div>
                    {/* Service details highlights div start*/}
                    <div className="service-details__highlights">
                        <h1>Highlights</h1>

                        {/* <Row className="content gx-5 flex-column">
                            {serviceHighlights &&
                                serviceHighlights.map((highlight, key) => (
                                    // <div >
                                    <Col key={key}>
                                        <ServiceHighlights
                                            highlight={highlight}
                                        />
                                    </Col>

                                    // </div>
                                ))}
                        </Row> */}
                    </div>
                    {/* Service details highlights div end*/}
                    {/* Service details package and offers start */}
                    <div className="service-details__offers">
                        <h1>Packages &amp; Offers</h1>
                        {/* <Row className="gx-5 d-flex align-items-stretch">
                            {PackageCard &&
                                PackageCard.map((offer) => (
                                    <Col
                                        className="align-items-stretch"
                                        lg={3}
                                        md={4}
                                        sm={6}
                                        key={offer.id}
                                    >
                                        <sCard
                                            title={offer.title}
                                            price={offer.price.toString()}
                                            offers={offer.offers}
                                            isRecommended={offer.isRecommended}
                                            isPermium={offer.isPermium}
                                            advantage={offer.advantage}
                                            isFromAddService={false}
                                        />
                                    </Col>
                                ))}
                        </Row> */}
                    </div>

                    {/* Service detail reviews div start */}
                    <div className="service-details__reviews">
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
                                <SelectInputField
                                    name="review"
                                    options={reviewType}
                                    placeHolder="Most Relevant"
                                />
                            </Formik>
                        </div>
                        <div className="review-container">
                            <Row className="gx-5">
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
                    </div>
                    {/* Service detail reviews setion end */}

                    {/* Services near you div start */}
                    <div
                        id="services-near-you"
                        className="service-details__services"
                    >
                        <div className="title-wrapper d-flex justify-content-between">
                            {/* <h2 className="heading-title">Community activity</h2> */}
                            <h1>Popular on Cipher</h1>
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
                        <Row className="gx-5">
                            {servicesData &&
                                servicesData?.data?.result?.map((service) => {
                                    return (
                                        <Col
                                            className="discover-col"
                                            sm={6}
                                            md={6}
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
                    {/* Services near you div end */}
                </section>
            </Container>
        </Layout>
    );
};

export default ServiceDetail;
