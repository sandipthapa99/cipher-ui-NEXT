import { Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { Col, Form, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";
import * as Yup from "yup";

const ReplyValidationSchema = Yup.object().shape({
    reply: Yup.string().required("Required field"),
});

export const ReplyModal = ({
    reviewId,
    handleClose,
    repliedText,
}: {
    handleClose: () => void;
    reviewId: number | undefined;
    reply?: boolean | undefined;
    updateReply?: boolean | undefined;
    repliedText?: string | undefined;
}) => {
    const { data: profileDetails } = useGetProfile();
    const queryClient = useQueryClient();

    const replyMutation = useMutation((data) =>
        axiosClient.patch(`/task/rating/${reviewId}/`, data)
    );
    const { handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            reply: "",
        },
        validationSchema: ReplyValidationSchema,
        onSubmit: (values: any) => {
            replyMutation.mutate(values, {
                onSuccess: () => {
                    toast.success("Replied successfully");
                    queryClient.invalidateQueries(["tasker-rating"]);
                    handleClose();
                },
                onError: () => {
                    toast.error("Replied Failed");
                },
            });
        },
    });

    return (
        <div className="px-3">
            <Row className="align-items-center mt-3">
                <Col md={1}>
                    <Image
                        src={
                            profileDetails
                                ? profileDetails?.profile_image
                                : "/userprofile/unknownPerson.jpg"
                        }
                        width={40}
                        height={40}
                        objectFit="cover"
                        alt="reviewer_image"
                        className="reviewer-image"
                    />
                </Col>
                <Col md={11}>
                    <div className="Reply-cont">
                        <Form onSubmit={handleSubmit}>
                            <input
                                name="reply"
                                type="text"
                                placeholder="Your Reply"
                                className="reply-input"
                                defaultValue={repliedText ? repliedText : ""}
                                onChange={(e) => {
                                    setFieldValue("reply", e.target.value);
                                }}
                            />
                        </Form>
                    </div>
                </Col>
            </Row>

            <div className="reply-btn">
                <Button
                    variant="subtle"
                    color={"gray"}
                    radius="xl"
                    onClick={() => handleClose()}
                >
                    Cancel
                </Button>
                <Button
                    radius="xl"
                    color={"yellow"}
                    onClick={() => handleSubmit()}
                >
                    Reply
                </Button>
            </div>
        </div>
    );
};
