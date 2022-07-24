import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Image from 'next/image'
import CommunityActivityCard from '@components/common/communityActivity'
import CommunityGuidelineCard from '@components/common/CommunityGuidelineCard'
import BlogCard from '@components/common/BlogCard'
import {
  communityGuidelineCardContent,
  communityActivityContent,
  blogCardContent,
} from 'staticData/community'
import BigButton from '@components/common/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'
import BusinessGoal from '@components/common/BusinessGoal'
import { businessGoal } from 'staticData/businessGoal'
import { Carousel } from 'react-bootstrap'
const Community: NextPage = () => {
  return (
    <Layout title="Community | Cipher">
      <section className="community-page">
        <Breadcrum currentPage="Community" />
        <div className="community-page__top-container">
          <Row className="top-row">
            <Col
              md={6}
              sm={6}
              // lg={4}
            >
              <figure className="thumbnail-img">
                <Image
                  src="/community/earth.png"
                  layout="fill"
                  objectFit="cover"
                  alt="earth-image"
                />
              </figure>
            </Col>
            <Col md={6} sm={6}>
              <h3>
                Let&apos; root for each other &amp; <br></br> watch each other
                grow
              </h3>
              <p>Communicate with others for your own benefit</p>
              <BigButton
                btnTitle="Join Us"
                backgroundColor="#fff"
                textColor=""
              />
            </Col>
          </Row>
        </div>
      </section>
      <section className="community-page-main">
        <Container fluid="xl">
          <div className="community-page-main__gallery">
            <h1>Community Gallery</h1>

            <Row>
              <Col md={6} className="leftImage">
                <figure className="thumbnail-img">
                  <Image
                    src="/community/gallery1.png"
                    layout="fill"
                    objectFit="cover"
                    alt="earth-image"
                  />
                </figure>
              </Col>
              <Col md={6} className="rightImage">
                <Row className="gx-5">
                  <Col md={6} sm={6} className="pb-4">
                    <figure className="thumbnail-img small-gallery">
                      <Image
                        src="/community/gallery2.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                  <Col md={6} sm={6}>
                    <figure className="thumbnail-img small-gallery">
                      <Image
                        src="/community/gallery3.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                </Row>
                <Row className="gx-5">
                  <Col md={6} sm={6}>
                    <figure className="thumbnail-img small-gallery">
                      <Image
                        src="/community/gallery4.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                  <Col md={6} sm={6}>
                    <figure className="thumbnail-img small-gallery">
                      <Image
                        src="/community/gallery5.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="community-page-main__guidelines">
            <h1>Community guidelines</h1>
            <p>
              {' '}
              To assist clients and merchants in their personal and professional
              pursuits
            </p>
            <Row className="gx-5">
              {communityGuidelineCardContent &&
                communityGuidelineCardContent.map((guideline) => {
                  return (
                    <Col
                      className="gx-5 guideline-card-col"
                      // sm={6}
                      md={4}
                      // lg={4}
                      key={guideline.id}
                    >
                      <CommunityGuidelineCard
                        cardImage={guideline.cardImage}
                        cardDescription={guideline.cardDescription}
                        cardTitle={guideline.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </div>

          <div className="community-page-main__activity">
            {/* <h1>Community activity</h1> */}
            <div className="title-wrapper d-flex justify-content-between">
              {/* <h2 className="heading-title">Community activity</h2> */}
              <h1>Community activity</h1>
              <a href="/pages" className="view-more">
                view more{' '}
                <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
              </a>
            </div>
            <Row className="gx-5">
              {communityActivityContent &&
                communityActivityContent.map((activity) => {
                  return (
                    <Col
                      // sm={6}
                      md={6}
                      // lg={4}
                      key={activity.id}
                    >
                      <CommunityActivityCard
                        comments={activity.comments}
                        position={activity.position}
                        react={activity.react}
                        cardImage={activity.cardImage}
                        name={activity.name}
                        cardDescription={activity.description}
                        cardTitle={activity.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </div>
          <Carousel>
            {businessGoal &&
              businessGoal.map((goal) => {
                return (
                  <Carousel.Item
                    key={goal.id}
                    //interval={1000}
                  >
                    <BusinessGoal
                      cardImage={goal.cardImage}
                      cardTitle={goal.cardTitle}
                      cardAuthor={goal.cardAuthor}
                      cardDescription={goal.cardDescription}
                    />
                  </Carousel.Item>
                )
              })}
          </Carousel>

          <div className="community-page-main__blogs">
            <h1>Blogs</h1>
            <Row>
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
                      <BlogCard
                        cardImage={blog.cardImage}
                        cardDescription={blog.cardDescription}
                        cardTitle={blog.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </div>
        </Container>
      </section>
    </Layout>
  )
}

export default Community
