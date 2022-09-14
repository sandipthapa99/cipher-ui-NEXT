import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import { useBookmarkTasks } from "hooks/task/use-bookmark-tasks";
import { useData } from "hooks/use-data";
import { Col, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
const SavedBookings = () => {
    const { data: TasksData } = useBookmarkTasks();
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    const taskLength = TasksData && TasksData.result.length;
    const serviceLength = servicesData && servicesData.data.result.length;
    return (
        <div className="saved-bookings px-5">
            {/* <pre>{JSON.stringify(TasksData, null, 4)}</pre> */}
            <h3>Saved Bookings</h3>
            {taskLength &&
            taskLength > 0 &&
            serviceLength &&
            serviceLength > 0 ? (
                <>
                    <Row>
                        {TasksData?.result?.map((task: any, key: any) => (
                            <Col sm="12" key={key}>
                                <TaskCard task={task} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="gx-5">
                        {servicesData &&
                            servicesData?.data?.result?.map((service, key) => (
                                <Col
                                    className="discover-col"
                                    sm={6}
                                    md={6}
                                    lg={3}
                                    key={key}
                                >
                                    <ServiceCard serviceCard={service} />
                                </Col>
                            ))}
                    </Row>
                </>
            ) : (
                <p>You have no Saved Bookings</p>
            )}
        </div>
    );
};
export default SavedBookings;
