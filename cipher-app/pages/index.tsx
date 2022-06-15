import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

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
                    <Row className="gx-5">
                        <Col xs={6} sm={4} md={2}>
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
                        <Col xs={6} sm={4} md={2}>
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
                        <Col xs={6} sm={4} md={2}>
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
                        <Col xs={6} sm={4} md={2}>
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
                        <Col xs={6} sm={4} md={2}>
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
                        <Col xs={6} sm={4} md={2}>
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
    </Layout>
  )
}

export default Home
