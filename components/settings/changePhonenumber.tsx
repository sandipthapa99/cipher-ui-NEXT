import AuthenticationModalCard from "@components/AuthenticationModal";
import FormButton from "@components/common/FormButton";
import PasswordField from "@components/common/PasswordField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import Cookies from "js-cookie";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

export const ChangePhoneNumber = () => {
    const { data: userDetails } = useUser();
    const [myOtp, setMyOtp] = useState(false);
    const handleClose = () => setMyOtp(false);

    const url = "/tasker/change-phone/";
    const changePhoneNumber = useMutation((values: any) => {
        return axiosClient.post(url, values);
    });

    return (
        <div className="p-0">
            {/* <h2>Password</h2> */}
            {/* <p className="m-0">Configurations</p> */}
            <Formik
                initialValues={{
                    phone: userDetails ? userDetails?.phone : "",
                    password: "",
                }}
                //validationSchema={changePasswordFormSchema}
                onSubmit={async (values, actions) => {
                    changePhoneNumber.mutate(values, {
                        onSuccess: () => {
                            setMyOtp(true);
                            Cookies.set("phone", values?.phone);
                            // userDetails?.phone === ""
                            //     ? toast.success(
                            //           "Phone Number added successfully"
                            //       )
                            //     : toast.success(
                            //           "Phone number changed successfully"
                            //       );
                        },
                        onError: (err: any) => {
                            const { phone, password } = err.response.data;
                            actions.setFieldError("phone", phone && phone[0]);
                            actions.setFieldError("password", password);
                        },
                    });

                    // action.resetForm();
                }}
            >
                {({ isSubmitting, errors, touched, resetForm, values }) => (
                    <Form autoComplete="off">
                        <PhoneNumberInput
                            name={"phone"}
                            fieldRequired={true}
                            labelName="Phone Number"
                            touch={touched.phone}
                            error={errors.phone}
                            value={values.phone}
                        />

                        <PasswordField
                            name="password"
                            typeOf="password"
                            labelName="Password"
                            error={errors.password}
                            touch={touched.password}
                            placeHolder="Password"
                            // fieldRequired
                            // required={true}
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
                                name={
                                    userDetails?.phone === null
                                        ? "Add"
                                        : "Update"
                                }
                                className="submit-btn"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(
                                    isSubmitting
                                )}
                            />
                        </div>
                        <AuthenticationModalCard
                            show={myOtp}
                            handleClose={handleClose}
                            phone={values.phone}
                            setShowForm={setMyOtp}
                            scope="change number"
                        />
                    </Form>
                )}
            </Formik>
            {/* <div>
                                <SecurityQuestions />
                            </div> */}
        </div>
    );
};
