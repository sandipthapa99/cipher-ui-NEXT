import TaskCard from "@components/AppliedTask/taskAppliedCard";
import { BreadCrumb } from "@components/common/BreadCrumb";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import Layout from "@components/Layout";
import SkeletonServiceCard from "@components/Skeletons/SkeletonServiceCard";
import SkeletonTaskCard from "@components/Skeletons/SkeletonTaskCard";
import { TaskerSkeleton } from "@components/Skeletons/TaskerSkeleton";
import { Alert, Grid, Highlight } from "@mantine/core";
import { ErrorOutlineOutlined } from "@mui/icons-material";
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
            <Layout
                title="Search | Homaale"
                description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them.
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
                keywords="homaale, search, search-homaale, airtasker-nepali,nepali-working-platform, business, online-business"
            >
                <Container fluid="xl" className="px-4">
                    <BreadCrumb currentPage={"Search"} />

                    {serviceData && serviceData?.data?.result.length > 0 && (
                        <section className="services-near-you m-0">
                            <h1 className="heading-title mt-3">
                                {searchName ? (
                                    <span className="text-secondary">
                                        Services matching your search,{" "}
                                        <span
                                            style={{
                                                fontStyle: "italic",
                                            }}
                                        >{`'${searchName}'.`}</span>
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
                                    serviceData?.data?.result.map(
                                        (service, key) => {
                                            return (
                                                <Col
                                                    sm={6}
                                                    md={4}
                                                    lg={3}
                                                    key={key}
                                                    className="d-flex mb-5"
                                                >
                                                    <ServiceCard
                                                        serviceCard={service}
                                                    />
                                                </Col>
                                            );
                                        }
                                    )}
                            </Row>
                        </section>
                    )}

                    {taskData && taskData?.data?.result?.length > 0 && (
                        <section className="tasks-near-you m-0">
                            <h1 className="heading-title">
                                {searchName ? (
                                    <span className="text-secondary">
                                        Tasks matching your search,{" "}
                                        <span
                                            style={{
                                                fontStyle: "italic",
                                            }}
                                        >{`'${searchName}'.`}</span>
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
                            <Row className="gx-5">
                                {taskData &&
                                    taskData?.data?.result?.map((task, key) => (
                                        <Col
                                            sm="12"
                                            md={6}
                                            key={key}
                                            className="mb-5"
                                        >
                                            <TaskCard task={task} />
                                        </Col>
                                    ))}
                            </Row>
                        </section>
                    )}

                    {taskerData && taskerData?.data?.result?.length > 0 && (
                        <section className="taskers-near-you m-0">
                            <h1 className="heading-title">
                                {searchName ? (
                                    <span className="text-secondary">
                                        Taskers matching your search,{" "}
                                        <span
                                            style={{
                                                fontStyle: "italic",
                                            }}
                                        >{`'${searchName}'.`}</span>
                                    </span>
                                ) : (
                                    <Highlight highlight={"Loading..."}>
                                        {`Loading...`}
                                    </Highlight>
                                )}
                            </h1>
                            {fetchingTasker && (
                                <TaskerSkeleton direction="row" />
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
                                                                ? merchant?.profile_image
                                                                : merchant
                                                                      ?.avatar
                                                                      ?.image
                                                        }
                                                        merchantName={
                                                            merchant?.user
                                                                ?.first_name +
                                                                " " +
                                                                merchant?.user
                                                                    ?.middle_name ??
                                                            "" +
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
                                                        successRate={merchant?.stats?.success_rate.toFixed(
                                                            1
                                                        )}
                                                        merchantId={
                                                            merchant?.user?.id
                                                        }
                                                    />
                                                </Col>
                                            );
                                        })}
                            </Row>
                        </section>
                    )}
                </Container>
            </Layout>
        </>
    );
};
export default SearchPage;
