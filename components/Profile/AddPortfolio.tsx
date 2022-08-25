import DatePickerField from "@components/common/DateTimeField";
import DragDrop from "@components/common/DragDrop";
import FileDragDrop from "@components/common/FileDragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { AddPortfolioProps } from "types/editProfile";
import { AddPortfolioFormData } from "utils/formData";
import { addPortfolioSchema } from "utils/formValidation/AddPortFolioFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface AddPortfolioModalProps {
    show?: boolean;
    id?: number;
    handleClose?: () => void;
    setShowAddPortfolioModal: Dispatch<SetStateAction<boolean>>;
}
interface EditDetailProps {
    data: { result: AddPortfolioProps[] };
}
const AddPortfolio = ({
    show,
    handleClose,
    setShowAddPortfolioModal,
    id,
}: AddPortfolioModalProps) => {
    const { mutate } = useForm(`/tasker/portfolio/`);
    const { mutate: editMutation } = useEditForm(`/tasker/portfolio/${id}/`);

    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-portfolio",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);
    console.log("edit data=", editDetails);
    const formattedImage = editDetails?.image?.substring(
        editDetails?.image?.indexOf("/portfolio/") + 11
    );
    const formattedFile = editDetails?.image?.substring(
        editDetails?.file?.indexOf("/portfolio/") + 11
    );
    console.log("formatted image=", formattedImage, formattedFile);
    // {document.file.substring(
    //     document.file.indexOf("document/") +
    //         9
    // )}
    return (
        <div>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton></Modal.Header>
                <div className="modal-body-content">
                    <h3>Add Portfolio</h3>
                    <Formik
                        initialValues={
                            editDetails
                                ? {
                                      ...editDetails,
                                      issued_date: parseISO(
                                          editDetails.issued_date
                                      ),
                                      image: formattedImage,
                                      file: formattedFile,
                                  }
                                : AddPortfolioFormData
                        }
                        validationSchema={addPortfolioSchema}
                        onSubmit={async (values) => {
                            const formData = new FormData();
                            let newValue;
                            if (editDetails || values.issued_date) {
                                const formattedValues = {
                                    ...values,
                                    issued_date: format(
                                        new Date(values.issued_date),
                                        "yyyy-MM-dd"
                                    ),
                                    image: formData.append(
                                        "file",
                                        formattedImage
                                    ),
                                    file: formData.append(
                                        "image",
                                        formattedFile
                                    ),
                                };
                                newValue = formattedValues;

                                Object.entries(newValue).forEach((entry) => {
                                    const [key, value] = entry;
                                    formData.append(key, value);
                                });
                            } else {
                                Object.entries(newValue).forEach((entry) => {
                                    const [key, value] = entry;
                                    formData.append(key, value);
                                });

                                formData.append("file", values.file);
                                formData.append("image", values.image);
                            }
                            console.log("sdfasdfasdf", values);
                            // const newvalidatedValue = {
                            //     ...values,
                            //     issued_date: format(
                            //         new Date(values.issued_date),
                            //         "yyyy-MM-dd"
                            //     ),
                            // };

                            // Object.entries(newValue).forEach((entry) => {
                            //     const [key, value] = entry;
                            //     formData.append(key, value);
                            // });

                            // formData.append("file", values.file);
                            // formData.append("image", values.image);
                            console.log(
                                "file image",
                                values.file,
                                values.image
                            );
                            {
                                editDetails
                                    ? editMutation(newValue, {
                                          onSuccess: async () => {
                                              console.log(
                                                  "submitted values",
                                                  values
                                              );
                                              setShowAddPortfolioModal(false);
                                              queryClient.invalidateQueries([
                                                  "tasker-portfolio",
                                              ]);
                                              toast.success(
                                                  "Portfolio updated successfully."
                                              );
                                          },
                                          onError: async (error) => {
                                              toast.error(error.message);
                                          },
                                      })
                                    : mutate(formData, {
                                          onSuccess: async () => {
                                              console.log(
                                                  "submitted values",
                                                  values
                                              );
                                              setShowAddPortfolioModal(false);
                                              queryClient.invalidateQueries([
                                                  "tasker-portfolio",
                                              ]);
                                              toast.success(
                                                  "Portfolio added successfully."
                                              );
                                          },
                                          onError: async (error) => {
                                              toast.error(error.message);
                                          },
                                      });
                            }
                        }}
                    >
                        {({ isSubmitting, errors, touched, setFieldValue }) => (
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
                                            dateFormat="yyyy-MM-dd "
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
                                                    field={setFieldValue}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={5}>
                                                <h4>Pdf</h4>
                                                <p>Add relevant pdf</p>
                                                <FileDragDrop
                                                    name="file"
                                                    image="/userprofile/pdf.svg"
                                                    fileType="Pdf"
                                                    maxPdfSize={20}
                                                    field={setFieldValue}
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
