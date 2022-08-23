import BookNowModalCard from "@components/common/BookNowModalCard";
import CardBtn from "@components/common/CardBtn";
import { FilterReview } from "@components/common/FilterReview";
import PackageOffersCard from "@components/common/packageCard";
import Reviews from "@components/common/Reviews";
import SaveIcon from "@components/common/SaveIcon";
import ServiceCard from "@components/common/ServiceCard";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ShareIcon from "@components/common/ShareIcon";
import {
    faCalendar,
    faChevronLeft,
    faClockEight,
    faEllipsisVertical,
    faEye,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { useData } from "hooks/use-data";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getAllPackageCard, getReviews } from "services/commonServices";
import { useSetBookNowDetails } from "store/use-book-now";
import type { ServicesValueProps } from "types/serviceCard";
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
    highlights,
    slug,
    serviceId,
}: ServiceNearYouCardProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const setBookNowDetails = useSetBookNowDetails();
    const PackageCard = getAllPackageCard();
    const reviewsContent = getReviews();
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

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
                                <SaveIcon
                                    object_id={String(serviceId)}
                                    model={"task"}
                                />
                                <span className="name">Save</span>
                            </div>
                            <div className="d-flex flex-col align-items-center mx-5">
                                <ShareIcon
                                    url={`http://localhost:3005/search/${slug}`}
                                    quote={"Service from Cipher Project"}
                                    hashtag={"cipher-services"}
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
                        {image && Array.isArray(image) && (
                            <Carousel
                                styles={{
                                    control: {
                                        "&[data-inactive]": {
                                            opacity: 0,
                                            cursor: "default",
                                        },
                                    },
                                }}
                                className="rounded"
                            >
                                {image.map((value) => (
                                    <Carousel.Slide
                                        key={value.id}
                                        className="thumbnail-img "
                                    >
                                        <Image
                                            src={
                                                value.image
                                                    ? value.image
                                                    : "/service-details/garden-cleaning.png"
                                            }
                                            layout="fill"
                                            objectFit="cover"
                                            alt="garden-image"
                                        />
                                    </Carousel.Slide>
                                ))}
                            </Carousel>
                        )}
                    </Col>
                    <Col md={12} lg={5} className="d-flex">
                        <div className="simple-card my-5 my-lg-0 ">
                            <div className="d-flex align-items-center simple-card__profile">
                                {/* TO BE IMPLEMENTED */}
                                {/* {image && (
                                    <figure className="thumbnail-img">
                                        <Image
                                            src={
                                                image
                                                    ? image
                                                    : "/service-details/garden-cleaning.png"
                                            }
                                            layout="fill"
                                            objectFit="cover"
                                            alt="serviceprovider-image"
                                        />
                                    </figure>
                                )} */}
                                To do API
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
                <div className="d-flex flex-column flex-sm-row mt-4 task-detail__loc-time">
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
                    {serviceDescription && (
                        <div>{parse(serviceDescription ?? "")}</div>
                    )}
                </div>

                <h3>Requirements</h3>
                {highlights && (
                    <div className="mt-5">
                        {highlights?.map((name, index) => (
                            <div key={index}>
                                <ServiceHighlights title={name} />
                            </div>
                        ))}
                    </div>
                )}
                <section
                    className="service-details__offers"
                    style={{ margin: "41px 0 0 0" }}
                >
                    <h1>Packages &amp; Offers</h1>
                    <Carousel
                        slideSize="32%"
                        slideGap="sm"
                        align="start"
                        breakpoints={[
                            { maxWidth: "md", slideSize: "50%" },
                            {
                                maxWidth: "sm",
                                slideSize: "90%",
                                slideGap: 10,
                            },
                        ]}
                        styles={{
                            control: {
                                "&[data-inactive]": {
                                    opacity: 0,
                                    cursor: "default",
                                },
                            },
                        }}
                        className="pt-4"
                    >
                        {PackageCard &&
                            PackageCard.map((offer) => (
                                <Carousel.Slide key={offer.id}>
                                    <PackageOffersCard
                                        title={offer.title}
                                        price={offer.price.toString()}
                                        offers={offer.offers}
                                        isRecommended={offer.isRecommended}
                                        isPermium={offer.isPermium}
                                        advantage={offer.advantage}
                                        isFromAddService={false}
                                    />
                                </Carousel.Slide>
                            ))}
                    </Carousel>
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
                    <h4>Similar Services</h4>
                    <Carousel
                        slideSize="40%"
                        slideGap="sm"
                        align="start"
                        breakpoints={[
                            { maxWidth: "md", slideSize: "50%" },
                            {
                                maxWidth: "sm",
                                slideSize: "70%",
                                slideGap: 10,
                            },
                        ]}
                        styles={{
                            control: {
                                "&[data-inactive]": {
                                    opacity: 0,
                                    cursor: "default",
                                },
                            },
                        }}
                    >
                        {servicesData &&
                            servicesData?.data?.result?.map((service) => {
                                return (
                                    <Carousel.Slide key={service.id}>
                                        <ServiceCard serviceCard={service} />
                                    </Carousel.Slide>
                                );
                            })}
                    </Carousel>
                </Row>
            </div>
            <BookNowModalCard
                description={serviceDescription ?? ""}
                price={servicePrice ?? 0}
                title={serviceTitle ?? ""}
                key={serviceTitle}
                show={show}
                handleClose={handleClose}
            />
        </>
    );
};
export default SearchResultsDetail;
