import AboutCard from "@components/common/AboutCard";
import BlogCard from "@components/common/BlogCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import ServiceCard from "@components/common/ServiceCard";
import SquareImageCarousel from "@components/common/SquareImageCarousel";
import Layout from "@components/Layout";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import {
    growBusinessCarousel,
    growBusinessSteps,
} from "staticData/growBusiness";
import { services } from "staticData/services";
import type { BlogValueProps } from "types/blogs";
import type { ServicesValueProps } from "types/serviceCard";

const GrowYourBusiness: NextPage = () => {
    const { data: blogData } = useData<BlogValueProps>(["all-blogs"], "/blog/");
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <Layout title="Grow Your Business | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="grow-business">
                    <BreadCrumb currentPage="Grow Your Business" />

                    {/* Discover top container start */}
                    <section className="grow-business__top-container">
                        {/* Discover top container end */}

                        <Carousel>
                            {growBusinessCarousel &&
                                growBusinessCarousel.map((item) => {
                                    return (
                                        <Carousel.Item
                                            key={item.id}
                                            //interval={1000}
                                        >
                                            <SquareImageCarousel
                                                image={item.image}
                                                title={item.title}
                                                description={item.description}
                                                buttonText={item.buttonText}
                                            />
                                        </Carousel.Item>
                                    );
                                })}
                        </Carousel>
                    </section>
                    {/* steps section start */}
                    <section className="grow-business__steps">
                        <h1>How to win more clients?</h1>
                        <Row className="gx-5">
                            {growBusinessSteps &&
                                growBusinessSteps.map((step) => {
                                    return (
                                        <Col
                                            className="steps-col"
                                            sm={6}
                                            md={3}
                                            key={step.id}
                                        >
                                            <AboutCard
                                                cardDescription={
                                                    step.description
                                                }
                                                cardImage={step.image}
                                                cardTitle={step.title}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                    {/* steps secrion end */}
                    {/* Services near you section start */}
                    <section
                        id="services-near-you"
                        className="grow-business__services"
                    >
                        <Row className="gx-5">
                            {servicesData &&
                                servicesData?.data?.result?.map(
                                    (service, key) => {
                                        return (
                                            <Col
                                                className="discover-col"
                                                sm={6}
                                                md={6}
                                                lg={3}
                                                key={key}
                                            >
                                                <ServiceCard
                                                    serviceCard={service}
                                                />
                                            </Col>
                                        );
                                    }
                                )}
                        </Row>
                        <Row className="gx-5 more-services">
                            {services &&
                                servicesData?.data?.result?.map(
                                    (service, key) => {
                                        return (
                                            <Col sm={6} md={4} lg={3} key={key}>
                                                <ServiceCard
                                                    serviceCard={service}
                                                />
                                            </Col>
                                        );
                                    }
                                )}
                        </Row>
                    </section>
                    {/* Services near you section end */}

                    {/* blog section start */}
                    <section className="grow-business__blogs">
                        <h1>Blogs</h1>
                        <Row className="gx-5">
                            {blogData &&
                                blogData?.data?.result
                                    ?.slice(0, 3)
                                    .map((blog, key) => {
                                        return (
                                            <Col
                                                className="d-flex align-items-stretch"
                                                sm={6}
                                                md={4}
                                                // lg={4}
                                                key={key}
                                            >
                                                <BlogCard blogData={blog} />
                                            </Col>
                                        );
                                    })}
                        </Row>
                    </section>
                    {/* blog section end */}
                    <section className="grow-business__queries">
                        <h1>Any More queries?</h1>
                        <p>
                            Please free to visit our
                            <Link href="/"> Help Center</Link> for more details
                        </p>
                    </section>
                </section>
            </Container>
        </Layout>
    );
};

export default GrowYourBusiness;
