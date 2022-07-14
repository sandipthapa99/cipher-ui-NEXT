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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'

import { Carousel } from 'react-bootstrap'
const Community: NextPage = () => {
  return (
    <Layout title="Community | Cipher">
      <section className="community-page">
        <Breadcrum currentPage="Discover" />
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
                Let&apos; root for each other & <br></br> watch each other grow
              </h3>
              <p>Communicate with others for your own benefit</p>
              <Button className="button">Join Us</Button>
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
            <Row className="gx-5 d-flex align-items-stretch">
              {communityGuidelineCardContent &&
                communityGuidelineCardContent.map((guideline) => {
                  return (
                    <Col
                      className="gx-5 d-flex align-items-stretch"
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
              <a href="" className="view-more">
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
            <Carousel.Item
            //interval={1000}
            >
              <div className="community-page-main__goal">
                <div className="image">
                  <figure className="thumbnail-img">
                    <Image
                      src="/community/Ellipse.svg"
                      layout="fill"
                      objectFit="cover"
                      alt="earth-image"
                    />
                  </figure>
                </div>
                <div className="description">
                  <h2>Business goal</h2>
                  <p>
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Doloremque maiores, iure voluptatem sit quia error fuga
                    eveniet veritatis quod dolorum nostrum nemo cum! Inventore
                    eos ut voluptatem officiis placeat sit quibusdam maxime
                    tenetur quo recusandae voluptas obcaecati qui, accusantium
                    aspernatur ipsam! Minus molestiae accusamus incidunt
                    corrupti, totam magnam veritatis delectus?"
                  </p>
                  <p className="author">Roshani Panday, Makeup Artist</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item
            //interval={1000}
            >
              <div className="community-page-main__goal py-">
                <div className="image">
                  <figure className="thumbnail-img">
                    <Image
                      src="/community/Ellipse.svg"
                      layout="fill"
                      objectFit="cover"
                      alt="earth-image"
                    />
                  </figure>
                </div>
                <div className="description">
                  <h2>Our goal</h2>
                  <p>
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Doloremque maiores, iure voluptatem sit quia error fuga
                    eveniet veritatis quod dolorum nostrum nemo cum! Inventore
                    eos ut voluptatem officiis placeat sit quibusdam maxime
                    tenetur quo recusandae voluptas obcaecati qui, accusantium
                    aspernatur ipsam! Minus molestiae accusamus incidunt
                    corrupti, totam magnam veritatis delectus?"
                  </p>
                  <p className="author">Roshani Panday, Makeup Artist</p>
                </div>
              </div>
            </Carousel.Item>
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
