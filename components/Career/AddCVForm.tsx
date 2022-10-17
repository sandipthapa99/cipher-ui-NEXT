import FileInputField from "@components/common/FileInputField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import ReCaptchaV3 from "@components/common/ReCaptchaV3";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import router from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import { UploadCVFormData } from "utils/formData";
import { uploadCVFormValidation } from "utils/formValidation/uploadCVFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface AddCVProps {
    show?: boolean;
    handleClose?: () => void;
    setShowCvForm: Dispatch<SetStateAction<boolean>>;
}

const AddCVForm = ({ show, handleClose, setShowCvForm }: AddCVProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const { mutate } = useForm(`/career/inquiry/add/`);
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

    const [token, setToken] = useState("");

    // const { token, generateRecaptcha } = useRecaptcha();

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Upload your CV</h3>
                    <Formik
                        initialValues={UploadCVFormData}
                        validationSchema={uploadCVFormValidation}
                        onSubmit={async (values, action) => {
                            const formData = new FormData();
                            Object.entries(values).forEach((entry) => {
                                const [key, value] = entry;
                                formData.append(key, value);
                            });
                            values.cv.forEach((file) =>
                                formData.append("cv", file)
                            );
                            formData.append("g_recaptcha_response", token);

                            delete values.imagePreviewUrl;
                            setShowCvForm(false);
                            // To be used for API
                            // try {
                            //     axiosClient.post("/routes", values);
                            // } catch (error: any) {
                            //     error.response.data.message;
                            // }
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
                            <Form encType="multipart/form-data">
                                <Row className="gx-5">
                                    <Col md={6}>
                                        <InputField
                                            type="text"
                                            name="full_name"
                                            labelName="Full Name"
                                            error={errors.full_name}
                                            touch={touched.full_name}
                                            placeHolder="Enter your Full Name"
                                            fieldRequired
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <InputField
                                            type="text"
                                            name="email"
                                            labelName="Email"
                                            error={errors.email}
                                            touch={touched.email}
                                            placeHolder="Enter your email"
                                            fieldRequired
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <PhoneNumberInput
                                            name={"phone"}
                                            labelName="Phone Number"
                                            touch={touched.phone}
                                            error={errors.phone}
                                            placeHolder={
                                                "Enter your Phone Number"
                                            }
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <InputField
                                            type="text"
                                            name="applied_position"
                                            labelName="Apply position"
                                            error={errors.applied_position}
                                            touch={touched.applied_position}
                                            placeHolder="Enter your position"
                                            fieldRequired
                                        />
                                    </Col>
                                </Row>
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
                                            (value: any) => value?.file?.name
                                        )
                                    }
                                    onBlur={() => {
                                        setFieldTouched("cv", true);
                                    }}
                                    fieldRequired
                                />

                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn w-25"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>

                                    <ReCaptchaV3
                                        refresher={refreshReCaptcha}
                                        render={(token) => setToken(token)}
                                    />
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Apply"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                        onClick={() =>
                                            setRefreshReCaptcha(true)
                                        }
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
export default AddCVForm;
