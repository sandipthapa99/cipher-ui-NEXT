import ServiceCard from "@components/common/ServiceCard";
import Image from "next/image";
import Link from "next/link";
import { Col,Row } from "react-bootstrap";
import { userSavedBookings } from "staticData/userSavedBookings";
import { UserActivitiesTimeline } from "types/userActivitiesTimeline";
const UserActivities = ({ title, date, editService, image, ipAddress, loggedInDate }: UserActivitiesTimeline) => {
    return (

        <div className="timeline">
            <Row>
                <Col md={1} sm={2} xs={2}>
                    {editService ? <div className="date">
                        <p>{date}</p>
                    </div> : ""}

                </Col>
                <Col md={10} sm={9} xs={9}>
                    <div className="content d-flex">
                        <div className="point"></div>
                        <div className="desc">
                            <figure className="thumbnail-img">
                                <Image
                                    src={image}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="service-icon"
                                />
                            </figure>
                            <div className="detail">
                                <p>{title}</p>
                                {editService ? <Link href="#!">Edit Service</Link> : ''}

                            </div>
                        </div>


                    </div>

                </Col>
            </Row>
        </div>

    );
};
export default UserActivities;
