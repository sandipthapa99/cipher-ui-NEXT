import FileInputField from "@components/common/FileInputField";
import FormButton from "@components/common/FormButton";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Upload your CV</h3>
                    <Formik
                        initialValues={UploadCVFormData}
                        validationSchema={uploadCVFormValidation}
                        onSubmit={async (values) => {
                            setShowCvForm(false);
                            // To be used for API
                            // try {
                            //     axiosClient.post("/routes", values);
                            // } catch (error: any) {
                            //     error.response.data.message;
                            // }
                            toggleSuccessModal();
                            console.log(values);
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
                            <Form>
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
                                            (value: any) => value?.file?.name
                                        )
                                    }
                                    onBlur={() => {
                                        setFieldTouched("resume", true);
                                    }}
                                />

                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn w-25"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>

                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Apply"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
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
