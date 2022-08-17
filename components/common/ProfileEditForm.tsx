import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import {
    faFacebookF,
    faGoogle,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPlus, faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useToggleSuccessModal } from "store/use-success-modal";
import { ProfileEditFromData } from "utils/formData";
import { profileEditFormSchema } from "utils/formValidation/profileEditFormValidation";
import { isSubmittingClass } from "utils/helpers";

import TagInputField from "./TagInputField";

interface ProfileEditProps {
    show?: boolean;
    handleClose?: () => void;
    setShowEdit: Dispatch<SetStateAction<boolean>>;
    userName: string | undefined;
}

const ProfileEditForm = ({
    show,
    handleClose,
    setShowEdit,
}: ProfileEditProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    //edit form

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Edit Profile</h3>
                    <Formik
                        initialValues={ProfileEditFromData}
                        validationSchema={profileEditFormSchema}
                        onSubmit={async (values) => {
                            setShowEdit(false);
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
                                    labelName="Name"
                                    error={errors.name}
                                    touch={touched.name}
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    name="bio"
                                    labelName="Bio"
                                    touch={touched.bio}
                                    error={errors.bio}
                                    placeHolder="Applying (Remark)"
                                    as="textarea"
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        <InputField
                                            name="email"
                                            labelName="Email Address"
                                            touch={touched.email}
                                            error={errors.email}
                                            placeHolder="Applying (Remark)"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <InputField
                                            name="phone"
                                            labelName="Phone Number"
                                            touch={touched.phone}
                                            error={errors.phone}
                                            placeHolder="Applying (Remark)"
                                        />
                                    </Col>
                                </Row>
                                <InputField
                                    type="text"
                                    name="addressLine1"
                                    labelName="Address Line 1"
                                    error={errors.addressLine1}
                                    touch={touched.addressLine1}
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    type="text"
                                    name="addressLine2"
                                    labelName="Address Line 2"
                                    error={errors.addressLine2}
                                    touch={touched.addressLine2}
                                    placeHolder="Enter your price"
                                />
                                <h4>Active Hours</h4>
                                <Row className="g-5">
                                    <Col md={3}>
                                        <DatePickerField
                                            name="activeHoursFrom"
                                            labelName="From"
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
                                            labelName="To"
                                            placeHolder="00:00"
                                            dateFormat="h:mm aa"
                                            timeOnly={true}
                                            autocomplete="off"
                                            touch={touched.activeHoursTo}
                                            error={errors.activeHoursTo}
                                        />
                                    </Col>
                                </Row>
                                <TagInputField
                                    name="specialities"
                                    error={errors.specialities}
                                    touch={touched.specialities}
                                    labelName="Specialities"
                                    placeHolder="Enter your price"
                                />
                                <Col md={3}>
                                    <InputField
                                        type="number"
                                        name="baseRatePerHour"
                                        labelName="Base Rate Per Hour"
                                        error={errors.baseRatePerHour}
                                        touch={touched.baseRatePerHour}
                                        placeHolder="Enter your price"
                                    />
                                </Col>
                                <h4>Linked Accounts</h4>
                                <div className="d-flex social-links">
                                    <span className="d-flex align-items-center me-4">
                                        <FontAwesomeIcon
                                            icon={faFacebookF}
                                            className="svg-icon"
                                        />
                                        Facebook
                                    </span>
                                    <span className="d-flex align-items-center me-4">
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className="svg-icon"
                                        />
                                        Twitter
                                    </span>
                                    <span className="d-flex align-items-center me-4">
                                        <FontAwesomeIcon
                                            icon={faGoogle}
                                            className="svg-icon"
                                        />
                                        Google
                                    </span>
                                    <span className="d-flex align-items-center me-4">
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="svg-icon"
                                        />
                                        Dribble
                                    </span>
                                </div>

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
