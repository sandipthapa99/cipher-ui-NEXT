import FormButton from "@components/common/FormButton";
import { PostCard } from "@components/PostTask/PostCard";
import type { IAllCategory } from "@components/settings/AccountForm";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { MultiSelect } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useEditForm } from "hooks/use-edit-form";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { axiosClient } from "utils/axiosClient";
import { addInterestSchema } from "utils/formValidation/addInterestFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

interface InterestsProps {
    show?: boolean;
    handleClose?: () => void;
    setShowAddInterestsForm: Dispatch<SetStateAction<boolean>>;
}

const AddInterests = ({
    show,
    handleClose,
    setShowAddInterestsForm,
}: InterestsProps) => {
    const { mutate } = useEditForm(`/tasker/profile/`);
    const queryClient = useQueryClient();
    const { data: profileDetails } = useGetProfile();
    const [interestOptions, setInterestOptions] = useState<any>([]);

    const { data } = useQuery(
        ["all-category"],
        () => {
            return axiosClient.get<IAllCategory[]>(
                "/task/cms/task-category/list/"
            );
        },
        {
            onSuccess: (data) => {
                const options = data?.data.map((item) => {
                    return {
                        value: item.id,
                        label: item.name.toString(),
                    };
                });
                setInterestOptions(options);
            },
            enabled: profileDetails ? true : false,
        }
    );

    // const currentInterestId = profileDetails?.interests.map((item: any) =>
    //     item.id.toString()
    // );

    const defaultInterests: any =
        profileDetails && profileDetails?.interests.map((item) => item.id);

    return (
        <>
            {/* Modal component */}
            <Modal show={show} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Add Interests</h3>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            interests: profileDetails ? defaultInterests : [""],
                        }}
                        validationSchema={addInterestSchema}
                        onSubmit={async (values) => {
                            const formData = new FormData();
                            const interests = values.interests;

                            interests &&
                                interests.forEach((val: any) => {
                                    formData.append("interests", val);
                                });

                            const finalInterests = formData;
                            mutate(finalInterests, {
                                onSuccess: async () => {
                                    setShowAddInterestsForm(false);
                                    queryClient.invalidateQueries(["profile"]);
                                    toast.success(
                                        "Interests detail added successfully"
                                    );
                                },
                                onError: async (error) => {
                                    toast.error(error.message);
                                },
                            });
                        }}
                    >
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form>
                                {/* <TagInputField
                                    data={interestOptions}
                                    name="interests"
                                    labelName="Interests"
                                    create={false}
                                    placeHolder={"Add Interests"}
                                /> */}
                                <MultiSelect
                                    data={interestOptions}
                                    name="interests"
                                    value={profileDetails && values.interests}
                                    onChange={(value) => {
                                        setFieldValue("interests", value);
                                    }}
                                    label="Interests"
                                    placeholder="Enter your interests"
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
            />
        </>
    );
};
export default AddInterests;

// onSubmit={async (values) => {
//     const Interests = profileDetails
//         ? JSON.parse(profileDetails?.interests)
//         : [];
//     /// const newInterests = [...Interests, ...values?.interests];
//     const newInterests = { ...values, interests: Interests };
//     const finalinterests = JSON.stringify(newInterests);

//     // const finalInterests = { ...values, interests: newInterests };
//     // console.log("fila=", finalInterests);
//     mutate(finalinterests, {
//         onSuccess: async () => {
//             console.log("submitted values", finalinterests);
//             setShowAddInterestsForm(false);
//             queryClient.invalidateQueries(["profile"]);
//             toast.success(
//                 "Interests detail added successfully"
//             );
//         },
//         onError: async (error) => {
//             toast.error(error.message);
//             console.log("error=", error);
//         },
//     });

//     console.log(values);
// }}
