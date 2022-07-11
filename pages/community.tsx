import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Breadcrum from '@components/common/Breadcrum'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Image from 'next/image'
import CommunityGuidelineCard from '@components/common/CommunityGuidelineCard'
import { communityGuidelineCardContent, communityAvtivityCardContent } from 'staticData/community'
const Community: NextPage = () => {
  return (
    <Layout title="Community | Cipher">
      <div className="community-page__header">
        <Breadcrum currentPage="Discover" />
      </div>

      <div className="community-page">
        <Container fluid="xl">
          <div className="community-page__top-container">
            <Row className="d-flex justify-content-center align-items-center">
              <Col md={6}>
                <figure className="thumbnail-img">
                  <Image
                    src="/community/earth.png"
                    layout="fill"
                    objectFit="cover"
                    alt="earth-image"
                  />
                </figure>
              </Col>
              <Col md={6}>
                <h3>
                  Let’s root for each other & <br></br> watch each other grow
                </h3>
                <p>Communicate with others for your own benefit</p>
                <Button className="button">Join Us</Button>
              </Col>
            </Row>
          </div>
          <div className="community-page__gallery">
            <h1>Community Gallery</h1>
            <Row>
              <Col md={6} className="community-page__gallery__leftImage">
                <figure className="thumbnail-img">
                  <Image
                    src="/community/gallery1.png"
                    layout="fill"
                    objectFit="cover"
                    alt="earth-image"
                  />
                </figure>
              </Col>
              <Col md={6} className="community-page__gallery__rightImage">
                <Row className="gx-3">
                  <Col md={6} className="pb-3">
                    <figure className="thumbnail-img">
                      <Image
                        src="/community/gallery2.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                  <Col md={6}>
                    <figure className="thumbnail-img">
                      <Image
                        src="/community/gallery3.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                </Row>
                <Row className="gx-3">
                  <Col md={6}>
                    <figure className="thumbnail-img">
                      <Image
                        src="/community/gallery4.png"
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                      />
                    </figure>
                  </Col>
                  <Col md={6}>
                    <figure className="thumbnail-img">
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
                        CardImage={guideline.cardImage}
                        CardDescription={guideline.cardDescription}
                        CardTitle={guideline.cardTitle}
                      />
                    </Col>
                  )
                })}
            </Row>
          </div>

          <div className="community-page__activity py-5">
            <h1>Community activity</h1>
            <Row className="gx-5">
              {/* {communityGuidelineCardContent &&
                communityGuidelineCardContent.map((guideline) => {
                  return (
                    <Col
                      // sm={6}
                      md={4}
                      // lg={4}
                      key={guideline.id}
                    >
                      <CommunityGuidelineCard
                        CardImage={guideline.cardImage}
                        CardDescription={guideline.cardDescription}
                        CardTitle={guideline.cardTitle}
                      />
                    </Col>
                  )
                })} */}
            </Row>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Community
