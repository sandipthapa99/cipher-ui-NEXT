import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { isSubmittingClass } from "utils/helpers";

export const ChangePhoneNumber = () => {
    return (
        <div className="p-0">
            {/* <h2>Password</h2> */}
            {/* <p className="m-0">Configurations</p> */}
            <Formik
                initialValues={{
                    current_phone: "",
                    new_phone: "",
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
                        {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                        <InputField
                            type="text"
                            name="current_phone"
                            labelName="Current Phone Number"
                            error={errors.current_phone}
                            touch={touched.current_phone}
                            placeHolder="Current Phone number"
                            fieldRequired
                            required={true}
                        />
                        <InputField
                            type="text"
                            name="new_phone"
                            labelName="New Phone Number"
                            error={errors.new_phone}
                            touch={touched.new_phone}
                            placeHolder="New phone number"
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
            {/* <div>
                                <SecurityQuestions />
                            </div> */}
        </div>
    );
};
