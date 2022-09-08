import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { isSubmittingClass } from "utils/helpers";

export const ChangeNewEmail = () => {
    return (
        <div className=" p-0">
            <Formik
                initialValues={{
                    current_email: "",
                    new_email: "",
                    confirm_password: "",
                }}
                //validationSchema={changePasswordFormSchema}
                onSubmit={async (values, action) => {
                    console.log(values);
                    action.resetForm();
                }}
            >
                {({ isSubmitting, errors, touched, resetForm }) => (
                    <Form autoComplete="off">
                        <InputField
                            type="text"
                            name="current_email"
                            labelName="Current Email"
                            error={errors.current_email}
                            touch={touched.current_email}
                            placeHolder="Current Email"
                        />
                        <InputField
                            type="text"
                            name="new_email"
                            labelName="New Email"
                            error={errors.new_email}
                            touch={touched.new_email}
                            placeHolder="New Email"
                        />

                        <PasswordField
                            name="confirm_password"
                            typeOf="password"
                            labelName="Confirm Password"
                            error={errors.confirm_password}
                            touch={touched.confirm_password}
                            placeHolder="Confirm Password"
                        />

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
                                name="Update"
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
