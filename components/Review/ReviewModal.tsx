import CardBtn from "@components/common/CardBtn";
import FormButton from "@components/common/FormButton";
import { Modal, Stack, Textarea } from "@mantine/core";
import { Rating } from "@smastrom/react-rating";
import { useFormik } from "formik";
import Link from "next/link";
import { Form, Row } from "react-bootstrap";

interface ReviewData {
    review: string;
    rating: number;
}

interface ReviewModalProps {
    open: boolean;
    handleClose?: () => void;
}
export const ReviewModal = ({ open }: ReviewModalProps) => {
    // Declare it outside your component so it doesn't get re-created during re-renderings

    const handleClose: () => void = () => {
        console.log("hello");
    };

    const { values, handleSubmit, getFieldProps, setFieldValue, resetForm } =
        useFormik<ReviewData>({
            initialValues: {
                review: "",
                rating: 0,
            },
            onSubmit: (values) => {
                console.log(values);
                resetForm();
            },
        });
    return (
        <Modal centered={true} onClose={handleClose} opened={open} size="lg">
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
                        <p className="review-later">Review Later</p>
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
