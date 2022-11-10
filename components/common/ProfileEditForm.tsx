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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type { ProfileEditValueProps } from "types/ProfileEditValueProps";
import { axiosClient } from "utils/axiosClient";
import { profileEditFormSchema } from "utils/formValidation/profileEditFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

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
    const queryClient = useQueryClient();
    const { data: profile } = useGetProfile();

    //converting string time value to datetime time value
    const start: string = profile?.active_hour_start
        ? profile?.active_hour_start.replace(":00", "")
        : "";
    const end: string = profile?.active_hour_end
        ? profile?.active_hour_end.replace(":00", "")
        : "";

    const endparsed = (
        parseInt(end) < 12 ? parseInt(end) + 12 : parseInt(end)
    ).toString();
    const finalend = `${endparsed}:${end?.substring(end.indexOf(":") + 1)}`;

    const endTime = finalend.toString();

    const skills = profile && profile.skill ? JSON.parse(profile.skill) : [];
    const editProfile = useMutation((data: ProfileEditValueProps) =>
        axiosClient.patch("/tasker/profile/", data)
    );

    const onEditProfile = (data: any) => {
        editProfile.mutate(data, {
            onSuccess: (data) => {
                if (data?.data?.status === "failure") {
                    toast.error(data?.data?.message);
                } else {
                    toast.success(data?.data?.message);
                    queryClient.invalidateQueries(["profile"]);
                }
            },
            onError: (error: any) => {
                const errmessage = error?.response?.data?.message[0];
                toast.error(errmessage);
            },
        });
    };

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Edit Profile</h3>
                    <Formik
                        initialValues={{
                            first_name: profile?.user?.first_name ?? "",
                            middle_name: profile?.user?.middle_name ?? "",
                            last_name: profile?.user?.last_name ?? "",
                            bio: profile?.bio ?? "",
                            // phone:
                            //     profile?.phone ??
                            //     Math.floor(Math.random() * 1000000000),
                            address_line1: profile?.address_line1 ?? "",
                            address_line2: profile?.address_line2 ?? "",
                            active_hour_start:
                                new Date(`2022-09-24 ${start}`) ?? "",
                            active_hour_end:
                                new Date(`2022-09-24 ${endTime}`) ?? "",
                            skill: skills ?? "",
                            hourly_rate: profile?.hourly_rate ?? "",
                            linkedAccounts: "",
                        }}
                        validationSchema={profileEditFormSchema}
                        onSubmit={async (values: any) => {
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
                            onEditProfile(newValidatedValues);
                            // toggleSuccessModal();
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                {/* <pre>{JSON.stringify(values, null, 4)}</pre>; */}
                                <Row>
                                    <Col md={4}>
                                        <InputField
                                            type="text"
                                            name="first_name"
                                            labelName=" First Name"
                                            error={errors.first_name}
                                            touch={touched.first_name}
                                            placeHolder="Enter your first name"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <InputField
                                            type="text"
                                            name="middle_name"
                                            labelName="Middle Name"
                                            error={errors.middle_name}
                                            touch={touched.middle_name}
                                            placeHolder="Enter your middle name"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <InputField
                                            type="text"
                                            name="last_name"
                                            labelName="Last Name"
                                            error={errors.last_name}
                                            touch={touched.last_name}
                                            placeHolder="Enter your last name"
                                        />
                                    </Col>
                                </Row>
                                <InputField
                                    type="text"
                                    name="first_name"
                                    labelName="Name"
                                    error={errors.first_name}
                                    touch={touched.first_name}
                                    placeHolder="Enter your name"
                                />
                                <InputField
                                    name="bio"
                                    labelName="Bio"
                                    touch={touched.bio}
                                    error={errors.bio}
                                    placeHolder="Enter your bio"
                                    as="textarea"
                                />
                                {/* <Row className="g-5">
                                    <Col md={6}>
                                        <PhoneNumberInput
                                            name={"phone"}
                                            fieldRequired={true}
                                            labelName="Phone Number"
                                            touch={touched.phone}
                                            error={errors.phone}
                                        />
                                    </Col>
                                </Row> */}
                                <InputField
                                    type="text"
                                    name="address_line1"
                                    labelName="Address Line 1"
                                    error={errors.address_line1}
                                    touch={touched.address_line1}
                                    placeHolder="Enter your primary address"
                                />
                                <InputField
                                    type="text"
                                    name="address_line2"
                                    labelName="Address Line 2"
                                    error={errors.address_line2}
                                    touch={touched.address_line2}
                                    placeHolder="Enter your secondary address"
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
                                    // error={errors.skill}
                                    // touch={touched.skill}
                                    labelName="Skills"
                                    placeHolder="Enter your skills"
                                />
                                <Col md={3}>
                                    <InputField
                                        type="number"
                                        name="hourly_rate"
                                        labelName="Base Rate Per Hour"
                                        error={errors.hourly_rate}
                                        touch={touched.hourly_rate}
                                        placeHolder="Enter your rate"
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
                                        className="btn close-btn"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>

                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Apply"
                                        className="submit-btn"
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
