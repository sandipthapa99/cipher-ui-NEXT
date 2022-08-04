import Layout from "@components/Layout";
import { faCalendarDays } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import http from "pages/api/httpService";
import { Alert, Col, Container, Row } from "react-bootstrap";
import type { BlogsProps } from "types/blogs";
import { blogListAPI, formatMonthDate } from "utils/helpers";

const Blog = ({ blogsData }: BlogsProps) => {
    const { result } = blogsData ?? [];

    return (
        <Layout
            title="Blogs | Cipher"
            description="Explore the insights provided by Cipher"
        >
            {/* Recent Blogs Section Start */}
            <section id="recent-blogs" className="recent-blogs">
                <section className="recent-blogs__hero-section">
                    <Container>
                        <Row>
                            <Col md={6}>
                                <div className="hero-text">
                                    <h1 className="heading-title">
                                        Stay up to date with our latest{" "}
                                        <span>Blogs</span>
                                    </h1>
                                    <p>
                                        Amet minim mollit non deserunt ullamco
                                        est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit
                                        mollit. Exercitation veniam consequat
                                        sunt nostrud amet.Amet minim mollit non
                                        deserunt ullamco est sit aliqua dolor do
                                        amet sint. Velit officia consequat duis
                                        enim velit mollit. Exercitation veniam
                                        consequat sunt nostrud amet.Amet minim
                                        mollit non deserunt ullamco est sit
                                        aliqua dolor do amet sint. Velit officia
                                        consequat duis enim ved
                                    </p>
                                </div>
                            </Col>
                            <Col md={6} className="d-none d-md-flex">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/blog-hero.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="merchant-image"
                                    />
                                </figure>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="recent-blogs__blog-listings">
                    <Container>
                        <Row className="gx-5 mt-5">
                            {result && result.length > 0 ? (
                                result?.map((blog) => {
                                    const category = JSON.parse(blog?.category);

                                    return (
                                        <Col md={4} key={blog?.id}>
                                            <Link href={`/blogs/${blog?.slug}`}>
                                                <a>
                                                    <div className="blog-details">
                                                        <h2>
                                                            {blog?.title?.substring(
                                                                0,
                                                                50
                                                            )}
                                                        </h2>
                                                        <figure className="thumnail-img">
                                                            <Image
                                                                src={blog.image}
                                                                alt="hero-img"
                                                                width={422}
                                                                height={230}
                                                                objectFit="cover"
                                                            />
                                                        </figure>
                                                        <p className="category">
                                                            {category[0]}
                                                        </p>
                                                        <div className="author-date">
                                                            <p className="author">{`${blog?.author?.first_name}`}</p>
                                                            <p className="published-date">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCalendarDays
                                                                    }
                                                                    className="svg-icon"
                                                                />
                                                                {`${formatMonthDate(
                                                                    blog?.created_at
                                                                )}`}
                                                            </p>
                                                        </div>
                                                        {/* <div className="insights-block-description" dangerouslySetInnerHTML={{ __html: `${blog?.content?.substring(0, 200)}...` }}></div> */}
                                                    </div>
                                                </a>
                                            </Link>
                                        </Col>
                                    );
                                })
                            ) : (
                                <section className="">
                                    <Alert variant="warning mb-5">
                                        We Currently have no blogs for you.
                                        Visit again soon and we shall not
                                        disappoint you.
                                    </Alert>
                                </section>
                            )}
                        </Row>
                    </Container>
                </div>
            </section>
            {/* Recent Blogs Section End */}
        </Layout>
    );
};
export default Blog;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: blogsData } = await http.get(blogListAPI);
        if (blogsData.error) throw new Error(blogsData.error.message);
        return {
            props: {
                blogsData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                blogsData: [],
            },
            revalidate: 10,
        };
    }
};
