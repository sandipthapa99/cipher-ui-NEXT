import CardBtn from "@components/common/CardBtn";
import CategoryCard from "@components/common/CategoryCard";
import { FilterReview } from "@components/common/FilterReview";
import ModalCard from "@components/common/ModalCard";
import PackageOffersCard from "@components/common/packageCard";
import Reviews from "@components/common/Reviews";
import ServiceCard from "@components/common/ServiceCard";
import ServiceHighlights from "@components/common/ServiceHighlights";
import {
    faCalendar,
    faChevronLeft,
    faClockEight,
    faEllipsisVertical,
    faEye,
    faHeart,
    faLocationDot,
    faShare,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBookContext } from "context/BookNowContext/bookNowContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import {
    getAllPackageCard,
    getReviews,
    getServiceHighlights,
    getServices,
} from "services/commonServices";
import type { ServiceNearYouCardProps } from "types/serviceNearYouCard";

const SearchResultsDetail = ({
    image,
    servicePrice,
    serviceProvider,
    serviceProviderLocation,
    serviceDescription,
    serviceRating,
    serviceTitle,
    haveDiscount,
    discountOn,
    discount,
}: ServiceNearYouCardProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const { setBookNowDetails } = useBookContext();
    const services = getServices();
    const PackageCard = getAllPackageCard();
    const reviewsContent = getReviews();
    const serviceHighlights = getServiceHighlights();

    return (
        <>
            <div className="task-detail mb-5 p-5">
                <Link href="/task">
                    <a>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="svg-icon"
                        />
                        Go Back
                    </a>
                </Link>

                <h3>{serviceTitle}</h3>
                <Row>
                    <div className="d-flex flex-sm-row flex-column justify-content-between mb-5">
                        <span className="pb-3 pb-sm-0 provider-name">
                            By {serviceProvider}
                        </span>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-col align-items-center">
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className="svg-icon heart-icon"
                                />
                                <span className="name">Save</span>
                            </div>
                            <div className="d-flex flex-col align-items-center mx-5">
                                <FontAwesomeIcon
                                    icon={faShare}
                                    className="svg-icon share-icon"
                                />
                                <span className="name">Share</span>
                            </div>
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                className="svg-icon option"
                            />
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col md={12} lg={7}>
                        <figure className="thumbnail-img">
                            <Image
                                src={image}
                                layout="fill"
                                objectFit="cover"
                                alt="garden-image"
                            />
                        </figure>
                    </Col>
                    <Col md={12} lg={5} className="d-flex">
                        <div className="simple-card my-5 my-lg-0 ">
                            <div className="d-flex align-items-center simple-card__profile">
                                <figure className="thumbnail-img">
                                    <Image
                                        src={image}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="serviceprovider-image"
                                    />
                                </figure>
                                <div className="intro">
                                    <p className="name">{serviceProvider}</p>
                                    <p className="job">{serviceTitle}</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row p-4 simple-card__price">
                                <span>Starting Price</span>
                                <span className="price">Rs {servicePrice}</span>
                            </div>
                            <CardBtn
                                btnTitle="Book Now"
                                backgroundColor="#211D4F"
                                handleClick={() => {
                                    setShow(true);
                                    setBookNowDetails({
                                        image,
                                        servicePrice,
                                        serviceProvider,
                                        serviceProviderLocation,
                                        serviceDescription,
                                        serviceRating,
                                        serviceTitle,
                                        haveDiscount,
                                        discountOn,
                                        discount,
                                    });
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="d-flex mt-4 task-detail__loc-time">
                    <p>
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon svg-icon-location"
                        />
                        {serviceProviderLocation}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="svg-icon svg-icon-calender"
                        />
                        June 9, 2022
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faClockEight}
                            className="svg-icon svg-icon-clock"
                        />
                        08:11 PM
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="svg-icon svg-icon-eye"
                        />
                        2500 Views
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon svg-icon-user-group"
                        />
                        100 Applied
                    </p>
                </div>

                <div className="task-detail__desc">
                    <h3>Description</h3>
                    <p>{serviceDescription}</p>
                </div>

                <h3>Requirements</h3>
                <div className="mt-5">
                    {serviceHighlights &&
                        serviceHighlights.map((name) => (
                            <div key={name.id}>
                                <ServiceHighlights title={name.title} />
                            </div>
                        ))}
                </div>
                <section
                    className="service-details__offers"
                    style={{ margin: "41px 0 0 0" }}
                >
                    <h1>Packages &amp; Offers</h1>
                    <Row className="gx-4 d-flex align-items-stretch">
                        <Carousel slide={false} style={{ padding: "2rem 0" }}>
                            {PackageCard &&
                                PackageCard.map((offer) => (
                                    <Carousel.Item key={offer.id}>
                                        <Col className="align-items-stretch">
                                            <PackageOffersCard
                                                title={offer.title}
                                                price={offer.price.toString()}
                                                offers={offer.offers}
                                                isRecommended={
                                                    offer.isRecommended
                                                }
                                                isPermium={offer.isPermium}
                                                advantage={offer.advantage}
                                                isFromAddService={false}
                                            />
                                        </Col>
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </Row>
                </section>
                <FilterReview totalReviews={reviewsContent.length} />
                <div>
                    {reviewsContent.map((reviewContent, index) => (
                        <Reviews key={index} {...reviewContent} />
                    ))}
                </div>
                <Link href="/all-reviews">
                    <a>See all reviews</a>
                </Link>
                <span className="td-divider"></span>
                <Row className="gx-5">
                    <Row>
                        <Col>
                            <h4 style={{ marginLeft: "1rem" }}>
                                Similar Services
                            </h4>
                        </Col>
                    </Row>
                    <Carousel style={{ padding: "2rem 0" }}>
                        {services &&
                            services.map((service) => {
                                return (
                                    <Carousel.Item key={service.id}>
                                        <Col>
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
                                                        hasOffer={
                                                            service.hasOffer
                                                        }
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
                                    </Carousel.Item>
                                );
                            })}
                    </Carousel>
                </Row>
            </div>
            <ModalCard
                description={serviceDescription}
                image={image}
                price={servicePrice}
                title={serviceTitle}
                key={serviceTitle}
                show={show}
                handleClose={handleClose}
            />
        </>
    );
};
export default SearchResultsDetail;
