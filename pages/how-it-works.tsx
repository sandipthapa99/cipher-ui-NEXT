import AllCategoryCard from "@components/common/AllCategoryCard";
import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { AllCategoryCardContent } from "staticData/categoryCardContent";
const HowItWorks: NextPage = () => {
    return (
        <Layout title="How it Works | Cipher">
            <section className="how-it-works">
                <Breadcrum currentPage="How it Works" />
                <Container fluid="xl">
                    <div className="how-it-works__top-container">
                        <h1>See how things work in Cipher</h1>
                        <p>
                            Here is the video that can be very helpful to know
                            about Cipher
                        </p>
                        <figure className="thumbnail-img footer-img">
                            <Image
                                src="/howitworks/economic.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="economic-image"
                            />
                        </figure>
                    </div>
                    <div className="how-it-works__categories">
                        <h1>Our categories</h1>
                        <p>Choose category according to your needs.</p>
                        <Row className="gy-4 align-tems-stretch">
                            {AllCategoryCardContent &&
                                AllCategoryCardContent.map((category) => {
                                    return (
                                        <Col
                                            className="gx-4 align-items-stretch"
                                            sm={4}
                                            xs={12}
                                            md={3}
                                            // lg={4}
                                            key={category.id}
                                        >
                                            <AllCategoryCard
                                                categoryImage={category.image}
                                                categoryTitle={category.name}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default HowItWorks;
