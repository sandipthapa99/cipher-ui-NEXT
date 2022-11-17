import BigButton from "@components/common/Button";
import { CustomDropZone } from "@components/common/CustomDropZone";
import FormButton from "@components/common/FormButton";
import { Modal, Select, Textarea } from "@mantine/core";
import { Form, Formik } from "formik";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import type {
    SelectOptionProps,
    SelectOptionRevisionProps,
} from "types/selectInputField";
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
}: ReportRevisionFormProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const initialValues = {
        reason: "",
        description: "",
    };

    const options: SelectOptionRevisionProps[] = [
        {
            id: 1,
            value: "profile",
            label: "profile",
        },

        {
            id: 2,
            value: "post",
            label: "post",
        },

        {
            id: 3,
            value: "message",
            label: "message",
        },

        {
            id: 2,
            value: "service",
            label: "service",
        },

        {
            id: 2,
            value: "help",
            label: "help",
        },
    ];

    return (
        <div className="collaboration-request-form">
            <Modal opened={show} onClose={handleClose} size="xl">
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

                <div className="service-description mb-3">
                    <span className="description-title">Service Title :</span>{" "}
                    <span className="description-text">
                        Root Canal Treatment (RCT){" "}
                    </span>
                </div>
                <div className="service-description mb-3">
                    <span className="description-title">Service Id :</span>{" "}
                    <span className="description-text">#S12345 </span>
                </div>

                <p className="full-description mb-5">
                    We specialize in general handyman tasks outside of advanced
                    plumbing and electrical. Need to recaulk the bathroom? We do
                    it. Need to repaint a room?...more
                </p>

                <hr />

                <div className="form-section">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={reportRevisionFormSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                            toggleSuccessModal();
                        }}
                    >
                        {({ errors, touched }) => {
                            return (
                                <Form>
                                    <Select
                                        label="Select your reason"
                                        placeholder="Pick one"
                                        data={options}
                                        className="mb-5"
                                    />

                                    <Textarea
                                        placeholder="Enter your description here"
                                        label="Description"
                                        autosize
                                        minRows={4}
                                        className="mb-5"
                                    />

                                    <Row className="mb-5">
                                        <Col md={4}>
                                            <p className="m-1 report-image-label">
                                                Images
                                            </p>
                                            <CustomDropZone name={"Images"} />
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-center button-section gap-5">
                                        <span className="cancel-button">
                                            <BigButton
                                                btnTitle={"Cancel"}
                                                backgroundColor={"white"}
                                                handleClick={handleClose}
                                            />
                                        </span>
                                        <FormButton
                                            handleClick={handleButtonClick}
                                            name={"Report"}
                                        />
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};
