import ServiceCard from "@components/common/ServiceCard";
import { useBookmarkTasks } from "hooks/task/use-bookmark-tasks";
import { useData } from "hooks/use-data";
import { Col, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";

const SavedBookings = () => {
    const { data } = useBookmarkTasks();
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <div className="saved-bookings">
            <pre>{JSON.stringify(data, null, 4)}</pre>
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
