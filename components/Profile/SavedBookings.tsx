import ServiceCard from "@components/common/ServiceCard";
import { useBookmarkTasks } from "hooks/task/use-bookmark-tasks";
import { Col, Row } from "react-bootstrap";
import { userSavedBookings } from "staticData/userSavedBookings";

const SavedBookings = () => {
    const { data } = useBookmarkTasks();
    return (
        <div className="saved-bookings">
            <pre>{JSON.stringify(data, null, 4)}</pre>
            <Row className="gx-5">
                {userSavedBookings &&
                    userSavedBookings.map((service) => (
                        <Col
                            className="discover-col"
                            sm={6}
                            md={6}
                            lg={3}
                            key={service.id}
                        >
                            <ServiceCard
                                serviceImage={service.serviceImage}
                                serviceTitle={service.serviceTitle}
                                serviceProvider={service.serviceProvider}
                                serviceProviderLocation={
                                    service.serviceProviderLocation
                                }
                                serviceDescription={service.serviceDescription}
                                serviceRating={service.serviceRating}
                                servicePrice={service.servicePrice}
                            />
                        </Col>
                    ))}
            </Row>
        </div>
    );
};
export default SavedBookings;
