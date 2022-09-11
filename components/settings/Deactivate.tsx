import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { Form, Formik } from "formik";
import { useLogout } from "hooks/auth/useLogout";
import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import { DeactivateFromData } from "utils/formData";
import { deactivateFormSchema } from "utils/formValidation/deactivateFormValidation";
import { isSubmittingClass } from "utils/helpers";

const DeactivationOptions = [
    {
        id: 1,
        label: "I am deactivating the account temporarily.",
        value: "I am deactivating the account temporarily.",
    },
    {
        id: 2,
        label: "I did not find CIPHER helpful for me.",
        value: "I did not find CIPHER helpful for me.",
    },
    {
        id: 3,
        label: "I have another CIPHER account.",
        value: "I have another CIPHER account.",
    },
    {
        id: 4,
        label: "I am not satisfied with the services of CIPHER.",
        value: "I am not satisfied with the services of CIPHER.",
    },
    { id: 5, label: "Other", value: "Other" },
];

const DeactivateAccount = () => {
    const toggleSuccessModal = useToggleSuccessModal();
    const { mutate } = useForm("/user/deactivate/");
    const router = useRouter();
    const logout = useLogout({ onLogout: () => router.push("/") });
    return (
        <div className="account-form">
            <h2>Deactivate</h2>
            <p>Close my account</p>
            <Formik
                initialValues={DeactivateFromData}
                validationSchema={deactivateFormSchema}
                onSubmit={async (values, action) => {
                    action.resetForm();

                    mutate(values, {
                        onSuccess: async () => {
                            toggleSuccessModal();
                            logout();
                        },
                        onError: (error) => {
                            toast.error(error.message);
                        },
                    });
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                        <SelectInputField
                            name="reason"
                            labelName="I am leaving because "
                            touch={touched.reason}
                            error={errors.reason}
                            fieldRequired
                            placeHolder="Choose Reason"
                            options={DeactivationOptions}
                        />
                        {/* <SelectInputField
                            name="duration"
                            labelName="How Long"
                            touch={touched.duration}
                            error={errors.duration}
                            fieldRequired
                            placeHolder="How Long"
                            options={DeactivationOptions}
                        /> */}
                        <InputField
                            name="explaination"
                            labelName="Please explain further"
                            placeHolder="Please explain further"
                            as="textarea"
                        />

                        <FormButton
                            type="submit"
                            variant="primary"
                            name="Save"
                            className="submit-btn"
                            isSubmitting={isSubmitting}
                            isSubmittingClass={isSubmittingClass(isSubmitting)}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DeactivateAccount;
