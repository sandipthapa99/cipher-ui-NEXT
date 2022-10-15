import DatePickerField from "@components/common/DateTimeField";
import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import {
    faCalendarDays,
    faSquareCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Button, Col, FormCheck, Row } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import { PostTaskFormData } from "utils/formData";
import { profileEditFormSchema } from "utils/formValidation/profileEditFormValidation";
import { isSubmittingClass } from "utils/helpers";

import AddRequirements from "./AddRequirements";
import { PostCard } from "./PostCard";
const PostModal = ({
    setshowPostModel,
}: {
    setshowPostModel: Dispatch<SetStateAction<boolean>>;
}) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const [showVariable, setShowVariable] = useState({
        showBudget: false,
        showTime: false,
    });

    return (
        <>
            {/* Modal component */}
            <div className="post-task-modal">
                <h2>Post a Task</h2>
                <div className="post-task-form">
                    <Formik
                        initialValues={PostTaskFormData}
                        validationSchema={profileEditFormSchema}
                        onSubmit={async (values) => {
                            setshowPostModel(false);
                            toggleSuccessModal();
                            // To be used for API
                            // try {
                            //     axiosClient.post("/routes", values);
                            // } catch (error: any) {
                            //     error.response.data.message;
                            // }
                        }}
                    >
                        {({ isSubmitting, errors, touched, setFieldValue }) => (
                            <Form>
                                <InputField
                                    type="text"
                                    name="title"
                                    labelName="Title"
                                    error={errors.title}
                                    touch={touched.title}
                                    fieldRequired
                                    placeHolder="Enter your Title"
                                />
                                <InputField
                                    name="taskDescription"
                                    labelName="Task Description"
                                    touch={touched.taskDescription}
                                    error={errors.taskDescription}
                                    placeHolder="Task Description"
                                    fieldRequired
                                    as="textarea"
                                />
                                <h4>When do you need this done?</h4>
                                <p>
                                    This helps tasker to find about your
                                    requirements better.
                                </p>
                                <AddRequirements
                                    onSubmit={(value) =>
                                        setFieldValue("req", value)
                                    }
                                />
                                <InputField
                                    type="text"
                                    name="address"
                                    labelName="address"
                                    error={errors.address}
                                    touch={touched.address}
                                    fieldRequired
                                    placeHolder="Default Address (Home)"
                                />
                                <h4>Select Task Type</h4>
                                <span className="d-flex mb-4">
                                    <FormCheck
                                        type="radio"
                                        name="task_type"
                                        label="Remote"
                                        className="me-3"
                                        value="remote"
                                    />
                                    <FormCheck
                                        type="radio"
                                        name="task_type"
                                        label="On premise"
                                        className="mb-8"
                                        value="onPremise"
                                    />
                                </span>
                                <InputField
                                    type="text"
                                    name="category"
                                    labelName="Category"
                                    error={errors.category}
                                    touch={touched.category}
                                    fieldRequired
                                    placeHolder="Enter your category"
                                />
                                <h4>Budget</h4>
                                <span className="d-flex mb-4">
                                    <FormCheck
                                        type="radio"
                                        name="budget"
                                        label="Fixed"
                                        className="me-3"
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showBudget: false,
                                                };
                                            })
                                        }
                                        defaultChecked
                                    />
                                    <FormCheck
                                        type="radio"
                                        name="budget"
                                        label="Variable"
                                        className="mb-8"
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showBudget: true,
                                                };
                                            })
                                        }
                                    />
                                </span>
                                <Row className="gx-5">
                                    {showVariable.showBudget ? (
                                        <>
                                            <Col md={4}>
                                                <InputField
                                                    type="text"
                                                    name="minBudget"
                                                    error={errors.minBudget}
                                                    touch={touched.minBudget}
                                                    fieldRequired
                                                    className="mb-0"
                                                    placeHolder="Enter your price"
                                                />
                                            </Col>
                                            To
                                            <Col md={4}>
                                                <InputField
                                                    type="text"
                                                    name="addressLine1"
                                                    error={errors.maxBudget}
                                                    touch={touched.maxBudget}
                                                    fieldRequired
                                                    className="mb-0"
                                                    placeHolder="Enter your price"
                                                />
                                            </Col>
                                        </>
                                    ) : (
                                        <Col md={4}>
                                            <InputField
                                                type="text"
                                                name="budget"
                                                error={errors.budget}
                                                touch={touched.budget}
                                                fieldRequired
                                                className="mb-0"
                                                placeHolder="Enter your price"
                                            />
                                        </Col>
                                    )}
                                </Row>
                                <h4>When do you need this done?</h4>
                                <p>
                                    This helps tasker to find about your
                                    requirements better.
                                </p>
                                <Col md={5}>
                                    <DragDrop
                                        image="/service-details/file-upload.svg"
                                        fileType="Image/Video"
                                        maxImageSize={20}
                                        name={"image_upload"}
                                    />
                                </Col>
                                <h4>When do you need this done?</h4>
                                <p>
                                    This helps tasker to find about your
                                    requirements better.
                                </p>
                                <Col md={5}>
                                    <DragDrop
                                        image="/service-details/file-upload.svg"
                                        fileType="Image/Video"
                                        maxImageSize={20}
                                        name={"video_upload"}
                                    />
                                </Col>
                                <h4>When do you need this done?</h4>
                                <span className="d-flex mb-4">
                                    <FormCheck
                                        type="radio"
                                        name="time"
                                        label="Fixed"
                                        className="me-3"
                                        defaultChecked
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showTime: false,
                                                };
                                            })
                                        }
                                    />
                                    <FormCheck
                                        type="radio"
                                        name="time"
                                        label="Custom"
                                        className="mb-8"
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showTime: true,
                                                };
                                            })
                                        }
                                    />
                                </span>
                                {showVariable.showTime ? (
                                    <Row>
                                        <Col md={5}>
                                            {/* <DatePickerField
                                                name="date_from"
                                                labelName="Start date"
                                                placeHolder="dd/mm/yy"
                                                touch={touched.date_from}
                                                error={errors.date_from}
                                            /> */}
                                            <MantineDateField
                                                name="date_from"
                                                labelName="Start Date"
                                                placeHolder="1999-06-03"
                                                touch={touched.date_from}
                                                error={errors.date_from}
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                        className="svg-icons"
                                                    />
                                                }
                                                handleChange={(value) => {
                                                    setFieldValue(
                                                        "start_date",
                                                        format(
                                                            new Date(value),
                                                            "yyyy-MM-dd"
                                                        )
                                                    );
                                                }}
                                            />
                                        </Col>
                                        <Col md={{ span: 5, offset: 2 }}>
                                            {/* <DatePickerField
                                                name="date_to"
                                                labelName="End date"
                                                placeHolder="dd/mm/yy"
                                                touch={touched.date_to}
                                                error={errors.date_to}
                                            /> */}
                                            <MantineDateField
                                                name="date_from"
                                                labelName="Start Date"
                                                placeHolder="1999-06-03"
                                                touch={touched.date_from}
                                                error={errors.date_from}
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                        className="svg-icons"
                                                    />
                                                }
                                                handleChange={(value) => {
                                                    setFieldValue(
                                                        "date_from",
                                                        format(
                                                            new Date(value),
                                                            "yyyy-MM-dd"
                                                        )
                                                    );
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                ) : (
                                    <Col md={5}>
                                        {/* <DatePickerField
                                            name="date"
                                            labelName="Date"
                                            placeHolder="dd/mm/yy"
                                            touch={touched.date}
                                            error={errors.date}
                                        /> */}
                                        <MantineDateField
                                            name="date"
                                            labelName="Start Date"
                                            placeHolder="1999-06-03"
                                            touch={touched.date}
                                            error={errors.date_from}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
                                        />
                                    </Col>
                                )}

                                <div className="d-flex justify-content-center">
                                    <Button
                                        className="btn close-btn p-3 h-25"
                                        onClick={() => setshowPostModel(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Apply"
                                        className="submit-btn ms-3"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};
export default PostModal;
