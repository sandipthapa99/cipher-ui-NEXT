import SelectInputField from '@components/common/SelectInputField'
import ServiceCard from '@components/common/ServiceCard'
import Layout from '@components/Layout'
import { faChevronDown, faHeart, faSearch, faShare } from '@fortawesome/pro-regular-svg-icons'
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
                            Discover the world of services & get paid for your time
                            </p>
                        </div>
                        {/* Hero Text End Here */}
                    </div>

                    <div className="site-main-banner--search-bar">
                        <Formik
                        initialValues={HomeSearchdata}
                        validationSchema={HomeSearchSchema}
                        onSubmit={async(values, actions) => {console.log(values)}}>
                            <div className="search_box">
                                <div className="dropdown-wrapper">
                                    <div className="dropdown">
                                        <SelectInputField
                                            name="experience"
                                            placeHolder="All"
                                            options={myOptions}
                                            fieldRequired
                                        />
                                        <FontAwesomeIcon icon={faChevronDown} className="svg-icon"/>
                                    </div>
                                </div>
                                <div className="search_field">
                                    <input type="text" className="input" placeholder="Find your services"/>
                            </div>
                                    <Button className='search-btn'>
                                        <FontAwesomeIcon icon={faSearch} className="icon"/>
                                    </Button>
                                </div>
                        </Formik>
                    </div>


                    <Row className="gx-5">
                        <Col xs={6} sm={4} lg={2}>
                            <div className="card-block">
                                <div className="card-block__image-block">
                                    <figure className="thumbnail-icon">
                                        <Image
                                            src="/heroImages/img1.png"
                                            alt="assist-img1"
                                            height={48}
                                            width={48}
                                        />
                                    </figure>
                                </div>
                                <p>Health & Care</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} lg={2}>
                            <div className="card-block">
                                <div className="card-block__image-block">
                                    <figure className="thumbnail-icon">
                                        <Image
                                            src="/heroImages/img2.png"
                                            alt="assist-img2"
                                            height={48}
                                            width={48}
                                        />
                                    </figure>
                                </div>
                                <p>Household</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} lg={2}>
                            <div className="card-block">
                                <div className="card-block__image-block">
                                    <figure className="thumbnail-icon">
                                        <Image
                                            src="/heroImages/img3.png"
                                            alt="assist-img3"
                                            height={48}
                                            width={48}
                                        />
                                    </figure>
                                </div>
                                <p>Beauty</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} lg={2}>
                            <div className="card-block">
                                <div className="card-block__image-block">
                                    <figure className="thumbnail-icon">
                                        <Image
                                            src="/heroImages/img4.png"
                                            alt="assist-img4"
                                            height={48}
                                            width={48}
                                        />
                                    </figure>
                                </div>
                                <p>Courier Services</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} lg={2}>
                            <div className="card-block">
                                <div className="card-block__image-block">
                                    <figure className="thumbnail-icon">
                                        <Image
                                            src="/heroImages/img5.png"
                                            alt="assist-img5"
                                            height={48}
                                            width={48}
                                        />
                                    </figure>
                                </div>
                                <p>Maintenance</p>
                            </div>
                        </Col>
                        <Col xs={6} sm={4} lg={2}>
                            <div className="card-block">
                                <div className="card-block__image-block">
                                    <figure className="thumbnail-icon">
                                        <Image
                                            src="/heroImages/img6.png"
                                            alt="assist-img6"
                                            height={48}
                                            width={48}
                                        />
                                    </figure>
                                </div>
                                <p>Fitness</p>
                            </div>
                        </Col>
                    </Row>

                    
                </Container>
      </section>
      {/* Site Main Banner End */}

      {/* Services near you section start */}
      <section id="services-near-you" className="services-near-you">
        <Container fluid="xl">
        <h2 className="heading-title">Services near you</h2>
        <Row className="gx-5">
            {services && services.map((service)=>{
                return(
                    <Col sm={6} md={4} lg={3} key={service.id}>
                        <ServiceCard
                        serviceImage={service.serviceImage}
                        serviceTitle={service.serviceTitle}
                        serviceProvider={service.serviceProvider}
                        serviceProviderLocation={service.serviceProviderLocation}
                        serviceDescription={service.serviceDescription}
                        serviceRating={service.serviceRating}
                        servicePrice= {service.servicePrice}
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
        <h2 className="heading-title">Our Popular Services</h2>
        <Row className="gx-5">
            {services && services.map((service)=>{
                return(
                    <Col sm={6} md={4} lg={3} key={service.id}>
                        <ServiceCard
                        serviceImage={service.serviceImage}
                        serviceTitle={service.serviceTitle}
                        serviceProvider={service.serviceProvider}
                        serviceProviderLocation={service.serviceProviderLocation}
                        serviceDescription={service.serviceDescription}
                        serviceRating={service.serviceRating}
                        servicePrice= {service.servicePrice}
                        />
                    </Col>
                )
            })}
        </Row>
        </Container>
      </section>
      {/* Popular services section end */}
    </Layout>
  )
}

export default Home
