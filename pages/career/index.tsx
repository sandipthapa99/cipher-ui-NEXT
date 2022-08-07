import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Career = () => {
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
                    <Row className="g-5">
                        <Col md={3}>
                            <figure className="demand-img">
                                <Image
                                    src={"/womenBuis.png"}
                                    alt="buiness pic"
                                    layout="fill"
                                />
                            </figure>
                        </Col>
                        <Col md={9}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2>Demanded Positions</h2>
                                <Link href={""}>
                                    <a>View all</a>
                                </Link>
                            </div>
                            <Row>
                                <Col md={4}>asdasd</Col>
                                <Col md={4}>asdasd</Col>
                                <Col md={4}>asdasd</Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default Career;
