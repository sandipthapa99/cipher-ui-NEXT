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
    console.log("saved tasjs=");
    return (
        <div className="saved-bookings px-5">
            {/* <pre>{JSON.stringify(TasksData, null, 4)}</pre> */}
            <Row>
                {TasksData?.result?.map((task: any, key: any) => (
                    <Col sm="12" key={key}>
                        <TaskCard
                            title={task?.data?.title}
                            id={task?.data?.id}
                            charge={task?.data?.charge}
                            description={task?.data?.description}
                            location={task?.data?.location}
                            start_date={task.data.start_date}
                            start_time={task.data.start_time}
                            status={task?.data?.status}
                            currency={task?.data?.currency}
                            slug={`/task/${task?.slug}`}
                        />
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
        </div>
    );
};
export default SavedBookings;
