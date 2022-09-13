import { formatDistanceToNow, parseISO } from "date-fns";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import type { ReviewsProps } from "types/reviews";

import { RatingStars } from "./RatingStars";
const Reviews = ({
    name,
    ratings,
    description,
    raterEmail,
    time,
    image,
}: ReviewsProps) => {
    const timeago = () => {
        try {
            return formatDistanceToNow(parseISO(time), { addSuffix: true });
        } catch (error) {
            return "a while ago";
        }
    };
    //   const { data: profileDetails } = useGetProfileById(raterId);

    return (
        <>
            <div>
                <Row className="review-block">
                    <Col md={1} className="image">
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
                    </Col>
                    <Col md={11}>
                        <div className="review-block__content">
                            <div className="reviewer">
                                <h3 className="name">
                                    {name ? name : raterEmail}
                                </h3>

                                <RatingStars value={ratings} />
                            </div>

                            <p className="description">{description}</p>
                            <p className="time">{timeago()}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default Reviews;
