import BlogCard from "@components/common/BlogCard";
import Breadcrum from "@components/common/Breadcrum";
import BusinessGoal from "@components/common/BusinessGoal";
import InputField from "@components/common/InputField";
import RecommendationChips from "@components/common/RecommendationChips";
import Layout from "@components/Layout";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import type { NextPage } from "next";
import Image from "next/image";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { blogCardContent } from "staticData/community";
import { resourceCarouselContent } from "staticData/resourceCarouselContent";
import { latestArticle, popularContent } from "staticData/resources";
import searchValidationSchema from "utils/formValidation/searchValidation";
const Resources: NextPage = () => {
    return (
        <Layout title="Resources | Cipher">
            <section className="resource-page">
                <section className="resource-page__header">
                    <Container fluid="xl">
                        <Breadcrum currentPage="Resources" />
                        <Row className="d-flex align-items-center">
                            <Col md={6}>
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/resources/home.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="boy-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6}>
                                <h1>Resources Centre</h1>

                                <Formik
                                    initialValues={{ name: "" }}
                                    validationSchema={searchValidationSchema}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form className="search">
                                            <InputField
                                                type="text"
                                                name="text"
                                                error={errors.name}
                                                touch={touched.name}
                                                placeHolder="Search Resources"
                                            />

                                            <button
                                                type="submit"
                                                className="btn"
                                                disabled={isSubmitting}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                    className="svg-icon"
                                                />
                                            </button>
                                        </Form>
                                    )}
                                </Formik>

                                <div className="recommendation">
                                    <RecommendationChips title="Guides" />
                                    <RecommendationChips title="Research" />
                                    <RecommendationChips title="Success Stories" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="resource-page__content">
                    <Container fluid="xl">
                        <div className="carousel">
                            <Carousel>
                                {resourceCarouselContent &&
                                    resourceCarouselContent.map((goal) => {
                                        return (
                                            <Carousel.Item
                                                //interval={1000}
                                                key={goal.id}
                                            >
                                                <BusinessGoal
                                                    cardImage={goal.cardImage}
                                                    cardTitle={goal.cardTitle}
                                                    cardAuthor={goal.cardAuthor}
                                                    cardDescription={
                                                        goal.cardDescription
                                                    }
                                                />
                                            </Carousel.Item>
                                        );
                                    })}
                            </Carousel>
                        </div>
                        <div className="featured-resources">
                            <h3>Featured Resources</h3>
                            <Row>
                                {blogCardContent &&
                                    blogCardContent.map((blog) => {
                                        return (
                                            <Col
                                                className="d-flex align-items-stretch"
                                                // sm={6}
                                                md={4}
                                                // lg={4}
                                                key={blog.id}
                                            >
                                                <BlogCard
                                                    cardImage={blog.cardImage}
                                                    cardDescription={
                                                        blog.cardDescription
                                                    }
                                                    cardTitle={blog.cardTitle}
                                                />
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </div>
                        <div className="latest-article">
                            <h1>Latest Article</h1>
                            <Row>
                                {latestArticle &&
                                    latestArticle.map((blog) => {
                                        return (
                                            <Col
                                                className="d-flex align-items-stretch"
                                                // sm={6}
                                                md={6}
                                                // lg={4}
                                                key={blog.id}
                                            >
                                                <BlogCard
                                                    cardImage={blog.cardImage}
                                                    cardDescription={
                                                        blog.cardDescription
                                                    }
                                                    cardTitle={blog.cardTitle}
                                                />
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </div>
                        <div className="bottom-container">
                            <Row>
                                {popularContent &&
                                    popularContent.map((blog) => {
                                        return (
                                            <Col
                                                className="d-flex align-items-stretch"
                                                // sm={6}
                                                md={4}
                                                // lg={4}
                                                key={blog.id}
                                            >
                                                <BlogCard
                                                    cardImage={blog.cardImage}
                                                    cardDescription={
                                                        blog.cardDescription
                                                    }
                                                    cardTitle={blog.cardTitle}
                                                />
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </div>
                    </Container>
                </section>
            </section>
        </Layout>
    );
};

export default Resources;
