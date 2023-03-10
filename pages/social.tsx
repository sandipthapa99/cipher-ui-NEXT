import BlogCard from "@components/common/BlogCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { East } from "@mui/icons-material";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { businessGoal } from "staticData/businessGoal"; //DONOT Remove
import type { BlogValueProps } from "types/blogs";

const SocialResponsibilities: NextPage = () => {
    const { data: blogData } = useData<BlogValueProps>(["all-blogs"], "/blog/");
    return (
        <Layout
            title="Social Responsibilities | Homaale"
            description="Homaale is a platform designed to provide service booking solutions to the
        service seekers and business opportunities to various service providing companies by bridging a gap between them.
         It covers a wide range of services from various industries like Accounting, Gardening,
        Health, Beauty, and many more."
            keywords="homaale, homaale-social, responsibilities, social, airtasker-nepali,nepali-working-platform, business, online-business"
        >
            <section className="social-page">
                <Container fluid="xl" className="px-4">
                    <BreadCrumb currentPage="Social responsibilities" />
                    <div className="social-page__top-container">
                        <h1>Social Responsibilites</h1>
                        <h4>Towards Community</h4>
                        <figure className="thumbnail-img">
                            <Image
                                src="/social/Ellipse1.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="socialpage-image"
                            />
                        </figure>
                        <div className="card">
                            <div className="description">
                                <h4>Our Vision</h4>
                                <p>
                                    ???We believe in our team and the work that
                                    they have been putting in, to incorporate a
                                    platform for all the service providers and
                                    service seekers using technological
                                    advancement and visualise a better everyday
                                    life for the community.???
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="social-page__commitment">
                        {/* <h1>Our commitment towards future sustainibility</h1> */}
                        <figure className="thumbnail-img">
                            <Image
                                src="/social/commitment.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="socialpage-image"
                            />
                        </figure>
                    </div>
                    {/* <Carousel>
                        {businessGoal &&
                            businessGoal.map((goal) => {
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
                    </Carousel> */}

                    <div className="social-page__blogs">
                        <div className="title-wrapper d-flex justify-content-between">
                            {/* <h2 className="heading-title">Community activity</h2> */}
                            <h1>Our Blogs</h1>
                            <Link href={"/blogs/"}>
                                <a className="view-more">
                                    view more
                                    <East className="svg-icon" />
                                </a>
                            </Link>
                        </div>
                        <Row className="gx-5">
                            {blogData &&
                                blogData?.data?.result?.map((blog, key) => {
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
                </Container>
            </section>
        </Layout>
    );
};

export default SocialResponsibilities;
