import { useQueryClient } from "@tanstack/react-query";
import format from "date-fns/esm/fp/format/index.js";
import { useGetProfileById } from "hooks/profile/getProfileById";
import moment from "moment";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import type { ReviewsProps } from "types/reviews";
const Reviews = ({
    name,
    ratings,
    image,
    description,
    raterEmail,
    time,
    raterId,
}: ReviewsProps) => {
    console.log("incoming time =", time);
    const timeago = moment(time).fromNow();
    console.log("timeago", timeago);
    const { data: profileDetails, error } = useGetProfileById(raterId);

    console.log("user data=", profileDetails);
    const userImage = profileDetails?.profile_image;
    return (
        <>
            <div>
                <Row className="review-block">
                    <Col md={1} className="image">
                        <figure className="thumbnail-img">
                            <Image
                                src={
                                    userImage
                                        ? userImage
                                        : "/userprofile/unknownPerson.jpg"
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="referral-card-image"
                            />
                        </figure>
                    </Col>
                    <Col md={11}>
                        <div className="review-block__content">
                            <div className="reviewer">
                                <h3 className="name">
                                    {name ? name : raterEmail}
                                </h3>

                                <div className="ratings d-flex">
                                    {Array.from({ length: ratings }, (_, i) => (
                                        <span key={i}>
                                            <figure className="thumbnail-img">
                                                <Image
                                                    src="/icons/rated.svg"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    alt="rated-star-img"
                                                />
                                            </figure>
                                        </span>
                                    ))}
                                    {Array.from(
                                        { length: 5 - ratings },
                                        (_, i) => (
                                            <span key={i}>
                                                {" "}
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src="/icons/unrated.svg"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="unrated-star-img"
                                                    />
                                                </figure>
                                            </span>
                                        )
                                    )}
                                </div>
                                <p>{ratings}</p>
                            </div>

                            <p className="description">{description}</p>
                            <p className="time">{timeago}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default Reviews;
