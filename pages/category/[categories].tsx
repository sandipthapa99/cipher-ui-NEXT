import { BreadCrumb } from "@components/common/BreadCrumb";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import Layout from "@components/Layout";
import { ServiceCategories } from "@components/services/ServiceCategories";
import { useData } from "hooks/use-data";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { merchants } from "staticData/merchants";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITaskApiResponse } from "types/task";

const Gardening = () => {
    const router = useRouter();
    const { categories } = router.query;
    console.log(categories, typeof categories);
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    const nameCategory = categories
        ? categories[0].toUpperCase() + categories.slice(1)
        : "";

    // for (let i = 0; i < categories?.length; i++) {
    //     const name = categories[0]?.toUpperCase() + categories?.slice(1);
    //     console.log(name);
    // }

    //for tasks

    const { data: recommendedTasks } = useData<ITaskApiResponse>(
        ["all-tasks"],
        "/task/"
    );
    return (
        <Layout title={`${categories} | Cipher`}>
            <div className="gardening -page">
                <BreadCrumb currentPage={nameCategory} />
                <Container fluid="xl">
                    <h1 className="section-title m-0">{nameCategory}</h1>

                    <section className="services-near-you">
                        <h1 className="heading-title mt-3">
                            {`${nameCategory} Services Near You`}
                        </h1>
                        <Row className="gx-5">
                            {servicesData &&
                                servicesData?.data?.result
                                    ?.slice(0, 4)
                                    .map((service, key) => {
                                        return (
                                            <Col
                                                sm={6}
                                                md={4}
                                                lg={3}
                                                key={key}
                                                className="d-flex"
                                            >
                                                <ServiceCard
                                                    serviceCard={service}
                                                />
                                            </Col>
                                        );
                                    })}
                        </Row>
                        {/* <ServiceCategories /> */}
                    </section>

                    <section className="tasks-near-you">
                        <h1 className="heading-title">
                            {`  ${nameCategory} Tasks Near You`}
                        </h1>
                        <Row className="gx-5">
                            {recommendedTasks?.data?.result?.map(
                                (task: any, key: any) => (
                                    <Col sm="12" md={6} key={key}>
                                        <TaskCard
                                            title={task?.title}
                                            id={task?.id}
                                            charge={task?.charge}
                                            description={task?.description}
                                            location={task?.location}
                                            start_date={task?.start_date}
                                            start_time={task?.start_time}
                                            status={task?.status}
                                            currency={task?.currency}
                                        />
                                    </Col>
                                )
                            )}
                        </Row>
                    </section>

                    <section className="taskers-near-you">
                        <h1 className="heading-title">{`${nameCategory} Taskers Near You`}</h1>
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
