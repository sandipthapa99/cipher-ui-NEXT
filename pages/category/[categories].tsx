import { BreadCrumb } from "@components/common/BreadCrumb";
import CategoryCard from "@components/common/CategoryCard";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { merchants } from "staticData/merchants";
import { serviceCategory } from "staticData/serviceCategory";
import { services } from "staticData/services";
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
                        <Row className="gx-5">
                            {services &&
                                services.map((service) => {
                                    return (
                                        <Col
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={service.id}
                                        >
                                            <ServiceCard
                                                serviceImage={
                                                    service.serviceImage
                                                }
                                                serviceTitle={
                                                    service.serviceTitle
                                                }
                                                serviceProvider={
                                                    service.serviceProvider
                                                }
                                                serviceProviderLocation={
                                                    service.serviceProviderLocation
                                                }
                                                serviceDescription={
                                                    service.serviceDescription
                                                }
                                                serviceRating={
                                                    service.serviceRating
                                                }
                                                servicePrice={
                                                    service.servicePrice
                                                }
                                                hasOffer={service.hasOffer}
                                                discountRate={
                                                    service.discountRate
                                                }
                                                discountOn={service.discountOn}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
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
                        <Row className="gx-5">
                            {serviceCategory &&
                                serviceCategory.map((category) => {
                                    return (
                                        <Col
                                            xs={6}
                                            sm={4}
                                            lg={2}
                                            key={category.id}
                                        >
                                            <CategoryCard
                                                categoryTitle={
                                                    category.categoryTitle
                                                }
                                                categoryIcon={
                                                    category.categoryIcon
                                                }
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                        <Row className="gx-5">
                            {serviceCategory &&
                                serviceCategory.map((category) => {
                                    return (
                                        <Col
                                            xs={6}
                                            sm={4}
                                            lg={2}
                                            key={category.id}
                                        >
                                            <CategoryCard
                                                categoryTitle={
                                                    category.categoryTitle
                                                }
                                                categoryIcon={
                                                    category.categoryIcon
                                                }
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                        {/* Service category listing end */}
                    </Container>
                </section>
            </div>
        </Layout>
    );
};
export default Gardening;
