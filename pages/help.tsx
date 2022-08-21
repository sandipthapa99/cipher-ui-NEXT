import BlogCard from "@components/common/BlogCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import BigButton from "@components/common/Button";
import CommonCard from "@components/common/CommonCard";
import FaqContent from "@components/common/Faq";
import RecommendationChips from "@components/common/RecommendationChips";
import { SearchInputField } from "@components/common/SearchInputField";
import Layout from "@components/Layout";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { faqContent } from "staticData/faq";
import { helpCardContent } from "staticData/helpCardContent";
import type { BlogValueProps } from "types/blogs";
import searchValidationSchema from "utils/formValidation/searchValidation";

const Help: NextPage = () => {
    const { data: blogData } = useData<BlogValueProps>(["all-blogs"], "/blog/");
    return (
        <Layout title="Help &amp; Support | Cipher">
            <section className="help-page-header">
                <Container fluid="xl" className="px-5">
                    <BreadCrumb currentPage="Help &amp; Support" />
                    <div className="help-page-header__top-container">
                        <Row className="d-flex align-items-center gx-5">
                            <Col md={6}>
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/help/main-image.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="earth-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6}>
                                <h1>How can we help you?</h1>

                                <SearchInputField
                                    validationSchema={searchValidationSchema}
                                    placeholder="Search for anything"
                                />
                                <div className="recommendation">
                                    <RecommendationChips title="Connects" />
                                    <RecommendationChips title="Get Paid" />
                                    <RecommendationChips title="Work" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
            <section className="help-page-content">
                <Container fluid="xl" className="px-5">
                    <div className="help-page-content__browse-container">
                        <h1>Browse help categories</h1>
                        <Row className="gx-5">
                            {helpCardContent &&
                                helpCardContent.map((help) => {
                                    return (
                                        <Col
                                            className="help-card"
                                            // sm={6}
                                            md={4}
                                            // lg={4}
                                            key={help.id}
                                        >
                                            <CommonCard
                                                cardImage={help.cardImage}
                                                cardDescription={
                                                    help.cardDescription
                                                }
                                                cardTitle={help.cardTitle}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
                    <div className="help-page-content__contact-container gx-5">
                        <Row className="d-flex align-items-stretch gx-5">
                            <Col md={6} className="d-flex align-items-stretch">
                                <div className="card-block ">
                                    <h1>Get In Touch With Us</h1>
                                    <p>
                                        For more information, we&apos;re here
                                        for you to answer your queries.
                                    </p>

                                    <div className="contact-device">
                                        {/* <Button className="btn">Contact Us</Button> */}
                                        <BigButton
                                            btnTitle="Contact Us"
                                            backgroundColor="$primary-color"
                                            textColor="#fff"
                                        />
                                        <figure className="thumbnail-img">
                                            <Image
                                                src="/help/contact.svg"
                                                layout="fill"
                                                objectFit="cover"
                                                alt="phone-image"
                                            />
                                        </figure>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} className="d-flex align-items-stretch">
                                <div className="card-block">
                                    <h1>Ask In Community</h1>
                                    <p>
                                        The community is basically a group of
                                        CIPHER members who can anonymously reply
                                        to the queries asked.
                                    </p>

                                    <div className="contact-device">
                                        <BigButton
                                            btnTitle="Ask Us"
                                            backgroundColor="$primary-color"
                                            textColor="#fff"
                                        />
                                        <figure className="thumbnail-img">
                                            <Image
                                                src="/help/earth.svg"
                                                layout="fill"
                                                objectFit="cover"
                                                alt="earth-image"
                                            />
                                        </figure>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="help-page-content__blog-container">
                        <h1>Promoted Blogs</h1>
                        <Row className="gx-5">
                            {blogData &&
                                blogData?.data?.result
                                    ?.slice(0, 3)
                                    .map((blog, key) => {
                                        return (
                                            <Col
                                                className="d-flex align-items-stretch"
                                                // sm={6}
                                                md={4}
                                                // lg={4}
                                                key={key}
                                            >
                                                <BlogCard blogData={blog} />
                                            </Col>
                                        );
                                    })}
                        </Row>
                    </div>
                    <div className="help-page-content__faq-container">
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
            </section>
        </Layout>
    );
};

export default Help;
