import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

export const RepliedModal = ({
    repliedText,
    repliedBy,
}: {
    repliedText: string | undefined;
    repliedBy: string | undefined;
}) => {
    const { data: profileDetails } = useGetProfile();

    return (
        <>
            <Row className="align-items-center mt-3">
                <Col md={1}>
                    <Image
                        src={
                            profileDetails
                                ? profileDetails?.profile_image
                                : "/userprofile/unknownPerson.jpg"
                        }
                        width={30}
                        height={30}
                        objectFit="cover"
                        alt="reviewer_image"
                        className="reviewer-image"
                    />
                </Col>
                <Col md={11} className="d-flex-col align-items-center">
                    <p>{repliedBy}</p>
                    <p className="replied-text">{repliedText}</p>
                </Col>
            </Row>
        </>
    );
};
