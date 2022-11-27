import { ScrollArea } from "@mantine/core";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { UserProfileProps } from "types/userProfileProps";
import { axiosClient } from "utils/axiosClient";

const UserActivities = () => {
    // const { data: activities } = useData<UserProfileProps["activitiesData"]>(
    //     ["tasker-activities"],
    //     "/history/my-activities/?page_size=40"
    // );

    const fetchActivities = ({ pageParam = 1 }) => {
        return axiosClient.get(
            `https://sandbox.cipher.api.cagtu.io/api/v1/history/my-activities/?page=${pageParam}`
        );
    };

    const {
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery(["colors"], fetchActivities, {
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < 4) {
                return pages.length + 1;
            } else {
                return undefined;
            }
        },
    });
    const [id, setId] = useState<number | undefined>(data.pages.result[0].id);
    const [showFirstDate, setShowFirstDate] = useState(true);

    const idFirst = data.result[0].id;

    return (
        <div className="activities">
            <ScrollArea.Autosize
                maxHeight={800}
                offsetScrollbars
                scrollbarSize={5}
            >
                {data?.pages.map((group, i) => {
                    return <>{
                        group.data.map(activity => (
                            <div
                                className="timeline"
                                key={activity.id}
                                onClick={() => {
                                    setId(activity.id);
                                    setShowFirstDate(false);
                                    idFirst = 0;
                                }}
                            >
                                <Row className="w-100">
                                    <Col md={1} sm={2} xs={2}>
                                        {id === activity.id ||
                                            (idFirst === activity.id &&
                                                showFirstDate) ? (
                                            <div className="date">
                                                <p>
                                                    {format(
                                                        new Date(
                                                            activity.action_time
                                                        ),
                                                        "dd MMM yyyy"
                                                    )}{" "}
                                                </p>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </Col>
                                    <Col md={10} sm={9} xs={9}>
                                        <div className="content d-flex">
                                            <div
                                                className={
                                                    id === activity.id ||
                                                        (idFirst === activity.id &&
                                                            showFirstDate)
                                                        ? "point-active"
                                                        : "point"
                                                }
                                            ></div>
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
                        )
                    }</>;
                })}
            </ScrollArea.Autosize>
        </div>
    );
};
export default UserActivities;
