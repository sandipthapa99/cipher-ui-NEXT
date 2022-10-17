import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import MessageCard from "@components/common/MessageCard";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { messageCard } from "staticData/messageCard";

const HowItWorks: NextPage = () => {
    return (
        <Layout title="How it Works | Homaale">
            <Container fluid="xl" className="px-5">
                <section className="how-it-works">
                    <BreadCrumb currentPage="How it Works" />

                    <div className="how-it-works__top-container">
                        <h1>See how things work in Homaale</h1>
                        <p>
                            Here is the video that can be very helpful to know
                            about Homaale
                        </p>

                        <figure className="thumbnail-img footer-img">
                            <iframe
                                width="100%"
                                height="100%"
                                src={
                                    "https://www.youtube.com/embed/dxhzAqQsqAo"
                                }
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </figure>
                    </div>

                    <div className="how-it-works__content card-block">
                        <LongSquareImageCard
                            title="Post your skills"
                            subtitle=""
                            image="/howitworks/howitwork.svg"
                            description="Become a tasker and grab an opportunity to earn as a freelancer or an organisation by posting your skills for services and the desired rate for it. The decision to either accept or reject the task is completely on you. You can also choose to apply for the posted tasks and negotiate the amount quoted. Your payment will be released once you complete the task."
                            imageOnRight={true}
                        />
                    </div>
                    <div className="how-it-works__communicate service-card-block">
                        <div className="communicate-card">
                            <Row className="gx-2">
                                <Col lg={5} md={12}>
                                    <div className="communicate-card__left-container">
                                        <h1>Reach out to each other</h1>

                                        <div className="connect">
                                            <h4>Reach out to us</h4>
                                            <p>
                                                Use Homaale to stay in contact
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
                                                Homaale messaging to discuss
                                                task details, and get your task
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

export default HowItWorks;
