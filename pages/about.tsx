import AboutCard from "@components/common/AboutCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { aboutCardContent } from "staticData/aboutCardContent";

const About: NextPage = () => {
    return (
        <Layout title="About Us | Cipher">
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
                                    <h1>About Cipher</h1>
                                    <h4>
                                        We are an on demand app that connects
                                        customers with about providers.{" "}
                                    </h4>
                                    <p>
                                        Living in a competitive world and busy
                                        life, most of us are always seeking help
                                        to complete most of our daily works.
                                        Finding services at an instant has been
                                        quite a hassle, therefore, Mr. Suman
                                        Parajuli and Mrs. Sikha Parajuli,
                                        respectively CEO and Founder of CIPHER,
                                        created a team with a vision to provide
                                        a digital platform where you can easily
                                        post your tasks and services and get it
                                        done.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="purpose-container gx-5">
                            <Col md={6}>
                                <div className="about-information purpose">
                                    <h1>Story Behind CIPHER</h1>
                                    <p>
                                        Serve the community by providing
                                        everyone the platform to showcase their
                                        skills, talents, and minimise the stress
                                        of job hunting for every individual. We
                                        cater to people from all walks of life,
                                        and we intend to be the best at what we
                                        do. The tasks one might need may range
                                        from anything between getting your room
                                        painted, or getting an entire software
                                        developed. In today&apos;s fast paced
                                        environment, one might not have the time
                                        to manage their household errands as
                                        they might want to, or you might be an
                                        entrepreneur wanting to finish your
                                        project on a deadline, and this is
                                        exactly where CIPHER is going to be your
                                        trusted partner for everything. Go
                                        through the app, search for the abouts
                                        you want to avail, and in a few clicks,
                                        your task will be completed within your
                                        desired timeframe.
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
                        <h1>Our economic growth</h1>
                        <p>
                            The video below illustrates the Freelancer online
                            economy. Increases in capital goods, labor force,
                            technology, and human capital can all contribute to
                            economic growth. Every business also operates within
                            the economy. Based on their economic expectations,
                            businesses decide what products to produce, how to
                            price them, how many people to employ, how much to
                            pay these employees, how much to expand the
                            business, and so on.
                        </p>
                        <figure className="thumbnail-img footer-img">
                            <Image
                                src="/aboutus/egrowth.png"
                                layout="fill"
                                objectFit="cover"
                                alt="about-page-footer-image"
                            />
                        </figure>
                    </div>
                </Container>
            </div>
        </Layout>
    );
};

export default About;
