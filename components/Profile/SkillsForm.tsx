import FormButton from "@components/common/FormButton";
import TagInputField from "@components/common/TagInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { useSuccessContext } from "context/successContext/successContext";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SkillsFromData } from "utils/formData";
import { skillsFormSchema } from "utils/formValidation/skillsFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface SkillsProps {
    show?: boolean;
    handleClose?: () => void;
    setShowAddSkillsForm: Dispatch<SetStateAction<boolean>>;
}

const AddSkills = ({
    show,
    handleClose,
    setShowAddSkillsForm,
}: SkillsProps) => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Edit Profile</h3>
                    <Formik
                        initialValues={SkillsFromData}
                        validationSchema={skillsFormSchema}
                        onSubmit={async (values) => {
                            setShowAddSkillsForm(false);
                            // To be used for API
                            // try {
                            //     axiosClient.post("/routes", values);
                            // } catch (error: any) {
                            //     error.response.data.message;
                            // }
                            setShowSuccessModal(true);
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <TagInputField
                                    name="skills"
                                    error={errors.skills}
                                    touch={touched.skills}
                                    labelName="Specialities"
                                    placeHolder="Enter your price"
                                />
                                <h4>Suggested Skills</h4>
                                <Tags
                                    defaultValue="Singing, Writing, Programming, Dancing"
                                    readOnly
                                    className="border-0"
                                />
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
export default AddSkills;
