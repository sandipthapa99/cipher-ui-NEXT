import { BreadCrumb } from "@components/common/BreadCrumb";
import FileInputField from "@components/common/FileInputField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import ReCaptchaField from "@components/common/ReCaptchaField";
import Layout from "@components/Layout";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import { CarrerApplyFormData } from "utils/formData";
import { carrerApplyFormValidation } from "utils/formValidation/careerApplyFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Apply = () => {
    const toggleSuccessModal = useToggleSuccessModal();
    const router = useRouter();
    const { id } = router.query;
    const { mutate } = useForm(`/career/candidate/apply/${id}/`);
    return (
        <Layout title="Hoomale | Apply">
            <BreadCrumb currentPage="Apply" />
            <section id="career-apply-section" className="career-apply-section">
                <Container fluid="xl">
                    <div className="apply-form">
                        <h3>Submit your application</h3>
                        <Formik
                            initialValues={CarrerApplyFormData}
                            validationSchema={carrerApplyFormValidation}
                            onSubmit={async (values, action) => {
                                const formData = new FormData();
                                Object.entries(values).forEach((entry) => {
                                    const [key, value] = entry;
                                    formData.append(key, value);
                                });
                                values.cv.forEach((file) =>
                                    formData.append("cv", file)
                                );

                                delete values.imagePreviewUrl;

                                mutate(formData, {
                                    onSuccess: async () => {
                                        await router.push("/career");
                                        toggleSuccessModal();
                                    },
                                    onError: (error) => {
                                        toast.error(error.message);
                                    },
                                });
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
                                <Form
                                    autoComplete="off"
                                    encType="multipart/form-data"
                                >
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
                                    <PhoneNumberInput
                                        name={"phone"}
                                        labelName="Phone Number"
                                        touch={touched.phone}
                                        error={errors.phone}
                                        placeHolder={"Enter your Phone Number"}
                                    />
                                    <InputField
                                        type="text"
                                        name="current_company"
                                        labelName="Current Company"
                                        error={errors.current_company}
                                        touch={touched.current_company}
                                        placeHolder="Enter your current/previous company name"
                                    />
                                    <InputField
                                        type="text"
                                        name="experience"
                                        labelName="Work Experience"
                                        error={errors.experience}
                                        touch={touched.experience}
                                        placeHolder="Enter you work experience in years"
                                    />
                                    <InputField
                                        type="text"
                                        name="portfolio_link"
                                        labelName="Portfolio Link"
                                        error={errors.portfolio_link}
                                        touch={touched.portfolio_link}
                                        placeHolder="Enter you portfolio or website link here"
                                    />
                                    <FileInputField
                                        name="cv"
                                        error={errors.cv as string}
                                        touch={touched.cv as boolean}
                                        placeHolder="Attach Resume/CV"
                                        labelName="Upload your Resume/CV"
                                        textMuted="(e.g; .pdf, .docx), File Size: 1MB"
                                        handleChange={(e) => {
                                            setFieldValue(
                                                "cv",
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
                                            setFieldTouched("cv", true);
                                        }}
                                    />

                                    <InputField
                                        type="text"
                                        name="cover_letter"
                                        labelName="Additional Information"
                                        error={errors.cover_letter}
                                        touch={touched.cover_letter}
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
