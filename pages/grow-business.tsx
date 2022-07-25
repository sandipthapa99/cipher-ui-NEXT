import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Button, Row } from 'react-bootstrap'
import { oppurtunitiesCardContent } from 'staticData/oppurtunities'
import { servicesDiscover } from 'staticData/services'
import ServiceCard from '@components/common/ServiceCard'
import { blogCardContent } from 'staticData/community'
import AboutCard from '@components/common/AboutCard'
import BlogCard from '@components/common/BlogCard'
import {
  growBusinessCarousel,
  growBusinessSteps,
} from 'staticData/growBusiness'
import GrowBusinessCarousel from '@components/common/GrowBusinessCarousel'
import { Carousel } from 'react-bootstrap'
import { services } from 'staticData/services'
import Link from 'next/link'
const GrowYourBusiness: NextPage = () => {
  return (
    <Layout title="Grow Your Business | Cipher">
      <Container fluid="xl">
        <section className="grow-business">
          <Breadcrum currentPage="Grow Your Business" />

          {/* Discover top container start */}
          <section className="grow-business__top-container">
            {/* Discover top container end */}

            <Carousel>
              {growBusinessCarousel &&
                growBusinessCarousel.map((item) => {
                  return (
                    <Carousel.Item
                      key={item.id}
                      //interval={1000}
                    >
                      <GrowBusinessCarousel
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        buttonText={item.buttonText}
                      />
                    </Carousel.Item>
                  )
                })}
            </Carousel>
          </section>
          {/* steps section start */}
          <section className="grow-business__steps">
            <h1>How to win more clients?</h1>
            <Row className="gx-5">
              {growBusinessSteps &&
                growBusinessSteps.map((step) => {
                  return (
                    <Col className="steps-col" sm={6} md={3} key={step.id}>
                      <AboutCard
                        cardDescription={step.description}
                        cardImage={step.image}
                        cardTitle={step.title}
                      />
                    </Col>
                  )
                })}
            </Row>
          </section>
          {/* steps secrion end */}
          {/* Services near you section start */}
          <section id="services-near-you" className="grow-business__services">
            <Row className="gx-5">
              {servicesDiscover &&
                servicesDiscover.map((service) => {
                  return (
                    <Col
                      className="discover-col"
                      sm={6}
                      md={6}
                      lg={3}
                      key={service.id}
                    >
                      <ServiceCard
                        serviceImage={service.serviceImage}
                        serviceTitle={service.serviceTitle}
                        serviceProvider={service.serviceProvider}
                        serviceProviderLocation={
                          service.serviceProviderLocation
                        }
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
            <Row className="gx-5 more-services">
              {services &&
                services.map((service) => {
                  return (
                    <Col sm={6} md={4} lg={3} key={service.id}>
                      <ServiceCard
                        serviceImage={service.serviceImage}
                        serviceTitle={service.serviceTitle}
                        serviceProvider={service.serviceProvider}
                        serviceProviderLocation={
                          service.serviceProviderLocation
                        }
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
          </section>
          {/* Services near you section end */}

          {/* blog section start */}
          <section className="grow-business__blogs">
            <h1>Blogs</h1>
            <Row>
              {blogCardContent &&
                blogCardContent.map((blog) => {
                  return (
                    <Col
                      className="d-flex align-items-stretch"
                      sm={6}
                      md={4}
                      // lg={4}
                      key={blog.id}
                    >
                      <BlogCard
                        cardImage={blog.cardImage}
                        cardDescription={blog.cardDescription}
                        cardTitle={blog.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </section>
          {/* blog section end */}
          <section className="grow-business__queries">
            <h1>Any More queries?</h1>
            <p>
              Please free to visit our
              <Link href="/"> Help Center</Link> for more details
            </p>
          </section>
        </section>
      </Container>
    </Layout>
  )
}

export default GrowYourBusiness
