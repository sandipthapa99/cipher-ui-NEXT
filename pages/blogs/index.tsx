import Layout from "@components/Layout";
import { CalendarTodayOutlined } from "@mui/icons-material";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert, Col, Container, Row } from "react-bootstrap";
import type { BlogValueProps } from "types/blogs";
import { axiosClient } from "utils/axiosClient";
import { formatMonthDate } from "utils/helpers";

const Blog = ({ blogsData }: { blogsData: BlogValueProps }) => {
    const { result } = blogsData ?? [];

    return (
        <Layout
            title="Blogs | Homaale"
            description="Explore the insights and blogs provided by Homaale"
            keywords="homaale-blogs blogs"
        >
            {/* Recent Blogs Section Start */}
            <section id="recent-blogs" className="recent-blogs">
                <section className="recent-blogs__hero-section">
                    <Container fluid="xl" className="px-4">
                        <Row>
                            <Col md={6}>
                                <div className="hero-text">
                                    <h1 className="heading-title">
                                        Stay up to date with our latest{" "}
                                        <span>Blogs</span>
                                    </h1>
                                    <p>
                                        Our blogs are not limited to our
                                        services and technology. Find the blogs
                                        that match your interests or reach out
                                        to us to post your blogs as well.
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
                    <Container fluid="xl" className="px-4">
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
                                                        {category &&
                                                            category.map(
                                                                (
                                                                    item: any,
                                                                    index: number
                                                                ) => (
                                                                    <span
                                                                        className="category"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </span>
                                                                )
                                                            )}

                                                        <div className="author-date">
                                                            <p className="author">{`${blog?.author}`}</p>
                                                            <p className="published-date">
                                                                <CalendarTodayOutlined className="svg-icon" />
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
        const { data: blogsData } = await axiosClient.get("/blog/");
        return {
            props: {
                blogsData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        console.log(err);
        return {
            props: {
                blogsData: [],
            },
            revalidate: 10,
        };
    }
};
