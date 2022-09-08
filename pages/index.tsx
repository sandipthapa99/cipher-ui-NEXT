import Advertisement from "@components/Advertisement/Advertisement";
import MarketPlaceCard from "@components/Cards/MarketPlaceCard";
import { TopCategories } from "@components/Category/TopCategories";
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
import SkeletonServiceCard from "@components/Skeletons/SkeletonServiceCard";
import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import SkeletonTaskerCard from "@components/Skeletons/SkeletonTaskerCard";
import {
    faAngleRight,
    faChevronCircleRight,
    faWarning,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { Alert, Grid, Highlight, Skeleton, Space } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useTaskers } from "hooks/tasker/use-tasker";
import { useData } from "hooks/use-data";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alert as BootstrapAlert } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { quality } from "staticData/cipherNotableQuality";
import { findHire } from "staticData/findHire";
import type { BlogValueProps } from "types/blogs";
import type { BrandValueProps } from "types/brandValueProps";
import type { CategoryDataProps } from "types/categoryData";
import type { HeroCategoryProps } from "types/heroCategory";
import type { ServicesValueProps } from "types/serviceCard";
import type { SuccessStoryProps } from "types/successStory";
import type { ITaskApiResponse } from "types/task";
import { axiosClient } from "utils/axiosClient";

interface LandingPageProps {
    successStoryData: SuccessStoryProps;
    trustedPartnerData: BrandValueProps;
    heroCategoryData: HeroCategoryProps;
    topCategoryData: CategoryDataProps;
}

