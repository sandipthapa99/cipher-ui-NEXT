import { Rating } from "@smastrom/react-rating";
import { Formik, useFormik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { useForm } from "hooks/use-form";
import { Col, Form, Row } from "react-bootstrap";
import { useWithLogin } from "store/use-login-prompt-store";

interface ReviewData {
    review: string;
    rating: number;
}
export const AddReviewForm = () => {
    const { mutate } = useForm(`/task/rating/`);
    const { data: userDetails } = useUser();
    const withLogin = useWithLogin();

    const { handleSubmit, getFieldProps, values, setFieldValue } =
        useFormik<ReviewData>({
            initialValues: {
                review: "",
                rating: 0,
            },
            onSubmit: (values) => {
                console.log(values);

                //
                mutate(values, {
                    onSuccess: async () => {
                        // queryClient.invalidateQueries(["tasker-experience"]);
                        // toast.success("Experience detail added successfully");
                    },
                    onError: async (error) => {
                        // toast.error(error.message);
                    },
                });
            },
        });

    return (
        <Row>
            <Col md={8}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="td-add-review-label">
                            Write your review
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Review"
                            {...getFieldProps("review")}
                        />
                    </Form.Group>
                    <div className="td-mt-24">
                        <p className="td-add-review-label">Give your rating</p>
                        <Rating
                            style={{ maxWidth: 200 }}
                            value={values.rating}
                            onChange={(selectedValue) => {
                                setFieldValue("rating", selectedValue);
                            }}
                        />
                    </div>
                    <button
                        className="td-mt-24 td-submit-review-btn"
                        type="submit"
                        onClick={withLogin(handleSubmit)}
                    >
                        Submit review
                    </button>
                </Form>
            </Col>
        </Row>
    );
};
