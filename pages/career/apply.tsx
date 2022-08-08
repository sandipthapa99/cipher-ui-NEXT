import Breadcrum from "@components/common/Breadcrum";
import FileInputField from "@components/common/FileInputField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import ReCaptchaField from "@components/common/ReCaptchaField";
import Layout from "@components/Layout";
import { useSuccessContext } from "context/successContext/successContext";
import { Form, Formik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
import { CarrerApplyFormData } from "utils/formData";
import { carrerApplyFormValidation } from "utils/formValidation/careerApplyFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Apply = () => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <Layout title="Cipher | Apply">
            <Breadcrum currentPage="Apply" />
            <section id="career-apply-section" className="career-apply-section">
                <Container fluid="xl">
                    <div className="apply-form">
                        <h3>Submit your application</h3>
                        <Formik
                            initialValues={CarrerApplyFormData}
                            validationSchema={carrerApplyFormValidation}
                            onSubmit={async (values, action) => {
                                setShowSuccessModal(true);
                                // To be used for API
                                // try {
                                //     axiosClient.post("/routes", values);
                                // } catch (error: any) {
                                //     error.response.data.message;
                                // }
                                console.log(values);
                                action.resetForm();
                            }}
                        >
                            {({
                                isSubmitting,
                                errors,
                                touched,
                                setFieldValue,
                                values,
                                setFieldTouched,
                            }) => (
                                <Form autoComplete="off">
                                    <InputField
                                        type="text"
                                        name="full_name"
                                        labelName="Full Name"
                                        error={errors.full_name}
                                        touch={touched.full_name}
                                        placeHolder="Enter your full name here"
                                    />
                                    <InputField
                                        type="email"
                                        name="email"
                                        labelName="Email"
                                        error={errors.email}
                                        touch={touched.email}
                                        placeHolder="Enter your email address here"
                                    />
                                    <InputField
                                        name="phone"
                                        labelName="Phone Number"
                                        touch={touched.phone}
                                        error={errors.phone}
                                        placeHolder="Enter your phone number here"
                                    />
                                    <InputField
                                        type="text"
                                        name="company"
                                        labelName="Current Company"
                                        error={errors.company}
                                        touch={touched.company}
                                        placeHolder="Enter your current/previous company name"
                                    />
                                    <InputField
                                        type="text"
                                        name="work_exp"
                                        labelName="Work Experience"
                                        error={errors.work_exp}
                                        touch={touched.work_exp}
                                        placeHolder="Enter you work experience in years"
                                    />
                                    <InputField
                                        type="text"
                                        name="portfolio"
                                        labelName="Portfolio Link"
                                        error={errors.portfolio}
                                        touch={touched.portfolio}
                                        placeHolder="Enter you portfolio or website link here"
                                    />
                                    <FileInputField
                                        name="resume"
                                        error={errors.resume as string}
                                        touch={touched.resume as boolean}
                                        placeHolder="Attach Resume/CV"
                                        labelName="Upload your Resume/CV"
                                        textMuted="(e.g; .pdf, .docx), File Size: 1MB"
                                        handleChange={(e) => {
                                            setFieldValue(
                                                "resume",
                                                Array.from(e.target.files)
                                            );

                                            const arrFiles = Array.from(
                                                e.target.files
                                            );
                                            const multipleFiles = arrFiles.map(
                                                (file: any, index: number) => {
                                                    const src =
                                                        window.URL.createObjectURL(
                                                            file
                                                        );
                                                    return {
                                                        file,
                                                        id: index,
                                                        src,
                                                    };
                                                }
                                            );

                                            setFieldValue(
                                                "imagePreviewUrl",
                                                multipleFiles
                                            );
                                        }}
                                        fileName={
                                            values.imagePreviewUrl &&
                                            values.imagePreviewUrl.map(
                                                (value: any) =>
                                                    value?.file?.name
                                            )
                                        }
                                        onBlur={() => {
                                            setFieldTouched("resume", true);
                                        }}
                                    />

                                    <InputField
                                        type="text"
                                        name="addtional_info"
                                        labelName="Additional Information"
                                        error={errors.addtional_info}
                                        touch={touched.addtional_info}
                                        placeHolder="Add a cover letter or anything you want to share here."
                                        as="textarea"
                                    />
                                    <ReCaptchaField
                                        name="g_recaptcha_response"
                                        error={errors.g_recaptcha_response}
                                        handleChange={(key) =>
                                            setFieldValue(
                                                "g_recaptcha_response",
                                                key
                                            )
                                        }
                                    />

                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Submit"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};
export default Apply;
