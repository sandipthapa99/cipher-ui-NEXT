import BookNowModalCard from "@components/common/BookNowModalCard";
import CardBtn from "@components/common/CardBtn";
import { ElipsisReport } from "@components/common/ElipsisReport";
import OfferCard from "@components/common/OfferCard";
import Reviews from "@components/common/Reviews";
import SaveIcon from "@components/common/SaveIcon";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ShareIcon from "@components/common/ShareIcon";
import { Tab } from "@components/common/Tab";
import { KYCIncompleteToast } from "@components/toasts/KYCIncompleteToast";
import { ProfileNotCompleteToast } from "@components/UpperHeader";
import { Carousel } from "@mantine/carousel";
import { Grid, List, Select, Skeleton, Tooltip } from "@mantine/core";
import { Alert } from "@mantine/core";
import {
    ChevronLeftOutlined,
    ErrorOutlineOutlined,
    LocalOffer,
    LocationOnOutlined,
    ScheduleOutlined,
    SupervisorAccountOutlined,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useGetMyBookings } from "hooks/task/use-get-service-booking";
import { useIsBookmarked } from "hooks/use-bookmarks";
import { useData } from "hooks/use-data";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useWithLogin } from "store/use-login-prompt-store";
import type { RatingResponse } from "types/ratingProps";
import type { ServiceNearYouCardProps } from "types/serviceNearYouCard";
import { getPageUrl } from "utils/helpers";
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";
import { toast } from "utils/toast";

import { ApplicantCard } from "./ApplicantCard";

