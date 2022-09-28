import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { Form, Formik } from "formik";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Modal } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { SelectOptionProps } from "types/selectInputField";
import { reportRevisionFormSchema } from "utils/formValidation/ReportRevisionFormValidation";

interface ReportRevisionFormProps {
    show: boolean;
    handleClose: () => void;
    handleButtonClick?: () => void;
    setRevisionText?: Dispatch<SetStateAction<string>>;
}

export const ReportRevisionForm = ({
    show,
    handleClose,
    handleButtonClick,
    setRevisionText,
}: ReportRevisionFormProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const initialValues = {
        report_type: "",
        revision_reason: "",
    };

    const options: SelectOptionProps[] = [
        {
            id: 1,
            value: "Request for Refund",
            label: "Request for Refund",
        },

        {
            id: 2,
            value: "No request refund",
            label: "No request refund",
        },
    ];

    return (
        <div className="collaboration-request-form">
            <Modal
                show={show}
                onHide={handleClose}
                className="collaboration-request-modal"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="revision-title-section">
                        <h3>Report</h3>

                        <p>Send report for this Task</p>

                        <figure className="revision_report_image">
                            <Image
                                src={"/heroImages/revision_report_image.png"}
                                alt="revision_report_image"
                                height={150}
                                width={150}
                            />
                        </figure>
                    </div>

                    <div className="form-section">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={reportRevisionFormSchema}
                            onSubmit={async (values) => {
                                setRevisionText?.(values?.revision_reason);
                                toggleSuccessModal();
                            }}
                        >
                            {({ setFieldValue, errors, touched }) => {
                                return (
                                    <Form>
                                        <SelectInputField
                                            name="report_type"
                                            labelName="Select report type"
                                            options={options}
                                            placeHolder="Request for Refund"
                                            fieldRequired={true}
                                        />

                                        <InputField
                                            name="revision_reason"
                                            labelName="Reason"
                                            placeHolder="Write your reason here"
                                            as="textarea"
                                            error={errors.revision_reason}
                                            touch={touched.revision_reason}
                                            fieldRequired={true}
                                        />

                                        <div className="d-flex justify-content-center button-section">
                                            <span className="cancel-button">
                                                <BigButton
                                                    btnTitle={"Cancel"}
                                                    backgroundColor={"white"}
                                                    handleClick={handleClose}
                                                />
                                            </span>
                                            <FormButton
                                                handleClick={handleButtonClick}
                                                name={"Request"}
                                            />
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
