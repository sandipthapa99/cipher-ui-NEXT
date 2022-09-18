import BookNowModalCard from "@components/common/BookNowModalCard";
import CardBtn from "@components/common/CardBtn";
import { FilterReview } from "@components/common/FilterReview";
import PackageOffersCard from "@components/common/packageCard";
import SaveIcon from "@components/common/SaveIcon";
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
    faWarning,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { Alert, Highlight, Spoiler } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import { useIsBookmarked } from "hooks/use-bookmarks";
import { useData } from "hooks/use-data";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { getReviews } from "services/commonServices";
import { useSetBookNowDetails } from "store/use-book-now";
import { useWithLogin } from "store/use-login-prompt-store";
import type { ServicesValueProps } from "types/serviceCard";
import type { ServiceNearYouCardProps } from "types/serviceNearYouCard";
import { getPageUrl } from "utils/helpers";
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";

const SearchResultsDetail = ({
    budget_from,
    budget_to,
    budget_type,
    serviceProvider,
    serviceProviderLocation,
    serviceDescription,
    serviceTitle,
    highlights,
    slug,
    serviceId,
    serviceCreated,
    serviceViews,
    ProfileImage,
    currency,
    service,
}: ServiceNearYouCardProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const setBookNowDetails = useSetBookNowDetails();
    const reviewsContent = getReviews();
    const queryClient = useQueryClient();

    const taskVideosAndImages = [
        ...(service?.images ?? []),
        ...(service?.videos ?? []),
    ];
    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;

    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

    const { data: myServicePackage } = useData<{
        result: Array<{
            id: number;
            service: {
                id: string;
                created_by: {
                    id: string;
                    email: string;
                    full_name: string;
                    profile_image: string;
                };
                category: {
                    id: number;
                    name: string;
                    slug: string;
                    icon: string;
                };
                city: any;
                images: Array<{
                    id: number;
                    media: string;
                    media_type: string;
                    size: number;
                    name: string;
                    placeholder: string;
                }>;
                created_at: string;
                updated_at: string;
                title: string;
                budget_type: string;
                budget_from: number;
                budget_to: number;
                status: string;
                description: string;
                highlights: string;
                views_count: number;
                location: string;
                happy_clients: any;
                success_rate: any;
                is_professional: boolean;
                is_online: boolean;
                video: string;
                no_of_revisions: number;
                discount_type: string;
                discount_value: any;
                is_active: boolean;
                slug: string;
            };
            title: string;
            description: string;
            budget: number;
            no_of_revision: number;
            service_offered: string;
            is_active: boolean;
            slug: string;
            budget_type: string;
            discount_type: string;
            discount_value: number;
            is_recommended: boolean;
        }>;
    }>(["my-service-packages"], "/task/service-package/");

    const { data: user } = useUser();
    const withLogin = useWithLogin();
    const router = useRouter();
    const servSlug = router.query.id;
    const getSingleService = servicesData?.data?.result.filter(
        (item) => String(item.id) === servSlug
    );

    const getPackageAccordingService = myServicePackage?.data?.result.filter(
        (servicePackage) =>
            String(getSingleService?.[0].id) === servicePackage?.service?.id
    );

    const isServiceBookmarked = useIsBookmarked("service", String(serviceId));

    console.log("is service bookmarked", isServiceBookmarked);

    // check if current logged in user is the owner of the current service
    const isCurrentUserService = () => {
        const service = servicesData?.data.result.find(
            (service) => service.id === serviceId
        );
        return service?.created_by.id === user?.id;
    };

    const handleViewApplicants = () => {
        // @TODO : REPLACE WITH SOMETHING MEANINGFUL
        toast.success(
            "You have 100 Morbillion applicants for this service.Congrats!!"
        );
    };

    return (
        <div className="task-detail mb-5 p-5">
            <Link href="/service">
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
                                model={"service"}
                                showText
                                filled={isServiceBookmarked}
                                onSuccess={() =>
                                    queryClient.invalidateQueries([
                                        "bookmarks",
                                        "service",
                                    ])
                                }
                            />
                        </div>
                        <div className="d-flex flex-col align-items-center mx-5">
                            <ShareIcon
                                url={getPageUrl()}
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
                    {(taskVideosAndImages ?? []).length === 1 &&
                        taskVideosAndImages.map((file) => (
                            <>
                                {isImage(file.media_type) ? (
                                    <figure className="thumbnail-img">
                                        <Image
                                            src={file.media}
                                            alt={file.name}
                                            layout="fill"
                                            placeholder="blur"
                                            blurDataURL="/service-details/Garden.svg"
                                        />
                                    </figure>
                                ) : isVideo(file.media_type) ? (
                                    <video
                                        className="thumbnail-img"
                                        width="100%"
                                        height="100%"
                                        controls
                                    >
                                        <source
                                            id={`task-video-${file.id}`}
                                            src={file.media}
                                        />
                                        Your browser does not support playing
                                        videos.
                                    </video>
                                ) : null}
                            </>
                        ))}
                    {(taskVideosAndImages ?? []).length > 1 ? (
                        <Carousel
                            withIndicators={hasMultipleVideosOrImages}
                            withControls={hasMultipleVideosOrImages}
                            draggable={hasMultipleVideosOrImages}
                            styles={{
                                control: {
                                    "&[data-inactive]": {
                                        opacity: 0,
                                        cursor: "default",
                                    },
                                },
                            }}
                        >
                            {taskVideosAndImages.map((file, key) => (
                                <Carousel.Slide key={key}>
                                    {isImage(file.media_type) ? (
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={file.media}
                                                alt={file.name}
                                                layout="fill"
                                            />
                                        </figure>
                                    ) : isVideo(file.media_type) ? (
                                        <video
                                            className="thumbnail-img"
                                            width="100%"
                                            height="100%"
                                            controls
                                        >
                                            <source
                                                id={`task-video-${file.id}`}
                                                src={file.media}
                                            />
                                            Your browser does not support
                                            playing videos.
                                        </video>
                                    ) : null}
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    ) : null}
                    {(taskVideosAndImages ?? []).length <= 0 && (
                        <figure className="thumbnail-img">
                            <Image
                                src={"/placeholder/taskPlaceholder.png"}
                                layout="fill"
                                objectFit="contain"
                                alt="servicecard-image"
                            />
                        </figure>
                    )}
                </Col>
                <Col md={12} lg={5} className="d-flex">
                    <div className="simple-card my-5 my-lg-0 ">
                        <div className="d-flex align-items-center simple-card__profile">
                            {ProfileImage && (
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            ProfileImage
                                                ? ProfileImage
                                                : "/placeholder/profilePlaceholder.png"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="serviceprovider-image"
                                    />
                                </figure>
                            )}
                            <div className="intro">
                                <p className="name">{serviceProvider}</p>
                                <p className="job">{serviceTitle}</p>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row p-4 simple-card__price">
                            <span>Starting Price</span>
                            <span className="price">
                                {currency}
                                {budget_from} {budget_to && "-" + budget_to}
                                {budget_type}
                            </span>
                        </div>
                        {isCurrentUserService() ? (
                            <CardBtn
                                btnTitle="View Applicants"
                                backgroundColor="#211D4F"
                                handleClick={handleViewApplicants}
                            />
                        ) : (
                            <CardBtn
                                btnTitle="Book Now"
                                backgroundColor="#211D4F"
                                handleClick={withLogin(() => setShow(true))}
                            />
                        )}
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
                    {serviceCreated
                        ? format(new Date(serviceCreated), "dd-MM-yyyy")
                        : "N/A"}
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faClockEight}
                        className="svg-icon svg-icon-clock"
                    />
                    {serviceCreated
                        ? format(new Date(serviceCreated), "p")
                        : "N/A"}
                </p>
                <p>
                    <FontAwesomeIcon
                        icon={faEye}
                        className="svg-icon svg-icon-eye"
                    />
                    {serviceViews} Views
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
                <Alert
                    icon={<FontAwesomeIcon icon={faWarning} />}
                    title="No data Available!"
                    color="orange"
                    radius="md"
                    sx={{ minWidth: 100 }}
                >
                    <Highlight highlight={"No Requirements"}>
                        {`There are No Requirements for this service`}
                    </Highlight>
                </Alert>
            )}
            {highlights && (
                <div className="mt-5">
                    <ServiceHighlights highlight={highlights} />
                </div>
            )}
            <section
                className="service-details__offers"
                style={{ margin: "41px 0 0 0" }}
            >
                <h1>Packages &amp; Offers</h1>
                {getPackageAccordingService &&
                    getPackageAccordingService?.length <= 0 && (
                        <Alert
                            icon={<FontAwesomeIcon icon={faWarning} />}
                            title="No data Available!"
                            color="orange"
                            radius="md"
                            sx={{ minWidth: 100 }}
                        >
                            <Highlight highlight={"No Packages"}>
                                {`There are No Packages Available for this service`}
                            </Highlight>
                        </Alert>
                    )}
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
                    {getPackageAccordingService &&
                        getPackageAccordingService
                            // .filter(
                            //     (service) =>
                            //         service.service.slug === servSlug
                            // )
                            .map(
                                (offer, key) =>
                                    offer && (
                                        <Carousel.Slide key={key}>
                                            <PackageOffersCard
                                                title={offer.title}
                                                price={offer.budget.toString()}
                                                offers={
                                                    offer.service_offered &&
                                                    JSON.parse(
                                                        offer?.service_offered
                                                    )
                                                }
                                                isRecommended={
                                                    offer.is_recommended
                                                }
                                                isPermium={offer.is_active}
                                                advantage={offer.title}
                                                isFromAddService={false}
                                                discountAmount={
                                                    offer.discount_value
                                                }
                                            />
                                        </Carousel.Slide>
                                    )
                            )}
                </Carousel>
            </section>
            <FilterReview totalReviews={reviewsContent.length} />
            <Spoiler
                maxHeight={450}
                hideLabel={"Hide all reviews"}
                showLabel={"See all reviews"}
                className={"mb-5"}
            >
                {/* {reviewsContent.map((reviewContent, index) => (
                    <Reviews key={index} {...reviewContent} />
                ))} */}
                <Alert
                    icon={<FontAwesomeIcon icon={faWarning} />}
                    title="Feature TO-BE Implemented"
                    color="teal"
                >
                    This feature is to be Implemented
                </Alert>
            </Spoiler>
            <span className="td-divider"></span>
            {/* <Row className="gx-5">
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
            </Row> */}
            <BookNowModalCard
                title={serviceTitle}
                budget_to={budget_to}
                budget_from={budget_from}
                budget_type={budget_type}
                service_id={String(serviceId)}
                description={serviceDescription}
                show={show}
                handleClose={handleClose}
                setShow={() => setShow(false)}
            />
        </div>
    );
};
export default SearchResultsDetail;
