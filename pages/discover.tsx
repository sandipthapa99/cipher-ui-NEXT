import AboutCard from '@components/common/AboutCard'
import AllCategoryCard from '@components/common/AllCategoryCard'
import Breadcrum from '@components/common/Breadcrum'
import BigButton from '@components/common/Button'
import MerchantAdviceCard from '@components/common/MerchantAdviceCard'
import MerchantCard from '@components/common/MerchantCard'
import ServiceCard from '@components/common/ServiceCard'
import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { AllCategoryCardContent } from 'staticData/categoryCardContent'
import { merchantAdvice } from 'staticData/merchantAdvice'
import { merchants } from 'staticData/merchants'
import { oppurtunitiesCardContent } from 'staticData/oppurtunities'
import { servicesDiscover } from 'staticData/services'

const Discover: NextPage = () => {
  return (
    <Layout title="Discover | Cipher">
      <Container fluid="xl">
        <section className="discover-page">
          <Breadcrum currentPage="Discover" />

          {/* Discover top container start */}
          <section className="discover-page__top-container">
            <div className="gradient"></div>
            <figure className="thumbnail-img">
              <Image
                src="/discover/main.svg"
                layout="fill"
                objectFit="cover"
                alt="oppurtunities-page-main-image"
              />
            </figure>
            <div className="overlay">
              <h1>
                Looking to earn money <br /> quickly?
              </h1>
              <div className="bottom-content">
                <p>It doesn&apos;t even take a minute to sign up</p>
                <BigButton btnTitle="Join Us" backgroundColor="#fff" />
                {/* <Button className="btn">Join Us</Button> */}
              </div>
            </div>
          </section>
          {/* Discover top container end */}
          {/* Services near you section start */}
          <section
            id="services-near-you"
            className="discover-page__services-section"
          >
            <Row className="gx-5 d-flex align-items-stretch">
              {servicesDiscover &&
                servicesDiscover.map((service) => {
                  return (
                    <Col
                      className="discover-col d-fle align-items-stretch"
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
                      sm={4}
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
          </section>
          {/* merchants section ended */}

          {/* grap oppurtunities section start */}
          <section className="discover-page__oppurtunities">
            <h1>Grab Oppurtunities</h1>
            <p>Choose the most suitable tasks and get paid</p>
            <Row className="gx-5">
              {oppurtunitiesCardContent &&
                oppurtunitiesCardContent.map((oppurtunities) => {
                  return (
                    <Col
                      // sm={6}
                      md={4}
                      // lg={4}
                      key={oppurtunities.id}
                    >
                      <AboutCard
                        cardImage={oppurtunities.cardImage}
                        cardTitle={oppurtunities.cardTitle}
                        cardDescription={oppurtunities.cardDescription}
                      />
                    </Col>
                  )
                })}
            </Row>
          </section>
          {/* grab oppurtunities section end */}

          <section className="discover-page__merchant-advice">
            {merchantAdvice &&
              merchantAdvice.map((advice) => {
                return (
                  <MerchantAdviceCard
                  key={advice.id}
                    image={advice.image}
                    title={advice.title}
                    subtitle={advice.subtitle}
                    description={advice.description}
                  />
                )
              })}
          </section>
        </section>
      </Container>
    </Layout>
  )
}

export default Discover
