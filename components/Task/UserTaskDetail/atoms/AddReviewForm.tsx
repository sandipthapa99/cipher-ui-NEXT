import { RatingStars } from "@components/common/RatingStars";
import { Col, Form, Row } from "react-bootstrap";

export const AddReviewForm = () => {
    return (
        <Row>
            <Col md={8}>
                <Form>
                    <Form.Group>
                        <Form.Label className="td-add-review-label">
                            Write your review
                        </Form.Label>
                        <Form.Control type="text" placeholder="Review" />
                    </Form.Group>
                </Form>
                <div className="td-mt-24">
                    <p className="td-add-review-label">Give your rating</p>
                    <RatingStars value={3} />
                </div>
                <button className="td-mt-24 td-submit-review-btn" type="button">
                    Submit review
                </button>
            </Col>
        </Row>
    );
};
