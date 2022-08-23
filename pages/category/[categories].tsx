import { BreadCrumb } from "@components/common/BreadCrumb";
import FullPageLoader from "@components/common/FullPageLoader";
import MerchantCard from "@components/common/MerchantCard";
import TaskCard from "@components/common/TaskCard";
import Layout from "@components/Layout";
import { ServiceCategories } from "@components/services/ServiceCategories";
import { useTasks } from "hooks/apply-task/useTask";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { merchants } from "staticData/merchants";
import { tasks } from "staticData/task";
const Gardening = () => {
    const router = useRouter();
    const { categories } = router.query;
    //for tasks
    const { data: recommendedTasks, isLoading } = useTasks();
    if (isLoading || !recommendedTasks) return <FullPageLoader />;

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
                            {recommendedTasks?.result?.map(
                                (task: any, key: any) => (
                                    <Col sm="12" key={key}>
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
