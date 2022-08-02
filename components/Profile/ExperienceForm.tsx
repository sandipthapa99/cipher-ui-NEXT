import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useSuccessContext } from "context/successContext/successContext";
import { Field, Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ExperienceFromData } from "utils/formData";
import { experienceFormSchema } from "utils/formValidation/experienceFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface ExperienceProps {
    show?: boolean;
    handleClose?: () => void;
    setShowExpForm: Dispatch<SetStateAction<boolean>>;
}

const dropdownOptions = [
    { id: 1, label: "React", value: "react" },
    { id: 2, label: "Angular", value: "angular" },
    { id: 3, label: "Vue", value: "vue" },
];

const ExperienceForm = ({
    show,
    handleClose,
    setShowExpForm,
}: ExperienceProps) => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    <hr />
                    <Formik
                        initialValues={ExperienceFromData}
                        validationSchema={experienceFormSchema}
                        onSubmit={async (values) => {
                            setShowExpForm(false);
                            setShowSuccessModal(true);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <InputField
                                    type="text"
                                    name="title"
                                    labelName="Title"
                                    error={errors.title}
                                    touch={touched.title}
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
                                <SelectInputField
                                    name="typeOfEmployment"
                                    labelName="Employment"
                                    touch={touched.typeOfEmployment}
                                    error={errors.typeOfEmployment}
                                    placeHolder="Select a type"
                                    options={dropdownOptions}
                                />
                                <InputField
                                    name="companyName"
                                    labelName="companyName"
                                    touch={touched.companyName}
                                    error={errors.companyName}
                                    placeHolder="Applying (Remark)"
                                />
                                <InputField
                                    name="location"
                                    labelName="location"
                                    touch={touched.location}
                                    error={errors.location}
                                    placeHolder="Applying (Remark)"
                                />
                                <p className="mb-3">
                                    <Field type="checkbox" name="toggle" /> I am
                                    currently working here
                                </p>
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
export default ExperienceForm;
