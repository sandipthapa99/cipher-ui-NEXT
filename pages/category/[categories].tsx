import { BreadCrumb } from "@components/common/BreadCrumb";
import CategoryCard from "@components/common/CategoryCard";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import Layout from "@components/Layout";
import SkeletonServiceCard from "@components/Skeletons/SkeletonServiceCard";
import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { TaskerSkeleton } from "@components/Skeletons/TaskerSkeleton";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Grid, Highlight } from "@mantine/core";
import urls from "constants/urls";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import type { HeroCategoryProps } from "types/heroCategory";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITaskApiResponse } from "types/task";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

const Gardening = ({
    serviceData,
    taskData,
    taskerData,
    heroCategoryData,
}: {
    serviceData: ServicesValueProps["result"];
    taskData: ITaskApiResponse["result"];
    taskerData: TaskerProps["result"];
    heroCategoryData: HeroCategoryProps["result"];
}) => {
    const router = useRouter();
    const categories = router.query.categories;

    const category = (
        (serviceData?.length > 0 ? serviceData : taskData) as any[]
    )?.find((item) => item?.category?.slug === categories);

    const categoryName = category ? category.category.name : categories;

    return (
        <Layout
            title={`${categoryName ? categoryName : "Loading..."} | Homaale`}
        >
            <div className="gardening -page">
                <Container fluid="xl" className="px-4">
                    <BreadCrumb
                        currentPage={categoryName ? categoryName : "Loading..."}
                    />
                    <h1 className="section-title m-0">{categoryName}</h1>
                    <section className="services-near-you">
                        <h1 className="heading-title mt-3">
                            {categoryName ? (
                                <span>
                                    {categoryName} &nbsp; Services Near You
                                </span>
                            ) : (
                                <Highlight highlight={"Loading..."}>
                                    {`Loading...`}
                                </Highlight>
                            )}
                        </h1>
                        {!serviceData && (
                            <Grid>
                                {Array.from({ length: 4 }).map((_, key) => (
                                    <Grid.Col span={3} key={key}>
                                        <SkeletonServiceCard />
                                    </Grid.Col>
                                ))}
                            </Grid>
                        )}
                        {serviceData && serviceData?.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                {/* <Highlight highlight={[categoryName, "No"]}> */}
                                There are No services in{" "}
                                {categoryName ? categoryName : "this"} category
                                {/* </Highlight> */}
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
                                <Highlight highlight={"Loading..."}>
                                    {`Loading...`}
                                </Highlight>
                            )}
                        </h1>
                        {!taskData && (
                            <Grid>
                                {Array.from({ length: 4 }).map((_, key) => (
                                    <Grid.Col span={3} key={key}>
                                        <SkeletonTaskCard />
                                    </Grid.Col>
                                ))}
                            </Grid>
                        )}
                        {taskData && taskData?.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                {/* <Highlight highlight={[categoryName, "No"]}> */}
                                There are No task in{" "}
                                {categoryName ? categoryName : "this"} category
                                {/* </Highlight> */}
                            </Alert>
                        )}
                        <Row className="gx-5">
                            {taskData &&
                                taskData?.map((task, key) => (
                                    <Col sm="12" md={6} key={key}>
                                        <TaskCard task={task} />
                                    </Col>
                                ))}
                        </Row>
                    </section>

                    <section className="taskers-near-you">
                        <h1 className="heading-title">
                            {categoryName ? (
                                <span>
                                    {categoryName} &nbsp; Tasker Near You
                                </span>
                            ) : (
                                <Highlight highlight={"Loading..."}>
                                    {`Loading...`}
                                </Highlight>
                            )}
                        </h1>
                        {!taskerData && <TaskerSkeleton direction="row" />}
                        {taskerData && taskerData?.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                {/* <Highlight highlight={[categoryName, "No"]}> */}
                                There are No tasker in{" "}
                                {categoryName ? categoryName : "this"} category
                                {/* </Highlight> */}
                            </Alert>
                        )}
                        <Row className="gx-5">
                            {taskerData &&
                                taskerData?.slice(0, 4)?.map((merchant) => {
                                    return (
                                        <Col
                                            sm={6}
                                            lg={4}
                                            xl={3}
                                            key={merchant?.id}
                                            className="d-flex"
                                        >
                                            <MerchantCard
                                                merchantImage={
                                                    merchant?.profile_image
                                                        ? merchant?.profile_image
                                                        : merchant?.avatar
                                                              ?.image
                                                }
                                                merchantName={
                                                    merchant?.user?.first_name +
                                                    " " +
                                                    merchant?.user
                                                        ?.middle_name +
                                                    " " +
                                                    merchant?.user?.last_name
                                                }
                                                merchantCategory={
                                                    merchant?.designation
                                                }
                                                merchantLocation={
                                                    merchant?.address_line1 +
                                                    ", " +
                                                    merchant?.address_line2
                                                }
                                                merchantDescription={
                                                    merchant?.bio
                                                }
                                                merchantRating={
                                                    merchant?.rating?.avg_rating
                                                }
                                                merchantPrice={
                                                    merchant?.hourly_rate
                                                }
                                                happyClients={
                                                    merchant?.stats
                                                        ?.happy_clients
                                                }
                                                successRate={
                                                    +merchant?.stats?.success_rate?.toFixed(
                                                        1
                                                    )
                                                }
                                                merchantId={merchant?.user?.id}
                                                currency={
                                                    merchant?.charge_currency
                                                        ?.symbol
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
                        <Row className="g-4">
                            {heroCategoryData &&
                                heroCategoryData?.map((category, key) => (
                                    <Col lg={2} md={4} sm={6} key={key}>
                                        <CategoryCard category={category} />
                                    </Col>
                                ))}
                        </Row>

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
            ({
                service: { category: slug },
            }: ServicesValueProps["result"][0]) => ({
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
            `${urls.task.service}&category=${params?.categories}`
        );
        const { data: taskData } = await axiosClient.get<ITaskApiResponse>(
            `${urls.task.task}&category=${params?.categories}`
        );
        const { data: taskerData } = await axiosClient.get<TaskerProps>(
            urls.tasker.list
        );
        const { data: heroCategoryData } =
            await axiosClient.get<HeroCategoryProps>("/task/hero-category/");

        return {
            props: {
                serviceData: serviceData.result,
                taskData: taskData.result,
                taskerData: taskerData.result,
                heroCategoryData: heroCategoryData.result,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                serviceData: {},
                taskData: {},
                taskerData: {},
                heroCategoryData: {},
            },
            revalidate: 10,
        };
    }
};
