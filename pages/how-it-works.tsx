import { BreadCrumb } from "@components/common/BreadCrumb";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import MessageCard from "@components/common/MessageCard";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { messageCard } from "staticData/messageCard";

const HowItWorks: NextPage = () => {
    return (
        <Layout title="How it Works | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="how-it-works">
                    <BreadCrumb currentPage="How it Works" />

                    <div className="how-it-works__top-container">
                        <h1>See how things work in Cipher</h1>
                        <p>
                            Here is the video that can be very helpful to know
                            about Cipher
                        </p>

                        <figure className="thumbnail-img footer-img">
                            <iframe
                                width="100%"
                                height="100%"
                                src={
                                    "https://www.youtube.com/embed/Ke90Tje7VS0"
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
                            title="How does it work?"
                            subtitle="What do you need done?"
                            image="/howitworks/howitwork.svg"
                            description="Start by telling us about your task. Mention when and where (in person or online) you need it done, then suggest a fair budget for the task. Post any task you need from cleaning to web design in only two minutes – for free! There's no obligation to hire. Take a look at profiles and reviews to pick the best Tasker for your task. When you accept an offer, your payment is held securely with Airtasker Pay until the task is complete. Now you can message and call the Tasker to sort out the details."
                            imageOnRight={true}
                        />
                    </div>
                    <div className="how-it-works__communicate service-card-block">
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

export default HowItWorks;
