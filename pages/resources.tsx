import BlogCard from "@components/common/BlogCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import BusinessGoal from "@components/common/BusinessGoal";
import RecommendationChips from "@components/common/RecommendationChips";
import { SearchInputField } from "@components/common/SearchInputField";
import Layout from "@components/Layout";
import { East } from "@mui/icons-material";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { resourceCarouselContent } from "staticData/resourceCarouselContent";
import type { BlogValueProps } from "types/blogs";
import searchValidationSchema from "utils/formValidation/searchValidation";
const Resources: NextPage = () => {
    const { data: blogData } = useData<BlogValueProps>(["all-blogs"], "/blog/");
    return (
        <Layout
            title="Resources | Homaale"
            description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them.
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
            keywords="homaale, homaale-resources, airtasker-nepali,nepali-working-platform, business, online-business"
        >
            <section className="resource-page">
                <section className="resource-page__header">
                    <Container fluid="xl" className="px-4">
                        <BreadCrumb currentPage="Resources" />
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
                                <SearchInputField
                                    validationSchema={searchValidationSchema}
                                    placeholder="Search Resources"
                                />

                                <div className="recommendation">
                                    <RecommendationChips title="Guides" />
                                    <RecommendationChips title="Research" />
                                    <RecommendationChips title="Success Stories" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="resource-page__content">
                    <Container fluid="xl" className="px-4">
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
                            <div className="title-wrapper d-flex justify-content-between">
                                {/* <h2 className="heading-title">Community activity</h2> */}
                                <h3>Featured Resources</h3>
                                <Link href="/blogs">
                                    <a className="view-more">
                                        view more <East className="svg-icon" />
                                    </a>
                                </Link>
                            </div>
                            <Row>
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
                        {/* <div className="latest-article">
                            <h1>What Our Merchants Like</h1>
                            <Row>
                                {blogData &&
                                    blogData?.data?.result
                                        ?.slice(0, 2)
                                        .map((blog, key) => {
                                            return (
                                                <Col
                                                    className="d-flex align-items-stretch"
                                                    // sm={6}
                                                    md={6}
                                                    // lg={4}
                                                    key={key}
                                                >
                                                    <BlogCard blogData={blog} />
                                                </Col>
                                            );
                                        })}
                            </Row>
                        </div> */}
                        {/* <div className="bottom-container">
                            <h1>What Our Clients Like</h1>
                            <Row>
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
                        </div> */}
                    </Container>
                </div>
            </section>
        </Layout>
    );
};

export default Resources;
