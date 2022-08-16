import CareerCard from "@components/Career/CareerCard";
import HiringStage from "@components/Career/HiringStage";
import LeaveYourCV from "@components/Career/LeaveYourCV";
import { BreadCrumb } from "@components/common/BreadCrumb";
import { Tab } from "@components/common/Tab";
import Layout from "@components/Layout";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { careerCardValues } from "staticData/careerCardValues";
import type { CareerValueProps } from "types/careerValuesProps";
import { axiosClient } from "utils/axiosClient";

const Career = ({ careerData }: { careerData: CareerValueProps }) => {
    const { result } = careerData ?? [];
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <Layout title="Cipher | Careers">
            <section id="careers-section" className="careers-section">
                <BreadCrumb currentPage="Career" />
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
                            <h2>Demanded Positions</h2>
                            <Row className="gx-5">
                                {result
                                    ? result
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
                                          ))
                                    : "No current postions avilable"}
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
                                            {result?.map((values, key) => (
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
                                            ))}
                                        </Row>
                                    ),
                                },
                                {
                                    title: "Design",
                                    content: (
                                        <Row className="gx-5">
                                            {careerCardValues?.map(
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
                                {
                                    title: "Design",
                                    content: (
                                        <Row className="gx-5">
                                            {careerCardValues?.map(
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
                                {
                                    title: "Design",
                                    content: (
                                        <Row className="gx-5">
                                            {careerCardValues?.map(
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

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: careerData } = await axiosClient.get(
            "/career/vacancy/list/"
        );
        if (careerData.error) throw new Error(careerData.error.message);
        return {
            props: {
                careerData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                blogsData: [],
            },
            revalidate: 10,
        };
    }
};
