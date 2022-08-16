import DatePickerField from "@components/common/DateTimeField";
import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { usePostPortfolio } from "hooks/user-portfolio/usePostPortfolio";
import type { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AddPortfolioFormData } from "utils/formData";
import { addPortfolioSchema } from "utils/formValidation/AddPortFolioFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface AddPortfolioModalProps {
    show?: boolean;
    handleClose?: () => void;
    setShowAddPortfolioModal: Dispatch<SetStateAction<boolean>>;
}

const AddPortfolio = ({
    show,
    handleClose,
    setShowAddPortfolioModal,
}: AddPortfolioModalProps) => {
    const { mutate, isLoading, data } = usePostPortfolio();
    const queryClient = useQueryClient();

    return (
        <div>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Portfolio</Modal.Title>
                </Modal.Header>
                <div className="modal-body-content">
                    <Formik
                        initialValues={AddPortfolioFormData}
                        validationSchema={addPortfolioSchema}
                        onSubmit={async (values) => {
                            const newvalidatedValue = {
                                ...values,
                                issued_date: format(
                                    new Date(values.issued_date),
                                    "yyyy-MM-dd"
                                ),
                            };
                            console.log(newvalidatedValue);
                            mutate(newvalidatedValue, {
                                onSuccess: async () => {
                                    console.log("submitted values", values);
                                    setShowAddPortfolioModal(false);
                                    queryClient.invalidateQueries([
                                        "tasker-portfolio",
                                    ]);
                                },
                                onError: async (error) => {
                                    toast.error(error.message);
                                    console.log(error);
                                },
                            });
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="d-flex add-portfolio justify-content-between align-items-end flex-column flex-md-row">
                                    <Row>
                                        <h4>Title</h4>
                                        <InputField
                                            type="text"
                                            name="title"
                                            min="1"
                                            error={errors.title}
                                            touch={touched.title}
                                            placeHolder="Portfolio Title"
                                        />
                                        <h4>Description</h4>
                                        <InputField
                                            as="textarea"
                                            name="description"
                                            min="1"
                                            error={errors.description}
                                            touch={touched.description}
                                            placeHolder="Portfolio Description"
                                        />
                                        <h4>Issued Date</h4>
                                        <DatePickerField
                                            name="issued_date"
                                            min="1"
                                            error={errors.issued_date}
                                            touch={touched.issued_date}
                                            dateFormat="yyyy-MM-dd"
                                            placeHolder="2022-03-06"
                                        />
                                        <h4>Credential URL</h4>
                                        <InputField
                                            type="url"
                                            name="credential_url"
                                            min="1"
                                            error={errors.credential_url}
                                            touch={touched.credential_url}
                                            placeHolder="URL"
                                        />

                                        <Row>
                                            <Col md={5}>
                                                <h4>Gallery</h4>
                                                <p>
                                                    Add relevant images or video
                                                </p>

                                                <DragDrop
                                                    name="image"
                                                    image="/service-details/file-upload.svg"
                                                    fileType="Image/Video"
                                                    maxImageSize={20}
                                                    maxVideoSize={200}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={5}>
                                                <h4>Pdf</h4>
                                                <p>Add relevant pdf</p>
                                                <DragDrop
                                                    name="file"
                                                    image="/userprofile/pdf.svg"
                                                    fileType="Pdf"
                                                    maxPdfSize={20}
                                                />
                                            </Col>
                                        </Row>
                                    </Row>
                                </div>
                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Add"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                        onClick={handleClose}
                                    />
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};
export default AddPortfolio;
