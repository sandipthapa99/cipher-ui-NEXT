import Breadcrum from "@components/common/Breadcrum";
import CardBtn from "@components/common/CardBtn";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Accordion, Col, Container, Row } from "react-bootstrap";

const PayrollServices: NextPage = () => {
    return (
        <Layout title="Payroll-Services | Cipher">
            <section className="payroll-services">
                <section className="payroll-services__header">
                    <Container fluid="xl">
                        <Breadcrum currentPage="Payroll Services" />
                        <Row className="d-flex align-items-center">
                            <Col md={6}>
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/payrollservices/main.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="boy-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6}>
                                <h1>Cipher Payroll</h1>
                                <p>
                                    Cipher Payroll makes it easy to classify and
                                    pay your freelance team. So you can focus on
                                    growing your business and leave the admin
                                    hassle to us.
                                </p>
                                <CardBtn
                                    btnTitle="Contact Us"
                                    color="#fff"
                                    backgroundColor="primary-color"
                                />
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="payroll-services__content">
                    <Container fluid="xl">
                        <div className="clients">
                            <LongSquareImageCard
                                title="A Existing Clients in Cipher"
                                image="/payrollservices/girlsmiling.svg"
                                subtitle="Get more value for same cost"
                                imageOnRight={true}
                                buttonText="Contact Us"
                                description="“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
                            />
                        </div>
                        <div className="taskers card-block">
                            <Row>
                                <Col md={7} sm={12}>
                                    <Row>
                                        <div className="d-flex images">
                                            <div className="text-center">
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src="/payrollservices/tasker1.svg"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="man-image"
                                                    />
                                                </figure>
                                                <p>Tasker</p>
                                            </div>
                                            <div className="text-center">
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src="/payrollservices/tasker2.svg"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="man-image"
                                                    />
                                                </figure>
                                                <p>Tasker</p>
                                            </div>
                                        </div>
                                    </Row>
                                </Col>
                                <Col md={5} sm={12}>
                                    <div className="content">
                                        <h1>
                                            Running your business is better
                                            through Cipher Payroll
                                        </h1>
                                        <p>
                                            With Cipher Payroll you can be
                                            confident you&apos;re complying with
                                            federal and state classification
                                            laws wherever your talent is based.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="video">
                            <h1>
                                Find out how Upwork Payroll can help your
                                business
                            </h1>
                            <figure className="thumbnail-img">
                                <Image
                                    src="/payrollservices/video.svg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="man-image"
                                />
                            </figure>
                        </div>
                        <div className="gradient-container">
                            <GradientBanner
                                title=" An employee takes home 10% more with Cipher Payroll "
                                subTitle="“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500. "
                                image="/discover/main.svg"
                                btnText="Join Us"
                            />
                        </div>
                        <div className="help-page-content__faq-container faq">
                            <h1>Frequently Asked Questions</h1>
                            <Accordion flush>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        How can i grow my carrer with Cipher?{" "}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            With Cagtu, a custom app development
                                            project starts with you preparing
                                            and then submitting a request for
                                            proposal, also referred to as an
                                            RFP(request for proposal). It will
                                            help us create a tailored,
                                            individualised response.
                                        </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        What can i gain from freelancing with
                                        Cipher?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            With Cagtu, a custom app development
                                            project starts with you preparing
                                            and then submitting a request for
                                            proposal, also referred to as an
                                            RFP(request for proposal). It will
                                            help us create a tailored,
                                            individualised response.
                                        </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        What is Cipher?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            With Cagtu, a custom app development
                                            project starts with you preparing
                                            and then submitting a request for
                                            proposal, also referred to as an
                                            RFP(request for proposal). It will
                                            help us create a tailored,
                                            individualised response.
                                        </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>
                                        How long does the project take?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            The implementation time depends on
                                            the type of order, the technology
                                            chosen, and the amount of work that
                                            needs to be done. We always try to
                                            establish a realistic time frame for
                                            completing the project. Most MVP
                                            (Minimum Viable Product) versions
                                            are implemented within 2-4 months of
                                            signing the contract. Also, we
                                            develop projects through long-term
                                            collaboration plans that have no end
                                            date.
                                        </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>
                                        How do you provide project estimates?
                                        What are the modes of communication that
                                        you use?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            Team Cagtu carries out scoping and
                                            estimation for our customers&apos;
                                            projects through the tools developed
                                            in-house. We can schedule a call,
                                            proceed with email communication, or
                                            stay in contact through any instant
                                            messenger convenient to you. If all
                                            the specialists required for your
                                            project are available, we start the
                                            work as soon as possible, or even
                                            immediately.
                                        </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Container>
                </div>
            </section>
        </Layout>
    );
};

export default PayrollServices;
