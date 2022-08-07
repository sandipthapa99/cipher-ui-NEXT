import Breadcrum from "@components/common/Breadcrum";
import CardBtn from "@components/common/CardBtn";
import CipherCard from "@components/common/CipherCard";
import FaqContent from "@components/common/Faq";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import Image from "next/image";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { affiliateGetStarted } from "staticData/affiliate";
import { faqContent } from "staticData/faq";
import { trustedPartners } from "staticData/taskerMarketPlace";

const AffiliateProgram = () => {
    return (
        <Layout title="Affiliate Program | Cipher">
            <section className="affiliate-hero-section">
                <Breadcrum currentPage="Affiliate Program" />
                <Container className="px-5" fluid="xl">
                    <Row className="gx-5">
                        <Col
                            md={5}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <figure className="thumbnail-img d-none d-md-block">
                                <Image
                                    src="/illustrations/affiliate-hero.svg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="affiliate-hero-img"
                                />
                            </figure>
                        </Col>
                        <Col
                            md={7}
                            className="d-flex align-items-center justify-content-center"
                        >
                            <div className="affiliate-hero-section__text-wrapper">
                                <h1>Welcome to our affilate program</h1>
                                <p>
                                    Become a Cipher affiliate and earn a 20%
                                    monthly commission. Join today to get a
                                    signup bonus and boost your earnings with
                                    one of the top affiliate software platforms.
                                </p>
                                <ul>
                                    <li>24/7 customer support</li>
                                    <li>No setup fee</li>
                                    <li>No credit card required</li>
                                    <li>No credit card required</li>
                                    <li>Cancel anytime</li>
                                </ul>
                                <CardBtn
                                    backgroundColor="#211D4F"
                                    btnTitle="Join Now"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Container className="px-5" fluid="xl">
                <section className="affiliate-partners-section">
                    <div className="content">
                        {trustedPartners &&
                            trustedPartners.map((partner) => (
                                <h1 key={partner.id}>{partner.name}</h1>
                            ))}
                    </div>
                </section>
                <section className="affiliate-get-started-section">
                    <h1 className="heading-title">Get started</h1>
                    <h2>It&apos;s easy to join us</h2>
                    <Row className="gx-5">
                        {affiliateGetStarted &&
                            affiliateGetStarted.map((card) => {
                                return (
                                    <Col md={4} key={card.id}>
                                        <CipherCard
                                            thumbnailImg={card.thumbnailImg}
                                            title={card.title}
                                            description={card.description}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                </section>

                <section className="affiliate-how-it-works">
                    <h1 className="heading-title">How does it work?</h1>
                    <h2>
                        We handle everything &#8211; hosting the roducts,
                        handling customer service, and you get paid for
                        referring visitors to our websites.
                    </h2>
                    <Row className="gx-5">
                        <Col md={6}>
                            <div className="table-card">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Referred sales</th>
                                            <th>Commission level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <ul>
                                                    <li>All sales</li>
                                                    <li>Trial upgrades</li>
                                                    <li>
                                                        Recurring commissions
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>
                                                <ul>
                                                    <li>20%</li>
                                                    <li>20%</li>
                                                    <li>20%</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="right-text">
                                <h1 className="heading-title">
                                    How much can you make?
                                </h1>
                                <p>
                                    Our affiliate program is easy to promote and
                                    has a high conversion rate. Approximately
                                    one out of every 66 visitors buys our
                                    product, making it a surefire way to earn
                                    money.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </section>

                <section className="why-cipher">
                    <LongSquareImageCard
                        title="Why Cipher"
                        subtitle="The world's work marketplace"
                        image="/affiliate/why-cipher.png"
                        description="Businesses and independent professionals from
                                around the world come to Upwork to grow their
                                businesses, take control of their careers, and
                                create meaningful work relationships."
                        buttonText="See How"
                        imageOnRight={false}
                    />
                </section>

                <section className="affiliate-faqs">
                    <h1>Frequently asked questions</h1>
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
                </section>
            </Container>
        </Layout>
    );
};
export default AffiliateProgram;
