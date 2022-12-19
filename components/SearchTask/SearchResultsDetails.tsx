import BookNowModalCard from "@components/common/BookNowModalCard";
import CardBtn from "@components/common/CardBtn";
import { ElipsisReport } from "@components/common/ElipsisReport";
import { FilterReview } from "@components/common/FilterReview";
import OfferCard from "@components/common/OfferCard";
import PackageOffersCard from "@components/common/packageCard";
import Reviews from "@components/common/Reviews";
import SaveIcon from "@components/common/SaveIcon";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ShareIcon from "@components/common/ShareIcon";
import { Tab } from "@components/common/Tab";
import { EditService } from "@components/services/EditService";
import { KYCIncompleteToast } from "@components/toasts/KYCIncompleteToast";
import { ProfileNotCompleteToast } from "@components/UpperHeader";
import {
    faCalendar,
    faChevronLeft,
    faClockEight,
    faEye,
    faLocationDot,
    faWarning,
} from "@fortawesome/pro-regular-svg-icons";
import { faTag } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { List, Text } from "@mantine/core";
import { Alert } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useGetMyBookings } from "hooks/task/use-get-service-booking";
import { useIsBookmarked } from "hooks/use-bookmarks";
import { useData } from "hooks/use-data";
import { useDeleteData } from "hooks/use-delete";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useWithLogin } from "store/use-login-prompt-store";
import type { RatingResponse } from "types/ratingProps";
import type { ServicesValueProps } from "types/serviceCard";
import type { ServiceNearYouCardProps } from "types/serviceNearYouCard";
import { getPageUrl } from "utils/helpers";
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";
import { toast } from "utils/toast";

