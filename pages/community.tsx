import AnchorButton from "@components/common/AnchorButton";
import { BreadCrumb } from "@components/common/BreadCrumb";
import CommunityGuidelineCard from "@components/common/CommunityGuidelineCard";
import Layout from "@components/Layout";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { communityGuidelineCardContent } from "staticData/community";

const Community: NextPage = () => {
    const accessToken = Cookies.get("access");
    return (
        <Layout title="Community | Homaale">
            <section className="community-page">
                <Container fluid="xl" className="px-4">
                    <BreadCrumb currentPage="Community" />

                    <div className="community-page__top-container">
                        <Row className="top-row gx-5">
                            <Col
                                md={6}
                                sm={6}
                                // lg={4}
                            >
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/community/earth.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="earth-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6} sm={6}>
                                <h3>
                                    Let&apos;s root for each other &amp;{" "}
                                    <br></br> help each other grow
                                </h3>
                                <p>
                                    We are committed to bring the service
                                    providers and service seekers together in
                                    the same platform.
                                </p>

                                {accessToken !== undefined ? (
                                    <AnchorButton
                                        className={"px-4"}
                                        href={"/explore-services"}
                                        varient={"secondary"}
                                    >
                                        {"Explore Services"}
                                    </AnchorButton>
                                ) : (
                                    <AnchorButton
                                        className={"px-4"}
                                        href={"/signup"}
                                        varient={"secondary"}
                                    >
                                        {"Join Now"}
                                    </AnchorButton>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
            <section className="community-page-main">
                <Container fluid="xl" className="px-4">
                    <div className="community-page-main__gallery">
                        <h1>Community Gallery</h1>

                        <Row className="gx-5">
                            <Col md={6} className="leftImage">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/community/gallery1.png"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="earth-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6} className="rightImage">
                                <Row className="gx-5">
                                    <Col md={6} sm={6} className="pb-4">
                                        <figure className="thumbnail-img small-gallery">
                                            <Image
                                                src="/community/gallery2.png"
                                                layout="fill"
                                                objectFit="cover"
                                                alt="earth-image"
                                            />
                                        </figure>
                                    </Col>
                                    <Col md={6} sm={6}>
                                        <figure className="thumbnail-img small-gallery">
                                            <Image
                                                src="/community/gallery3.png"
                                                layout="fill"
                                                objectFit="cover"
                                                alt="earth-image"
                                            />
                                        </figure>
                                    </Col>
                                </Row>
                                <Row className="gx-5">
                                    <Col md={6} sm={6}>
                                        <figure className="thumbnail-img small-gallery">
                                            <Image
                                                src="/community/gallery4.png"
                                                layout="fill"
                                                objectFit="cover"
                                                alt="earth-image"
                                            />
                                        </figure>
                                    </Col>
                                    <Col md={6} sm={6}>
                                        <figure className="thumbnail-img small-gallery">
                                            <Image
                                                src="/community/gallery5.png"
                                                layout="fill"
                                                objectFit="cover"
                                                alt="earth-image"
                                            />
                                        </figure>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="community-page-main__guidelines">
                        <h1>Community guidelines</h1>
                        <p>
                            Creating a community to establish formal
                            expectations and standards for the clients and
                            merchants.
                        </p>
                        <Row className="gx-5">
                            {communityGuidelineCardContent &&
                                communityGuidelineCardContent.map(
                                    (guideline) => {
                                        return (
                                            <Col
                                                className="gx-5 guideline-card-col"
                                                // sm={6}
                                                md={4}
                                                // lg={4}
                                                key={guideline.id}
                                            >
                                                <CommunityGuidelineCard
                                                    cardImage={
                                                        guideline.cardImage
                                                    }
                                                    cardDescription={
                                                        guideline.cardDescription
                                                    }
                                                    cardTitle={
                                                        guideline.cardTitle
                                                    }
                                                />
                                            </Col>
                                        );
                                    }
                                )}
                        </Row>
                    </div>

                    {/* <div className="community-page-main__activity">
                        <div className="title-wrapper d-flex justify-content-between">
                            <h1>Community activity</h1>
                            <a href="/pages" className="view-more">
                                view more{" "}
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="svg-icon"
                                />
                            </a>
                        </div>
                        <Row className="gx-5">
                            {communityActivityContent &&
                                communityActivityContent.map((activity) => {
                                    return (
                                        <Col
                                            md={6}
                                            key={activity.id}
                                        >
                                            <CommunityActivityCard
                                                comments={activity.comments}
                                                position={activity.position}
                                                react={activity.react}
                                                cardImage={activity.cardImage}
                                                name={activity.name}
                                                cardDescription={
                                                    activity.description
                                                }
                                                cardTitle={activity.cardTitle}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div> */}
                    {/* <Carousel>
                        {businessGoal &&
                            businessGoal.map((goal) => {
                                return (
                                    <Carousel.Item
                                        key={goal.id}
                                        //interval={1000}
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

                    {/* <div className="community-page-main__blogs">
                        <h1>Blogs</h1>
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
                    </div> */}
                </Container>
            </section>
        </Layout>
    );
};

export default Community;
