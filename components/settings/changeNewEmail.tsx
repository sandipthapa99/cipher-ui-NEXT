import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";
import { isSubmittingClass } from "utils/helpers";

export const ChangeNewEmail = () => {
    const { data: userDetails } = useUser();
    const url =
        userDetails?.email === ""
            ? "/tasker/add-email/"
            : "/tasker/change-email/";
    const changeEmail = useMutation((values: any) => {
        return axiosClient.post(url, values);
    });

    // console.log("userDetails", userDetails);

    return (
        <div className=" p-0">
            <Formik
                initialValues={{
                    email: "",
                    // new_email: "",
                    // confirm_password: "",
                }}
                //validationSchema={changePasswordFormSchema}
                onSubmit={async (values, action) => {
                    changeEmail.mutate(values, {
                        onSuccess: () => {
                            userDetails?.email === ""
                                ? toast.success(" Email added successfully")
                                : toast.success("Email changed successfully");

                            action.resetForm();
                        },
                        onError: (err: any) => {
                            toast.error(err.message);
                        },
                    });
                }}
            >
                {({ isSubmitting, errors, touched, resetForm }) => (
                    <Form autoComplete="off">
                        <InputField
                            name="email"
                            type="text"
                            labelName="Email"
                            error={errors.email}
                            touch={touched.email}
                            placeHolder="Email"
                            fieldRequired
                            required={true}
                        />
                        {/* <InputField
                            type="text"
                            name="new_email"
                            labelName="New Email"
                            error={errors.new_email}
                            touch={touched.new_email}
                            placeHolder="New Email"
                            fieldRequired
                            required={true}
                        />
                        <PasswordField
                            name="confirm_password"
                            typeOf="password"
                            labelName="Confirm Password"
                            error={errors.confirm_password}
                            touch={touched.confirm_password}
                            placeHolder="Confirm Password"
                            fieldRequired
                            required={true}
                        /> */}

                        {/* <PasswordField
                            name="confirm_password"
                            typeOf="password"
                            labelName="Confirm Password"
                            error={errors.confirm_password}
                            touch={touched.confirm_password}
                            placeHolder="Confirm Password"
                            fieldRequired
                        /> */}

                        <div className="d-flex justify-content-end">
                            <Button
                                className="me-3 mb-0 cancel-btn"
                                onClick={() => resetForm}
                            >
                                Cancel
                            </Button>
                            <FormButton
                                type="submit"
                                variant="primary"
                                name={
                                    userDetails?.email === "" ? "Add" : "Update"
                                }
                                className="submit-btn"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(
                                    isSubmitting
                                )}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
