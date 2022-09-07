import { BreadCrumb } from "@components/common/BreadCrumb";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import Layout from "@components/Layout";
import { ServiceCategories } from "@components/services/ServiceCategories";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Highlight } from "@mantine/core";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { merchants } from "staticData/merchants";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITaskApiResponse } from "types/task";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

const Gardening = ({
    serviceData,
    taskData,
    taskerData,
}: {
    serviceData: ServicesValueProps["result"];
    taskData: ITaskApiResponse["result"];
    taskerData: TaskerProps["result"];
}) => {
    const router = useRouter();
    const categories = router.query.categories;
    const category = serviceData?.find(
        (item) => item?.category?.slug === categories
    );
    const categoryName = category ? category.category.name : "";

    // const { data: servicesData, refetch: serviceRefetch } =
    //     useData<ServicesValueProps>(
    //         ["all-services"],
    //         `/task/service/?category=${categories}`,
    //         !!categories
    //     );

    // const { data: recommendedTasks, refetch: taskRefetch } =
    //     useData<ITaskApiResponse>(
    //         ["all-tasks"],
    //         `/task/?category=${categories}`,
    //         !!categories
    //     );
    // useEffect(() => {
    //     serviceRefetch();
    //     taskRefetch();
    // }, [categories, serviceRefetch, taskRefetch]);

    // const nameCategory = categories
    //     ? categories[0].toUpperCase() + categories.slice(1)
    //     : "";

    // for (let i = 0; i < categories?.length; i++) {
    //     const name = categories[0]?.toUpperCase() + categories?.slice(1);
    //     console.log(name);
    // }

    //for tasks

    return (
        <Layout title={`${categoryName} | Cipher`}>
            <div className="gardening -page">
                <BreadCrumb
                    currentPage={categoryName ? categoryName : "No service"}
                />
                <Container fluid="xl">
                    <h1 className="section-title m-0">{categoryName}</h1>
                    <section className="services-near-you">
                        <h1 className="heading-title mt-3">
                            {categoryName ? (
                                <span>
                                    {categoryName} &nbsp; Services Near You
                                </span>
                            ) : (
                                <Highlight
                                    highlight={[categoryName, "No services"]}
                                >
                                    {`There are No services`}
                                </Highlight>
                            )}
                        </h1>
                        {serviceData && serviceData?.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Avialable!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                <Highlight highlight={[categoryName, "No"]}>
                                    {`There are No services in ${
                                        categoryName ? categoryName : "this"
                                    } category`}
                                </Highlight>
                            </Alert>
                        )}
                        <Row className="gx-5">
                            {serviceData &&
                                serviceData?.slice(0, 4).map((service, key) => {
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
                            {categoryName ? (
                                <span>
                                    {categoryName} &nbsp; Tasks Near You
                                </span>
                            ) : (
                                <Highlight
                                    highlight={[categoryName, "No Tasks"]}
                                >
                                    {`There are No Tasks`}
                                </Highlight>
                            )}
                        </h1>
                        {taskData && taskData?.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Avialable!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                <Highlight highlight={[categoryName, "No"]}>
                                    {`There are No task in ${
                                        categoryName ? categoryName : "this"
                                    } category`}
                                </Highlight>
                            </Alert>
                        )}
                        <Row className="gx-5">
                            {taskData &&
                                taskData.map((task, key) => (
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
                                ))}
                        </Row>
                    </section>

                    <section className="taskers-near-you">
                        <h1 className="heading-title">
                            {categoryName} &nbsp; Taskers Near You
                        </h1>
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

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: serviceData } = await axiosClient.get("/task/service/");
        const paths = serviceData?.result?.map(
            ({ category: { slug } }: ServicesValueProps["result"][0]) => ({
                params: { categories: slug },
            })
        );
        return { paths, fallback: true };
    } catch (error: any) {
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const { data: serviceData } = await axiosClient.get<ServicesValueProps>(
            `/task/service/?category=${params?.categories}`
        );
        const { data: taskData } = await axiosClient.get<ITaskApiResponse>(
            `/task/?category=${params?.categories}`
        );
        const { data: taskerData } = await axiosClient.get<TaskerProps>(
            `/task/?category=${params?.categories}`
        );

        return {
            props: {
                serviceData: serviceData.result,
                taskData: taskData.result,
                taskerData: taskerData.result,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                serviceData: {},
                taskData: {},
                taskerData: {},
            },
            revalidate: 10,
        };
    }
};
