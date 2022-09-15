import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import { UserTaskCard } from "@components/Task/UserTaskCard/UserTaskCard";
import { SimpleGrid } from "@mantine/core";
import { useBookmarks } from "hooks/use-bookmarks";
import { Col, Row } from "react-bootstrap";
const SavedBookings = () => {
    const { data: serviceBookmarks } = useBookmarks("service");
    const { data: taskBookmarks } = useBookmarks("task");
    const { data: userBookmarks } = useBookmarks("user");

    return (
        <div className="saved-bookings px-5">
            <Row>
                <h3>Services ({serviceBookmarks.length})</h3>
                {serviceBookmarks.map((bookmark) => (
                    <Col md={3} lg={4} key={bookmark.id}>
                        <ServiceCard
                            key={bookmark.id}
                            serviceCard={bookmark.data as any}
                            // isSaved={true}
                        />
                    </Col>
                ))}
            </Row>

            <Row>
                <h3>Services ({taskBookmarks.length})</h3>
                {taskBookmarks.map((taskBookmark) => (
                    <Col md={3} lg={4} key={taskBookmark.id}>
                        <TaskCard
                            key={taskBookmark.id}
                            task={taskBookmark.data as any}
                        />
                    </Col>
                ))}
            </Row>
            <Row>
                <h3>Taskers ({userBookmarks.length})</h3>
                {userBookmarks.map((userBookmark) => (
                    <Col md={3} lg={4} key={userBookmark.id}>
                        <UserTaskCard
                            key={userBookmark.id}
                            task={userBookmark.data as any}
                            onTaskClick={(task) => console.log(task)}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default SavedBookings;
