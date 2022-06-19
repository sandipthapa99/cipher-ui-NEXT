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
import CategoryCard from '@components/common/CategoryCard'
import { serviceCategory } from 'staticData/serviceCategory'

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

                    {/* Service category listing start */}
                    <Row className="gx-5">
                        {serviceCategory && serviceCategory.map((category)=>{
                            return(
                            <Col xs={6} sm={4} lg={2}>
                                <CategoryCard
                                categoryTitle={category.categoryTitle}
                                categoryIcon={category.categoryIcon}/>
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

      {/* Browse service by category section start */}
      <section id='browse-category' className="browse-category">
        <Container fluid="xl">
            <h1 className="section-main-title d-flex justify-content-center">
            Browse services by category
            </h1>
            <Row className="gx-5">
                {serviceCategory && serviceCategory.map((category)=>{
                    return(
                    <Col xs={6} sm={4} lg={2}>
                        <CategoryCard
                        categoryTitle={category.categoryTitle}
                        categoryIcon={category.categoryIcon}/>
                    </Col>
                    )
                })}
            </Row>
            <Row className="gx-5">
                {serviceCategory && serviceCategory.map((category)=>{
                    return(
                    <Col xs={6} sm={4} lg={2}>
                        <CategoryCard
                        categoryTitle={category.categoryTitle}
                        categoryIcon={category.categoryIcon}/>
                    </Col>
                    )
                })}
            </Row>
                    {/* Service category listing end */}
        </Container>
      </section>
      {/* Browse service by category section end */}
    </Layout>
  )
}

export default Home
