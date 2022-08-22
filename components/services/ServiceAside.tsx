import ServiceNearYouCard from "@components/SearchTask/searchAside";
import Link from "next/link";
import type { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";

interface TaskAsideProps {
    children: ReactNode;
    appliedTasks: ServicesValueProps["result"];
    query: string;
}
const TaskAside = ({ appliedTasks, query, children }: TaskAsideProps) => {
    const totalAppliedTasks = appliedTasks?.length;
    const renderTaskCards = appliedTasks?.map((task, key) => {
        return (
            <div key={key}>
                <Link href={"/"}>
                    <a>
                        <ServiceNearYouCard
                            servicePrice={task?.budget}
                            serviceTitle={task?.title}
                            serviceRating={task?.success_rate}
                            serviceProviderLocation={task?.location}
                            discount={20} // To do form api
                            image={
                                Array.isArray(task.images)
                                    ? task.images[0].image
                                    : task.images
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
                <Col md={4} style={{ overflowY: "scroll", maxHeight: "90vh" }}>
                    {query && totalAppliedTasks > 0 ? (
                        <p className="search-results-text">
                            {`${totalAppliedTasks} service matching ${query} found`}
                        </p>
                    ) : null}
                    {query && totalAppliedTasks === 0 ? (
                        <p className="search-results-text">
                            No services matching {query} found
                        </p>
                    ) : null}
                    {renderTaskCards}
                </Col>

                <Col md={8}>{children}</Col>
            </Row>
        </div>
    );
};
export default TaskAside;