import SelectInputField from '@components/common/SelectInputField'
import ServiceCard from '@components/common/ServiceCard'
import Layout from '@components/Layout'
import { faChevronDown, faAngleRight, faSearch } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import type { NextPage } from 'next'
import Image from 'next/image'
import { NextRouter } from 'next/router'
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import HomeSearchSchema from 'utils/formValidation/homeSearchValidation'
import { HomeSearchdata } from 'utils/homeSearchData'
import {
    myOptions
} from "utils/options";
import { services } from 'staticData/services';
import { merchants } from 'staticData/merchants';
import { tasks } from 'staticData/task';
import CategoryCard from '@components/common/CategoryCard'
import { serviceCategory } from 'staticData/serviceCategory'
import Link from 'next/link'
import MerchantCard from '@components/common/MerchantCard'
import TaskCard from '@components/common/TaskCard'

const Home: NextPage = () => {
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
                            <p>
                                Discover the world of services &amp; get paid for your time
                            </p>
                        </div>
                        {/* Hero Text End Here */}
                    </div>

                    <div className="site-main-banner--search-bar">
                        <Formik
                            initialValues={HomeSearchdata}
                            validationSchema={HomeSearchSchema}
                            onSubmit={async (values) => { console.log(values) }}>
                            <div className="search_box">
                                <div className="dropdown-wrapper">
                                    <div className="dropdown">
                                        <SelectInputField
                                            name="experience"
                                            placeHolder="All"
                                            options={myOptions}
                                            fieldRequired
                                        />
                                        <FontAwesomeIcon icon={faChevronDown} className="svg-icon" />
                                    </div>
                                </div>
                                <div className="search_field">
                                    <input type="text" className="input" placeholder="Find your services" />
                                </div>
                                <Button className='search-btn'>
                                    <FontAwesomeIcon icon={faSearch} className="icon" />
                                </Button>
                            </div>
                        </Formik>
                    </div>

                    {/* Service category listing start */}
                    <Row className="gx-5">
                        {serviceCategory && serviceCategory.map((category) => {
                            return (
                                <Col xs={6} sm={4} lg={2} key={category.id}>
                                    <CategoryCard
                                        categoryTitle={category.categoryTitle}
                                        categoryIcon={category.categoryIcon} />
                                </Col>
                            )
                        })}
                    </Row>
                    {/* Service category listing end */}


                </Container>
            </section>
            {/* Site Main Banner End */}

            {/* Services near you section start */}
            <section id="services-near-you" className="services-near-you">
                <Container fluid="xl">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Services near you</h2>
                        <a href="" className='view-more'>view more <FontAwesomeIcon icon={faAngleRight} className="svg-icon" /></a>
                    </div>
                    <Row className="gx-5">
                        {services && services.map((service) => {
                            return (
                                <Col sm={6} md={4} lg={3} key={service.id}>
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
                        <a href="" className='view-more'>view more <FontAwesomeIcon icon={faAngleRight} className="svg-icon" /></a>
                    </div>
                    <Row className="gx-5">
                        {services && services.map((service) => {
                            return (
                                <Col sm={6} md={4} lg={3} key={service.id}>
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
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </section>
            {/* Popular services section end */}

            {/* Browse service by category section start */}
            <section id='browse-category' className="browse-category">
                <Container fluid="xl">
                    <h1 className="section-main-title">
                        Browse services by category
                    </h1>
                    <Row className="gx-5">
                        {serviceCategory && serviceCategory.map((category) => {
                            return (
                                <Col xs={6} sm={4} lg={2} key={category.id}>
                                    <CategoryCard
                                        categoryTitle={category.categoryTitle}
                                        categoryIcon={category.categoryIcon} />
                                </Col>
                            )
                        })}
                    </Row>
                    <Row className="gx-5">
                        {serviceCategory && serviceCategory.map((category) => {
                            return (
                                <Col xs={6} sm={4} lg={2} key={category.id}>
                                    <CategoryCard
                                        categoryTitle={category.categoryTitle}
                                        categoryIcon={category.categoryIcon} />
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
                    <h1 className="section-main-title">Find & Hire</h1>
                    <h2 className="section-sub-title">Get those work done.</h2>
                    <Row>
                        <Col md={4} className="d-flex align-items-stretch">
                            <div className="find-hire-card-block">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/services/hire1.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt=""
                                    />

                                </figure>
                                <div className="card-content">
                                    <h2>Post a Task</h2>
                                    <p>
                                        Have a project that you need to finish ? Log in to CIPHER, type in the requirements, your budget, time constraints and post the same. Sit back, and relax while CIPHER finds a suitable tasker for you.
                                    </p>

                                    <Link href="">
                                        <a>
                                            Post Task
                                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <div className="find-hire-card-block">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/services/hire2.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt=""
                                    />

                                </figure>
                                <div className="card-content">
                                    <h2>Browse Talents</h2>
                                    <p>
                                        Looking for some place to showcase your talent, and earn while you do it ? Well, look no more, login to CIPHER, and access all the tasks on the portal for you to choose from.
                                    </p>

                                    <Link href="">
                                        <a>
                                            Browse Talents
                                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <div className="find-hire-card-block">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/services/hire3.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt=""
                                    />

                                </figure>
                                <div className="card-content">
                                    <h2>Get Help</h2>
                                    <p>
                                        Stuck somewhere on CIPHER, have questions ? Fret not, our hands on team is always ready to address your queries, and provide you with real time soultions.
                                    </p>

                                    <Link href="">
                                        <a>
                                            Get Help
                                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
            {/* Find & Hire section end */}

            {/* Top Rated Merchant Section Start */}
            <section id="top-merchants" className="top-merchants">
                <Container fluid="xl">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Top Rated Merchants</h2>
                        <a href="" className='view-more'>view more <FontAwesomeIcon icon={faAngleRight} className="svg-icon" /></a>
                    </div>
                    <Row className="gx-5">
                        {merchants && merchants.map((merchant) => {
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
                    <h2 className="section-sub-title">Finding job can never be this easy</h2>
                    <Row>
                        <Col md={4} className="d-flex align-items-stretch">
                            <div className="find-hire-card-block">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/services/opp1.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt=""
                                    />

                                </figure>
                                <div className="card-content">
                                    <h2>Win new clients </h2>
                                    <p>
                                        Have a project that you need to finish ? Log in to CIPHER, type in the requirements, your budget, time constraints and post the same. Sit back, and relax while CIPHER finds a suitable tasker for you.
                                    </p>

                                    <Link href="">
                                        <a>
                                            Win new clients
                                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <div className="find-hire-card-block">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/services/opp2.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt=""
                                    />

                                </figure>
                                <div className="card-content">
                                    <h2>Grow Your Business</h2>
                                    <p>
                                        Looking for some place to showcase your talent, and earn while you do it ? Well, look no more, login to CIPHER, and access all the tasks on the portal for you to choose from.

                                    </p>

                                    <Link href="">
                                        <a>
                                            Grow your business
                                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="d-flex align-items-stretch">
                            <div className="find-hire-card-block">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/services/opp3.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt=""
                                    />

                                </figure>
                                <div className="card-content">
                                    <h2>Get Help</h2>
                                    <p>
                                        Stuck somewhere on CIPHER, have questions ? Fret not, our hands on team is always ready to address your queries, and provide you with real time soultions.
                                    </p>

                                    <Link href="">
                                        <a>
                                            Get Help
                                            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
            {/* Find oppurtunities section end */}

            {/* Tasks you may like section start */}
            <section id="tasks-you-may-like" className="tasks-you-may-like">
                <Container fluid="xl">
                    <div className="title-wrapper d-flex justify-content-between">
                        <h2 className="heading-title">Tasks You May Like</h2>
                        <a href="" className='view-more'>view more <FontAwesomeIcon icon={faAngleRight} className="svg-icon" /></a>
                    </div>
                    <Row className="gx-5">
                        {tasks && tasks.map((task) => {
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
        </Layout>
    )
}

export default Home
