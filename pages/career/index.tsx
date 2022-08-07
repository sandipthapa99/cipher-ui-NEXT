import CareerCard from "@components/Career/CareerCard";
import HiringStage from "@components/Career/HiringStage";
import LeaveYourCV from "@components/Career/LeaveYourCV";
import Breadcrum from "@components/common/Breadcrum";
import { Tab } from "@components/common/Tab";
import Layout from "@components/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { careerCardValues } from "staticData/careerCardValues";

const Career = () => {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <Layout title="Cipher | Careers">
            <section id="careers-section" className="careers-section">
                <Breadcrum currentPage="Career" />
                <Container fluid="xl">
                    <div className="d-flex justify-content-between align-items-center flex-column-reverse flex-md-row">
                        <div className="careers-index">
                            <h1>Find the career you deserve</h1>
                            <p>
                                With 1000 of job opportunities since we began:
                                <br />
                                creating jobs and income isn’t just a by-product
                                of the work we do, it’s our core purpose.
                            </p>
                            <div className="careers-index__popular">
                                Popular Categories:{" "}
                                <ul>
                                    <li>UX Designer</li>
                                    <li>Front-end developer</li>
                                </ul>
                            </div>
                        </div>
                        <figure>
                            <Image
                                src={"/business.png"}
                                alt="buiness pic"
                                layout="fill"
                            />
                        </figure>
                    </div>
                    <Row className="g-5 mt-5">
                        <Col lg={3}>
                            <figure className="demand-img">
                                <Image
                                    src={"/womenBuis.png"}
                                    alt="buiness pic"
                                    layout="fill"
                                />
                            </figure>
                        </Col>
                        <Col md={12} lg={9}>
                            <div className="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row">
                                <h2>Demanded Positions</h2>
                                <Link href={""}>
                                    <a>View all</a>
                                </Link>
                            </div>
                            <Row className="gx-5">
                                {careerCardValues
                                    ?.slice(0, 6)
                                    ?.map((values, key) => (
                                        <Col
                                            lg={4}
                                            md={6}
                                            className="d-flex"
                                            key={key}
                                        >
                                            <CareerCard values={values} />
                                        </Col>
                                    ))}
                            </Row>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-between align-items-lg-center pe-0 part-wrapper">
                        <div className="part-wrapper__details">
                            Become a part of <span>Cipher</span>
                            <p>Boost your skills and excel with us.</p>
                        </div>
                        <figure>
                            <Image
                                src={"/groupB.png"}
                                alt="buiness pic"
                                layout="fill"
                            />
                        </figure>
                    </div>
                    <div className="mt-5">
                        <h4>New Job Listings</h4>
                        <Tab
                            items={[
                                {
                                    title: "All categories",
                                    content: (
                                        <Row className="gx-5">
                                            {careerCardValues.map(
                                                (values, key) => (
                                                    <Col
                                                        lg={3}
                                                        md={4}
                                                        className="d-flex"
                                                        key={key}
                                                    >
                                                        <CareerCard
                                                            values={values}
                                                        />
                                                    </Col>
                                                )
                                            )}
                                        </Row>
                                    ),
                                },
                                {
                                    title: "Design",
                                    content: (
                                        <Row className="gx-5">
                                            {careerCardValues.map(
                                                (values, key) => (
                                                    <Col
                                                        lg={4}
                                                        md={6}
                                                        className="d-flex"
                                                        key={key}
                                                    >
                                                        test
                                                    </Col>
                                                )
                                            )}
                                        </Row>
                                    ),
                                },
                            ]}
                            activeIndex={tabIndex}
                            onTabClick={setTabIndex}
                        />
                    </div>
                    <HiringStage />
                    <LeaveYourCV />
                </Container>
            </section>
        </Layout>
    );
};

export default Career;