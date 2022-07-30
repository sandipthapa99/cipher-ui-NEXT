import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useSuccessContext } from "context/successContext/successContext";
import { Form, Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ExperienceFromData } from "utils/formData";
import { experienceFormSchema } from "utils/formValidation/experienceFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface ExperienceProps {
    show?: boolean;
    handleClose?: () => void;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const dropdownOptions = [
    { id: 1, label: "React", value: "react" },
    { id: 2, label: "Angular", value: "angular" },
    { id: 3, label: "Vue", value: "vue" },
];

const ExperienceForm = ({
    show,
    handleClose,
    setShowModal,
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
                            setShowModal(false);
                            setShowSuccessModal(true);
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <pre>{JSON.stringify(errors)}</pre>
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
