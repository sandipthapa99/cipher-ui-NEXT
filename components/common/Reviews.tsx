import { RepliedModal } from "@components/Review/RepliedModal";
import { ReplyModal } from "@components/Review/ReplyModal";
import { faStar as emptyStar } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { ReviewsProps } from "types/reviews";
import { timeago } from "utils/timeago";

const Reviews = ({
    name,
    ratings,
    description,
    raterEmail,
    time,
    image,
    id,
    replied,
    repliedText,
    repliedDate,
    repliedBy,
    raterId,
}: ReviewsProps) => {
    const [replyState, setReplyState] = useState(false);
    // const timeago = (time: any) => {
    //     try {
    //         return formatDistanceToNow(parseISO(time), { addSuffix: true });
    //     } catch (error) {
    //         return "a while ago";
    //     }
    // };
    const handleClose = () => {
        setReplyState(false);
    };
    //   const { data: profileDetails } = useGetProfileById(raterId);

    return (
        <>
            <div>
                <Row className="review-block">
                    <Col md={1} className="image">
                        <Link href={`/tasker/${raterId}/`}>
                            <a target="_blank">
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            image
                                                ? image
                                                : "/userprofile/unknownPerson.jpg"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="referral-card-image"
                                    />
                                </figure>
                            </a>
                        </Link>
                    </Col>
                    <Col md={11}>
                        <div className="review-block__content">
                            <div className="reviewer">
                                <h3 className="name">
                                    {name ? name : raterEmail}
                                </h3>

                                <Rating
                                    value={ratings}
                                    readOnly
                                    emptySymbol={
                                        <FontAwesomeIcon
                                            icon={emptyStar}
                                            className="star"
                                        />
                                    }
                                    fullSymbol={
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="star"
                                        />
                                    }
                                />
                                <span>{ratings > 5 ? 5 : ratings}</span>
                            </div>

                            <p className="description">
                                {description ? description : "No Reviews yet"}
                            </p>
                            <p className="time">{timeago(time)}</p>
                            {!replied && (
                                <p
                                    className="reply-text"
                                    onClick={() => setReplyState(true)}
                                >
                                    Reply
                                </p>
                            )}
                            {replyState && (
                                <ReplyModal
                                    handleClose={handleClose}
                                    reviewId={id}
                                    reply={replied}
                                />
                            )}
                            {replied && (
                                <RepliedModal
                                    repliedText={repliedText}
                                    reviewId={id ? id : 0}
                                    repliedBy={repliedBy}
                                    repliedDate={repliedDate}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default Reviews;
