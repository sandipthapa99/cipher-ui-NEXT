import { ScrollArea } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { index } from "cheerio/lib/api/traversing";
import { format } from "date-fns";
import { useInViewPort } from "hooks/use-in-viewport";
import { useUserActivities } from "hooks/userActivities/use-userActivities";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";

const UserActivities = () => {
    const {
        data: activityPages,
        isLoading,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
    } = useUserActivities();

    const activities = useMemo(
        () =>
            activityPages?.pages
                .map((activityPage) => activityPage.result)
                .flat() ?? [],
        [activityPages?.pages]
    );

    const totalActivities = activities?.length;
    const isLastActivityOnPage = (index: number) =>
        index === totalActivities - 1;

    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    // const activities = activityPages?.pages[0];
    // console.log("Infinite", activities);

    // const [id, setId] = useState<number | undefined>(activities?.result[0].id);
    // const [showFirstDate, setShowFirstDate] = useState(true);

    // let idFirst = activities?.result[0].id;

    return (
        <div className="activities">
            <ScrollArea.Autosize
                maxHeight={800}
                offsetScrollbars
                scrollbarSize={5}
            >
                {activities && activities.length > 0 ? (
                    activities?.map((activity, index) => (
                        <div
                            className="timeline"
                            key={activity.id}
                            ref={isLastActivityOnPage(index) ? ref : null}
                        >
                            <Row className="w-100">
                                <Col md={1} sm={2} xs={2}>
                                    <div className="date">
                                        <p>
                                            {format(
                                                new Date(activity.action_time),
                                                "dd MMM yyyy"
                                            )}{" "}
                                        </p>
                                    </div>
                                </Col>
                                <Col md={10} sm={9} xs={9}>
                                    <div className="content d-flex">
                                        <div></div>
                                        <div className="desc">
                                            {activity.action === "Login" && (
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src="/userprofile/activities/loggedin.svg"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="service-icon"
                                                    />
                                                </figure>
                                            )}
                                            {activity.action === "Create" && (
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src="/userprofile/activities/create.svg"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="service-icon"
                                                    />
                                                </figure>
                                            )}
                                            {activity.action === "Update" && (
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src="/userprofile/activities/update.svg"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="service-icon"
                                                    />
                                                </figure>
                                            )}
                                            {activity.action === "Delete" && (
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src="/userprofile/activities/delete.svg"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="service-icon"
                                                    />
                                                </figure>
                                            )}
                                            <div className="detail">
                                                <p>{activity.object_repr}</p>
                                                {activity.action.includes(
                                                    "service"
                                                ) ? (
                                                    <Link href="#!">
                                                        Edit Service
                                                    </Link>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ))
                ) : (
                    <p>You have no activities</p>
                )}
                <div className="mt-3">
                    {isFetchingNextPage ? (
                        <>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                                height={8}
                                mt={6}
                                width="70%"
                                radius="xl"
                            />
                        </>
                    ) : null}
                </div>
            </ScrollArea.Autosize>
        </div>
    );
};
export default UserActivities;
