import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Button, Row } from 'react-bootstrap'
import Image from 'next/image'
import CommonCard from '@components/common/CommonCard'
import { services } from 'staticData/services'
import ServiceCard from '@components/common/ServiceCard'
import {
  faChevronDown,
  faAngleRight,
  faSearch,
} from '@fortawesome/pro-regular-svg-icons'
import AllCategoryCard from '@components/common/AllCategoryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AllCategoryCardContent } from 'staticData/categoryCardContent'
const Discover: NextPage = () => {
  return (
    <Layout title="Discover | Cipher">
      <div className="discover-page">
        <Breadcrum currentPage="Discover" />
        <Container fluid="xl">
          {/* Discover top container start */}
          <section className="discover-page__top-container">
            <div className="gradient"></div>
            <figure className="thumbnail-img">
              <Image
                src="/discover/main.svg"
                layout="fill"
                objectFit="cover"
                alt="about-page-main-image"
              />
            </figure>
            <div className="overlay">
              <h1>
                Looking to earn money <br /> quickly?
              </h1>
              <div className="bottom-content">
                <p>It doesn't even take a minute to sign up</p>
                <Button className="btn">Join Us</Button>
              </div>
            </div>
          </section>
          {/* Discover top container end */}
          {/* Services near you section start */}
          <section
            id="services-near-you"
            className="services-near-you discover-page__services-section"
          >
            <Container fluid="xl">
              <Row className="gx-5">
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
            </Container>
          </section>
          {/* Services near you section end */}

          {/* Our categories section started */}
          <section className="discover-page__categories">
            <h1>Our categories</h1>
            <p>Choose category according to your needs.</p>
            <Row className="gy-4 align-tems-stretch">
              {AllCategoryCardContent &&
                AllCategoryCardContent.map((category) => {
                  return (
                    <Col
                      className="gx-4 align-items-stretch"
                      sm={6}
                      xs={12}
                      md={3}
                      // lg={4}
                      key={category.id}
                    >
                      <AllCategoryCard
                        categoryImage={category.image}
                        categoryTitle={category.name}
                      />
                    </Col>
                  )
                })}
            </Row>
          </section>
          {/* Our categories section ended */}
          {/* merchants section start */}
          <section className="discover-page__merchants">
            <h1>Top Merchants</h1>
          </section>
          {/* merchants section ended */}
        </Container>
      </div>
    </Layout>
  )
}

export default Discover
