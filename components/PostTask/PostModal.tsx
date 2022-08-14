import DatePickerField from "@components/common/DateTimeField";
import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import Image from "next/image";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Button, Col, FormCheck, Row } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import { ProfileEditFromData } from "utils/formData";
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
            <div className="equipment-modal">
                <h2>Post a Task</h2>
                <div className="equipment-form">
                    <Formik
                        initialValues={ProfileEditFromData}
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
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <InputField
                                    type="text"
                                    name="name"
                                    labelName="Title"
                                    error={errors.name}
                                    touch={touched.name}
                                    fieldRequired
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    name="bio"
                                    labelName="Task Description"
                                    touch={touched.bio}
                                    error={errors.bio}
                                    placeHolder="Applying (Remark)"
                                    fieldRequired
                                    as="textarea"
                                />
                                <h4>When do you need this done?</h4>
                                <p>
                                    This helps tasker to find about your
                                    requirements better.
                                </p>
                                <AddRequirements />
                                <InputField
                                    type="text"
                                    name="addressLine1"
                                    labelName="Category"
                                    error={errors.addressLine1}
                                    touch={touched.addressLine1}
                                    fieldRequired
                                    placeHolder="Enter your price"
                                />
                                <h4>Select Task Type</h4>
                                <span className="d-flex mb-4">
                                    <FormCheck
                                        type="radio"
                                        name="task_type"
                                        label="Remote"
                                        className="me-3"
                                    />
                                    <FormCheck
                                        type="radio"
                                        name="task_type"
                                        label="On premise"
                                        className="mb-8"
                                    />
                                </span>
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
                                    <Col md={4}>
                                        <InputField
                                            type="text"
                                            name="addressLine1"
                                            error={errors.addressLine1}
                                            touch={touched.addressLine1}
                                            fieldRequired
                                            className="mb-0"
                                            placeHolder="Enter your price"
                                        />
                                    </Col>
                                    {showVariable.showBudget ? (
                                        <Fragment>
                                            To
                                            <Col md={4}>
                                                <InputField
                                                    type="text"
                                                    name="addressLine1"
                                                    error={errors.addressLine1}
                                                    touch={touched.addressLine1}
                                                    fieldRequired
                                                    className="mb-0"
                                                    placeHolder="Enter your price"
                                                />
                                            </Col>
                                        </Fragment>
                                    ) : (
                                        ""
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
                                            <DatePickerField
                                                name="pan_issued_date"
                                                labelName="Start date"
                                                placeHolder="dd/mm/yy"
                                                touch={touched.pan_issued_date}
                                                error={errors.pan_issued_date}
                                            />
                                        </Col>
                                        <Col md={{ span: 5, offset: 2 }}>
                                            <DatePickerField
                                                name="pan_issued_date"
                                                labelName="End date"
                                                placeHolder="dd/mm/yy"
                                                touch={touched.pan_issued_date}
                                                error={errors.pan_issued_date}
                                            />
                                        </Col>
                                    </Row>
                                ) : (
                                    <Col md={5}>
                                        <DatePickerField
                                            name="pan_issued_date"
                                            labelName="Date"
                                            placeHolder="dd/mm/yy"
                                            touch={touched.pan_issued_date}
                                            error={errors.pan_issued_date}
                                        />
                                    </Col>
                                )}

                                <Button
                                    className="btn close-btn w-25"
                                    onClick={() => setshowPostModel(false)}
                                >
                                    Cancel
                                </Button>

                                <FormButton
                                    type="submit"
                                    variant="primary"
                                    name="Apply"
                                    className="submit-btn w-25"
                                    isSubmitting={isSubmitting}
                                    isSubmittingClass={isSubmittingClass(
                                        isSubmitting
                                    )}
                                />
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
