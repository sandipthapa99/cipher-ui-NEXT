import TaskCard from "@components/AppliedTask/taskAppliedCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import Layout from "@components/Layout";
import SkeletonServiceCard from "@components/Skeletons/SkeletonServiceCard";
import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { TaskerSkeleton } from "@components/Skeletons/TaskerSkeleton";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Grid, Highlight } from "@mantine/core";
import urls from "constants/urls";
import { useData } from "hooks/use-data";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITaskApiResponse } from "types/task";
import type { TaskerProps } from "types/taskerProps";

const SearchPage: NextPage = () => {
    const router = useRouter();
    const searchName = router.query.search;
    const { isFetching: fetchingService, data: serviceData } =
        useData<ServicesValueProps>(
            ["searched-service", searchName],
            `${urls.task.service}&search=${searchName}`
        );
    const { isFetching: fetchingTask, data: taskData } =
        useData<ITaskApiResponse>(
            ["searched-task", searchName],
            `${urls.task.task}&search=${searchName}`
        );
    const { isFetching: fetchingTasker, data: taskerData } =
        useData<TaskerProps>(
            ["searched-tasker", searchName],
            `${urls.tasker.list}?search=${searchName}`
        );
    return (
        <>
            <Layout title="Search | Homaale">
                <Container fluid="xl" className="px-5">
                    <BreadCrumb currentPage={"Search"} />
                    <section className="services-near-you">
                        <h1 className="heading-title mt-3">
                            {searchName ? (
                                <span>
                                    {`"${searchName}"`} &nbsp; Services Near You
                                </span>
                            ) : (
                                <Highlight highlight={"Loading..."}>
                                    {`Loading...`}
                                </Highlight>
                            )}
                        </h1>
                        {fetchingService && (
                            <Grid>
                                {Array.from({ length: 4 }).map((_, key) => (
                                    <Grid.Col span={3} key={key}>
                                        <SkeletonServiceCard />
                                    </Grid.Col>
                                ))}
                            </Grid>
                        )}

                        <Row className="gx-5">
                            {!fetchingService &&
                                serviceData?.data?.result &&
                                serviceData?.data?.result
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
                        {!fetchingService && !serviceData?.data?.result && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                {/* <Highlight highlight={[categoryName, "No"]}> */}
                                There are No services in{" "}
                                {searchName ? searchName : "this"} category
                                {/* </Highlight> */}
                            </Alert>
                        )}
                    </section>
                    <section className="tasks-near-you">
                        <h1 className="heading-title">
                            {searchName ? (
                                <span>
                                    {`"${searchName}"`} &nbsp; Tasks Near You
                                </span>
                            ) : (
                                <Highlight highlight={"Loading..."}>
                                    {`Loading...`}
                                </Highlight>
                            )}
                        </h1>
                        {fetchingTask && (
                            <Grid>
                                {Array.from({ length: 4 }).map((_, key) => (
                                    <Grid.Col span={3} key={key}>
                                        <SkeletonTaskCard />
                                    </Grid.Col>
                                ))}
                            </Grid>
                        )}
                        {taskData && taskData?.data?.result?.length <= 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="No data Available!"
                                color="orange"
                                radius="md"
                                sx={{ minWidth: 100 }}
                            >
                                {/* <Highlight highlight={[categoryName, "No"]}> */}
                                There are No task in{" "}
                                {searchName ? searchName : "this"} category
                                {/* </Highlight> */}
                            </Alert>
                        )}
                        <Row className="gx-5">
                            {taskData &&
                                taskData?.data?.result?.map((task, key) => (
                                    <Col sm="12" md={6} key={key}>
                                        <TaskCard task={task} />
                                    </Col>
                                ))}
                        </Row>
                    </section>
                    <section className="taskers-near-you">
                        <h1 className="heading-title">
                            {searchName ? (
                                <span>
                                    {`"${searchName}"`} &nbsp; Tasker Near You
                                </span>
                            ) : (
                                <Highlight highlight={"Loading..."}>
                                    {`Loading...`}
                                </Highlight>
                            )}
                        </h1>
                        {fetchingTasker && <TaskerSkeleton direction="row" />}
                        {!fetchingTasker &&
                            taskerData &&
                            taskerData?.data?.result?.length <= 0 && (
                                <Alert
                                    icon={<FontAwesomeIcon icon={faWarning} />}
                                    title="No data Available!"
                                    color="orange"
                                    radius="md"
                                    sx={{ minWidth: 100 }}
                                >
                                    There are No tasker in{" "}
                                    {searchName ? searchName : "this"} category
                                </Alert>
                            )}
                        <Row className="gx-5">
                            {taskerData &&
                                taskerData?.data?.result
                                    .slice(0, 4)
                                    ?.map((merchant) => {
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
                                                    }
                                                    merchantName={
                                                        merchant?.user
                                                            ?.first_name +
                                                        " " +
                                                        merchant?.user
                                                            ?.middle_name +
                                                        " " +
                                                        merchant?.user
                                                            ?.last_name
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
                                                        merchant?.rating
                                                            ?.avg_rating
                                                    }
                                                    merchantPrice={
                                                        merchant
                                                            ?.charge_currency
                                                            ?.symbol +
                                                        merchant?.hourly_rate
                                                    }
                                                    happyClients={
                                                        merchant?.stats
                                                            ?.happy_clients
                                                    }
                                                    successRate={
                                                        merchant?.stats
                                                            ?.success_rate
                                                    }
                                                    merchantId={
                                                        merchant?.user?.id
                                                    }
                                                />
                                            </Col>
                                        );
                                    })}
                        </Row>
                    </section>
                </Container>
            </Layout>
        </>
    );
};
export default SearchPage;
