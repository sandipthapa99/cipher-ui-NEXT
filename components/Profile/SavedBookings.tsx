import { EmptyBookmarks } from "@components/common/EmptyBookmarks";
import MerchantCard from "@components/common/MerchantCard";
import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import { useBookmarks } from "hooks/use-bookmarks";
import { Col, Row } from "react-bootstrap";

const SavedBookings = () => {
    const { data: serviceOrTaskBookmarks } = useBookmarks("entityservice");

    const { data: userBookmarks } = useBookmarks("user");

    const serviceBookmarks = serviceOrTaskBookmarks.filter(
        (bookmark) => !bookmark.data.is_requested
    );

    const taskBookmarks = serviceOrTaskBookmarks.filter(
        (bookmark) => bookmark.data.is_requested
    );
    const isBookmarkAvailable =
        userBookmarks.length > 0 ||
        serviceBookmarks.length > 0 ||
        taskBookmarks.length > 0;

    return (
        // <div className="saved-bookings px-5">
        //     {serviceBookmarks.length > 0 ? (
        //         <Row className="mb-5">
        //             <h3 className="mb-3">
        //                 Services ({serviceBookmarks.length})
        //             </h3>
        //             {serviceBookmarks.map((bookmark) => (
        //                 <Col md={4} lg={3} key={bookmark.id}>
        //                     <ServiceCard
        //                         serviceCard={bookmark.data as any}
        //                         // isSaved={true}
        //                     />
        //                 </Col>
        //             ))}
        //         </Row>
        //     ) : null}

        //     {taskBookmarks.length > 0 ? (
        //         <Row className="mb-5">
        //             <h3 className="mb-3">Tasks ({taskBookmarks.length})</h3>
        //             {taskBookmarks.map((taskBookmark) => (
        //                 <Col md={6} lg={6} key={taskBookmark.id}>
        //                     <TaskCard
        //                         key={taskBookmark.id}
        //                         task={taskBookmark.data as any}
        //                     />
        //                 </Col>
        //             ))}
        //         </Row>
        //     ) : null}

        //     {userBookmarks.length > 0 ? (
        //         <Row className="mb-5">
        //             <h3 className="mb-4">Taskers ({userBookmarks.length})</h3>
        //             {userBookmarks.map((userBookmark) => (
        //                 <Col md={4} sm={6} lg={3} key={userBookmark.id}>
        //                     {/* <UserTaskCard
        //                     key={userBookmark.id}
        //                     tasker={userBookmark.data as any}
        //                     onTaskClick={(task) =>
        //                     isSaved={true}
        //                 /> */}
        //                     {userBookmark.data ? (
        //                         <MerchantCard
        //                             merchantImage={
        //                                 userBookmark.data?.profile_image
        //                                     ? userBookmark.data?.profile_image
        //                                     : userBookmark.data?.profile_image
        //                             }
        //                             merchantName={
        //                                 userBookmark.data?.user
        //                                     ? userBookmark.data?.user
        //                                           ?.first_name +
        //                                           " " +
        //                                           userBookmark.data?.user
        //                                               ?.middle_name ??
        //                                       "" +
        //                                           " " +
        //                                           userBookmark.data?.user
        //                                               ?.last_name
        //                                     : ""
        //                             }
        //                             merchantCategory={
        //                                 userBookmark.data?.designation
        //                             }
        //                             merchantLocation={
        //                                 userBookmark.data?.address_line1 +
        //                                 " " +
        //                                 userBookmark.data?.address_line2
        //                             }
        //                             merchantDescription={userBookmark.data?.bio}
        //                             merchantRating={
        //                                 userBookmark.data?.rating?.avg_rating
        //                             }
        //                             merchantPrice={
        //                                 userBookmark.data?.hourly_rate
        //                             }
        //                             currency={
        //                                 userBookmark.data?.charge_currency
        //                                     ?.symbol
        //                             }
        //                             happyClients={
        //                                 userBookmark.data?.stats?.happy_clients
        //                             }
        //                             successRate={userBookmark.data?.stats?.success_rate.toFixed(
        //                                 1
        //                             )}
        //                             merchantId={
        //                                 userBookmark.data?.user?.id
        //                                     ? userBookmark.data?.user?.id
        //                                     : ""
        //                             }
        //                         />
        //                     ) : (
        //                         ""
        //                     )}
        //                 </Col>
        //             ))}
        //         </Row>
        //     ) : null}
        // </div>
        <>
            {isBookmarkAvailable === true ? (
                <div className="saved-bookings px-5">
                    {serviceBookmarks.length > 0 ? (
                        <Row className="mb-5">
                            <h3 className="mb-3">
                                Services ({serviceBookmarks.length})
                            </h3>
                            {serviceBookmarks.map((bookmark) => (
                                <Col md={4} lg={3} key={bookmark.id}>
                                    <ServiceCard
                                        serviceCard={bookmark.data as any}
                                        // isSaved={true}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : null}

                    {taskBookmarks.length > 0 ? (
                        <Row className="mb-5">
                            <h3 className="mb-3">
                                Tasks ({taskBookmarks.length})
                            </h3>
                            {taskBookmarks.map((taskBookmark) => (
                                <Col md={6} lg={6} key={taskBookmark.id}>
                                    <TaskCard
                                        key={taskBookmark.id}
                                        task={taskBookmark.data as any}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : null}

                    {userBookmarks.length > 0 ? (
                        <Row className="mb-5">
                            <h3 className="mb-4">
                                Taskers ({userBookmarks.length})
                            </h3>
                            {userBookmarks.map((userBookmark) => (
                                <Col md={4} sm={6} lg={3} key={userBookmark.id}>
                                    {/* <UserTaskCard
                                key={userBookmark.id}
                                tasker={userBookmark.data as any}
                                onTaskClick={(task) =>
                                isSaved={true}
                            /> */}
                                    {userBookmark.data ? (
                                        <MerchantCard
                                            merchantImage={
                                                userBookmark.data?.profile_image
                                                    ? userBookmark.data
                                                          ?.profile_image
                                                    : userBookmark.data
                                                          ?.profile_image
                                            }
                                            merchantName={
                                                userBookmark.data?.user
                                                    ? userBookmark.data?.user
                                                          ?.first_name +
                                                          " " +
                                                          userBookmark.data
                                                              ?.user
                                                              ?.middle_name ??
                                                      "" +
                                                          " " +
                                                          userBookmark.data
                                                              ?.user?.last_name
                                                    : ""
                                            }
                                            merchantCategory={
                                                userBookmark.data?.designation
                                            }
                                            merchantLocation={
                                                userBookmark.data
                                                    ?.address_line1 +
                                                " " +
                                                userBookmark.data?.address_line2
                                            }
                                            merchantDescription={
                                                userBookmark.data?.bio
                                            }
                                            merchantRating={
                                                userBookmark.data?.rating
                                                    ?.avg_rating
                                            }
                                            merchantPrice={
                                                userBookmark.data?.hourly_rate
                                            }
                                            currency={
                                                userBookmark.data
                                                    ?.charge_currency?.symbol
                                            }
                                            happyClients={
                                                userBookmark.data?.stats
                                                    ?.happy_clients
                                            }
                                            successRate={userBookmark.data?.stats?.success_rate.toFixed(
                                                1
                                            )}
                                            merchantId={
                                                userBookmark.data?.user?.id
                                                    ? userBookmark.data?.user
                                                          ?.id
                                                    : ""
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </Col>
                            ))}
                        </Row>
                    ) : null}
                </div>
            ) : (
                <EmptyBookmarks />
            )}
        </>
    );
};
export default SavedBookings;
