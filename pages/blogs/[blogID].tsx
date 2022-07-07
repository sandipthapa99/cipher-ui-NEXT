import Layout from "@components/Layout";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticPaths, GetStaticProps } from "next";
import { FacebookShareButton, TwitterShareButton } from "next-share";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { BlogDetailProps, BlogsResult } from "types/blogs";
import { blogDetailAPI, blogListAPI, formatMonthDate } from "utils/helpers";
import http from "pages/api/httpService";
import { faLink } from "@fortawesome/pro-regular-svg-icons";


const SingleBlog = ({ blog }: BlogDetailProps) => {
    const blogData = blog?.data ?? {};
    const socialShareURL = `https://cipher.com/blogs/${blogData?.slug}`;
    const category = JSON.parse(blogData?.category);
    return (
        <Layout>
            <section className="single-blog">
                <Container fluid="xl" className="px-4">
                    <div className="single-blog__heading-section">
                        <p>{category} / {formatMonthDate(blogData?.created_at)} </p>
                        <h1 className="heading-title">{blogData?.title}</h1>
                    </div>
                    <div className="single-blog__share-section">
                        <Row className="gx-5">
                            <Col md={6} className="share-title"><span>2m read</span> . Share this article</Col>
                            <Col md={6}>
                                <button>
                                    <p onClick={() => {
                                        navigator.clipboard.writeText(`${socialShareURL}`);
                                        // successToast("Link Copied")
                                    }}
                                    >
                                        <FontAwesomeIcon icon={faLink} height={16} />
                                        Copy Link
                                    </p>
                                </button>
                                <FacebookShareButton
                                    url={socialShareURL}
                                >
                                    <p><FontAwesomeIcon icon={faFacebookF} height={16} />
                                        Facebook
                                    </p>
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={socialShareURL}
                                >
                                    <p><FontAwesomeIcon icon={faTwitter} height={16} />
                                        Twitter
                                    </p>
                                </TwitterShareButton>

                            </Col>
                        </Row>
                    </div>
                    <div className="single-blog__img">
                        <figure className="thumbnail-img">
                            <Image
                                src={blogData?.image}
                                alt="image"
                                layout="fill"
                                objectFit="cover"
                            />
                        </figure>
                    </div>

                    <div className="single-blog__content" dangerouslySetInnerHTML={{ __html: blogData?.content }}></div>
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
        const { data: blogsData } = await http.get(blogListAPI);
        if (blogsData.error) throw new Error(blogsData.error.message);

        const paths = blogsData?.result.map(({ slug }: BlogsResult) => ({ params: { blogID: slug } }));

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
        const { data: blog } = await http.get(`${blogDetailAPI}${params?.blogID}`);

        if (blog.error) throw new Error(blog.error.message);

        return {
            props: {
                blog,
            },
            revalidate: 10,
        };
    } catch (err) {
        return {
            props: {
                blog: {},
            },
            revalidate: 10,
        };
    }
};