import { MyBookingsCard } from "./MyBookings";

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
    serviceViews,
    currency,
    service,
    offers,
    ratedTo,
}: ServiceNearYouCardProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    // const setBookNowDetails = useSetBookNowDetails();
    const queryClient = useQueryClient();
    const { data: profile } = useGetProfile();

    const taskVideosAndImages = [
        ...(service?.images ?? []),
        ...(service?.videos ?? []),
    ];

    const isService = !!serviceId && !!ratedTo;
    const { data: serviceRating } = useData<RatingResponse>(
        ["tasker-rating", serviceId],
        `${urls.profile.rating}?rated_to=${ratedTo}&service=${serviceId}`,
        isService
    );

    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;

    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        urls.task.service
    );

    const parsedDescription = parse(serviceDescription ?? "");

    const haveDesc = serviceDescription ? serviceDescription?.length : 0;

    const shortParseDescription = parse(
        serviceDescription?.substring(0, 400) ?? ""
    );
    const [seeMore, setSeeMore] = useState(false);
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
    const { data: taskerCount } = useData<{
        count: Array<{
            applicants_count: number;
        }>;
    }>(
        ["tasker-count", serviceId],
        `/task/entity/service/tasker-count/${serviceId}/`
    );

    //

    const { mutate } = useDeleteData(`/task/entity/service/${serviceId}/`);
    const withLogin = useWithLogin();
    const router = useRouter();
    const { data: myBookings } = useGetMyBookings(serviceId);
    const servSlug = router.query.slug;
    const getSingleService = servicesData?.data?.result.filter(
        (item) => item.slug === servSlug
    );

    const getPackageAccordingService = myServicePackage?.data?.result.filter(
        (servicePackage) =>
            String(getSingleService?.[0].id) === servicePackage?.service?.id
    );

    const [editModal, setEditModal] = useState(false);

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
                <MyBookingsCard
                    bookingId={item?.id}
                    collabButton={false}
                    image={
                        item?.created_by?.profile_image
                            ? item?.created_by?.profile_image
                            : item?.created_by?.avatar?.image
                    }
                    name={`${item?.created_by?.user?.first_name} ${item?.created_by?.user?.last_name}`}
                    // speciality={item?.created_by?.user_type}
                    rating={item?.created_by?.rating?.user_rating_count}
                    happyClients={item?.created_by?.stats?.happy_clients}
                    awardPercentage={10}
                    location={item?.created_by?.address_line1}
                    distance={""}
                    bio={item?.created_by?.bio}
                    charge={item?.entity_service?.discount_value}
                    tasker={item?.created_by?.user.id}
                    isApproved={item?.is_accepted}
                    designation={item?.created_by.designation}
                />
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

    const handleEdit = () => {
        setEditModal(true);
    };

    const confirmDelete = () => {
        mutate(serviceId, {
            onSuccess: async () => {
                toast.success("service deleted successfully");
                router.push({ pathname: "/service" });
            },
            onError: (error) => {
                toast.error(error?.message);
            },
        });
    };

    // const confirmInactive = () => {
    //     editServiceMutation({ id: serviceId, data: { is_active: false } }),
    //         {
    //             onSuccess: async () => {
    //                 toast.success("Successfully inactivated service");
    //                 router.push({ pathname: "/service" });
    //             },
    //             onError: (error: any) => {
    //                 toast.error(error.message);
    //             },
    //         };
    // };

    const handleDelete = () =>
        openConfirmModal({
            title: "Delete this service",
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this service?
                </Text>
            ),
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: () => confirmDelete(),
        });

    // const handleInactive = () => {
    //     openConfirmModal({
    //         title: "Inactive this service",
    //         centered: true,
    //         children: (
    //             <Text size="sm">
    //                 Are you sure you want to inactive this service?
    //             </Text>
    //         ),
    //         labels: { confirm: "Inactive", cancel: "Cancel" },
    //         confirmProps: { color: "red" },
    //         onConfirm: () => confirmInactive(),
    //     });
    // };
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

                            {/* <EllipsisDropdownService
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            >
                                <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    className="svg-icon option"
                                />
                            </EllipsisDropdownService> */}

                            <ElipsisReport
                                service={true}
                                serviceTitle={serviceTitle}
                                serviceDescription={serviceDescription}
                                serviceId={serviceId}
                                owner={isUserService}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
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
                                    handleClick={() => handleClickBookNow()}
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
                        {serviceProviderLocation
                            ? serviceProviderLocation
                            : "N/A"}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="svg-icon svg-icon-calender"
                        />
                        {serviceCreated
                            ? //format(new Date(serviceCreated), "dd-MM-yyyy")
                              format(new Date(serviceCreated), "PP")
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
                    {/* <p>
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon svg-icon-user-group"
                        />
                         Applied
                    </p> */}
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
                {!highlights && (
                    <Alert
                        icon={<FontAwesomeIcon icon={faWarning} />}
                        title="No data Available"
                        color="orange"
                        radius="md"
                        sx={{ minWidth: 100 }}
                    >
                        {/* <Highlight highlight={"No Requirements"}> */}
                        There are no highlights for this service
                        {/* </Highlight> */}
                    </Alert>
                )}
                {highlights && (
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
                                            <FontAwesomeIcon
                                                icon={faTag}
                                                className="text-warning"
                                            />
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

                {getPackageAccordingService &&
                    getPackageAccordingService
                        // .filter(
                        //     (service) =>
                        //         service.service.slug === servSlug
                        // )
                        .map(
                            (offer, key) =>
                                offer && (
                                    <section
                                        className="service-details__package-offers"
                                        style={{ margin: "41px 0 0 0" }}
                                    >
                                        <h1>Packages &amp; Offers</h1>
                                        <Carousel
                                            slideSize="32%"
                                            slideGap="sm"
                                            align="start"
                                            breakpoints={[
                                                {
                                                    maxWidth: "md",
                                                    slideSize: "50%",
                                                },
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
                                        </Carousel>
                                    </section>
                                )
                        )}
                <section>
                    {isCurrentUserService() && (
                        <div ref={tabRef}>
                            <Tab
                                activeIndex={activeTabIdx}
                                onTabClick={setActiveTabIdx}
                                items={[
                                    {
                                        title: `Applicants (${taskerCount?.data?.count[0].applicants_count})`,

                                        content: (
                                            <Row className="py-3">
                                                <>
                                                    {renderBookedClients}
                                                    {myBookings ===
                                                        undefined && (
                                                        <Alert
                                                            icon={
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faWarning
                                                                    }
                                                                />
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
                <hr />
                <FilterReview
                    totalReviews={
                        serviceRating ? serviceRating?.data?.result?.length : 0
                    }
                />
                <hr />
                {serviceRating && serviceRating?.data?.result?.length > 0 ? (
                    serviceRating?.data?.result?.map((review) => (
                        <Col md={8} key={review.id}>
                            <Reviews
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
                                repliedDate={review.updated_at}
                            />
                        </Col>
                    ))
                ) : (
                    <Alert title="NO DATA AVAILABLE" color="orange">
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
                        service?.created_by &&
                        service?.created_by?.first_name +
                            " " +
                            service?.created_by?.middle_name +
                            " " +
                            service?.created_by?.last_name
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

                {service && (
                    <EditService
                        showEditModal={editModal}
                        handleClose={() => setEditModal(false)}
                        serviceDetail={service}
                    />
                )}
            </div>
        </div>
    );
};
export default SearchResultsDetail;
