import AllCategoryCard from "@components/common/AllCategoryCard";
import Breadcrum from "@components/common/Breadcrum";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import MessageCard from "@components/common/MessageCard";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { AllCategoryCardContent } from "staticData/categoryCardContent";
import { howItWorkContent } from "staticData/howTtWork";
import { messageCard } from "staticData/messageCard";
const Resources: NextPage = () => {
    return (
        <Layout title="Resources | Cipher">
            <Container fluid="xl">
                <section className="resources">
                    <Breadcrum currentPage="Resources" />

                    <div className="resources__top-container">
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
                    <div className="resources__content card-block">
                        {howItWorkContent &&
                            howItWorkContent.map((info) => (
                                <LongSquareImageCard
                                    title={info.title}
                                    subtitle={info.subtitle}
                                    image={info.image}
                                    description={info.description}
                                    key={info.id}
                                />
                            ))}
                    </div>
                    <div className="resources__categories">
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
                    <div className="resources__communicate service-card-block">
                        <div className="communicate-card">
                            <Row className="gx-2">
                                <Col lg={5} md={12}>
                                    <div className="communicate-card__left-container">
                                        <h1>Communicate with us</h1>

                                        <div className="connect">
                                            <h4>Connect with us</h4>
                                            <p>
                                                Use Cipher to stay in contact
                                                from the moment your task is
                                                posted until it&apos;s
                                                completed.
                                            </p>
                                        </div>
                                        <div className="private-message">
                                            <h1>Private Messaging</h1>
                                            <p>
                                                Once you&apos;ve accepted an
                                                offer, you can instantly reach
                                                out to the Tasker via private
                                                messaging to discuss task
                                                details, and get your task
                                                completed.
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={7} md={12}>
                                    {messageCard &&
                                        messageCard.map((message) => (
                                            <MessageCard
                                                key={message.id}
                                                clientImage={
                                                    message.clientImage
                                                }
                                                merchantImage={
                                                    message.merchantImage
                                                }
                                                clientMessages={
                                                    message.clientMessages
                                                }
                                                merchantMessages={
                                                    message.merchantMessages
                                                }
                                            />
                                        ))}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </section>
            </Container>
        </Layout>
    );
};

export default Resources;
