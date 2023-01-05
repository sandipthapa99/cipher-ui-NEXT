import { RepliedModal } from "@components/Review/RepliedModal";
import { ReplyModal } from "@components/Review/ReplyModal";
import { Rating } from "@mantine/core";
import { StarBorderRounded, StarRounded } from "@mui/icons-material";
import { useGetProfile } from "hooks/profile/useGetProfile";
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
    ratedByImage,
    ratedToImage,
    id,
    replied,
    repliedText,
    repliedDate,
    repliedBy,
    ratedToId,
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
    const { data: profile } = useGetProfile();

    return (
        <>
            <div>
                <Row className="review-block">
                    <Col
                        sm={1}
                        className="image d-md-flex justify-content-center"
                    >
                        <Link href={`/tasker/${raterId}/`}>
                            <a target="_blank">
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            ratedByImage
                                                ? ratedByImage
                                                : "/userprofile/unknownPerson.jpg"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="reviewer-image"
                                    />
                                </figure>
                            </a>
                        </Link>
                    </Col>
                    <Col sm={11}>
                        <div className="review-block__content">
                            <div className="reviewer">
                                <h3 className="name">
                                    {name ? name : raterEmail}
                                </h3>

                                <Rating
                                    value={ratings}
                                    readOnly
                                    emptySymbol={
                                        <StarBorderRounded className="star" />
                                    }
                                    fullSymbol={
                                        <StarRounded className="star" />
                                    }
                                />
                                <span>{ratings > 5 ? 5 : ratings}</span>
                            </div>

                            <p className="description">
                                {description ? description : "No Reviews yet"}
                            </p>
                            <p className="time">{timeago(time)}</p>
                            {!replied &&
                                profile &&
                                profile?.user.id === ratedToId && (
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
                                    ratedToImage={ratedToImage}
                                    ratedToId={ratedToId}
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
