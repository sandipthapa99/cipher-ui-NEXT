import { Col, Form, Row } from "react-bootstrap";

interface FilterReviewProps {
    totalReviews: number;
}
export const FilterReview = ({ totalReviews }: FilterReviewProps) => {
    return (
        <Row className="td-filter-review-container">
            <Col>
                <div className="d-flex">
                    <h2 className="d-flex align-items-center">
                        Reviews{" "}
                        <span className="td-reviews-count">{`(${totalReviews})`}</span>
                    </h2>
                </div>
            </Col>
            <Col>
                <Form.Select>
                    <option>Sort by</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-relevant">Most Relevant</option>
                </Form.Select>
            </Col>
        </Row>
    );
};