const SearchResultsDetail = ({
    budget_from,
    budget_to,
    budget_type,
    serviceProvider,
    serviceProviderLocation,
    serviceDescription,
    serviceTitle,
    highlights,
    serviceId,
    serviceProviderId,
    serviceCreated,
    currency,
    service,
    offers,
    ratedTo,
}: ServiceNearYouCardProps) => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("-rating");

    const handleClose = () => setShow(false);
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    const queryClient = useQueryClient();
    const { data: profile } = useGetProfile();

    const taskVideosAndImages = [
        ...(service?.images ?? []),
        ...(service?.videos ?? []),
    ];

    const isService = !!serviceId && !!ratedTo;

    const { data: serviceRating, isLoading: ratingLoading } =
        useData<RatingResponse>(
            ["tasker-rating", serviceId, search],
            `${urls.profile.rating}?ordering=${search}&?rated_to=${ratedTo}&service=${serviceId}`,
            isService
        );

    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;

    const parsedDescription = parse(serviceDescription ?? "");

    const haveDesc = serviceDescription ? serviceDescription?.length : 0;

    const shortParseDescription = parse(
        serviceDescription?.substring(0, 400) ?? ""
    );
    const [seeMore, setSeeMore] = useState(false);

    const { data: user } = useUser();

    const withLogin = useWithLogin();

    const { data: myBookings } = useGetMyBookings(
        serviceId,
        service?.count ?? 0
    );

    const isServiceBookmarked = useIsBookmarked(
        "entityservice",
        String(serviceId)
    );
    const tabRef = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        tabRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const isUserService = user ? serviceProviderId === user?.id : false;

    const renderBookedClients = myBookings?.result?.map((item, index) => {
        return (
            <Col md={6} key={index}>
                <ApplicantCard card={item} />
            </Col>
        );
    });

    // check if current logged in user is the owner of the current service
    const isCurrentUserService = () => {
        if (service?.created_by?.id === user?.id) {
            return true;
        } else {
            return false;
        }
    };

    const handleClickBookNow = () => {
        if (!profile) {
            toast.showComponent(
                "Profile Incomplete",
                <ProfileNotCompleteToast text="Please complete your profile before booking a service." />
            );
            return;
        }
        if (!user?.is_kyc_verified) {
            toast.showComponent("KYC Incomplete", <KYCIncompleteToast />);
            return;
        }
        setShow(true);
        withLogin(() => setShow(true));
    };

    return (
        <div className="aside-detail-wrapper">
            <div className="task-detail p-5">
                <Link href="/service">
                    <a>
                        <ChevronLeftOutlined className="svg-icon" />
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
                                    model={"entityservice"}
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
                            <ShareIcon
                                showText
                                url={getPageUrl()}
                                quote={"Service from Homaale Project"}
                                hashtag={"Homaale-services"}
                            />

                            <ElipsisReport
                                service={true}
                                serviceTitle={serviceTitle}
                                serviceDescription={serviceDescription}
                                serviceId={serviceId}
                                owner={isUserService}
                                isService={true}
                            />
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col md={12} lg={7}>
                        {(taskVideosAndImages ?? []).length === 1 &&
                            taskVideosAndImages.map((file, index) => (
                                <Fragment key={index}>
                                    {isImage(file.media_type) ? (
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={file.media}
                                                alt={file.name}
                                                layout="fill"
                                                placeholder="blur"
                                                blurDataURL="/placeholder/loadingLightPlaceHolder.jpg"
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
                                </Fragment>
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
                            <Link href={`/tasker/${serviceProviderId}`}>
                                <a>
                                    <div className="d-flex align-items-center simple-card__profile">
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={
                                                    service?.created_by
                                                        ?.profile_image
                                                        ? service?.created_by
                                                              ?.profile_image
                                                        : service?.created_by
                                                              ?.avatar?.image
                                                        ? service?.created_by
                                                              ?.avatar?.image
                                                        : "/placeholder/profilePlaceholder.png"
                                                }
                                                layout="fill"
                                                objectFit="cover"
                                                placeholder="blur"
                                                blurDataURL="/placeholder/profilePlaceholder.png"
                                                alt="serviceprovider-image"
                                            />
                                        </figure>

                                        <div className="intro">
                                            <p className="name">
                                                {serviceProvider}
                                            </p>
                                            <p className="job">
                                                {`${service?.created_by?.bio?.slice(
                                                    0,
                                                    20
                                                )}...`}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </Link>

                            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row p-4 simple-card__price">
                                <span> Price</span>
                                <span className="price">
                                    {currency}{" "}
                                    {budget_from && budget_from > 0
                                        ? budget_from + "-"
                                        : ""}{" "}
                                    {budget_to} {budget_type}
                                </span>
                            </div>
                            {isCurrentUserService() ? (
                                <CardBtn
                                    btnTitle="View Applicants"
                                    backgroundColor="#211D4F"
                                    handleClick={() => handleScroll()}
                                />
                            ) : (
                                <CardBtn
                                    btnTitle="Book Now"
                                    backgroundColor="#211D4F"
                                    handleClick={withLogin(() =>
                                        handleClickBookNow()
                                    )}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
                <div className="d-flex flex-column flex-sm-row mt-4 task-detail__loc-time">
                    <Tooltip.Floating label="Service Location" color={"blue"}>
                        <p>
                            <LocationOnOutlined className="svg-icon svg-icon-location" />
                            {serviceProviderLocation
                                ? serviceProviderLocation
                                : "N/A"}
                        </p>
                    </Tooltip.Floating>
                    <Tooltip.Floating label="Date Posted" color={"blue"}>
                        <p>
                            <ScheduleOutlined className="svg-icon svg-icon-calender" />
                            {serviceCreated
                                ? //format(new Date(serviceCreated), "dd-MM-yyyy")
                                  format(new Date(serviceCreated), "PP")
                                : "N/A"}
                        </p>
                    </Tooltip.Floating>
                    <Tooltip.Floating label="Time Posted" color={"blue"}>
                        <p>
                            <ScheduleOutlined className="svg-icon svg-icon-clock" />
                            {serviceCreated
                                ? format(new Date(serviceCreated), "p")
                                : "N/A"}
                        </p>
                    </Tooltip.Floating>
                    <Tooltip.Floating label="No. of Application" color={"blue"}>
                        <p>
                            <SupervisorAccountOutlined className="svg-icon svg-icon-user-group" />
                            {service?.count} Applied
                        </p>
                    </Tooltip.Floating>
                </div>

                <div className="task-detail__desc">
                    <h3>Description</h3>
                    {seeMore ? shortParseDescription : parsedDescription}{" "}
                    {haveDesc > 0 ? (
                        <span
                            onClick={() => setSeeMore((prev) => !prev)}
                            style={{
                                cursor: "pointer",
                                color: "#00b4d8",
                                fontSize: "12px",
                            }}
                        >
                            {haveDesc > 200
                                ? serviceDescription && seeMore
                                    ? "... show More "
                                    : "... show less"
                                : null}
                        </span>
                    ) : null}
                </div>

                <h3>Highlights</h3>
                {highlights && highlights.length < 1 ? (
                    <Alert
                        icon={<ErrorOutlineOutlined />}
                        title="No data Available"
                        color="orange"
                        radius="md"
                        sx={{ minWidth: 100 }}
                    >
                        There are no highlights for this service.
                    </Alert>
                ) : (
                    <div className="mt-5">
                        <ServiceHighlights highlights={highlights} />
                    </div>
                )}

                {offers && offers.length > 0 ? (
                    <section className="service-details__offers">
                        {offers.find(
                            (offer) => offer.offer_type === "basic"
                        ) && <h1>Available Offers</h1>}

                        <List className="mb-5">
                            {offers
                                .filter((offer) => offer.offer_type === "basic")
                                .map((offer, key) => (
                                    <List.Item key={key}>
                                        <span
                                            className={
                                                "d-flex align-items-center gap-3"
                                            }
                                        >
                                            <LocalOffer className="text-warning" />
                                            {offer?.title}
                                        </span>
                                    </List.Item>
                                ))}
                        </List>
                        {offers.find(
                            (offer) => offer.offer_type === "promo_code"
                        ) && <h1>Offers(Promo Code)</h1>}
                        <Row>
                            {offers
                                .filter(
                                    (offer) => offer.offer_type === "promo_code"
                                )
                                .map((offer) => {
                                    return (
                                        <Col md={6} key={offer.id}>
                                            <OfferCard offer={offer} />{" "}
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                ) : null}

                {service?.count ? (
                    <section>
                        {isCurrentUserService() && (
                            <div ref={tabRef}>
                                <Tab
                                    activeIndex={activeTabIdx}
                                    onTabClick={setActiveTabIdx}
                                    items={[
                                        {
                                            title: `Applicants (${service?.count})`,
                                            content: (
                                                <Row className="py-3">
                                                    <>
                                                        {renderBookedClients}
                                                        {myBookings ===
                                                            undefined && (
                                                            <Alert
                                                                icon={
                                                                    <ErrorOutlineOutlined />
                                                                }
                                                                title={
                                                                    "No Applicants Available!"
                                                                }
                                                                color={"red"}
                                                            >
                                                                {" "}
                                                            </Alert>
                                                        )}
                                                    </>
                                                </Row>
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                        )}
                    </section>
                ) : null}

                <hr />
                {/* <FilterReview
                    totalReviews={
                        serviceRating ? serviceRating?.data?.result?.length : 0
                    }
                /> */}
                <Row className="align-items-center td-filter-review-container">
                    <Col md={4}>
                        <div className="d-flex">
                            <h2 className="d-flex align-items-center mb-0">
                                Reviews
                                <span>
                                    (
                                    {serviceRating
                                        ? serviceRating?.data?.result?.length
                                        : 0}
                                    )
                                </span>
                            </h2>
                        </div>
                    </Col>
                    <Col md={{ span: 7, offset: 1 }}>
                        <Select
                            defaultValue={"-rating"}
                            size={"sm"}
                            className={"ms-auto w-50 text-secondary"}
                            data={[
                                { value: "-rating", label: "Most Relevant" },
                                { value: "-created_at", label: "Latest" },
                                { value: "rating", label: "Top" },
                            ]}
                            onChange={(value: any) => {
                                setSearch(value);
                            }}
                        />
                    </Col>
                </Row>
                <hr />
                {ratingLoading ? (
                    <Grid className="mt-3">
                        <Grid.Col span={2}>
                            <Skeleton height={80} circle mb="xl" />
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Skeleton height={20} width={"100%"} radius="sm" />
                            <Skeleton height={15} mt={6} radius="sm" />
                            <Skeleton
                                className="mt-3"
                                height={8}
                                mt={6}
                                width="40%"
                                radius="xl"
                            />
                            <Skeleton
                                className="mt-4"
                                height={8}
                                mt={6}
                                width="20%"
                                radius="xl"
                            />
                        </Grid.Col>
                    </Grid>
                ) : serviceRating && serviceRating?.data?.result?.length > 0 ? (
                    serviceRating?.data?.result?.map((review) => (
                        <Reviews
                            key={review.id}
                            repliedBy={`${review?.rated_to?.first_name} ${review?.rated_to?.last_name}`}
                            repliedText={review.reply}
                            replied={review.reply === null ? false : true}
                            id={review?.id}
                            name={`${review?.rated_by?.first_name} ${review?.rated_by?.last_name}`}
                            raterEmail={review?.rated_by.email}
                            ratings={review?.rating}
                            description={review?.review}
                            time={review?.created_at}
                            raterId={review?.rated_by.id}
                            ratedByImage={review?.rated_by?.profile_image}
                            ratedToImage={review.rated_to.profile_image}
                            ratedToId={review.rated_to.id}
                            repliedDate={review.replied_date}
                        />
                    ))
                ) : (
                    <Alert
                        icon={<ErrorOutlineOutlined />}
                        title="No data Available"
                        color="orange"
                        radius="md"
                        sx={{ minWidth: 100 }}
                    >
                        There are no reviews to show.
                    </Alert>
                )}

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
                    entity_service_id={serviceId}
                    tasker_id={
                        service?.created_by?.id ? service?.created_by?.id : ""
                    }
                    tasker_img={
                        service?.created_by?.profile_image &&
                        service?.created_by?.profile_image
                    }
                    tasker_name={
                        (service?.created_by &&
                            service?.created_by?.first_name +
                                " " +
                                service?.created_by?.middle_name) ??
                        "" + " " + service?.created_by?.last_name
                    }
                    offer={service?.offers}
                    title={serviceTitle}
                    budget_to={budget_to}
                    budget_from={budget_from}
                    budget_type={budget_type}
                    service_id={String(serviceId)}
                    description={serviceDescription}
                    show={show}
                    handleClose={handleClose}
                    currencySymbol={currency}
                    setShow={() => setShow(false)}
                />
            </div>
        </div>
    );
};
export default SearchResultsDetail;
