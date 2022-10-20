import CardBtn from "@components/common/CardBtn";
import { Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { useState } from "react";
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
    reply,
}: {
    handleClose: () => void;
    reviewId: number;
    reply: boolean;
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
                onError: (err: any) => {
                    toast.error("Replied Failed");
                },
            });
        },
    });
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
                <Col md={11}>
                    <div className="Reply-cont">
                        <Form onSubmit={handleSubmit}>
                            <input
                                name="reply"
                                type="text"
                                placeholder="Reply"
                                className="reply-input"
                                onChange={(e) => {
                                    setFieldValue("reply", e.target.value);
                                }}
                            />
                        </Form>
                    </div>
                </Col>
            </Row>

            <div className="reply-btn">
                <Button variant="subtle" color={"gray"} radius="xl">
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
        </>
    );
};
