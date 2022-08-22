import { BreadCrumb } from "@components/common/BreadCrumb";
import MerchantCard from "@components/common/MerchantCard";
import TaskCard from "@components/common/TaskCard";
import Layout from "@components/Layout";
import { ServiceCategories } from "@components/services/ServiceCategories";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { merchants } from "staticData/merchants";
import { tasks } from "staticData/task";

const Gardening = () => {
    const router = useRouter();
    const { categories } = router.query;

    return (
        <Layout title={`${categories} | Cipher`}>
            <div className="gardening -page">
                <BreadCrumb currentPage={categories?.toString()} />
                <Container fluid="xl">
                    <h1 className="section-title">{categories?.toString()}</h1>

                    <section className="services-near-you">
                        <h1 className="heading-title mt-5">
                            {`${categories} Services Near You`}
                        </h1>
                        <ServiceCategories />
                    </section>

                    <section className="tasks-near-you">
                        <h1 className="heading-title">
                            {`  ${categories} Tasks Near You`}
                        </h1>
                        <Row className="gx-5">
                            {tasks &&
                                tasks.map((task) => {
                                    return (
                                        <Col md={6} key={task.id}>
                                            <TaskCard
                                                title={task.title}
                                                charge={task.charge}
                                                description={task.description}
                                                location={task.location}
                                                date={task.date}
                                                time={task.time}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>

                    <section className="taskers-near-you">
                        <h1 className="heading-title">Gardeners Near You</h1>
                        <Row className="gx-5">
                            {merchants &&
                                merchants.map((merchant) => {
                                    return (
                                        <Col
                                            sm={6}
                                            lg={4}
                                            xl={3}
                                            key={merchant.id}
                                        >
                                            <MerchantCard
                                                merchantImage={
                                                    merchant.merchantImage
                                                }
                                                merchantName={
                                                    merchant.merchantName
                                                }
                                                merchantCategory={
                                                    merchant.merchantCategory
                                                }
                                                merchantLocation={
                                                    merchant.merchantLocation
                                                }
                                                merchantDescription={
                                                    merchant.merchantDescription
                                                }
                                                merchantRating={
                                                    merchant.merchantRating
                                                }
                                                merchantPrice={
                                                    merchant.merchantPrice
                                                }
                                                happyClients={
                                                    merchant.happyClients
                                                }
                                                successRate={
                                                    merchant.successRate
                                                }
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </section>
                </Container>
                <section id="browse-category" className="browse-category mb-0">
                    <Container fluid="xl">
                        <h1 className="section-main-title">
                            Explore Categories
                        </h1>
                        <ServiceCategories />
                        {/* Service category listing end */}
                    </Container>
                </section>
            </div>
        </Layout>
    );
};
export default Gardening;
