import CardBtn from "@components/common/CardBtn";
import FormButton from "@components/common/FormButton";
import { Modal, Stack, Textarea } from "@mantine/core";
import { Rating } from "@smastrom/react-rating";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { Form, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";
import * as Yup from "yup";

interface ReviewData {
    review: string;
    rating: number;
    task: string;
}

interface ReviewModalProps {
    open: boolean;
    handleClose?: () => void;
    taskId: string;
}

const ReviewModalSchema = Yup.object().shape({
    review: Yup.string().required("Review is required"),
    rating: Yup.number().required("Rating is required"),
});

export const ReviewModal = ({
    open,
    handleClose,
    taskId,
}: ReviewModalProps) => {
    const ratingMutation = useMutation((data) =>
        axiosClient.post("/task/rating/", data)
    );
    // Declare it outside your component so it doesn't get re-created during re-renderings

    const { values, handleSubmit, getFieldProps, setFieldValue } =
        useFormik<ReviewData>({
            initialValues: {
                review: "",
                rating: 0,
                task: taskId,
            },
            validationSchema: ReviewModalSchema,

            onSubmit: (values: any) => {
                const newValues = {
                    ...values,
                    task: taskId,
                };

                ratingMutation.mutate(newValues, {
                    onSuccess: () => {
                        toast.success("Review submitted successfully");
                        handleClose?.();
                    },
                    onError: (err: any) => {
                        toast.error(err.response.data.message);
                    },
                });
            },
        });
    return (
        <Modal
            centered={true}
            onClose={() => handleClose?.()}
            opened={open}
            size="lg"
        >
            <Form onSubmit={handleSubmit}>
                <p className="review-text">Review and Rating</p>
                <div className="review-rating-full">
                    <div className="review-rating-cont">
                        <p className="rating-label">Rating</p>
                        <Rating
                            style={{ maxWidth: 170 }}
                            value={values.rating}
                            onChange={(selectedValue) => {
                                setFieldValue("rating", selectedValue);
                            }}
                        />
                    </div>
                    <Textarea
                        placeholder="Review here..."
                        label="Write review"
                        {...getFieldProps("review")}
                    />
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <p
                            className="review-later"
                            onClick={() => handleClose?.()}
                        >
                            Review Later
                        </p>
                        <CardBtn
                            btnTitle="submit"
                            backgroundColor="#211D4F"
                            handleClick={handleSubmit}
                        />
                    </div>
                </div>
            </Form>
        </Modal>
    );
};
