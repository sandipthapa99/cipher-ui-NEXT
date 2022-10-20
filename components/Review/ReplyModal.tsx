import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

export const ReplyModal = () => {
    const { data: profileDetails } = useGetProfile();
    return (
        <Row className="align-items-center mt-3">
            <Col md={1}>
                <Image
                    src={
                        profileDetails
                            ? profileDetails?.profile_image
                            : "/userprofile/unknownPerson.jpg"
                    }
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt="reviewer_image"
                    className="reviewer-image"
                />
            </Col>
            <Col md={11}>
                <div className="Reply-cont">
                    <input
                        type="text"
                        placeholder="Reply"
                        className="reply-input"
                    />
                </div>
            </Col>
        </Row>
    );
};
