import ServiceNearYouCard from "@components/SearchTask/searchAside";
import SkeletonServiceCard from "@components/Skeletons/SkeletonServiceCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, ScrollArea } from "@mantine/core";
import Link from "next/link";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
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
    const totalAppliedTasks = service?.length;
    const renderTaskCards = service?.map((task, key) => {
        return (
            <div key={key} className="pe-1">
                <Link href={`/service/${task.slug}`}>
                    <a>
                        <ServiceNearYouCard
                            budget_from={task?.budget_from}
                            budget_to={task?.budget_to}
                            budget_type={task?.budget_type}
                            currency={task?.currency?.symbol}
                            serviceTitle={task?.title}
                            serviceRating={task?.views_count}
                            serviceProviderLocation={task?.location}
                            serviceSlug={task?.slug}
                            discount={20} // To do form api
                            image={
                                Array.isArray(task.images)
                                    ? task.images[0]?.media
                                    : task?.images
                            }
                            serviceProvider={`${task?.created_by?.first_name} ${task?.created_by?.last_name}`}
                        />
                    </a>
                </Link>
            </div>
        );
    });
    const renderServiceSkeletons = () => {
        return (
            <Fragment>
                {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonServiceCard key={index} />
                ))}
            </Fragment>
        );
    };
    return (
        <div className="search-results">
            <Row>
                <Col md={4}>
                    <ScrollArea.Autosize
                        maxHeight={700}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        {isLoading && renderServiceSkeletons()}
                        {!isLoading && query && totalAppliedTasks > 0 ? (
                            <p className="search-results-text">
                                {`${totalAppliedTasks} service matching ${query} found`}
                            </p>
                        ) : null}
                        {!isLoading && renderTaskCards}
                        {!isLoading && query && totalAppliedTasks === 0 ? (
                            <p className="search-results-text">
                                No services matching {query} found
                            </p>
                        ) : null}
                        {!isLoading && !query && totalAppliedTasks === 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="Services Unavailable"
                                variant="filled"
                                color="yellow"
                            >
                                No Services available at the moment
                            </Alert>
                        )}
                    </ScrollArea.Autosize>
                </Col>

                <Col md={8}>
                    <ScrollArea.Autosize
                        maxHeight={700}
                        offsetScrollbars
                        scrollbarSize={5}
                    >
                        {children}
                    </ScrollArea.Autosize>
                </Col>
            </Row>
        </div>
    );
};
export default ServiceAside;
