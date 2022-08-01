import Breadcrum from "@components/common/Breadcrum";
import BigButton from "@components/common/Button";
import LongSquareImageCard from "@components/common/LongSquareImageCard";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

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
                                <BigButton
                                    btnTitle="Contact Us"
                                    backgroundColor="$primary-color"
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
                    </Container>
                </div>
            </section>
        </Layout>
    );
};

export default PayrollServices;
