import { BreadCrumb } from "@components/common/BreadCrumb";
import CardBtn from "@components/common/CardBtn";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import GradientBanner from "@components/GradientBanner";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

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
                                    We designed CIPHER Payroll to make the
                                    organisational transitioning easy for you.
                                    While providing your services to customers,
                                    you can easily track your employee costs
                                    with us.
                                </p>
                                <Link href={"/contact"}>
                                    <a>
                                        <CardBtn
                                            btnTitle="Contact Us"
                                            color="#fff"
                                            backgroundColor="primary-color"
                                        />
                                    </a>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="payroll-services__content">
                    <Container fluid="xl" className="px-5">
                        <div className="clients">
                            <LongSquareImageCard
                                title="Service Providers in CIPHER"
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
                                        <div className="d-flex flex-column flex-sm-row align-items-center images">
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
                        <div className="gradient-container p-3">
                            <GradientBanner
                                title="CIPHER provides a hassle free payroll service for all your employees who is working through CIPHER "
                                subTitle="“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500. "
                                image="/discover/main.svg"
                                btnText="Join Us"
                            />
                        </div>
                    </Container>
                </div>
            </section>
        </Layout>
    );
};

export default PayrollServices;
