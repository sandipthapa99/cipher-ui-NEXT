import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";
import { isSubmittingClass } from "utils/helpers";

export const ChangePhoneNumber = () => {
    const changePhoneNumber = useMutation((values: any) => {
        return axiosClient.post("/tasker/change-phone/", values);
    });
    return (
        <div className="p-0">
            {/* <h2>Password</h2> */}
            {/* <p className="m-0">Configurations</p> */}
            <Formik
                initialValues={{
                    phone: "",
                    password: "",
                }}
                //validationSchema={changePasswordFormSchema}
                onSubmit={async (values, action) => {
                    changePhoneNumber.mutate(values, {
                        onSuccess: () => {
                            toast.success("Phone number changed successfully");
                        },
                        onError: (err: any) => {
                            toast.error(err.message);
                        },
                    });
                    console.log(values);
                    action.resetForm();
                }}
            >
                {({ isSubmitting, errors, touched, resetForm }) => (
                    <Form autoComplete="off">
                        {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                        {/* <InputField
                            type="text"
                            name="current_phone"
                            labelName="Current Phone Number"
                            error={errors.current_phone}
                            touch={touched.current_phone}
                            placeHolder="Current Phone number"
                            fieldRequired
                            required={true}
                        /> */}
                        <PhoneNumberInput
                            name={"phone"}
                            fieldRequired={true}
                            labelName="Phone Number"
                            touch={touched.phone}
                            error={errors.phone}
                        />

                        <PasswordField
                            name="password"
                            typeOf="password"
                            labelName="Confirm Password"
                            error={errors.password}
                            touch={touched.password}
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
