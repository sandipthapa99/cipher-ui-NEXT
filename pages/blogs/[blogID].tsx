import Layout from "@components/Layout";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import { Col, Container, Row } from "react-bootstrap";
import type { BlogDetailData, BlogValueProps } from "types/blogs";
import { axiosClient } from "utils/axiosClient";
import { formatMonthDate } from "utils/helpers";

const SingleBlog = ({ blog }: { blog: BlogValueProps["result"][0] }) => {
    // const blogData = blog?.data ?? {};
    const socialShareURL = `https://cipher.com/blogs/${blog?.slug}`;
    // const category = JSON.parse(blog?.category);
    return (
        <Layout>
            <section className="single-blog">
                <Container fluid="xl" className="px-4">
                    <div className="single-blog__heading-section">
                        <p>{formatMonthDate(blog?.created_at)} </p>
                        <h1 className="heading-title">{blog?.title}</h1>
                    </div>
                    <div className="single-blog__share-section">
                        <Row className="gx-5">
                            <Col md={6} className="share-title">
                                <span>2m read</span> . Share this article
                            </Col>
                            <Col md={6}>
                                <button>
                                    <p
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `${socialShareURL}`
                                            );
                                            // successToast("Link Copied")
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faLink}
                                            height={16}
                                        />
                                        Copy Link
                                    </p>
                                </button>
                                <FacebookShareButton url={socialShareURL}>
                                    <p>
                                        <FontAwesomeIcon
                                            icon={faFacebookF}
                                            height={16}
                                        />
                                        Facebook
                                    </p>
                                </FacebookShareButton>
                                <TwitterShareButton url={socialShareURL}>
                                    <p>
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            height={16}
                                        />
                                        Twitter
                                    </p>
                                </TwitterShareButton>
                            </Col>
                        </Row>
                    </div>
                    <div className="single-blog__img">
                        {blog.image && (
                            <figure className="thumbnail-img">
                                <Image
                                    src={blog?.image}
                                    alt="image"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </figure>
                        )}
                    </div>

                    {blog?.content && (
                        <div
                            className="single-blog__content"
                            dangerouslySetInnerHTML={{ __html: blog?.content }}
                        ></div>
                    )}
                </Container>
            </section>
            {/* <ToastContainer
	        autoClose={3000}/> */}
        </Layout>
    );
};

export default SingleBlog;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: blogsData } = await axiosClient.get("/blog/");
        if (blogsData.error) throw new Error(blogsData.error.message);

        const paths = blogsData?.result?.map(
            ({ slug }: BlogValueProps["result"][0]) => ({
                params: { blogID: slug },
            })
        );

        return {
            paths,
            fallback: true,
        };
    } catch (err) {
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const { data } = await axiosClient.get<BlogDetailData>(
            `/blog/detail/${params?.blogID}`
        );
        console.log(data);

        // if (blog.error) throw new Error(blog.error.message);

        return {
            props: {
                blog: data.data,
            },
            revalidate: 10,
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                blog: { hello: "sdfsdf  " },
            },
            revalidate: 10,
        };
    }
};
