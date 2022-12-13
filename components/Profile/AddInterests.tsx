import FormButton from "@components/common/FormButton";
import TagInputField from "@components/common/TagInputField";
import { PostCard } from "@components/PostTask/PostCard";
import type { IAllCategory } from "@components/settings/AccountForm";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
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
import { AddInterestFormData } from "utils/formData";
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

    // const interestValues =
    //     allCategory && allCategory?.data.length !== 0
    //         ? allCategory?.data?.map((item: any) => {
    //               return { label: item?.name, value: item?.id };
    //           })
    //         : [];
    const currentInterestId = profileDetails?.interests.map((item) => {
        return item.id.toString();
    });

    // const defaultInterests = useMemo(
    //     () =>
    //         profileDetails?.interests.map((item) => ({
    //             value: item.id.toString(),
    //             label: item.name.toString(),
    //         })),
    //     [profileDetails]
    // );
    const currentInterests =
        profileDetails &&
        profileDetails?.interests.map((item: { id: number; name: string }) => {
            return item.id.toString();
        });
    return (
        <>
            {/* Modal component */}
            <Modal show={show} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal edit-form">
                    <h3>Add Interests</h3>
                    <Formik
                        enableReinitialize
                        initialValues={
                            // profileDetails
                            //     ? currentInterests
                            //:
                            AddInterestFormData
                        }
                        validationSchema={addInterestSchema}
                        onSubmit={async (values) => {
                            const formData = new FormData();
                            const interest = values.interests;
                            const newInterests =
                                currentInterestId &&
                                currentInterestId.concat(interest);

                            newInterests &&
                                newInterests.forEach((val: any) => {
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
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <TagInputField
                                    data={interestOptions}
                                    name="interests"
                                    labelName="Interests"
                                    create={false}
                                    placeHolder={"Add Interests"}
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
