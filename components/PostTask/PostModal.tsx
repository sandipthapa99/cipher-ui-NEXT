import { useSuccessContext } from "context/successContext/successContext";
import { useFormik } from "formik";
import Image from "next/image";
import { Button, Col, Form, Row } from "react-bootstrap";
import { PostTaskData } from "types/postTaskData";

import { categoryData } from "../../types/categoryData";
import { postTaskValidationSchema } from "../../utils/PostTask/postTaskValidation";
import AddRequirements from "./AddRequirements";

interface Props {
    onSubmit: () => void;
}
const PostModal = ({ onSubmit }: Props) => {
    const { setShowSuccessModal } = useSuccessContext();

    const renderCategory = categoryData.map((category) => {
        return (
            <option
                key={category.id}
                value={category.name.split(" ").join("").toLowerCase()}
            >
                {category.name}
            </option>
        );
    });

    const {
        handleSubmit,
        getFieldProps,
        errors,
        setFieldValue,
        touched,
        values,
    } = useFormik<PostTaskData>({
        initialValues: {
            title: "",
            titleDescription: "",
            category: "",
            subcategory: "",
            dateTime: "",
            estimatedHour: 0,
            budgetType: "fixed",
            fixedValue: 0,
            minBudget: 0,
            maxBudget: 1000000,
            address: "",
            requirements: [],
            image: null,
        },
        onSubmit(values) {
            onSubmit();
            console.log(values);
            console.log(values.budgetType);

            setShowSuccessModal(true);
        },
        validationSchema: postTaskValidationSchema,
    });
    return (
        <>
            <h3>Post a Task</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Give a title to your task</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Main Headline"
                        style={
                            touched.title && errors.title
                                ? { border: "1px solid red" }
                                : {}
                        }
                        {...getFieldProps("title")}
                    />
                    {touched.title && errors.title ? (
                        <div
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                        >
                            {errors.title}
                        </div>
                    ) : null}
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Describe your requirements in few words."
                        style={
                            errors.titleDescription && touched.titleDescription
                                ? { border: "1px solid red", height: "100px" }
                                : { height: "100px" }
                        }
                        {...getFieldProps("titleDescription")}
                    />
                    {errors.titleDescription && touched.titleDescription ? (
                        <div
                            className="error-message"
                            style={{ color: "red", fontSize: "12px" }}
                        >
                            {errors.titleDescription}
                        </div>
                    ) : null}
                </Form.Group>
                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                style={
                                    errors.category && touched.category
                                        ? { border: "1px solid red" }
                                        : {}
                                }
                                className="dropdown"
                                aria-label="Choose relevant"
                                {...getFieldProps("category")}
                            >
                                <option>Category</option>
                                {renderCategory}
                            </Form.Select>
                            {errors.category && touched.category ? (
                                <div
                                    style={{ color: "red", fontSize: "12px" }}
                                    className="error-message"
                                >
                                    {errors.category}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Sub-Category</Form.Label>
                            <Form.Select
                                style={
                                    errors.subcategory && touched.subcategory
                                        ? { border: "1px solid red" }
                                        : {}
                                }
                                className="dropdown"
                                aria-label="Choose relevant"
                                {...getFieldProps("subcategory")}
                            >
                                <option>Sub-Category</option>
                                {renderCategory}
                            </Form.Select>
                            {errors.subcategory && touched.subcategory ? (
                                <div
                                    style={{ color: "red", fontSize: "12px" }}
                                    className="error-message"
                                >
                                    {errors.subcategory}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicdate">
                            <Form.Label>Start Date &amp; Time</Form.Label>
                            <Form.Control
                                style={
                                    errors.dateTime && touched.dateTime
                                        ? { border: "1px solid red" }
                                        : {}
                                }
                                type="datetime-local"
                                placeholder=""
                                {...getFieldProps("dateTime")}
                            />
                            {errors.dateTime && touched.dateTime ? (
                                <div
                                    style={{ color: "red", fontSize: "12px" }}
                                    className="error-message"
                                >
                                    {errors.dateTime}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group
                            className="mb-3"
                            controlId="formEstimatedHour"
                        >
                            <Form.Label>Estimated Time(hr)</Form.Label>
                            <Form.Control
                                min={0}
                                style={
                                    errors.estimatedHour &&
                                    touched.estimatedHour
                                        ? { border: "1px solid red" }
                                        : {}
                                }
                                type="number"
                                placeholder=""
                                {...getFieldProps("estimatedHour")}
                            />
                            {errors.estimatedHour && touched.estimatedHour ? (
                                <div
                                    style={{ color: "red", fontSize: "12px" }}
                                    className="error-message"
                                >
                                    {errors.estimatedHour}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <p className="price-text">Budget ($)</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={2}>
                        <Form.Check
                            onChange={() =>
                                setFieldValue("budgetType", "range")
                            }
                            type="radio"
                            name="range"
                            label="Range"
                            value="range"
                            id="disabled-default-radio"
                        />
                    </Col>
                    <Col md={1}>
                        <Form.Check
                            onChange={() =>
                                setFieldValue("budgetType", "fixed")
                            }
                            name="range"
                            type="radio"
                            label="Fixed"
                            value="fixed"
                            id="disabled-default-radio"
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    {values.budgetType === "fixed" && (
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    style={
                                        errors.fixedValue && touched.fixedValue
                                            ? { border: "1px solid red" }
                                            : {}
                                    }
                                    type="number"
                                    min={0}
                                    placeholder="Fixed Value"
                                    {...getFieldProps("fixedValue")}
                                />
                                {errors.fixedValue && touched.fixedValue ? (
                                    <div
                                        style={{
                                            color: "red",
                                            fontSize: "12px",
                                        }}
                                        className="error-message"
                                    >
                                        {errors.fixedValue}
                                    </div>
                                ) : null}
                            </Form.Group>
                        </Col>
                    )}
                    {values.budgetType === "range" && (
                        <>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        style={
                                            errors.minBudget &&
                                            touched.minBudget
                                                ? { border: "1px solid red" }
                                                : {}
                                        }
                                        type="number"
                                        min={0}
                                        placeholder="From"
                                        {...getFieldProps("minBudget")}
                                    />
                                    {errors.minBudget && touched.minBudget ? (
                                        <div
                                            style={{
                                                color: "red",
                                                fontSize: "12px",
                                            }}
                                            className="error-message"
                                        >
                                            {errors.minBudget}
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control
                                        style={
                                            errors.maxBudget &&
                                            touched.maxBudget
                                                ? { border: "1px solid red" }
                                                : {}
                                        }
                                        type="number"
                                        min={0}
                                        placeholder="To"
                                        {...getFieldProps("maxBudget")}
                                    />
                                    {errors.maxBudget && touched.maxBudget ? (
                                        <div
                                            style={{
                                                color: "red",
                                                fontSize: "12px",
                                            }}
                                            className="error-message"
                                        >
                                            {errors.maxBudget}
                                        </div>
                                    ) : null}
                                </Form.Group>
                            </Col>
                        </>
                    )}
                </Row>
                <Row className="mt-2">
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            style={
                                errors.address && touched.address
                                    ? { border: "1px solid red" }
                                    : {}
                            }
                            type="text"
                            placeholder="Default"
                            {...getFieldProps("address")}
                        />
                        {errors.address && touched.address ? (
                            <div
                                style={{ color: "red", fontSize: "12px" }}
                                className="error-message"
                            >
                                {errors.address}
                            </div>
                        ) : null}
                    </Form.Group>
                </Row>
                <Row>
                    <Col className="mt-3">
                        <AddRequirements field={setFieldValue} />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p
                            className="price-text"
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                            Images & Videos
                        </p>
                        <p className="price-text" style={{ fontSize: "10px" }}>
                            Including images or videos helps you find best
                            merchant for your task.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <DragAndDrop />
                </Row>
                <div className="submit-buttons">
                    <div style={{ width: "183px", height: "40px" }}>
                        <Button
                            variant="light"
                            style={{
                                border: "1px solid #211d4f",
                                padding: "8px 16px 8px 16px",
                                fontSize: "16px",
                                width: "100%",
                                height: "100%",
                                borderRadius: "4px",
                                outline: "none",
                            }}
                            className="save-draft"
                        >
                            Save Draft
                        </Button>
                    </div>

                    <div style={{ width: "183px", height: "40px" }}>
                        <Button
                            disabled={Object.values(errors).length > 0}
                            variant="light"
                            type="button"
                            onClick={() => handleSubmit()}
                            className="post-modal"
                            style={{
                                border: "1px solid #211d4f",
                                fontSize: "16px",
                                borderRadius: "4px",
                                width: "100%",
                                height: "100%",
                                padding: "8px 16px 8px 16px",
                                outline: "none",
                            }}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
};
export default PostModal;

const DragAndDrop = () => {
    return (
        <Col md={4} className="drag-down">
            <figure className="thumbnail-img" style={{ marginTop: "2rem" }}>
                <Image
                    src="/service-details/file-upload.svg"
                    width="70px"
                    height={"70px"}
                    objectFit="cover"
                    alt="serviceprovider-image"
                />
            </figure>

            <h5 style={{ margin: "1rem 0 0 0 " }}>
                Drag or {""}
                <label
                    htmlFor="choosefile"
                    style={{ color: "#0693E3", cursor: "pointer" }}
                >
                    Browse
                </label>{" "}
                Image/Video
            </h5>
            <p
                className="price-text"
                style={{ fontSize: "10px", color: "#868E96" }}
            >
                Maximum Image Size 20 MB
            </p>
            <p
                className="price-text"
                style={{ fontSize: "10px", color: "#868E96" }}
            >
                Maximum Video Size 200 MB
            </p>
            <div style={{ visibility: "hidden" }}>
                <input type={"file"} id="choosefile" />
            </div>
        </Col>
    );
};
