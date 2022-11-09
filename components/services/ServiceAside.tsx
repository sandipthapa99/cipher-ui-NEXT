import { useSearchedServices } from "@components/common/Search/searchStore";
import ServiceNearYouCard from "@components/SearchTask/searchAside";
import SkeletonServiceCard from "@components/Skeletons/SkeletonServiceCard";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Loader, ScrollArea } from "@mantine/core";
import { useServices } from "hooks/service/use-services";
import { useInViewPort } from "hooks/use-in-viewport";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import type { IService } from "types/service";
import { sortItemsByActive } from "utils/sortItemsByActive";

interface ServiceAside {
    children: ReactNode;
    searchParam: string;
}
const ServiceAside = ({ searchParam, children }: ServiceAside) => {
    const router = useRouter();
    const searchedService = useSearchedServices();
    const {
        data: servicePages,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useServices(searchParam);

    const services = useMemo(
        () =>
            servicePages?.pages
                .map((servicePage) => servicePage.result)
                .flat() ?? [],
        [servicePages?.pages]
    );

    const totalServices = services?.length;
    const isLastServiceOnPage = (index: number) => index === totalServices - 1;

    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    const allServices = searchedService.length > 0 ? searchedService : services;

    const renderServiceCards = () =>
        allServices?.map((task, index) => {
            return (
                <div
                    key={`${task.id}-${index}`}
                    ref={isLastServiceOnPage(index) ? ref : null}
                    className="pe-1"
                >
                    <Link href={`/service/${task.slug}`}>
                        <a>
                            <ServiceNearYouCard
                                budget_from={task?.budget_from}
                                budget_to={task?.budget_to}
                                budget_type={task?.budget_type}
                                currency={
                                    task?.currency?.symbol
                                        ? task.currency.symbol
                                        : " "
                                }
                                serviceTitle={task?.title}
                                serviceRating={
                                    task?.rating?.length > 0
                                        ? task?.rating[0].rating
                                        : ""
                                }
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
                        {!isLoading && searchParam && totalServices > 0 ? (
                            <p className="search-results-text">
                                {`${totalServices} search results found`}
                            </p>
                        ) : null}
                        {!isLoading && renderServiceCards()}
                        {!isLoading && searchParam && totalServices === 0 ? (
                            <p className="search-results-text">
                                No services matching {searchParam} found
                            </p>
                        ) : null}
                        {!isLoading && !searchParam && totalServices === 0 && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faWarning} />}
                                title="Services Unavailable"
                                variant="filled"
                                color="yellow"
                            >
                                No Services available at the moment
                            </Alert>
                        )}
                        {isFetchingNextPage ? <SkeletonServiceCard /> : null}
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
