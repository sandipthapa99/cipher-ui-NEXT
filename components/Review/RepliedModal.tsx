import DeleteModal from "@components/common/DeleteModal";
import { faPencil, faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { timeago } from "utils/timeago";

import DeleteReplyModal from "./DeleteReplyModal";
import { ReplyModal } from "./ReplyModal";
export const RepliedModal = ({
    repliedText,
    repliedBy,
    repliedDate,
    reviewId,
    ratedToImage,
    ratedToId,
}: {
    repliedText: string | undefined;
    reviewId: number;
    repliedBy: string | undefined;
    ratedToImage: string | undefined;
    repliedDate: string | undefined;
    ratedToId: string | undefined;
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showReplyContainer, setShowReplyContainer] = useState(false);
    const [replyHovered, setReplyHovered] = useState<null | number>(null);
    const [id, setId] = useState<number | undefined>();

    const handleDelete = (id: any) => {
        setShowDeleteModal(!showDeleteModal);
        setId(id);
    };

    const { data: profile } = useGetProfile();

    return (
        <>
            {!showReplyContainer && (
                <Row
                    className="align-items-center mt-3"
                    onMouseLeave={() => setReplyHovered(null)}
                    onMouseEnter={() =>
                        setReplyHovered(reviewId ? reviewId : 0)
                    }
                >
                    <Col md={1}>
                        <Link href={`/tasker/${ratedToId}/`}>
                            <a target="_blank">
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            ratedToImage
                                                ? ratedToImage
                                                : "/userprofile/unknownPerson.jpg"
                                        }
                                        width={60}
                                        height={60}
                                        //layout="fill"
                                        objectFit="cover"
                                        alt="reviewer_image"
                                        className="reviewer-image"
                                    />
                                </figure>
                            </a>
                        </Link>
                    </Col>
                    <Col
                        md={11}
                        className="d-flex-col align-items-center reply-container"
                    >
                        <div className="review-block__content">
                            <p className="m-0 replied_by">{repliedBy}</p>
                            <div className="d-flex flex-col">
                                <p className="replied-text m-0">
                                    {repliedText}
                                </p>
                                {replyHovered === reviewId &&
                                profile?.user.id === ratedToId ? (
                                    <div className="icons">
                                        <FontAwesomeIcon
                                            icon={faPencil}
                                            className="svg-icon"
                                            onClick={() => {
                                                setShowReplyContainer(true);
                                                setId(reviewId);
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            className="trash svg-icon"
                                            onClick={() =>
                                                handleDelete(reviewId)
                                            }
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <p className="time">{timeago(repliedDate)}</p>
                        </div>
                    </Col>
                </Row>
            )}
            <DeleteReplyModal
                show={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                id={id}
            />
            {showReplyContainer && (
                <ReplyModal
                    handleClose={() => setShowReplyContainer(false)}
                    reviewId={id}
                    updateReply={true}
                    repliedText={repliedText}
                />
            )}
        </>
    );
};