const Home: NextPage<{
    successStoryData: LandingPageProps["successStoryData"];
    trustedPartnerData: LandingPageProps["trustedPartnerData"];
    heroCategoryData: LandingPageProps["heroCategoryData"];
    topCategoryData: LandingPageProps["topCategoryData"];
}> = ({
    successStoryData,
    trustedPartnerData,
    heroCategoryData,
    topCategoryData,
}) => {
    const { data: blogData, isLoading: blogLoading } = useData<BlogValueProps>(
        ["all-blogs"],
        "/blog/"
    );
    const { data: servicesData, isLoading: serviceLoading } =
        useData<ServicesValueProps>(["all-services"], "/task/service/");

    //for tasks

    const { data: recommendedTasksData, isLoading: taskLoading } =
        useData<ITaskApiResponse>(
            ["all-tasks"],
            "/task/?recommendation=you may like"
        );

    const { data: allTaskers, isLoading: taskerLoading } = useTaskers();

    const router = useRouter();

    return (
        <Layout title="Cipher - Catering to Your Requirements">
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
                                <h1>Join CIPHER for</h1>
                                <div className="d-flex buttons">
                                    <Link href="/task">
                                        <a href="" className="hero-cta">
                                            Earn Money as a Professional
                                        </a>
                                    </Link>
                                    <Link href="/post-task">
                                        <a href="" className="hero-cta">
                                            Post a Task
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md="6" className="right">
                            <figure className="new-img">
                                <Image
                                    src="/hero-img.svg"
                                    alt="hero-img"
                                    height={600}
                                    width={600}
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
                                height={100}
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
                            >
                                {heroCategoryData.result
                                    .slice(0, 8)
                                    .map((category) => {
                                        return (
                                            <Carousel.Slide key={category.id}>
                                                <CategoryCardNew
                                                    categoryTitle={
                                                        category?.category?.name
                                                    }
                                                    categoryIcon={
                                                        category.category?.icon
                                                    }
                                                    categorySlug={
                                                        category?.category?.slug
                                                    }
                                                />
                                            </Carousel.Slide>
                                        );
                                    })}
                            </Carousel>
                        ) : (
                            <BootstrapAlert variant="warning mb-5">
                                No Data to Display!
                            </BootstrapAlert>
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
                    <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                        <h2 className="heading-title">
                            Popular Verified Services
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
                    {serviceLoading && (
                        <Grid>
                            {Array.from({ length: 4 }).map((_, key) => (
                                <Grid.Col span={3} key={key}>
                                    <SkeletonServiceCard />
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}

                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.data?.result
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
                    {serviceLoading && (
                        <Grid>
                            {Array.from({ length: 4 }).map((_, key) => (
                                <Grid.Col span={3} key={key}>
                                    <SkeletonServiceCard />
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.data?.result
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
                    <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                        <h2 className="heading-title">Professional Services</h2>
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
                    {serviceLoading && (
                        <Grid>
                            {Array.from({ length: 4 }).map((_, key) => (
                                <Grid.Col span={3} key={key}>
                                    <SkeletonServiceCard />
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.data?.result
                                ?.slice(0, 4)
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
            <section className="get-services">
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
            </section>
            {/* Get services section end */}

            {/* Find & Hire section start */}
            <section id="find-hire" className="find-hire">
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

            {/* Horoscope section starts */}
            {/* <section
                id="horoscope-slider-section"
                className="horoscope-slider-section"
            >
                <Container className="px-5" fluid="xl">
                    <h1 className="text-center">Horoscopes</h1>
                    <HoroscopeSlider />
                </Container>
            </section> */}
            {/* Horoscope section ends */}

            {/* Top Taksers Section Start */}
            <section id="top-merchants" className="top-merchants">
                <Container fluid="xl" className="px-5">
                    <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                        <h2 className="heading-title">Top Taskers</h2>
                        <Link href="/tasker">
                            <a className="view-more">
                                view more{" "}
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="svg-icon"
                                />
                            </a>
                        </Link>
                    </div>
                    {taskerLoading && (
                        <Grid>
                            {Array.from({ length: 4 }).map((_, key) => (
                                <Grid.Col span={3} key={key}>
                                    <SkeletonTaskerCard />
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}
                    <Row className="gx-5">
                        {allTaskers &&
                            allTaskers?.slice(0, 4)?.map((merchant, index) => {
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
                                            onClick={() =>
                                                router.push({
                                                    pathname: `/tasker/${merchant.user.id}`,
                                                })
                                            }
                                            merchantImage={
                                                merchant?.user?.profile_image
                                            }
                                            merchantName={
                                                merchant?.user?.full_name
                                            }
                                            merchantCategory={
                                                merchant?.designation
                                            }
                                            merchantLocation={
                                                merchant?.address_line1 +
                                                " " +
                                                merchant?.address_line2
                                            }
                                            merchantDescription={merchant?.bio}
                                            merchantRating={
                                                merchant?.stats?.user_reviews
                                            }
                                            merchantPrice={
                                                merchant?.hourly_rate
                                            }
                                            currency={merchant?.currency?.code}
                                            happyClients={
                                                merchant?.stats?.happy_clients
                                            }
                                            successRate={
                                                merchant?.stats?.success_rate
                                            }
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                </Container>
            </section>
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
                    <div className="title-wrapper d-flex flex-column flex-sm-row justify-content-between align-items-baseline">
                        <h2 className="heading-title">Tasks You May Like</h2>
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
                    {taskLoading && (
                        <Grid>
                            {Array.from({ length: 2 }).map((_, key) => (
                                <Grid.Col span={6} key={key}>
                                    <SkeletonTaskCard />
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}
                    {!taskLoading && !recommendedTasksData && (
                        <Alert
                            icon={<FontAwesomeIcon icon={faWarning} />}
                            title="No data Available!"
                            color="orange"
                            radius="md"
                            sx={{ minWidth: 100 }}
                        >
                            <Highlight highlight={"No"}>
                                {`There are No Tasks available`}
                            </Highlight>
                        </Alert>
                    )}
                    <Row className="gx-5">
                        {recommendedTasksData?.data?.result?.map(
                            (task, key) => (
                                <Col md={6} key={key}>
                                    <Link
                                        href={`/task-you-may-like/${task.slug}`}
                                    >
                                        <a>
                                            <TaskCard
                                                title={task?.title}
                                                id={task?.id}
                                                charge={task?.charge}
                                                description={task?.description}
                                                location={task?.location}
                                                start_date={task?.start_date}
                                                start_time={task?.start_time}
                                                status={task?.status}
                                                currency={task?.currency}
                                            />
                                        </a>
                                    </Link>
                                </Col>
                            )
                        )}
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
                            3003,0330 Taskers have earned an income on Cipher
                        </h1>
                        <h3 className="text-center">Some Success Stories</h3>
                    </div>
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
                        {successStoryData?.result.map((value, key) => (
                            <Carousel.Slide key={key}>
                                <PersonalSuccessCard successStoryData={value} />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </Container>
            </section>

            {/* Notable quality section starts  */}
            <section id="notable-quality" className="notable-quality">
                <Container fluid="xl" className="px-5">
                    <LongSquareImageCard
                        title="Cipher Notable quality"
                        image="/groupB.png"
                        imageOnRight={true}
                        description={quality}
                    />
                </Container>
            </section>
            {/* Notable quality section ends  */}

            {/* some success stories section end  */}

            {/* blog section start */}
            <section id="our-blogs" className="our-blogs">
                <Container fluid="xl" className="px-5">
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
                    {blogLoading && (
                        <Grid gutter="xl">
                            {Array.from({ length: 3 }).map((_, key) => (
                                <Grid.Col span={4} key={key}>
                                    <div className="mantine-Skeleton mb-5 p-5">
                                        <Skeleton height={60} mb="xl" />
                                        <Space h={20} />
                                        <Skeleton
                                            height={30}
                                            mt={6}
                                            width="70%"
                                            radius="xl"
                                        />
                                        <Skeleton
                                            height={30}
                                            mt={6}
                                            radius="xl"
                                        />
                                        <Space h={20} />
                                        <Space h={10} />
                                        <Skeleton
                                            height={30}
                                            mt={6}
                                            width="40%"
                                            radius="xl"
                                        />
                                    </div>
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}
                    <Row className="gx-5">
                        {blogData
                            ? blogData?.data?.result
                                  ?.slice(0, 3)
                                  .map((blog, key) => {
                                      return (
                                          <Col
                                              className="d-flex align-items-stretch"
                                              // sm={6}
                                              md={4}
                                              // lg={4}
                                              key={key}
                                          >
                                              <CommunityBlogCard
                                                  blogData={blog}
                                              />
                                          </Col>
                                      );
                                  })
                            : "No blogs recorded"}
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
                                redirectionTo=""
                                iconBackground="#CDE9F9"
                            />
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <MarketPlaceCard
                                icon="/icons/category.svg"
                                title="Category"
                                description="Looking for a particular service or variety of them? Or do you provide services and are looking for clients? We have made it easier for you to filter and sort out categories as per your preference."
                                redirectionTo=""
                                iconBackground="#E3D5FA"
                            />
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <MarketPlaceCard
                                icon="/icons/recommendation-badge.svg"
                                title="Recommended by us"
                                description="We know the preferences and choices of each of our users. Therefore, you can always rely on our recommendations for a customised search feed."
                                redirectionTo=""
                                iconBackground="#CCF6E6"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Expore marketplace section end */}

            <section className="top-categories-section">
                <Container fluid="xl" className="px-5">
                    <h1 className="section-main-title">Top Categories</h1>
                    <h2 className="section-sub-title">
                        See some of our top categories
                    </h2>
                    {/* <TopCategories /> */}
                    {/* <Row>
                        {topCategoryData.map((category, key) => (
                            <Col md={2} key={key}>
                                <Link href={category.slug}>
                                    <a>{category.category}</a>
                                </Link>
                            </Col>
                        ))}
                    </Row> */}
                </Container>
            </section>
        </Layout>
    );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: successStoryData } = await axiosClient.get(
            "/tasker/success-story/"
        );
        const { data: trustedPartnerData } = await axiosClient.get(
            "/landingpage/trusted-partner/"
        );
        const { data: heroCategoryData } = await axiosClient.get(
            "/task/hero-category/"
        );
        const { data: topCategoryData } = await axiosClient.get(
            "/task/top-categories/"
        );
        const { data: recommendedTasksData } = await axiosClient.get("/task");
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(["all-blogs"]);
        await queryClient.prefetchQuery(["all-services"]);
        await queryClient.prefetchQuery(["all-tasks"]);
        return {
            props: {
                successStoryData: successStoryData,
                trustedPartnerData: trustedPartnerData,
                recommendedTasksData: recommendedTasksData,
                heroCategoryData: heroCategoryData,
                topCategoryData: topCategoryData,
                dehydratedState: dehydrate(queryClient),
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                successStoryData: [],
                trustedPartnerData: [],
                blogData: [],
                servicesData: [],
                recommendedTasksData: [],
                heroCategoryData: [],
                topCategoryData: [],
            },
            revalidate: 10,
        };
    }
};
