import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import { UserTaskCard } from "@components/Task/UserTaskCard/UserTaskCard";
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
                    <Col md={4} lg={3} key={bookmark.id}>
                        <ServiceCard
                            key={bookmark.id}
                            serviceCard={bookmark.data as any}
                            // isSaved={true}
                        />
                    </Col>
                ))}
            </Row>

            <Row>
                <h3>Tasks ({taskBookmarks.length})</h3>
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
                    <Col md={4} sm={6} lg={3} key={userBookmark.id}>
                        {/* <UserTaskCard
                            key={userBookmark.id}
                            tasker={userBookmark.data as any}
                            onTaskClick={(task) => console.log(task)}
                            isSaved={true}
                        /> */}
                        {userBookmark.data ? (
                            <MerchantCard
                                merchantImage={
                                    userBookmark.data
                                        ? userBookmark.data?.profile_image
                                        : ""
                                }
                                merchantName={
                                    userBookmark.data?.user
                                        ? userBookmark.data?.user.full_name
                                        : ""
                                }
                                merchantCategory={
                                    userBookmark.data?.designation
                                }
                                merchantLocation={
                                    userBookmark.data?.address_line1 +
                                    " " +
                                    userBookmark.data?.address_line2
                                }
                                merchantDescription={userBookmark.data?.bio}
                                merchantRating={
                                    userBookmark.data?.stats?.user_reviews
                                }
                                merchantPrice={userBookmark.data?.hourly_rate}
                                currency={
                                    userBookmark.data?.charge_currency?.code
                                }
                                happyClients={
                                    userBookmark.data?.stats?.happy_clients
                                }
                                successRate={
                                    userBookmark.data?.stats?.success_rate
                                }
                                merchantId={
                                    userBookmark.data?.user?.id
                                        ? userBookmark.data?.user?.id
                                        : ""
                                }
                            />
                        ) : (
                            ""
                        )}
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default SavedBookings;
