import { CustomDropZone } from "@components/common/CustomDropZone";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
// import MultiImageDropzone from "@components/common/MultiImageDropzone";
// import MultiPdfFileDropzone from "@components/common/MultiPdfFileDropzone";
import { RichText } from "@components/RichText";
import { faCalendarDays } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, LoadingOverlay } from "@mantine/core";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type { AddPortfolioProps } from "types/editProfile";
import { axiosClient } from "utils/axiosClient";
import { AddPortfolioFormData } from "utils/formData";
import { addPortfolioSchema } from "utils/formValidation/AddPortFolioFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";
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
    const [isVideo, setIsVideo] = useState(false);
    const { mutate: uploadImageMutation, isLoading: uploadImageLoading } =
        useUploadImage();
    const { mutate: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();
    const { mutate: editMutation, isLoading: updatePortfolioLoading } =
        useEditForm(`/tasker/portfolio/${id}/`);
    const loadingOverlayVisible = useMemo(
        () =>
            createPortfolioLoading ||
            uploadImageLoading ||
            uploadFileLoading ||
            updatePortfolioLoading,
        [
            createPortfolioLoading,
            uploadFileLoading,
            updatePortfolioLoading,
            uploadImageLoading,
        ]
    );
    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-portfolio",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);

    const imageId: number[] = [];
    const fileId: number[] = [];

    editDetails?.images.map((image: any) => imageId.push(image.id));
    editDetails?.files.map((file: any) => fileId.push(file.id));

    const uploadImage = (images: any[]) => {
        return new Promise<number[]>((resolve, reject) => {
            if (images && images.length > 0) {
                const imageFormData = new FormData();
                for (const image of images) {
                    imageFormData.append("medias", image);
                    imageFormData.append(
                        "media_type",
                        isVideo ? "video" : "image"
                    );
                    imageFormData.append(
                        "placeholder",
                        isVideo ? "video" : "image"
                    );
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
    const editPortfolio = <T,>(data: T) => {
        editMutation(data, {
            onSuccess: async () => {
                setShowAddPortfolioModal(false);
                queryClient.invalidateQueries(["tasker-portfolio"]);
                toast.success("Portfolio updated successfully.");
            },
            onError: async (error) => {
                toast.error(error.message);
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
                                      files: [] as File[],
                                      images: [] as File[],
                                      imagePreviewUrl: [],
                                      pdfPreviewUrl: [],
                                  }
                                : AddPortfolioFormData
                        }
                        validationSchema={addPortfolioSchema}
                        onSubmit={async (values) => {
                            delete values.imagePreviewUrl;
                            delete values.pdfPreviewUrl;

                            {
                                values.images ??
                                (values.images[0] as File).type === "video/mp4"
                                    ? setIsVideo(true)
                                    : setIsVideo(false);
                            }

                            const issued_date = format(
                                new Date(values.issued_date),
                                "yyyy-MM-dd"
                            );
                            const addPortfolioPayload = {
                                ...values,
                                issued_date,
                            };

                            if (
                                (values.files.length > 0 || isEditProfile) &&
                                (values.images.length > 0 || isEditProfile)
                            ) {
                                const imageIds =
                                    isEditProfile && values.images.length < 1
                                        ? imageId
                                        : await uploadImage(values.images);
                                const fileIds =
                                    isEditProfile && values.files.length < 1
                                        ? fileId
                                        : await uploadFile(values.files);

                                const portfolioPayloadWithImageAndFile = {
                                    ...addPortfolioPayload,
                                    images: imageIds,
                                    files: fileIds,
                                };

                                {
                                    !isEditProfile
                                        ? uploadPortfolio(
                                              portfolioPayloadWithImageAndFile
                                          )
                                        : editPortfolio(
                                              portfolioPayloadWithImageAndFile
                                          );
                                }

                                return;
                            }
                            let editData;
                            if (values.images && values.images.length > 0) {
                                const imageIds = await uploadImage(
                                    values.images
                                );
                                // addPortfolioPayload?.files ??
                                //     delete addPortfolioPayload.files;

                                const portfolioPayloadWithImage = {
                                    ...addPortfolioPayload,
                                    images:
                                        isEditProfile &&
                                        values.images.length < 1
                                            ? imageId
                                            : imageIds,
                                };

                                {
                                    !isEditProfile
                                        ? uploadPortfolio(
                                              portfolioPayloadWithImage
                                          )
                                        : editPortfolio(
                                              portfolioPayloadWithImage
                                          );
                                }
                                return;
                            }
                            if (values.files && values.files.length > 0) {
                                const fileIds = await uploadFile(values.files);
                                // delete addPortfolioPayload.images;
                                const portfolioPayloadWithFile = {
                                    ...addPortfolioPayload,
                                    files:
                                        isEditProfile && values.files.length < 1
                                            ? fileId
                                            : fileIds,
                                };

                                {
                                    !isEditProfile
                                        ? uploadPortfolio(
                                              portfolioPayloadWithFile
                                          )
                                        : editPortfolio(
                                              portfolioPayloadWithFile
                                          );
                                }
                                return;
                            } else {
                                // delete addPortfolioPayload.files;
                                // delete addPortfolioPayload.images;

                                const newPayloadWithoutImageAndFile = {
                                    ...addPortfolioPayload,
                                    images:
                                        values.images.length < 1 ? imageId : [],
                                    files:
                                        values.files.length < 1 ? fileId : [],
                                };

                                editData = newPayloadWithoutImageAndFile;
                            }
                            console.log(
                                "🚀 ~ file: AddPortfolio.tsx ~ line 285 ~ onSubmit={ ~ editData",
                                editData
                            );

                            // delete addPortfolioPayload.files;
                            // delete addPortfolioPayload.images;

                            editDetails
                                ? editPortfolio(editData)
                                : uploadPortfolio(addPortfolioPayload);
                            // uploadPortfolio(addPortfolioPayload);
                        }}
                    >
                        {({
                            isSubmitting,
                            getFieldProps,
                            setFieldValue,
                            errors,
                            values,
                            touched,
                        }) => (
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
                                        {/* <InputField
                                            as="textarea"
                                            name="description"
                                            min="1"
                                            error={errors.description}
                                            touch={touched.description}
                                            placeHolder="Portfolio Description"
                                        /> */}
                                        <RichText
                                            {...getFieldProps("description")}
                                            value={values?.description ?? ""}
                                            onChange={(value) =>
                                                setFieldValue(
                                                    "description",
                                                    value
                                                )
                                            }
                                            placeholder="Portfolio Description"
                                        />
                                        <h4>Issued Date</h4>
                                        {/* <DatePickerField
                                            name="issued_date"
                                            min="1"
                                            error={errors.issued_date}
                                            touch={touched.issued_date}
                                            dateFormat="yyyy-MM-dd"
                                            placeHolder="2022-03-06"
                                        /> */}
                                        <MantineDateField
                                            name="issued_date"
                                            min="1"
                                            error={String(
                                                errors.issued_date
                                                    ? errors.issued_date
                                                    : ""
                                            )}
                                            touch={Boolean(touched.issued_date)}
                                            placeHolder="2022-03-06"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "issued_date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
                                        />
                                        <h4>Portfolio URL</h4>
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
                                                <CustomDropZone
                                                    // accept={IMAGE_MIME_TYPE}
                                                    uploadedFiles={
                                                        editDetails?.images ??
                                                        []
                                                    }
                                                    fileType="image"
                                                    sx={{ maxWidth: "30rem" }}
                                                    name="images"
                                                    onDrop={(images) =>
                                                        setFieldValue(
                                                            "images",
                                                            images
                                                        )
                                                    }
                                                />
                                                {/* 
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
                                                    onDrop={(images) =>
                                                        setFieldValue(
                                                            "images",
                                                            images
                                                        )
                                                    }
                                                /> */}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={5}>
                                                <h4>Pdf</h4>
                                                <p>Add relevant pdf</p>
                                                {/* <MultiPdfFileDropzone
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
                                                    onDrop={(files) =>
                                                        setFieldValue(
                                                            "files",
                                                            files
                                                        )
                                                    }
                                                /> */}
                                                <CustomDropZone
                                                    accept={[MIME_TYPES.pdf]}
                                                    fileType="pdf"
                                                    name="files"
                                                    onDrop={(files) =>
                                                        setFieldValue(
                                                            "files",
                                                            files
                                                        )
                                                    }
                                                    // uploadedFiles={
                                                    //     editDetails?.files ?? []
                                                    // }
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
                                        className="submit-btn"
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
