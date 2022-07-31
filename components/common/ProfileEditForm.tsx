import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useSuccessContext } from "context/successContext/successContext";
import { Form, Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ProfileEditFromData } from "utils/formData";
import { profileEditFormSchema } from "utils/formValidation/profileEditFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface ProfileEditProps {
    show?: boolean;
    handleClose?: () => void;
    setShowEdit: Dispatch<SetStateAction<boolean>>;
}

const ProfileEditForm = ({
    show,
    handleClose,
    setShowEdit,
}: ProfileEditProps) => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Edit Profile</h3>
                    <Formik
                        initialValues={ProfileEditFromData}
                        validationSchema={profileEditFormSchema}
                        onSubmit={async (values) => {
                            setShowEdit(false);
                            setShowSuccessModal(true);
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
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    name="bio"
                                    labelName="bio"
                                    touch={touched.bio}
                                    error={errors.bio}
                                    placeHolder="Applying (Remark)"
                                    as="textarea"
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        <InputField
                                            name="email"
                                            labelName="email"
                                            touch={touched.email}
                                            error={errors.email}
                                            placeHolder="Applying (Remark)"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <InputField
                                            name="phone"
                                            labelName="phone"
                                            touch={touched.phone}
                                            error={errors.phone}
                                            placeHolder="Applying (Remark)"
                                        />
                                    </Col>
                                </Row>
                                <InputField
                                    type="text"
                                    name="addressLine1"
                                    labelName="addressLine1"
                                    error={errors.addressLine1}
                                    touch={touched.addressLine1}
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    type="text"
                                    name="addressLine2"
                                    labelName="addressLine2"
                                    error={errors.addressLine2}
                                    touch={touched.addressLine2}
                                    placeHolder="Enter your price"
                                />
                                <Row className="g-5">
                                    <Col md={3}>
                                        <DatePickerField
                                            name="activeHoursFrom"
                                            labelName="activeHoursFrom"
                                            dateFormat="h:mm aa"
                                            autocomplete="off"
                                            placeHolder="00:00"
                                            timeOnly={true}
                                            touch={touched.activeHoursFrom}
                                            error={errors.activeHoursFrom}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <DatePickerField
                                            name="activeHoursTo"
                                            labelName="activeHoursTo"
                                            placeHolder="00:00"
                                            dateFormat="h:mm aa"
                                            timeOnly={true}
                                            autocomplete="off"
                                            touch={touched.activeHoursTo}
                                            error={errors.activeHoursTo}
                                        />
                                    </Col>
                                </Row>
                                <InputField
                                    type="text"
                                    name="specialities"
                                    labelName="specialities"
                                    error={errors.specialities}
                                    touch={touched.specialities}
                                    placeHolder="Enter your price"
                                />
                                <Col md={3}>
                                    <InputField
                                        type="number"
                                        name="baseRatePerHour"
                                        labelName="baseRatePerHour"
                                        error={errors.baseRatePerHour}
                                        touch={touched.baseRatePerHour}
                                        placeHolder="Enter your price"
                                    />
                                </Col>

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
export default ProfileEditForm;
