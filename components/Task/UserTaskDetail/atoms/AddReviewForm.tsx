import { Rating } from "@smastrom/react-rating";
import { useFormik } from "formik";
import { Col, Form, Row } from "react-bootstrap";

interface ReviewData {
    review: string;
    rating: number;
}
export const AddReviewForm = () => {
    const { handleSubmit, getFieldProps, values, setFieldValue } =
        useFormik<ReviewData>({
            initialValues: {
                review: "",
                rating: 0,
            },
            onSubmit: (values) => {
                console.log(values);
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
                    >
                        Submit review
                    </button>
                </Form>
            </Col>
        </Row>
    );
};
