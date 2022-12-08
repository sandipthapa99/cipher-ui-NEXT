import CareerCard from "@components/Career/CareerCard";
import LeaveYourCV from "@components/Career/LeaveYourCV";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import urls from "constants/urls";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import type { CareerValueProps } from "types/careerValuesProps";
import { axiosClient } from "utils/axiosClient";

const Career = ({ careerData }: { careerData: CareerValueProps }) => {
    const { result } = careerData ?? [];
    return (
        <Layout
            title="Homaale | Careers"
            description="Find the Job openings at Homaale"
            keywords="homaale-career, career, homaale"
        >
            <section id="careers-section" className="careers-section">
                <Container fluid="xl" className="px-4">
                    <BreadCrumb currentPage="Career" />
                    <div className="d-flex justify-content-between align-items-center flex-column-reverse flex-md-row">
                        <div className="careers-index">
                            <h1>
                                Discover your career opportunities with Homaale!
                            </h1>
                            <p>
                                Homaale is always ready to welcome talents who
                                can help us grow and achieve higher milestones.
                            </p>
                            {/* <div className="careers-index__popular">
                                Popular Categories:{" "}
                                <ul>
                                    <li>UX Designer</li>
                                    <li>Front-end developer</li>
                                </ul>
                            </div> */}
                        </div>
                        <figure>
                            <Image
                                src={"/business.png"}
                                alt="buiness pic"
                                layout="fill"
                            />
                        </figure>
                    </div>
                    <Row className="g-5 mt-5">
                        <Col lg={3}>
                            <figure className="demand-img">
                                <Image
                                    src={"/womenBuis.png"}
                                    alt="buiness pic"
                                    layout="fill"
                                />
                            </figure>
                        </Col>
                        <Col md={12} lg={9}>
                            <h2>Job Openings</h2>
                            <Row className="gx-5">
                                {result
                                    ? result
                                          ?.slice(0, 6)
                                          ?.map((values, key) => (
                                              <Col
                                                  lg={4}
                                                  md={6}
                                                  className="d-flex"
                                                  key={key}
                                              >
                                                  <CareerCard values={values} />
                                              </Col>
                                          ))
                                    : "No postions avilable currently."}
                            </Row>
                        </Col>
                    </Row>
                    {/* <div className="d-flex justify-content-between align-items-lg-center pe-0 part-wrapper">
                        <div className="part-wrapper__details">
                            Join for Internships at <span>Homaale</span>
                            <p>Boost your skills and excel with us.</p>
                        </div>
                        <figure>
                            <Image
                                src={"/groupB.png"}
                                alt="buiness pic"
                                layout="fill"
                            />
                        </figure>
                    </div> */}

                    {/* <HiringStage /> */}
                    <LeaveYourCV />
                </Container>
            </section>
        </Layout>
    );
};

export default Career;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: careerData } = await axiosClient.get(urls.carrer.list);
        if (careerData.error) throw new Error(careerData.error.message);
        return {
            props: {
                careerData,
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
