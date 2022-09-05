import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MultiImageDropzone from "@components/common/MultiImageDropzone";
import MultiPdfFileDropzone from "@components/common/MultiPdfFileDropzone";
import { createStyles, LoadingOverlay } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { AddPortfolioProps } from "types/editProfile";
import { axiosClient } from "utils/axiosClient";
import { AddPortfolioFormData } from "utils/formData";
import { addPortfolioSchema } from "utils/formValidation/AddPortFolioFormValidation";
import { isSubmittingClass } from "utils/helpers";
interface AddPortfolioModalProps {
    show?: boolean;
    id?: number;
    handleClose?: () => void;
    setShowAddPortfolioModal: Dispatch<SetStateAction<boolean>>;
    isEditProfile?: boolean;
}
interface EditDetailProps {
    data: { result: AddPortfolioProps[] };
}
const useUploadImage = () =>
    useMutation<number[], AxiosError, FormData>((formData) =>
        axiosClient
            .post<{ data: number[] }>("/task/filestore/", formData)
            .then((res) => res.data.data)
    );
const useUploadFile = () =>
    useMutation<number[], AxiosError, FormData>((formData) =>
        axiosClient
            .post<{ data: number[] }>("/task/filestore/", formData)
            .then((res) => res.data.data)
    );
const useCreatePortfolio = () =>
    useMutation<string, AxiosError, any>((payload) =>
        axiosClient
            .post<{ message: string }>("/tasker/portfolio/", payload)
            .then((res) => res.data.message)
    );

const AddPortfolio = ({
    show,
    handleClose,
    setShowAddPortfolioModal,
    id,
    isEditProfile,
}: AddPortfolioModalProps) => {
    const { classes } = useStyles();
    const queryClient = useQueryClient();
    const {
        mutate: createPortfolioMutation,
        isLoading: createPortfolioLoading,
    } = useCreatePortfolio();
    const { mutate: uploadImageMutation, isLoading: uploadImageLoading } =
        useUploadImage();
    const { mutate: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();

    const loadingOverlayVisible = useMemo(
        () => createPortfolioLoading || uploadImageLoading || uploadFileLoading,
        [createPortfolioLoading, uploadFileLoading, uploadImageLoading]
    );
    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-portfolio",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);

    const uploadImage = (images: any[]) => {
        return new Promise<number[]>((resolve, reject) => {
            if (images && images.length > 0) {
                const imageFormData = new FormData();
                for (const image of images) {
                    imageFormData.append("medias", image);
                    imageFormData.append("media_type", "image");
                    imageFormData.append("placeholder", "image");
                }
                uploadImageMutation(imageFormData, {
                    onSuccess: (fileIds) => resolve(fileIds),
                    onError: () => reject(),
                });
            }
        });
    };
    const uploadFile = (files: any[]) => {
        return new Promise<number[] | null>((resolve, reject) => {
            if (files && files.length > 0) {
                const fileFormData = new FormData();
                for (const file of files) {
                    fileFormData.append("medias", file);
                    fileFormData.append("media_type", "pdf");
                    fileFormData.append("placeholder", "file");
                    uploadFileMutation(fileFormData, {
                        onSuccess: (imageIds) => resolve(imageIds),
                        onError: () => reject(),
                    });
                }
            }
        });
    };
    const uploadPortfolio = <T,>(payload: T) => {
        createPortfolioMutation(payload, {
            onSuccess: (message) => {
                toast.success(message);
                setShowAddPortfolioModal(false);
                queryClient.invalidateQueries(["tasker-portfolio"]);
            },
        });
    };
    if (loadingOverlayVisible)
        return (
            <LoadingOverlay
                visible={loadingOverlayVisible}
                className={classes.overlay}
                overlayBlur={2}
            />
        );
    return (
        <div>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton />
                <div className="modal-body-content">
                    <h3>Add Portfolio</h3>
                    <Formik
                        initialValues={
                            editDetails && isEditProfile === true
                                ? {
                                      ...editDetails,
                                      issued_date: parseISO(
                                          editDetails.issued_date
                                      ),
                                  }
                                : AddPortfolioFormData
                        }
                        validationSchema={addPortfolioSchema}
                        onSubmit={async (values) => {
                            const issued_date = format(
                                new Date(values.issued_date),
                                "yyyy-MM-dd"
                            );
                            const addPortfolioPayload = {
                                ...values,
                                issued_date,
                            };
                            if (
                                values.files.length > 0 &&
                                values.images.length > 0
                            ) {
                                const imageIds = await uploadImage(
                                    values.images
                                );
                                const fileIds = await uploadFile(values.files);
                                const portfolioPayloadWithImageAndFile = {
                                    ...addPortfolioPayload,
                                    images: imageIds,
                                    files: fileIds,
                                };
                                uploadPortfolio(
                                    portfolioPayloadWithImageAndFile
                                );
                                return;
                            }
                            if (values.images && values.images.length > 0) {
                                const imageIds = await uploadImage(
                                    values.images
                                );
                                const portfolioPayloadWithImage = {
                                    ...addPortfolioPayload,
                                    images: imageIds,
                                };
                                uploadPortfolio(portfolioPayloadWithImage);
                                return;
                            }
                            if (values.files && values.files.length > 0) {
                                const fileIds = await uploadFile(values.files);
                                const portfolioPayloadWithFile = {
                                    ...addPortfolioPayload,
                                    files: fileIds,
                                };
                                uploadPortfolio(portfolioPayloadWithFile);
                                return;
                            }
                            uploadPortfolio(addPortfolioPayload);
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
                                                    Add relevant image or video
                                                </p>

                                                <MultiImageDropzone
                                                    name="images"
                                                    labelName="Upload your image"
                                                    textMuted="More than 5 image are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 1MB."
                                                    imagePreview="imagePreviewUrl"
                                                    maxFiles={5}
                                                    multiple
                                                    maxSize={200}
                                                    minSize={20}
                                                    showFileDetail
                                                    type="Image/Video"
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={5}>
                                                <h4>Pdf</h4>
                                                <p>Add relevant pdf</p>
                                                <MultiPdfFileDropzone
                                                    name="files"
                                                    pdfPreview="pdfPreviewUrl"
                                                    labelName="Upload your files"
                                                    textMuted="less than 2 file supported."
                                                    maxFiles={2}
                                                    multiple
                                                    maxSize={200}
                                                    minSize={20}
                                                    showFileDetail
                                                    type="pdf"
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
const useStyles = createStyles(() => ({
    overlay: {
        postion: "fixed",
        inset: 0,
        zIndex: 9999,
    },
}));
export default AddPortfolio;
