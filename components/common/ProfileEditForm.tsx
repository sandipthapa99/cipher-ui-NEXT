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
import { Form, Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
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
    const { data: profile } = useGetProfile();
    const toggleSuccessModal = useToggleSuccessModal();
    const [hourStart, setHourStart] = useState("");
    const skills = JSON.parse(profile?.skill);
    console.log(skills, typeof skills);

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Edit Profile</h3>
                    <Formik
                        initialValues={{
                            full_name: profile?.full_name ?? "",
                            bio: profile?.bio ?? "",
                            phone:
                                profile?.phone ??
                                Math.floor(Math.random() * 1000000000),
                            address_line1: profile?.address_line1 ?? "",
                            address_line2: profile?.address_line2 ?? "",
                            active_hour_start: "",
                            active_hour_end: "",
                            skill: "",
                            hourly_rate: profile?.hourly_rate ?? "",
                            linkedAccounts: "",
                        }}
                        validationSchema={profileEditFormSchema}
                        onSubmit={async (values) => {
                            const newValidatedValues = {
                                ...values,
                                active_hour_start: new Date(
                                    values.active_hour_start ?? ""
                                )?.toLocaleTimeString(),
                                active_hour_end: new Date(
                                    values.active_hour_end ?? ""
                                )?.toLocaleTimeString(),
                                skill: JSON.stringify(values.skill),
                            };
                            setShowEdit(false);
                            toggleSuccessModal();
                            // To be used for API
                            // try {
                            //     axiosClient.post("/routes", values);
                            // } catch (error: any) {
                            //     error.response.data.message;
                            // }
                            console.log(newValidatedValues);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <InputField
                                    type="text"
                                    name="full_name"
                                    labelName="Name"
                                    error={errors.full_name}
                                    touch={touched.full_name}
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
                                    name="address_line1"
                                    labelName="Address Line 1"
                                    error={errors.address_line1}
                                    touch={touched.address_line1}
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    type="text"
                                    name="address_line2"
                                    labelName="Address Line 2"
                                    error={errors.address_line2}
                                    touch={touched.address_line2}
                                    placeHolder="Enter your price"
                                />
                                <h4>Active Hours</h4>
                                <Row className="g-5">
                                    <Col md={3}>
                                        <DatePickerField
                                            name="active_hour_start"
                                            labelName="From"
                                            dateFormat="h:mm aa"
                                            autocomplete="off"
                                            placeHolder="00:00"
                                            timeOnly={true}
                                            touch={touched.active_hour_start}
                                            error={errors.active_hour_start}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <DatePickerField
                                            name="active_hour_end"
                                            labelName="To"
                                            placeHolder="00:00"
                                            dateFormat="h:mm aa"
                                            timeOnly={true}
                                            autocomplete="off"
                                            touch={touched.active_hour_end}
                                            error={errors.active_hour_end}
                                        />
                                    </Col>
                                </Row>
                                <TagInputField
                                    data={skills}
                                    name="skill"
                                    error={errors.skill}
                                    touch={touched.skill}
                                    labelName="Specialities"
                                    placeHolder="Enter your price"
                                />
                                <Col md={3}>
                                    <InputField
                                        type="number"
                                        name="hourly_rate"
                                        labelName="Base Rate Per Hour"
                                        error={errors.hourly_rate}
                                        touch={touched.hourly_rate}
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
