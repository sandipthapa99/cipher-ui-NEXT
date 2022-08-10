import { BreadCrumb } from "@components/common/BreadCrumb";
import CardBtn from "@components/common/CardBtn";
import FaqContent from "@components/common/Faq";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { faqContent } from "staticData/faq";

const PayrollServices: NextPage = () => {
    return (
        <Layout title="Payroll-Services | Cipher">
            <section className="payroll-services">
                <section className="payroll-services__header">
                    <Container fluid="xl" className="px-5">
                        <BreadCrumb currentPage="Payroll Services" />
                        <Row className="d-flex gx-5 align-items-center">
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
                    <Container fluid="xl" className="px-5">
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
                            <Row className="gx-5">
                                <Col md={7} sm={12}>
                                    <Row className="gx-5">
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
                            <iframe
                                src="https://www.youtube.com/embed/E7wJTI-1dvQ"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="video"
                                height={450}
                                width="100%"
                            />
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
                    </Container>
                </div>
            </section>
        </Layout>
    );
};

export default PayrollServices;
