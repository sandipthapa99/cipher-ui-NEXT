import SelectInputField from '@components/common/SelectInputField'
import ServiceCard from '@components/common/ServiceCard'
import Layout from '@components/Layout'
import {
    faChevronDown,
    faAngleRight,
    faSearch,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import type { NextPage } from 'next'
import Image from 'next/image'
import { NextRouter, useRouter } from 'next/router'
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import HomeSearchSchema from 'utils/formValidation/homeSearchValidation'
import { HomeSearchdata } from 'utils/homeSearchData'
import { myOptions } from 'utils/options'
import { services } from 'staticData/services'
import { merchants } from 'staticData/merchants'
import { tasks } from 'staticData/task'
import CategoryCard from '@components/common/CategoryCard'
import { serviceCategory } from 'staticData/serviceCategory'
import Link from 'next/link'
import MerchantCard from '@components/common/MerchantCard'
import TaskCard from '@components/common/TaskCard'
import RecommendationChips from '@components/common/RecommendationChips'
import CipherCard from '@components/common/CipherCard'
import { findHire } from 'staticData/findHire'
import { findOpportuities } from 'staticData/findOpportunities'

const Home: NextPage = () => {
    const router = useRouter();
    return (
        <Layout>
            {/* Site Main Banner Start */}
            <section id="main-banner" className="site-main-banner ">
                <span className="shape-blob d-none d-md-inline-block"></span>
                <Container fluid="xl" className="px-4">
                    <div className="site-main-banner--content d-flex align-items-center justify-content-center text-center">
                        {/* Hero Text Start Here */}
                        <div className="site-main-banner--content__inner">
                            <h1 className="site-main-banner--content__inner--title">
                                Catering To Your Requirements
                            </h1>
                            <p>Discover the world of services &amp; get paid for your time</p>
                        </div>
                        {/* Hero Text End Here */}
                    </div>

                    <div className="site-main-banner--search-bar">
                        <Formik
                            initialValues={HomeSearchdata}
                            validationSchema={HomeSearchSchema}
                            onSubmit={async (values) => {
                                console.log(values)
                            }}
                        >
                            <div className="search_box">
                                <div className="dropdown-wrapper">
                                    <div className="dropdown">
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
                                </div>
                                <div className="search_field">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Find your services"
                                    />
                                </div>
                                <Link href="/search">
                                    <a className='search-btn'>
                                        <Button className="search-btn">
                                            <FontAwesomeIcon icon={faSearch} className="icon" />
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </Formik>
                    </div>
                    <div className="site-main-banner--chips-section d-md-flex d-none">
                        <RecommendationChips title="Garden Cleaner" />
                        <RecommendationChips title="Plumber" />
                        <RecommendationChips title="Electrician" />
                        <RecommendationChips title="Washing Machine" />
                        <RecommendationChips title="Health &amp; Care" />
                    </div>

                    {/* Service category listing start */}
                    <Row className="gx-5">
                        {serviceCategory &&
                            serviceCategory.map((category) => {
                                return (
                                    <Col xs={6} sm={4} lg={2} key={category.id}>
                                        <Link href="/gardening">
                                            <a>
                                                <CategoryCard
                                                    categoryTitle={category.categoryTitle}
                                                    categoryIcon={category.categoryIcon}
                                                />
                                            </a>
                                        </Link>
                                    </Col>
                                )
                            })}
                    </Row>
                    {/* Service category listing end */}
                </Container>
            </section >
            {/* Site Main Banner End */}

            {/* Services near you section start */}
            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Services near you</h2>
                        <a href="" className="view-more">
                            view more{' '}
                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
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
                                                    serviceImage={service.serviceImage}
                                                    serviceTitle={service.serviceTitle}
                                                    serviceProvider={service.serviceProvider}
                                                    serviceProviderLocation={service.serviceProviderLocation}
                                                    serviceDescription={service.serviceDescription}
                                                    serviceRating={service.serviceRating}
                                                    servicePrice={service.servicePrice}
                                                    hasOffer={service.hasOffer}
                                                    discountRate={service.discountRate}
                                                    discountOn={service.discountOn}
                                                />
                                            </a>
                                        </Link>
                                    </Col>
                                )
                            })}
                    </Row>
                </Container>
            </section>
            {/* Services near you section end */}

            {/* Popular services section start */}
            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Our Popular Services</h2>
                        <a href="" className="view-more">
                            view more{' '}
                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
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
                                                    serviceImage={service.serviceImage}
                                                    serviceTitle={service.serviceTitle}
                                                    serviceProvider={service.serviceProvider}
                                                    serviceProviderLocation={service.serviceProviderLocation}
                                                    serviceDescription={service.serviceDescription}
                                                    serviceRating={service.serviceRating}
                                                    servicePrice={service.servicePrice}
                                                    hasOffer={service.hasOffer}
                                                    discountRate={service.discountRate}
                                                    discountOn={service.discountOn}
                                                />
                                            </a>
                                        </Link>

                                    </Col>
                                )
                            })}
                    </Row>
                </Container>
            </section>
            {/* Popular services section end */}

            {/* Browse service by category section start */}
            <section id="browse-category" className="browse-category">
                <Container fluid="xl">
                    <h1 className="section-main-title">Browse services by category</h1>
                    <Row className="gx-5">
                        {serviceCategory &&
                            serviceCategory.map((category) => {
                                return (
                                    <Col xs={6} sm={4} lg={2} key={category.id}>
                                        <CategoryCard
                                            categoryTitle={category.categoryTitle}
                                            categoryIcon={category.categoryIcon}
                                        />
                                    </Col>
                                )
                            })}
                    </Row>
                    <Row className="gx-5">
                        {serviceCategory &&
                            serviceCategory.map((category) => {
                                return (
                                    <Col xs={6} sm={4} lg={2} key={category.id}>
                                        <CategoryCard
                                            categoryTitle={category.categoryTitle}
                                            categoryIcon={category.categoryIcon}
                                        />
                                    </Col>
                                )
                            })}
                    </Row>
                    {/* Service category listing end */}
                </Container>
            </section>
            {/* Browse service by category section end */}

            {/* Find & Hire section start */}
            <section id="find-hire" className="find-hire">
                <Container fluid="xl">
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
                                )
                            })}
                    </Row>
                </Container>
            </section>
            {/* Find & Hire section end */}

            {/* Top Rated Merchant Section Start */}
            <section id="top-merchants" className="top-merchants">
                <Container fluid="xl">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Top Rated Merchants</h2>
                        <a href="" className="view-more">
                            view more{' '}
                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
                        </a>
                    </div>
                    <Row className="gx-5">
                        {merchants &&
                            merchants.map((merchant) => {
                                return (
                                    <Col sm={6} lg={4} xl={3} key={merchant.id}>
                                        <MerchantCard
                                            merchantImage={merchant.merchantImage}
                                            merchantName={merchant.merchantName}
                                            merchantCategory={merchant.merchantCategory}
                                            merchantLocation={merchant.merchantLocation}
                                            merchantDescription={merchant.merchantDescription}
                                            merchantRating={merchant.merchantRating}
                                            merchantPrice={merchant.merchantPrice}
                                            happyClients={merchant.happyClients}
                                            successRate={merchant.successRate}
                                        />
                                    </Col>
                                )
                            })}
                    </Row>
                </Container>
            </section>
            {/* Top Rated Merchant Section End */}

            {/* Find oppurtunities section start */}
            <section id="find-hire" className="find-hire">
                <Container fluid="xl">
                    <h1 className="section-main-title">Find Oppurtunities</h1>
                    <h2 className="section-sub-title">
                        Finding job can never be this easy
                    </h2>
                    <Row className="gx-5">
                        {findOpportuities &&
                            findOpportuities.map((card) => {
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
                                )
                            })}
                    </Row>
                </Container>
            </section>
            {/* Find oppurtunities section end */}

            {/* Tasks you may like section start */}
            <section id="tasks-you-may-like" className="tasks-you-may-like">
                <Container fluid="xl">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Tasks You May Like</h2>
                        <a href="" className="view-more">
                            view more{' '}
                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
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
                                )
                            })}
                    </Row>
                </Container>
            </section>
            {/* Tasks you may like section end */}
        </Layout >
    )
}

export default Home
