import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Image from 'next/image'
import CommunityActivityCard from '@components/common/communityActivity'
import CommunityGuidelineCard from '@components/common/CommunityGuidelineCard'
import CommunityBlogCard from '@components/common/communityBlogCard'
import {
  communityGuidelineCardContent,
  communityActivityContent,
  communityBlogCardContent,
} from 'staticData/community'

import { Carousel } from 'react-bootstrap'
const Community: NextPage = () => {
  return (
    <Layout title="Community | Cipher">
      <Breadcrum currentPage="Discover" />

      <div className="community-page">
        <Container fluid="xl">
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
                  Let&apos; root for each other & <br></br> watch each other
                  grow
                </h3>
                <p>Communicate with others for your own benefit</p>
                <Button className="button">Join Us</Button>
              </Col>
            </Row>
          </div>
          <div className="community-page__gallery">
            <h1>Community Gallery</h1>
            <Carousel>
              <Carousel.Item interval={1000}>
                <Row>
                  <Col md={6} className="community-page__gallery-leftImage">
                    <figure className="thumbnail-img">
                      <Image
                        src="/community/gallery1.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                  <Col md={6} className="community-page__gallery-rightImage">
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
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <Row>
                  <Col md={6} className="community-page__gallery-leftImage">
                    <figure className="thumbnail-img">
                      <Image
                        src="/community/gallery1.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                  <Col md={6} className="community-page__gallery-rightImage">
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
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="community-page__guidelines py-5">
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

          <div className="community-page__activity py-5">
            <h1>Community activity</h1>
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
            <Carousel.Item interval={1000}>
              <div className="community-page__goal py-">
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
            <Carousel.Item interval={1000}>
              <div className="community-page__goal py-">
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

          <div className="community-page__blogs">
            <h1>Blogs</h1>
            <Row>
              {communityBlogCardContent &&
                communityBlogCardContent.map((blog) => {
                  return (
                    <Col
                      // sm={6}
                      md={4}
                      // lg={4}
                      key={blog.id}
                    >
                      <CommunityBlogCard
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
      </div>
    </Layout>
  )
}

export default Community
