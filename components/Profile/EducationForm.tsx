import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useToggleSuccessModal } from "store/use-success-modal";
import { EducationFormData } from "utils/formData";
import { educationFormSchema } from "utils/formValidation/educationFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface EducationProps {
    show?: boolean;
    handleClose?: () => void;
    setShowEducationForm: Dispatch<SetStateAction<boolean>>;
}

const EducationForm = ({
    show,
    handleClose,
    setShowEducationForm,
}: EducationProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Add Education</h3>
                    <Formik
                        initialValues={EducationFormData}
                        validationSchema={educationFormSchema}
                        onSubmit={async (values) => {
                            setShowEducationForm(false);
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
                            <Form autoComplete="off">
                                <InputField
                                    type="text"
                                    name="school"
                                    labelName="school"
                                    error={errors.school}
                                    touch={touched.school}
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    name="description"
                                    labelName="Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Applying (Remark)"
                                    as="textarea"
                                />
                                <InputField
                                    name="degree"
                                    labelName="degree"
                                    touch={touched.degree}
                                    error={errors.degree}
                                    placeHolder="Applying (Remark)"
                                />
                                <InputField
                                    name="fieldOfStudy"
                                    labelName="fieldOfStudy"
                                    touch={touched.fieldOfStudy}
                                    error={errors.fieldOfStudy}
                                    placeHolder="Applying (Remark)"
                                />
                                <InputField
                                    name="location"
                                    labelName="location"
                                    touch={touched.location}
                                    error={errors.location}
                                    placeHolder="Applying (Remark)"
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        <DatePickerField
                                            name="startDate"
                                            labelName="startDate"
                                            placeHolder="01/01/2001"
                                            touch={touched.startDate}
                                            error={errors.startDate}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <DatePickerField
                                            name="endDate"
                                            labelName="endDate"
                                            placeHolder="01/01/2001"
                                            touch={touched.endDate}
                                            error={errors.endDate}
                                        />
                                    </Col>
                                </Row>

                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn w-25"
                                        onClick={handleClose}
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
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};
export default EducationForm;
