import Breadcrum from "@components/common/Breadcrum";
import CommunityGuidelineCard from "@components/common/CommunityGuidelineCard";
import FaqContent from "@components/common/Faq";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { faqContent } from "staticData/faq";
import { taskerServices, trustedPartners } from "staticData/taskerMarketPlace";

const waysToHire = [
    {
        id: "0",
        title: "Meet with your recruiter",

        desc: "Give us a few details about your project and set up a time to talk with your recruiter.",
    },
    {
        id: "1",

        title: "Receive a shortlist",
        desc: "Posting a task or getting your work done requires only few easy clicks.",
    },
    {
        id: "2",
        title: "Select and hire",

        desc: "Choose the best fit for your team.",
    },
];

const TaskerMarketPlace: NextPage = () => {
    return (
        <Layout title="Tasker Marketplace | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="tasker-marketplace">
                    <Breadcrum currentPage="Tasker Marketplace" />

                    <div className="tasker-marketplace__top-container">
                        <LongSquareImageCard
                            title="Post a job today, hire tomorrow"
                            image="/taskermarketplace/girl.svg"
                            description="Connect with talent that gets you, and hire them to take your business to the next level."
                            homeImage={true}
                            buttonText="Browse Talents"
                            imageOnRight={false}
                        />
                    </div>
                    <div className="tasker-marketplace__ways">
                        <LongSquareImageCard
                            title="Easy way to hire talents"
                            image="/taskermarketplace/search.svg"
                            imageOnRight={true}
                            description={waysToHire}
                        />
                    </div>
                    <div className="tasker-marketplace__services">
                        <h1>What you&apos;ll get?</h1>
                        <Row className="gx-5">
                            {taskerServices &&
                                taskerServices.map((info) => (
                                    <Col
                                        className="guideline-col"
                                        key={info.id}
                                        lg={4}
                                        md={6}
                                        sm={12}
                                    >
                                        <CommunityGuidelineCard
                                            cardTitle={info.cardTitle}
                                            cardDescription={
                                                info.cardDescription
                                            }
                                            cardImage={info.cardImage}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                    <div className="tasker-marketplace__partners">
                        <h1>Trusted Partners</h1>
                        <div className="content">
                            {trustedPartners &&
                                trustedPartners.map((partner) => (
                                    <h1 key={partner.id}>{partner.name}</h1>
                                ))}
                        </div>
                    </div>
                    <div className="tasker-marketplace__faq">
                        <h1>Frequently Asked Questions</h1>
                        <Accordion flush>
                            {faqContent &&
                                faqContent.map((faq) => (
                                    <FaqContent
                                        answer={faq.answer}
                                        key={faq.id}
                                        id={faq.id}
                                        question={faq.question}
                                    />
                                ))}
                        </Accordion>
                    </div>
                </section>
            </Container>
        </Layout>
    );
};

export default TaskerMarketPlace;
