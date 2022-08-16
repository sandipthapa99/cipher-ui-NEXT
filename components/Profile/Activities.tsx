import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { userActivitiesTimeline } from "staticData/userActivitiesTimeline";
const UserActivities = () => {
    return (
        <div className="activities">
            {userActivitiesTimeline &&
                userActivitiesTimeline.map((activity) => (
                    <div className="timeline" key={activity.id}>
                        <Row>
                            <Col md={1} sm={2} xs={2}>
                                {activity.editService ? (
                                    <div className="date">
                                        <p>{activity.date}</p>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </Col>
                            <Col md={10} sm={9} xs={9}>
                                <div className="content d-flex">
                                    <div className="point"></div>
                                    <div className="desc">
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={activity.image}
                                                layout="fill"
                                                objectFit="cover"
                                                alt="service-icon"
                                            />
                                        </figure>
                                        <div className="detail">
                                            <p>{activity.title}</p>
                                            {activity.editService ? (
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
                ))}
        </div>
    );
};
export default UserActivities;
