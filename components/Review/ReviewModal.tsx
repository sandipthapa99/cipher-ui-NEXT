import CardBtn from "@components/common/CardBtn";
import { Modal, Textarea } from "@mantine/core";
import { Rating } from "@mantine/core";
import { StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
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
                    rating: values.rating,
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
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={open}
            size="lg"
        >
            <div className="review-modal">
                <Form onSubmit={handleSubmit}>
                    <p className="review-text">Review and Rating</p>
                    <div className="review-rating-full">
                        <div className="review-rating-cont">
                            {/* <p className="rating-label">Rating</p> */}
                            {/* <Rating
                            style={{ maxWidth: 170 }}
                            value={values.rating}
                            onChange={(selectedValue) => {
                                setFieldValue("rating", selectedValue);
                            }}
                        /> */}
                            <Rating
                                defaultValue={0}
                                value={values.rating}
                                emptySymbol={
                                    <StarOutlineRounded className="star" />
                                }
                                fullSymbol={<StarRounded className="star" />}
                                onChange={(selectedValue) => {
                                    setFieldValue("rating", selectedValue);
                                }}
                            />
                        </div>
                        <br />
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
            </div>
        </Modal>
    );
};
