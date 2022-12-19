import FormButton from "@components/common/FormButton";
import TagInputField from "@components/common/TagInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { MultiSelect } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useEditForm } from "hooks/use-edit-form";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SkillsFormData } from "utils/formData";
import { skillsFormSchema } from "utils/formValidation/skillsFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

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
    const { mutate } = useEditForm(`/tasker/profile/`);
    const queryClient = useQueryClient();
    const { data: profileDetails } = useGetProfile();
    const userSkills = profileDetails ? JSON.parse(profileDetails?.skill) : [];

    const [dataSkills, setDataSkills] = useState(() => {
        return userSkills?.map((item: string) => {
            return {
                label: item,
                value: item,
            };
        });
    });
    return (
        <>
            {/* Modal component */}
            <Modal show={show} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Add Skills</h3>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            skill: profileDetails?.skill ? userSkills : "",
                        }}
                        validationSchema={skillsFormSchema}
                        onSubmit={async (values) => {
                            const skill = values.skill;

                            const newValue = userSkills?.concat(skill);

                            const newSkills = JSON.stringify(newValue);

                            const finalSKills = {
                                ...values,
                                skill: newSkills,
                            };

                            mutate(finalSKills, {
                                onSuccess: async () => {
                                    setShowAddSkillsForm(false);
                                    queryClient.invalidateQueries(["profile"]);
                                    toast.success(
                                        "Skills detail added successfully"
                                    );
                                },
                                onError: async (error) => {
                                    toast.error(error.message);
                                },
                            });

                            // console.log(values);
                        }}
                    >
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form>
                                {/* <TagInputField
                                    name="skill"
                                    labelName="Specialities"
                                    placeHolder="Enter your skills"
                                    create={true}
                                /> */}
                                <MultiSelect
                                    label="Skills"
                                    data={dataSkills}
                                    placeholder="Select Skills"
                                    searchable
                                    name="skill"
                                    creatable
                                    getCreateLabel={(query) =>
                                        `+ Create ${query}`
                                    }
                                    onChange={(value) => {
                                        setFieldValue("skill", value);
                                    }}
                                    value={profileDetails && values?.skill}
                                    onCreate={(query) => {
                                        const item = {
                                            label: query,
                                            value: query,
                                        };
                                        setDataSkills((current: any) => [
                                            ...current,
                                            item,
                                        ]);

                                        const newValue = dataSkills?.map(
                                            (item: any) => item.value
                                        );

                                        setFieldValue("skill", newValue);

                                        return item;
                                    }}
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
export default AddSkills;

// onSubmit={async (values) => {
//     const skills = profileDetails
//         ? JSON.parse(profileDetails?.skill)
//         : [];
//     /// const newSkills = [...skills, ...values?.skill];
//     const newSkills = { ...values, skill: skills };
//     const finalSkill = JSON.stringify(newSkills);

//     // const finalSKills = { ...values, skill: newSkills };
//     // console.log("fila=", finalSKills);
//     mutate(finalSkill, {
//         onSuccess: async () => {
//             console.log("submitted values", finalSkill);
//             setShowAddSkillsForm(false);
//             queryClient.invalidateQueries(["profile"]);
//             toast.success(
//                 "Skills detail added successfully"
//             );
//         },
//         onError: async (error) => {
//             toast.error(error.message);
//             console.log("error=", error);
//         },
//     });

//     console.log(values);
// }}
