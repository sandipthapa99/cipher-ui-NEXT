import FormButton from "@components/common/FormButton";
import TagInputField from "@components/common/TagInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { MultiSelect } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import { useEditForm } from "hooks/use-edit-form";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { UserProfileProps } from "types/userProfileProps";
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
    const data = [
        { label: "React", value: "react" },
        { label: "Angular", value: "anglur" },
        { label: "PHP", value: "php" },
    ];
    const { mutate } = useEditForm(`/tasker/profile/`);
    const queryClient = useQueryClient();

    const { data: profileDetails } = useGetProfile();

    console.log("profile=", profileDetails);
    const userSkills = profileDetails?.skill;
    console.log("userskills=", userSkills);

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Add Skills</h3>
                    <Formik
                        initialValues={SkillsFromData}
                        validationSchema={skillsFormSchema}
                        onSubmit={async (values) => {
                            // To be used for API
                            // try {
                            //     axiosClient.post("/routes", values);
                            // } catch (error: any) {
                            //     error.response.data.message;
                            // }

                            //  let newValue: any;
                            // newValue.push(values);
                            // console.log("values=", newValue);

                            // newValue = [
                            //     ...userSkills,
                            //     values.skills.toString(),
                            // ];

                            const skill = values.skill;
                            const newValue = userSkills?.concat(skill);

                            const newSkills = JSON.stringify(newValue);
                            console.log(
                                "new skills=",
                                JSON.stringify(newSkills)
                            );
                            const finalSKills = { ...values, skill: newSkills };
                            console.log("fila=", finalSKills);
                            // mutate(finalSKills, {
                            //     onSuccess: async () => {
                            //         console.log(
                            //             "submitted values",
                            //             finalSKills
                            //         );
                            //         setShowAddSkillsForm(false);
                            //         queryClient.invalidateQueries(["profile"]);
                            //         toast.success(
                            //             "Skills detail added successfully"
                            //         );
                            //     },
                            //     onError: async (error) => {
                            //         toast.error(error.message);
                            //         console.log("error=", error);
                            //     },
                            // });

                            // console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <TagInputField
                                    name="skill"
                                    error={errors.skill}
                                    touch={touched.skill}
                                    labelName="Specialities"
                                    placeHolder="Enter your prefered skill"
                                    variables={[]}
                                />
                                <h4>Suggested Skills</h4>
                                <MultiSelect
                                    data={["react", "anglur", "php"]}
                                    placeholder="View sugessted fields"
                                    defaultValue={["react", "anglur", "php"]}
                                    variant="unstyled"
                                    size="md"
                                    readOnly
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
