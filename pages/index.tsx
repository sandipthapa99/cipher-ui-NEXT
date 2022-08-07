import MarketPlaceCard from "@components/Cards/MarketPlaceCard";
import CommunityBlogCard from "@components/common/BlogCard";
import CardBtn from "@components/common/CardBtn";
import CategoryCardNew from "@components/common/CategoryCardNew";
import CipherCard from "@components/common/CipherCard";
import MerchantCard from "@components/common/MerchantCard";
import RecommendationChips from "@components/common/RecommendationChips";
import SelectInputField from "@components/common/SelectInputField";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import {
    faAngleRight,
    faArrowRight,
    faChevronCircleRight,
    faChevronDown,
    faSearch,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import { UserService } from "services/userService";
import { blogCardContent } from "staticData/community";
import { findHire } from "staticData/findHire";
import { merchants } from "staticData/merchants";
import { serviceCategory } from "staticData/serviceCategory";
import { services } from "staticData/services";
import { tasks } from "staticData/task";
import HomeSearchSchema from "utils/formValidation/homeSearchValidation";
import { HomeSearchdata } from "utils/homeSearchData";
import { myOptions } from "utils/options";

const Home: NextPage = () => {
    return (
        <Layout title="Cipher - Catering to Your Requirements">
            <section className="landing-main-banner">
                <Container fluid="xl" className="px-5">
                    <Row className="gx-5">
                        <Col md="6" className="left">
                            <div className="content">
                                {/* Hero Text Start Here */}
                                <h1>Catering To Your Requirements</h1>
                                {/* Hero Text End Here */}
                            </div>
                            <div className="search-bar">
                                <Formik
                                    initialValues={HomeSearchdata}
                                    validationSchema={HomeSearchSchema}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                    }}
                                >
                                    <div className="search_box">
                                        <div className="dropdown d-flex align-items-center">
                                            <SelectInputField
                                                name="experience"
                                                placeHolder="All"
                                                options={myOptions}
                                                fieldRequired
                                            />
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                className="svg-icon"
                                            />
                                        </div>
                                        <div className="search_field">
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Find your services"
                                            />
                                        </div>
                                        <Link href="/search">
                                            <a className="">
                                                <Button className="search-btn">
                                                    <FontAwesomeIcon
                                                        icon={faSearch}
                                                        className="icon"
                                                    />
                                                </Button>
                                            </a>
                                        </Link>
                                    </div>
                                </Formik>
                            </div>
                            <div className="chips-section d-md-flex d-none">
                                <RecommendationChips title="Garden Cleaner" />
                                <RecommendationChips title="Plumber" />
                                <RecommendationChips title="Electrician" />
                                <RecommendationChips title="Washing Machine" />
                            </div>

                            <div className="come-with-us">
                                <h1>Come with Us For</h1>
                                <div className="d-flex">
                                    <Link href="/earn-money">
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
                    <Row className="gx-5">
                        {serviceCategory &&
                            serviceCategory.map((category) => {
                                return (
                                    <Col md={3} sm={6} key={category.id}>
                                        <CategoryCardNew
                                            categoryTitle={
                                                category.categoryTitle
                                            }
                                            categoryIcon={category.categoryIcon}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                    {/* Service category listing end */}
                </Container>
            </section>

            {/* Popular verified services section start */}
            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl" className="px-5">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">
                            Popular Verified Services
                        </h2>
                        <a href="" className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </div>
                    <Row className="gx-5">
                        {services &&
                            services.map((service) => {
                                return (
                                    <Col sm={6} md={4} lg={3} key={service.id}>
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
                                                    hasOffer={service.hasOffer}
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
                                );
                            })}
                    </Row>
                </Container>
            </section>
            {/* Popular verified services section end */}

            {/* Services near you section start */}
            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl" className="px-5">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Services near you</h2>
                        <a href="" className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </div>
                    <Row className="gx-5">
                        {services &&
                            services.map((service) => {
                                return (
                                    <Col sm={6} md={4} lg={3} key={service.id}>
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
                                                    hasOffer={service.hasOffer}
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
                                );
                            })}
                    </Row>
                </Container>
            </section>
            {/* Services near you section end */}

            {/* Get services section start */}
            <section className="get-services">
                <Container fluid="xl" className="px-5">
                    <h1 className="section-main-title">
                        Get Services In An Instant
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
                            Get offers &amp; select most suited to you
                        </li>
                        <li className="d-flex align-items-center">
                            <span>4</span>
                            Pay &amp; Done
                        </li>
                    </ul>

                    <Row className="gx-5">
                        {serviceCategory &&
                            serviceCategory.map((category) => {
                                return (
                                    <Col md={3} sm={6} key={category.id}>
                                        <CategoryCardNew
                                            categoryTitle={
                                                category.categoryTitle
                                            }
                                            categoryIcon={category.categoryIcon}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                    <div className="how-it-works d-flex justify-content-center">
                        <Link href="">
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

            {/* Top Taksers Section Start */}
            <section id="top-merchants" className="top-merchants">
                <Container fluid="xl" className="px-5">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Top Taskers</h2>
                        <a href="" className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </div>
                    <Row className="gx-5">
                        {merchants &&
                            merchants.map((merchant) => {
                                return (
                                    <Col sm={6} lg={4} xl={3} key={merchant.id}>
                                        <MerchantCard
                                            merchantImage={
                                                merchant.merchantImage
                                            }
                                            merchantName={merchant.merchantName}
                                            merchantCategory={
                                                merchant.merchantCategory
                                            }
                                            merchantLocation={
                                                merchant.merchantLocation
                                            }
                                            merchantDescription={
                                                merchant.merchantDescription
                                            }
                                            merchantRating={
                                                merchant.merchantRating
                                            }
                                            merchantPrice={
                                                merchant.merchantPrice
                                            }
                                            happyClients={merchant.happyClients}
                                            successRate={merchant.successRate}
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
                        title="A client tasks are quickly finished 
                            when searched through Cipher"
                        subTitle="“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500. "
                        image="/discover/main.svg"
                        btnText="Join Us"
                    />
                </Container>
            </section>
            {/* Gradient Banner section End */}

            {/* Tasks you may like section start */}
            <section id="tasks-you-may-like" className="tasks-you-may-like">
                <Container fluid="xl" className="px-5">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Tasks You May Like</h2>
                        <a href="" className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </div>
                    <Row className="gx-5">
                        {tasks &&
                            tasks.map((task) => {
                                return (
                                    <Col md={6} key={task.id}>
                                        <TaskCard
                                            title={task.title}
                                            charge={task.charge}
                                            description={task.description}
                                            location={task.location}
                                            date={task.date}
                                            time={task.time}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                </Container>
            </section>
            {/* Tasks you may like section end */}

            {/* blog section start */}
            <section id="our-blogs" className="our-blogs">
                <Container fluid="xl" className="px-5">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Our blogs</h2>
                        <a href="" className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </div>
                    <Row className="gx-5">
                        {blogCardContent &&
                            blogCardContent.map((blog) => {
                                return (
                                    <Col
                                        className="d-flex align-items-stretch"
                                        // sm={6}
                                        md={4}
                                        // lg={4}
                                        key={blog.id}
                                    >
                                        <CommunityBlogCard
                                            cardImage={blog.cardImage}
                                            cardDescription={
                                                blog.cardDescription
                                            }
                                            cardTitle={blog.cardTitle}
                                        />
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
                                        Designing a calendar isn&apos;t always
                                        as simple as filling.
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
                                description="It is always convenient to to be connected to clients, and
                                tasks closer to you, and with us, you can see who or which
                                tasks are closer to you, or at your preferred location."
                                redirectionTo=""
                                iconBackground="#CDE9F9"
                            />
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <MarketPlaceCard
                                icon="/icons/category.svg"
                                title="Category"
                                description="Looking for a particular service, or multitude of them ? Or do you provide multitude of services, or jus want to stick to a particular one ? We have made it easier for you to filter, and sort out categories as per your convenience."
                                redirectionTo=""
                                iconBackground="#E3D5FA"
                            />
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <MarketPlaceCard
                                icon="/icons/recommendation-badge.svg"
                                title="Recommended by us"
                                description="We know each of our users, and we do know their preferences, and their choices, so you can always rely on our recommendations for a customized search feed just for you."
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
                        See some of our top categories in your area
                    </h2>
                </Container>
            </section>
        </Layout>
    );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["user"], () =>
        UserService.fetchUser({ type: "server", context })
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
export default Home;
