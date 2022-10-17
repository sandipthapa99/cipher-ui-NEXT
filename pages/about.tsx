import AboutCard from "@components/common/AboutCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { aboutCardContent } from "staticData/aboutCardContent";

const About: NextPage = () => {
    return (
        <Layout title="About Us | Homaale">
            <div className="about-page">
                <BreadCrumb currentPage="About Us" />
                <Container fluid="xl" className="px-5">
                    <div className="about-page__top-container">
                        <div className="main-image">
                            <figure className="thumbnail-img">
                                <Image
                                    src="/aboutus/img1.svg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="about-page-main-image"
                                />
                            </figure>
                        </div>

                        <div className="aboutus_overlay">
                            <p>
                                Bridging the gap between individuals for growth.
                            </p>
                        </div>
                    </div>
                    <div className="about-page__purpose">
                        <Row>
                            <Col md={6} className="aboutus-images">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/aboutus/scope-1.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="about-page-main-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6}>
                                <div className="about-information">
                                    <h1>About Homaale</h1>
                                    <h4>
                                        We are an on demand app that connects
                                        customers with about providers.{" "}
                                    </h4>
                                    <p>
                                        We are an emerging on demand app that
                                        connects customers with their service
                                        providers. Homaale is a platform
                                        incepted with the idea of bridging the
                                        gap between individuals who need a
                                        certain task completed and those who
                                        have the skills to complete it within a
                                        given timeframe. We have diverse service
                                        categories to choose from. Go through
                                        our app, search for the services you
                                        need or want to provide, negotiate your
                                        task rate and get that work done.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="purpose-container gx-5">
                            <Col md={6}>
                                <div className="about-information purpose">
                                    <h1>Story Behind Homaale</h1>
                                    <p>
                                        Living in a competitive world and busy
                                        life, most of us are always seeking help
                                        to complete most of our daily works.
                                        Finding services at an instant has been
                                        quite a hassle, therefore, Mr. Suman
                                        Parajuli and Mrs. Sikha Parajuli,
                                        respectively CEO and Founder of Homaale,
                                        created a team with a vision to provide
                                        a digital platform where you can easily
                                        post your tasks and services and get it
                                        done.
                                    </p>
                                </div>
                            </Col>
                            <Col md={6} className="aboutus-images pt-4">
                                <figure className="thumbnail-img purpose ">
                                    <Image
                                        src="/aboutus/about-2.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="about-page-main-image"
                                    />
                                </figure>
                            </Col>
                        </Row>
                    </div>

                    <div className="about-page__scope">
                        <h1>Our Scope</h1>
                        <Row className="gx-5">
                            {aboutCardContent &&
                                aboutCardContent.map((about) => {
                                    return (
                                        <Col
                                            // sm={6}
                                            md={4}
                                            // lg={4}
                                            key={about.id}
                                        >
                                            <AboutCard
                                                cardImage={about.cardImage}
                                                cardTitle={about.cardTitle}
                                                cardDescription={
                                                    about.cardDescription
                                                }
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
                    <div className="about-page__footer">
                        <h1>Economic Growth</h1>
                        <p>
                            With the minimum charge for every task we take, our
                            vision is to provide a platform for all to make
                            their everyday work easier. The objective of Homaale
                            is to provide the businesses a platform to expand
                            their client reach in an easy way. Bearing in mind
                            that finding clients in this competitive world is
                            difficult, we believe that our platform will be a
                            solution to achieve your desired outcomes and boost
                            your economy..
                        </p>
                        <figure className="thumbnail-img footer-img">
                            <iframe
                                width="100%"
                                height="100%"
                                src={
                                    "https://www.youtube.com/embed/QIKZaRYg5bA"
                                }
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </figure>
                    </div>
                </Container>
            </div>
        </Layout>
    );
};

export default About;
