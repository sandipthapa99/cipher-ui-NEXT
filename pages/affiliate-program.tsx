import Breadcrum from "@components/common/Breadcrum";
import BigButton from "@components/common/Button";
import CardBtn from "@components/common/CardBtn";
import CipherCard from "@components/common/CipherCard";
import FormButton from "@components/common/FormButton";
import Layout from "@components/Layout";
import { withAuth } from "hoc/withAuth";
import Image from "next/image";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { affiliateGetStarted } from "staticData/affiliate";
import { findHire } from "staticData/findHire";
import { isSubmittingClass } from "utils/helpers";

const AffiliateProgram = () => {
    return (
        <Layout title="Affiliate Program | Cipher">
            <section className="affiliate-hero-section">
                <Breadcrum currentPage="Affiliate Program" />
                <Container fluid="xl">
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
            <Container fluid="xl">
                <section className="affiliate-get-started-section">
                    <h1 className="heading-title">Get started</h1>
                    <h2>It&apos;s easy to join us</h2>
                    <Row className="gx-5">
                        {affiliateGetStarted &&
                            affiliateGetStarted.map((card) => {
                                return (
                                    <Col
                                        md={4}
                                        key={card.id}
                                        className="d-flex align-items-stretch"
                                    >
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
                        We handle everything &#8211; hosting the products,
                        handling customer service, and you get paid for
                        referring visitors to our websites.
                    </h2>
                    <Row className="gx-5">
                        <Col md={6}>
                            <div className="table-card">
                                {/* <table>
                                    <tr>
                                        <th>Referred sales</th>
                                        <th>Commission level</th>
                                    </tr>

                                    <tr>
                                        <td>
                                            <ul>
                                                <li>All sales</li>
                                                <li>Trial upgrades</li>
                                                <li>Recurring commissions</li>
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

                                </table> */}
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
                    <Row className="gx-5 justify-content-center align-items-center">
                        <Col md={8}>
                            <h1 className="heading-title">Why Cipher</h1>
                            <h2>The world&apos;s work marketplace</h2>
                            <p>
                                Businesses and independent professionals from
                                around the world come to Upwork to grow their
                                businesses, take control of their careers, and
                                create meaningful work relationships.
                            </p>
                            <CardBtn
                                backgroundColor="#211D4F"
                                btnTitle="See how"
                            />
                        </Col>
                        <Col md={4}>
                            <figure className="thumbnail-img d-none d-md-block">
                                <Image
                                    src="/affiliate/why-cipher.png"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="affiliate-hero-img"
                                />
                            </figure>
                        </Col>
                    </Row>
                </section>

                <section className="affiliate-faqs">
                    <h1>Frequently asked questions</h1>
                    <Accordion flush>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What is Cipher?</Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    With Cagtu, a custom app development project
                                    starts with you preparing and then
                                    submitting a request for proposal, also
                                    referred to as an RFP(request for proposal).
                                    It will help us create a tailored,
                                    individualised response.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                How long does the project take?
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    The implementation time depends on the type
                                    of order, the technology chosen, and the
                                    amount of work that needs to be done. We
                                    always try to establish a realistic time
                                    frame for completing the project. Most MVP
                                    (Minimum Viable Product) versions are
                                    implemented within 2-4 months of signing the
                                    contract. Also, we develop projects through
                                    long-term collaboration plans that have no
                                    end date.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                How do you provide project estimates? What are
                                the modes of communication that you use?
                            </Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    Team Cagtu carries out scoping and
                                    estimation for our customers&apos; projects
                                    through the tools developed in-house. We can
                                    schedule a call, proceed with email
                                    communication, or stay in contact through
                                    any instant messenger convenient to you. If
                                    all the specialists required for your
                                    project are available, we start the work as
                                    soon as possible, or even immediately.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </section>
            </Container>
        </Layout>
    );
};
export default withAuth(AffiliateProgram);
