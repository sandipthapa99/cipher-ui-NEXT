import { format } from "date-fns";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { UserProfileProps } from "types/userProfileProps";

const UserActivities = () => {
    const { data: activities } = useData<UserProfileProps["activitiesData"]>(
        ["tasker-activities"],
        "/history/my-activities/"
    );
    const [id, setId] = useState<number | undefined>(
        activities?.data?.result[0]?.id
    );
    const [showFirstDate, setShowFirstDate] = useState(true);

    let idFirst = activities?.data?.result[0]?.id;

    return (
        <div className="activities">
            {activities?.data && activities?.data.result.length > 0 ? (
                activities?.data?.result?.map((activity) => (
                    <div
                        className="timeline"
                        key={activity.id}
                        onClick={() => {
                            setId(activity.id);
                            setShowFirstDate(false);
                            idFirst = 0;
                        }}
                    >
                        <Row>
                            <Col md={1} sm={2} xs={2}>
                                {id === activity.id ||
                                (idFirst === activity.id && showFirstDate) ? (
                                    <div className="date">
                                        <p>
                                            {format(
                                                new Date(activity.action_time),
                                                "MMM yyyy"
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
                                        {/* <figure className="thumbnail-img">
                                            <Image
                                                src={activity.image}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="service-icon"
                                            />
                                        </figure> */}
                                        {activity.action.includes("Login") ? (
                                            <figure className="thumbnail-img">
                                                <Image
                                                    src="/userprofile/activities/loggedin.svg"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt="service-icon"
                                                />
                                            </figure>
                                        ) : (
                                            ""
                                        )}
                                        <div className="detail">
                                            <p>{activity.action}</p>
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
        </div>
    );
};
export default UserActivities;
