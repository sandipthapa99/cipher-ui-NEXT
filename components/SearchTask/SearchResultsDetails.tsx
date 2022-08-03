import AppliedForm from "@components/AppliedTask/AppliedForm";
import TaskCard from "@components/AppliedTask/taskAppliedCard";
import { Collaboration } from "@components/Collaboration/Collaboration";
import BookNowButton from "@components/common/BookNowButton";
import CardBtn from "@components/common/CardBtn";
import CategoryCard from "@components/common/CategoryCard";
import { FilterReview } from "@components/common/FilterReview";
import PackageOffersCard from "@components/common/packageCard";
import Reviews from "@components/common/Reviews";
import ServiceCard from "@components/common/ServiceCard";
import ServiceHighlights from "@components/common/ServiceHighlights";
import SimpleProfileCard from "@components/common/SimpleProfileCard";
import { Tab } from "@components/common/Tab";
import MembershipCard from "@components/MembershipCard";
import { UserTaskReviews } from "@components/Task/UserTaskDetail/atoms/UserTaskReviews";
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
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { PackageCard } from "staticData/packageCard";
import { reviewsContent } from "staticData/reviews";
import { serviceHighlights } from "staticData/serviceHighlights";
import { services } from "staticData/services";
import type { ServiceNearYouCardProps } from "types/serviceNearYouCard";

const SearchResultsDetail = ({
    image,
    servicePrice,
    serviceProvider,
    serviceProviderLocation,
    serviceRating,
    serviceTitle,
    haveDiscount,
    discountOn,
    discount,
}: ServiceNearYouCardProps) => {
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
                    <p>
                        Hiring a reputable professional landscape gardener
                        entail paying for their knowledge, experience, time,
                        equipment, and materials. They will be able to discuss
                        your vision and tailor your garden design to your exact
                        needs, taking into account your taste, lifestyle,
                        budget.
                    </p>
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
                        {/* <Carousel
                            height={425}
                            slideSize="40%"
                            slideGap="md"
                            align="start"
                            slidesToScroll={2}
                            nextControlIcon={
                                <FontAwesomeIcon
                                    width={"20px"}
                                    height={"20px"}
                                    icon={faArrowRight}
                                    style={{ fontSize: "16px" }}
                                />
                            }
                            previousControlIcon={
                                <FontAwesomeIcon
                                    width={"20px"}
                                    height={"20px"}
                                    icon={faArrowLeft}
                                    style={{ fontSize: "16px" }}
                                />
                            }
                            style={{ padding: "2rem 0" }}
                        >
                            {PackageCard &&
                                PackageCard.map((offer) => (
                                    <Carousel.Slide key={offer.id}>
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
                                            />
                                        </Col>
                                    </Carousel.Slide>
                                ))}
                        </Carousel> */}
                    </Row>
                </section>
                <FilterReview totalReviews={reviewsContent.length} />
                <div>
                    {reviewsContent.map((reviewContent, index) => (
                        <Reviews key={index} {...reviewContent} />
                    ))}
                </div>
                {/* <Link href="/all-reviews">
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
                    <Carousel
                        height={550}
                        slideSize="34%"
                        slideGap="md"
                        align="start"
                        loop
                        slidesToScroll={1}
                        nextControlIcon={
                            <FontAwesomeIcon
                                width={"20px"}
                                height={"20px"}
                                icon={faArrowRight}
                                style={{ fontSize: "10px" }}
                            />
                        }
                        previousControlIcon={
                            <FontAwesomeIcon
                                width={"20px"}
                                height={"20px"}
                                icon={faArrowLeft}
                                style={{ fontSize: "16px" }}
                            />
                        }
                        style={{ padding: "2rem 0" }}
                    >
                        {services &&
                            services.map((service) => {
                                return (
                                    <Carousel.Slide key={service.id}>
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
                                    </Carousel.Slide>
                                );
                            })}
                    </Carousel>
                </Row> */}
            </div>
        </>
    );
};
export default SearchResultsDetail;
