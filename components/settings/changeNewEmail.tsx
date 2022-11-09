import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { Button } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";
import * as Yup from "yup";

const updateEmailFormSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
});

export const ChangeNewEmail = () => {
    const { data: userDetails } = useUser();
    const url = "/tasker/change-email/";
    // const url =
    //     userDetails?.email === ""
    //         ? "/tasker/add-email/"
    //         : "/tasker/change-email/";
    const changeEmail = useMutation((values: any) => {
        return axiosClient.post(url, values);
    });
    const isLoading = changeEmail.isLoading;

    //

    return (
        <div className=" p-0">
            <Formik
                initialValues={{
                    email: "",
                    // new_email: "",
                    password: "",
                }}
                validationSchema={updateEmailFormSchema}
                onSubmit={async (values, action) => {
                    changeEmail.mutate(values, {
                        onSuccess: () => {
                            userDetails?.email === ""
                                ? toast.success(" Email added successfully")
                                : toast.success(
                                      "Email changed successfully. Please verify your email"
                                  );

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
                        /> */}
                        <PasswordField
                            name="password"
                            typeOf="password"
                            labelName="Password"
                            error={errors.password}
                            touch={touched.password}
                            placeHolder="Password"
                            fieldRequired
                            required={true}
                        />

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
                                isLoading={isLoading}
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
