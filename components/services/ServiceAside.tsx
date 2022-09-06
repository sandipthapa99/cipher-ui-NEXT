import ServiceNearYouCard from "@components/SearchTask/searchAside";
import { Skeleton } from "@mantine/core";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import type { ServicesValueProps } from "types/serviceCard";

interface ServiceAside {
    children: ReactNode;
    service: ServicesValueProps["result"];
    query: string;
    isLoading: boolean;
}
const ServiceAside = ({
    service,
    query,
    children,
    isLoading,
}: ServiceAside) => {
    console.log("first", isLoading);
    const totalAppliedTasks = service?.length;
    const renderTaskCards = service?.map((task, key) => {
        return (
            <div key={key}>
                <Link href={`/service/${task.slug}`}>
                    <a>
                        <ServiceNearYouCard
                            servicePrice={task?.budget_from}
                            serviceTitle={task?.title}
                            serviceRating={task?.success_rate}
                            serviceProviderLocation={task?.location}
                            serviceSlug={task?.slug}
                            discount={20} // To do form api
                            image={
                                Array.isArray(task.images)
                                    ? task.images[0]?.media
                                    : task?.images
                            }
                            serviceProvider={task?.created_by?.full_name}
                        />
                    </a>
                </Link>
            </div>
        );
    });
    return (
        <div className="search-results">
            <Row>
                <Col md={4}>
                    <Scrollbars autoHide style={{ height: 700 }}>
                        {query && totalAppliedTasks > 0 ? (
                            <p className="search-results-text">
                                {`${totalAppliedTasks} service matching ${query} found`}
                            </p>
                        ) : null}
                        {!query && totalAppliedTasks === 0 ? (
                            <Fragment>
                                {Array.from({ length: 3 }).map((_, key) => (
                                    <div
                                        className="mantine-Skeleton mb-5 p-5"
                                        key={key}
                                    >
                                        <div className="d-flex justify-content-between">
                                            <Skeleton
                                                height={90}
                                                width={"40%"}
                                            />

                                            <Skeleton
                                                height={20}
                                                mt={6}
                                                radius="xl"
                                                width={"50%"}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        ) : (
                            renderTaskCards
                        )}
                        {query && totalAppliedTasks === 0 ? (
                            <p className="search-results-text">
                                No services matching {query} found
                            </p>
                        ) : null}
                    </Scrollbars>
                </Col>
                <Col md={8}>{children}</Col>
            </Row>
        </div>
    );
};
export default ServiceAside;
