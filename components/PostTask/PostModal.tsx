import { useClientTasks } from "context/ClientTaskContext";
import { useFormik } from "formik";
import { usePostTask } from "hooks/post-task/usePostTask";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { PostTaskData } from "types/postTaskData";

import { categoryData } from "../../types/categoryData";
import { postTaskValidationSchema } from "../../utils/PostTask/postTaskValidation";
import AddRequirements from "./AddRequirements";

interface Props {
    onSubmit: () => void;
}

const PostModal = ({ onSubmit }: Props) => {
    const { addTask } = useClientTasks();
    const { mutate, isLoading } = usePostTask();

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
            maxBudget: 0,
            address: "",
            requirements: [],
        },
        onSubmit(values) {
            console.log(values);
            mutate(values, {
                onError: (error) => console.log(error),
                onSuccess: () => {
                    console.log("sucessfully posted task");
                    onSubmit();
                },
            });

            // addTask(values, () => {
            //     setShowSuccessModal(true);

            //
            // });
        },
        validationSchema: postTaskValidationSchema,
    });
    return (
        <>
            <h3>Post a Task</h3>

            <Form onSubmit={handleSubmit} className="post-modal-form">
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
                        <div className="error-message">{errors.title}</div>
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
                        <div className="error-message">
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
                                <div className="error-message">
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
                                <div className="error-message">
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
                                <div className="error-message">
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
                                <div className="error-message">
                                    {errors.estimatedHour}
                                </div>
                            ) : null}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="buget-type-cont">
                    <Col>
                        <p className="budget-label">Budget ($)</p>
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
                                        <div className="error-message">
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
                                        <div className="error-message">
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
                            <div className="error-message">
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
                <Row className="img-cont">
                    <Col className="img-label">
                        <p className="img-title">Images &amp; Videos</p>
                        <p className="desc">
                            Including images or videos helps you find best
                            merchant for your task.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <DragAndDrop field={setFieldValue} />
                </Row>
                <div className="submit-buttons">
                    <div
                        className="button-cont"
                        style={{ width: "183px", height: "40px" }}
                    >
                        <Button variant="light" className="save-draft">
                            Save Draft
                        </Button>
                    </div>

                    <div
                        className="post-cont"
                        style={{ width: "183px", height: "40px" }}
                    >
                        <Button
                            disabled={Object.values(errors).length > 0}
                            variant="light"
                            type="button"
                            onClick={() => {
                                handleSubmit();
                            }}
                            className="post-btn"
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

export const DragAndDrop = ({ field }: { field: any }) => {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            const file = files[0];
            getBase64(file);
        }
    }
    const onLoad = (fileString: string | ArrayBuffer) => {
        field?.("images", ["image", fileString]);
    };

    const getBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                onLoad(reader.result);
            }
        };
    };
    return (
        <Col md={4} className="drag-down">
            <figure className="thumbnail-img">
                <Image
                    src="/service-details/file-upload.svg"
                    width="70px"
                    height={"70px"}
                    objectFit="cover"
                    alt="serviceprovider-image"
                />
            </figure>

            <h5>
                Drag or {""}
                <label htmlFor="choosefile">Browse</label> Image/Video
            </h5>
            <p>Maximum Image Size 20 MB</p>
            <p>Maximum Video Size 200 MB</p>
            <div style={{ visibility: "hidden" }}>
                <input type={"file"} id="choosefile" onChange={handleChange} />
            </div>
        </Col>
    );
};
