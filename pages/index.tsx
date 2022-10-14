import Advertisement from "@components/Advertisement/Advertisement";
import MarketPlaceCard from "@components/Cards/MarketPlaceCard";
import CommunityBlogCard from "@components/common/BlogCard";
import CardBtn from "@components/common/CardBtn";
import CategoryCardNew from "@components/common/CategoryCardNew";
import CipherCard from "@components/common/CipherCard";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import MerchantCard from "@components/common/MerchantCard";
import { PersonalSuccessCard } from "@components/common/PersonalSuccessCard";
import { Search } from "@components/common/Search";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import { ExploreWithSlider } from "@components/ExploreWithSlider";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import { LoginPrompt } from "@components/model/LoginPrompt";
import { ProfileNotCompleteToast } from "@components/UpperHeader";
import {
    faAngleRight,
    faArrowLeft,
    faArrowRight,
    faWarning,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { Alert, Button, Dialog, Group, Highlight, Text } from "@mantine/core";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { toast } from "react-toastify";
import { quality } from "staticData/cipherNotableQuality";
import { findHire } from "staticData/findHire";
import {
    useOpenLoginPrompt,
    useShowLoginPrompt,
    useWithLogin,
} from "store/use-login-prompt-store";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import type { BlogValueProps } from "types/blogs";
import type { BrandValueProps } from "types/brandValueProps";
import type { CategoryDataProps } from "types/categoryData";
import type { HeroCategoryProps } from "types/heroCategory";
import type { ServicesValueProps } from "types/serviceCard";
import type { SuccessStoryProps } from "types/successStory";
import type { ITaskApiResponse } from "types/task";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

const Home: NextPage<{
    successStoryData: SuccessStoryProps;
    trustedPartnerData: BrandValueProps;
    heroCategoryData: HeroCategoryProps;
    topCategoryData: CategoryDataProps;
    topTaskerData: TaskerProps;
    blogData: BlogValueProps;
    recommendedTasksData: ITaskApiResponse;
    servicesData: ServicesValueProps;
}> = ({
    successStoryData,
    trustedPartnerData,
    heroCategoryData,
    topCategoryData,
    topTaskerData,
    blogData,
    recommendedTasksData,
    servicesData,
}) => {
    const [isClient, setIsClient] = useState(false);

    const loginPopup = useWithLogin();

    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const { data: profile } = useGetProfile();
    const { data: userData } = useUser();
    const showLoginPrompt = useOpenLoginPrompt();

    const handleShowPostTaskModal = () => {
        if (!userData) {
            showLoginPrompt();
            return;
        }
        if (!profile) {
            toast.error(
                <ProfileNotCompleteToast text="Please create your profile to go on further." />,
                {
                    icon: false,
                    autoClose: false,
                }
            );
            return;
        }
        toggleShowPostTaskModal();
    };

    useEffect(() => setIsClient(true), []);
    if (!isClient) return null;
    return (
        <Layout title="Homaale - Catering to Your Requirements">
            <section className="landing-main-banner">
                <Container fluid="xl" className="px-5">
                    <Row className="gx-5 hero-content">
                        <Col md="6" className="left">
                            <div className="content">
                                {/* Hero Text Start Here */}
                                <h1>Catering To Your Requirements</h1>
                                {/* Hero Text End Here */}
                            </div>
                            <Search />
                            {/* {chips.length > 0 && (
                                <div className="chips-section d-md-flex d-none">
                                    {chips.map((chip, key) => (
                                        <RecommendationChips
                                            title={chip}
                                            onChipRemove={removeChip}
                                            key={key}
                                        />
                                    ))}
                                </div>
                            )} */}

                            <div className="come-with-us">
                                <h1>Join Homaale To</h1>
                                <div className="d-flex buttons">
                                    <Link href="/earn-money">
                                        <a className="hero-cta">
                                            Earn Money as a Professional
                                        </a>
                                    </Link>

                                    <a
                                        className="hero-cta"
                                        onClick={handleShowPostTaskModal}
                                    >
                                        Post a Task
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col md="6" className="right">
                            <figure className="new-img">
                                <Image
                                    src="/heroImages/hero2.png"
                                    alt="hero-img"
                                    height={700}
                                    width={700}
                                    // objectFit="contain"
                                />
                            </figure>
                        </Col>
                    </Row>
                    {/* Service category listing start */}
                    <Row className="gx-5 hero-category">
                        {heroCategoryData &&
                        heroCategoryData?.result?.length > 0 ? (
                            <Carousel
                                // height={150}
                                slideSize="25%"
                                slideGap="md"
                                breakpoints={[
                                    { maxWidth: "md", slideSize: "50%" },
                                    {
                                        maxWidth: "sm",
                                        slideSize: "100%",
                                        slideGap: 3,
                                    },
                                ]}
                                loop
                                align="start"
                                nextControlIcon={
                                    <FontAwesomeIcon icon={faArrowRight} />
                                }
                                previousControlIcon={
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                }
                            >
                                {heroCategoryData &&
                                    heroCategoryData?.result
                                        .slice(0, 8)
                                        .map((category) => {
                                            return (
                                                <Carousel.Slide
                                                    key={category.id}
                                                >
                                                    <CategoryCardNew
                                                        categoryTitle={
                                                            category?.category
                                                                ?.name
                                                        }
                                                        categoryIcon={
                                                            category.category
                                                                ?.icon
                                                        }
                                                        categorySlug={
                                                            category?.category
                                                                ?.slug
                                                        }
                                                    />
                                                </Carousel.Slide>
                                            );
                                        })}
                            </Carousel>
                        ) : (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                There are No Data available
                            </Alert>
                        )}
                    </Row>
                    {/* Service category listing end */}
                </Container>
            </section>

            {/* {postTaskPopup && (
                <div className="popup-post-task d-md-block d-none">
                    <PostTaskHomepage handleClose={handleClosePosttaskPopup} />
                </div>
            )} */}

            <section
                id="trusted-brand-section"
                className="trusted-brand-section"
            >
                {/* <Container fluid="xl" className="px-5"> */}
                <Marquee gradient={true} className="marquee" speed={40}>
                    {trustedPartnerData?.map((value, key) => (
                        <Link href={value?.redirect_url} key={key}>
                            <li className="light">
                                <a>
                                    {value?.logo && (
                                        <figure>
                                            <Image
                                                src={value?.logo}
                                                alt={value?.alt_text}
                                                layout="fill"
                                                objectFit="contain"
                                            ></Image>
                                        </figure>
                                    )}
                                </a>
                            </li>
                        </Link>
                    ))}
                </Marquee>
                {/* </Container> */}
            </section>

            {/* Popular verified services section start */}
            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl" className="px-5">
                    <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline mt-5">
                        {servicesData && servicesData?.result?.length > 0 && (
                            <>
                                <h2 className="heading-title">
                                    Trending Verified Services
                                </h2>
                                <Link href="/service">
                                    <a className="view-more">
                                        view more{" "}
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            className="svg-icon"
                                        />
                                    </a>
                                </Link>
                            </>
                        )}
                    </div>
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.result
                                ?.slice(0, 4)
                                .map((service, key) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={key}
                                            className="d-flex"
                                        >
                                            <ServiceCard
                                                serviceCard={service}
                                            />
                                        </Col>
                                    );
                                })}
                    </Row>
                    <Row>
                        <Advertisement />
                    </Row>
                </Container>
            </section>
            {/* Popular verified services section end */}

            {/* Services near you section start */}
            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl" className="px-5">
                    {servicesData && servicesData?.result?.length > 0 && (
                        <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                            <h2 className="heading-title">Services near you</h2>
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
                    )}
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.result
                                ?.filter(
                                    (result) => result?.share_location === true
                                )
                                ?.slice(0, 4)
                                .map((service, key) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={key}
                                            className="d-flex"
                                        >
                                            <ServiceCard
                                                serviceCard={service}
                                            />
                                        </Col>
                                    );
                                })}
                    </Row>
                </Container>
            </section>
            {/* Services near you section end */}

            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl" className="px-5">
                    {servicesData &&
                        servicesData?.result?.filter((q) => q.is_professional)
                            .length > 0 && (
                            <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                                <h2 className="heading-title">
                                    Professional Services
                                </h2>
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
                        )}
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.result
                                ?.filter((q) => q.is_professional)
                                .slice(0, 4)
                                .map((service) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={service.id}
                                            className="d-flex"
                                        >
                                            <ServiceCard
                                                serviceCard={service}
                                            />
                                        </Col>
                                    );
                                })}
                    </Row>
                </Container>
            </section>

            {/* Get services section start */}
            {/* <section className="get-services">
                <Container fluid="xl" className="px-5">
                    <h1 className="section-main-title">
                        Book Your Services in an Instant
                    </h1>
                    <ul className="d-block d-md-flex align-items-center justify-content-center">
                        <li className="d-flex align-items-center">
                            <span>1</span>
                            Post the service you need
                        </li>
                        <li className="d-flex align-items-center">
                            <span>2</span>
                            Set your budget
                        </li>
                        <li className="d-flex align-items-center">
                            <span>3</span>
                            Get offers and choose your most suited service
                            provider
                        </li>
                        <li className="d-flex align-items-center">
                            <span>4</span>
                            Pay and Book
                        </li>
                    </ul>

                    {heroCategoryData ??
                        (heroCategoryData?.result.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                <Highlight highlight={"No Category"}>
                                    {`There are No Category available`}
                                </Highlight>
                            </Alert>
                        ))}
                    <Row className="gx-5 hero-category">
                        {heroCategoryData?.result &&
                            heroCategoryData?.result
                                ?.slice(0, 8)
                                ?.map((category) => {
                                    return (
                                        <Col
                                            lg={3}
                                            md={4}
                                            sm={6}
                                            key={category?.id}
                                            className="d-flex align-items-strecth card-col"
                                        >
                                            <CategoryCardNew
                                                categoryTitle={
                                                    category?.category?.name
                                                }
                                                categoryIcon={
                                                    category?.category?.icon
                                                }
                                                categorySlug={
                                                    category?.category?.slug
                                                }
                                            />
                                        </Col>
                                    );
                                })}
                    </Row>
                    <div className="how-it-works d-flex justify-content-center">
                        <Link href="/how-it-works">
                            <a>
                                See How It Works
                                <FontAwesomeIcon
                                    icon={faChevronCircleRight}
                                    className="svg-icon"
                                />
                            </a>
                        </Link>
                    </div>
                </Container>
            </section> */}
            {/* Get services section end */}

            {/* Find & Hire section start */}
            <section id="find-hire" className="find-hire mt-4">
                <Container fluid="xl" className="px-5">
                    <h1 className="section-main-title">Find &amp; Hire</h1>
                    <h2 className="section-sub-title">Get those work done.</h2>
                    <Row className="gx-5">
                        {findHire &&
                            findHire.map((card) => {
                                return (
                                    <Col
                                        md={4}
                                        key={card.id}
                                        className="d-flex align-items-stretch"
                                    >
                                        <CipherCard
                                            thumbnailImg={card.thumbnailImg}
                                            title={card.title}
                                            description={card.description}
                                            redirectTo={card.redirectTo}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                </Container>
            </section>
            {/* Find & Hire section end */}

            {/* Top Taksers Section Start */}
            {topTaskerData?.result?.length != 0 && (
                <section id="top-merchants" className="top-merchants">
                    <Container fluid="xl" className="px-5">
                        <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                            <h2 className="heading-title">Top Taskers</h2>
                            {topTaskerData?.result &&
                                topTaskerData?.result?.length > 0 && (
                                    <Link href="/service">
                                        <a className="view-more">
                                            view more{" "}
                                            <FontAwesomeIcon
                                                icon={faAngleRight}
                                                className="svg-icon"
                                            />
                                        </a>
                                    </Link>
                                )}
                        </div>
                        {topTaskerData?.result &&
                            topTaskerData?.result?.length <= 0 && (
                                <Alert
                                    icon={<FontAwesomeIcon icon={faWarning} />}
                                    title="No data Available!"
                                    color="orange"
                                    radius="md"
                                    sx={{ minWidth: 100 }}
                                >
                                    There are No Top Taskers available
                                </Alert>
                            )}
                        <Row className="gx-5">
                            {topTaskerData &&
                                topTaskerData?.result
                                    ?.slice(0, 4)
                                    ?.map((merchant, index) => {
                                        return (
                                            <Col
                                                md={6}
                                                lg={3}
                                                sm={6}
                                                xl={3}
                                                key={index}
                                                className="d-flex"
                                            >
                                                <MerchantCard
                                                    merchantImage={
                                                        merchant?.user
                                                            ?.profile_image
                                                    }
                                                    merchantName={
                                                        merchant?.user
                                                            ?.first_name
                                                    }
                                                    merchantCategory={
                                                        merchant?.designation
                                                    }
                                                    merchantLocation={
                                                        merchant?.address_line1 +
                                                        " " +
                                                        merchant?.address_line2
                                                    }
                                                    merchantDescription={
                                                        merchant?.bio
                                                    }
                                                    merchantRating={
                                                        merchant?.rating
                                                            ?.avg_rating
                                                    }
                                                    merchantPrice={
                                                        merchant?.hourly_rate
                                                    }
                                                    currency={
                                                        merchant
                                                            ?.charge_currency
                                                            ?.code
                                                    }
                                                    happyClients={
                                                        merchant?.stats
                                                            ?.happy_clients
                                                    }
                                                    successRate={
                                                        merchant?.stats
                                                            ?.success_rate
                                                    }
                                                    merchantId={
                                                        merchant?.user?.id
                                                    }
                                                />
                                            </Col>
                                        );
                                    })}
                        </Row>
                    </Container>
                </section>
            )}
            {/* Top Taskers Section End */}

            {/* Gradient Banner section Start */}
            <section className="gradient-banner">
                <Container fluid="xl" className="px-5">
                    <GradientBanner
                        title="Looking for work is not that difficult as it sounds any more"
                        subTitle="Allow us to accompany you on your journey"
                        image="/gradient-updated.png"
                    />
                </Container>
            </section>
            {/* Gradient Banner section End */}

            {/* Win new client silder card section start */}
            <section
                id="win-new-clients-slider-section"
                className="win-new-clients-slider-section"
            >
                <Container fluid="xl" className="px-5">
                    <ExploreWithSlider />
                </Container>
            </section>
            {/* Win new client slider card section ends */}

            {/* Tasks you may like section start */}
            <section id="tasks-you-may-like" className="tasks-you-may-like">
                <Container fluid="xl" className="px-5">
                    {recommendedTasksData &&
                        recommendedTasksData?.result?.length > 0 && (
                            <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                                <h2 className="heading-title">
                                    Tasks You May Like
                                </h2>
                                <Link href="/task-you-may-like">
                                    <a className="view-more">
                                        view more{" "}
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            className="svg-icon"
                                        />
                                    </a>
                                </Link>
                            </div>
                        )}
                    <Row className="gx-5">
                        {recommendedTasksData?.result?.map((task, key) => (
                            <Col md={6} key={key}>
                                <TaskCard task={task} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            {/* Tasks you may like section end */}

            {/* some success stories sectioin start */}

            <section
                id="some-success-stories-section"
                className="some-success-stories-section"
            >
                <Container fluid="xl" className="px-5">
                    <div className="success-sroties-header">
                        <h1 className="text-center">
                            Bridging the gap between individuals
                        </h1>
                        <h3 className="text-center">HOMAALE Stories</h3>
                    </div>
                    {topCategoryData?.length <= 0 && (
                        <Alert
                            icon={<FontAwesomeIcon icon={faWarning} />}
                            title="No data Available!"
                            color="orange"
                            radius="md"
                            sx={{ minWidth: 100 }}
                        >
                            There are No Success Stories available
                        </Alert>
                    )}
                    <Carousel
                        mx="auto"
                        styles={{
                            control: {
                                "&[data-inactive]": {
                                    opacity: 0,
                                    cursor: "default",
                                },
                            },
                        }}
                        className="rounded"
                        withIndicators
                    >
                        {successStoryData &&
                            successStoryData?.result?.map((value, key) => (
                                <Carousel.Slide key={key}>
                                    <PersonalSuccessCard
                                        successStoryData={value}
                                    />
                                </Carousel.Slide>
                            ))}
                    </Carousel>
                </Container>
            </section>

            {/* Notable quality section starts  */}
            <section id="notable-quality" className="notable-quality">
                <Container fluid="xl" className="px-5">
                    <LongSquareImageCard
                        title="Homaale Notable quality"
                        image="/groupB.png"
                        imageOnRight={true}
                        homeImage={true}
                        description={quality}
                    />
                </Container>
            </section>
            {/* Notable quality section ends  */}

            {/* some success stories section end  */}

            {/* blog section start */}
            <section id="our-blogs" className="our-blogs">
                <Container fluid="xl" className="px-5">
                    {blogData && blogData?.result?.length > 0 && (
                        <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                            <h2 className="heading-title">Our blogs</h2>
                            <Link href="/blogs">
                                <a className="view-more">
                                    view more{" "}
                                    <FontAwesomeIcon
                                        icon={faAngleRight}
                                        className="svg-icon"
                                    />
                                </a>
                            </Link>
                        </div>
                    )}
                    <Row className="gx-5">
                        {blogData &&
                            blogData?.result?.slice(0, 3).map((blog, key) => {
                                return (
                                    <Col
                                        className="d-flex align-items-stretch"
                                        md={4}
                                        key={key}
                                    >
                                        <CommunityBlogCard blogData={blog} />
                                    </Col>
                                );
                            })}
                    </Row>
                </Container>
            </section>
            {/* blog section end */}

            {/* Tax calculator section start */}
            <section className="tax-calculator">
                <Container fluid="xl" className="px-5">
                    <div className="gradient-wrapper">
                        <span className="gradient"></span>
                        <figure className="gradient-img">
                            <Image
                                src="/tax-calculator.png"
                                alt="gradient-img"
                                layout="fill"
                                objectFit="cover"
                            />
                        </figure>
                        <div className="overlay">
                            <>
                                <h1>
                                    Nepali <span>Income Tax</span> and{" "}
                                    <span>Pay Calculator</span>
                                </h1>
                                <div className="bottom-content">
                                    <p>
                                        Designed for easy and approximate
                                        calculation of your tax
                                    </p>
                                </div>
                                <Link href="/tax-calculator">
                                    <a>
                                        <CardBtn
                                            btnTitle="Calculate Now"
                                            backgroundColor="#211D4F"
                                            color="#FFF"
                                        />
                                    </a>
                                </Link>
                            </>
                        </div>
                    </div>
                </Container>
            </section>
            {/* Tax calculator section end */}

            {/* Expore marketplace section start */}
            <section className="explore-marketplace">
                <Container fluid="xl" className="px-5">
                    <h1 className="section-main-title">
                        Explore Our Marketplace
                    </h1>
                    <Row className="gx-5">
                        <Col md={4} className="d-flex align-items-stretch">
                            <MarketPlaceCard
                                icon="/icons/globe-location.svg"
                                title="Location"
                                description="It is always convenient to be connected to the clients and the tasks 
                                closer to you. With us, you can view who or which tasks are closer to you or your 
                                    preferred location."
                                redirectionTo="/service"
                                iconBackground="#CDE9F9"
                            />
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <MarketPlaceCard
                                icon="/icons/category.svg"
                                title="Category"
                                description="Looking for a particular service or variety of them? Or do you provide services and are looking for clients? We have made it easier for you to filter and sort out categories as per your preference."
                                redirectionTo="/category"
                                iconBackground="#E3D5FA"
                            />
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <MarketPlaceCard
                                icon="/icons/recommendation-badge.svg"
                                title="Recommended by us"
                                description="We know the preferences and choices of each of our users. Therefore, you can always rely on our recommendations for a customised search feed."
                                redirectionTo="/hire-in-nepal"
                                iconBackground="#CCF6E6"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Expore marketplace section end */}

            {topCategoryData && (
                <section className="top-categories-section">
                    <Container fluid="xl" className="px-5">
                        <h1 className="section-main-title">Top Categories</h1>
                        <h2 className="section-sub-title">
                            See some of our top categories in your area
                        </h2>
                        {/* <TopCategories /> */}
                        {topCategoryData?.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                There are No top Categorys available
                            </Alert>
                        )}
                        <Row className="g-5">
                            {topCategoryData &&
                                topCategoryData.map((category, key) => (
                                    <Col md={2} key={key}>
                                        <div className="d-flex justify-content-center top-categories">
                                            <Link
                                                href={`/category/${category?.slug}`}
                                            >
                                                <a>
                                                    <span>
                                                        {category?.category}
                                                    </span>
                                                </a>
                                            </Link>
                                        </div>
                                    </Col>
                                ))}
                        </Row>
                    </Container>
                </section>
            )}
        </Layout>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: successStoryData } = await axiosClient.get(
            urls.tasker.success_story
        );
        const { data: trustedPartnerData } = await axiosClient.get(
            urls.trusted_partners
        );
        const { data: heroCategoryData } = await axiosClient.get(
            urls.hero_category
        );
        // const { data: topCategoryData } = await axiosClient.get(
        //     "/task/top-categories/"
        // );
        const { data: topTaskerData } = await axiosClient.get(
            urls.tasker.top_tasker
        );
        const { data: recommendedTasksData } = await axiosClient.get(
            `${urls.task.service}&recommendation=Task You May Like`
        );
        const { data: blogData } = await axiosClient.get(urls.blog.list);
        const { data: servicesData } = await axiosClient.get(urls.task.service);

        return {
            props: {
                successStoryData,
                trustedPartnerData,
                recommendedTasksData,
                heroCategoryData,
                topTaskerData,
                blogData,
                // topCategoryData,
                servicesData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                successStoryData: [],
                trustedPartnerData: [],
                blogData: [],
                servicesData: ["sdsd"],
                topTaskerData: [],
                recommendedTasksData: [],
                heroCategoryData: [],
                topCategoryData: [],
            },
            revalidate: 10,
        };
    }
};
