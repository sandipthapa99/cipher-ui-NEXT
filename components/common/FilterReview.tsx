import { Formik } from "formik";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { reviewSearchData } from "utils/formData";
import ReviewSearchSchema from "utils/formValidation/reviewSearchSchema";
interface FilterReviewProps {
    totalReviews: number | undefined;
}
export const FilterReview = ({ totalReviews }: FilterReviewProps) => {
    const [search, setSearch] = useState<string>("-rating");

    return (
        <Row className="td-filter-review-container">
            <Col md={4}>
                <div className="d-flex">
                    <h2 className="d-flex align-items-center">
                        Reviews{" "}
                        <span className="td-reviews-count">{`(${totalReviews})`}</span>
                    </h2>
                </div>
            </Col>
            <Col md={{ span: 7, offset: 1 }}>
                <Row className="select-field justify-content-end">
                    <Col md={6}>
                        <Formik
                            initialValues={reviewSearchData}
                            validationSchema={ReviewSearchSchema}
                            onSubmit={async (values) => {
                                console.log(values);
                            }}
                        >
                            <Form
                                onChange={(e: any) => {
                                    setSearch(e.target.value);
                                }}
                            >
                                <Form.Select
                                    aria-label="Default select example"
                                    className="dropdown-wrapper"
                                >
                                    <option value="-rating">
                                        Most Relevant
                                    </option>
                                    <option value="-created_at">Latest</option>
                                    <option value="-rating">Top</option>
                                </Form.Select>
                            </Form>
                        </Formik>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
