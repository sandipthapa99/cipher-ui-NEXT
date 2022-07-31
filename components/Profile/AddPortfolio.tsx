import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImageVideoDragDop, PdfDragDrop } from "staticData/dragDropContent";
import { AddPortfolio } from "types/editProfile";
import { AddPortfolioFormData } from "utils/formData";
import { addPortfolioSchema } from "utils/formValidation/AddPortFolioFormValidation";
import { isSubmittingClass } from "utils/helpers";

const AddPortfolio = ({ handleClose, showModal }: AddPortfolio) => {
    return (
        <div>
            {/* Modal component */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Portfolio</Modal.Title>
                </Modal.Header>
                <div className="modal-body-content">
                    <Formik
                        initialValues={AddPortfolioFormData}
                        validationSchema={addPortfolioSchema}
                        onSubmit={async (values) => {
                            console.log(values);
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
                                            type="textarea"
                                            name="description"
                                            min="1"
                                            error={errors.description}
                                            touch={touched.description}
                                            placeHolder="Portfolio Description"
                                        />
                                        <h4>Issued Date</h4>
                                        <InputField
                                            type="date"
                                            name="date"
                                            min="1"
                                            error={errors.date}
                                            touch={touched.date}
                                            placeHolder="03/06/1999"
                                        />
                                        <h4>Credential URL</h4>
                                        <InputField
                                            type="url"
                                            name="url"
                                            min="1"
                                            error={errors.url}
                                            touch={touched.url}
                                            placeHolder="URL"
                                        />

                                        <Row>
                                            <Col md={5}>
                                                <h4>Gallery</h4>
                                                <p>
                                                    Add relevant images or video
                                                </p>
                                                {ImageVideoDragDop &&
                                                    ImageVideoDragDop.map(
                                                        (info) => (
                                                            <DragDrop
                                                                key={info.id}
                                                                image={
                                                                    info.image
                                                                }
                                                                fileType={
                                                                    info.fileType
                                                                }
                                                                maxImageSize={
                                                                    info.maxImageSize
                                                                }
                                                                maxVideoSize={
                                                                    info.maxVideoSize
                                                                }
                                                            />
                                                        )
                                                    )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={5}>
                                                <h4>Pdf</h4>
                                                <p>Add relevant pdf</p>
                                                {PdfDragDrop &&
                                                    PdfDragDrop.map((info) => (
                                                        <DragDrop
                                                            key={info.id}
                                                            image={info.image}
                                                            fileType={
                                                                info.fileType
                                                            }
                                                            maxPdfSize={
                                                                info.maxPdfSize
                                                            }
                                                        />
                                                    ))}
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
