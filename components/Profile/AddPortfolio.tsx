import { CustomDropZone } from "@components/common/CustomDropZone";
import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MultiFileDropzone from "@components/common/MultiFileDropzone";
import MultiImageDropzone from "@components/common/MultiImageDropzone";
import MultiPdfFileDropzone from "@components/common/MultiPdfFileDropzone";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
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
    isEditProfile?: boolean;
}
interface EditDetailProps {
    data: { result: AddPortfolioProps[] };
}
interface FileStoreData {
    data: [];
    status: string;
}
const AddPortfolio = ({
    show,
    handleClose,
    setShowAddPortfolioModal,
    id,
    isEditProfile,
}: AddPortfolioModalProps) => {
    const { mutate } = useForm(`/tasker/portfolio/`);

    const { mutate: fileStore, data: fileStoreData } =
        useForm<FileStoreData>(`/task/filestore/`);

    const { mutate: fileImageStore, data: fileImageStoreData } =
        useForm<FileStoreData>(`/task/filestore/`);
    console.log("filestore=", fileStoreData, fileImageStoreData);
    const { mutate: editMutation } = useEditForm(`/tasker/portfolio/${id}/`);
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-portfolio",
    ]);
    const [imageId, setImageId] = useState<number[]>([]);
    const [fileId, setfileId] = useState<number[]>([]);
    const [isImageEmpty, setIsImageEmpty] = useState(true);
    const [isFileEmpty, setIsFileEmpty] = useState(true);
    const [imagesData, setImagesData] = useState<AddPortfolioProps>();
    const [filesData, setFilesData] = useState<AddPortfolioProps>();

    function isValidURL(str: any) {
        const regex =
            /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
        if (!regex.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    const editDetails = data?.data?.result.find((item) => item.id === id);

    // if (isImageEmpty) {
    //     console.log("we have no image");
    // } else if (isFileEmpty) {
    //     console.log("we have noo file");
    // } else if (isFileEmpty || isImageEmpty) {
    //     console.log("we have image and file empty");
    // }
    let imageData;
    let fileData;
    const onCreateThumbnail = (formData: FormData, values: any, actions: any) =>
        fileImageStore(formData, {
            onSuccess: (data: any) => {
                setImageId(data.data);

                imageData = {
                    ...values,
                    images: data.data,
                    files: fileId ? fileId : null,
                    issued_date: values.issued_date
                        ? format(new Date(values.issued_date), "yyyy-MM-dd")
                        : null,
                };
                delete imageData.imagePreviewUrl;
                console.log("on create thumbnail====>", imageData);
                setImagesData(imageData);
                // {
                //     imageId && fileId
                //         ? onCreatePortfolio(imageData, actions)
                //         : console.log("no");
                // }
            },
            onError: (error) => {
                error.message;
            },
        });

    const onCreateFile = (formData: FormData, values: any, actions: any) =>
        fileStore(formData, {
            onSuccess: (data: any) => {
                setfileId(data.data);
                fileData = {
                    ...values,
                    files: data.data,
                    images: imageId ? imageId : null,
                    issued_date: values.issued_date
                        ? format(new Date(values.issued_date), "yyyy-MM-dd")
                        : null,
                };
                delete fileData.pdfPreviewUrl;
                setFilesData(fileData);

                // console.log("on create file====>", fileData, fileId);
                // {
                //     imageId && fileId
                //         ? onCreatePortfolio(fileData, actions)
                //         : console.log("no");
                // }
            },
            onError: (error) => {
                error.message;
            },
        });

    console.log("data=====", imageId, fileId);
    // setImageId(imageId);
    // setfileId(fileId);
    if (!imageId || !fileId) {
        console.log("both are empty");
    }
    console.log("file data to send=", filesData);
    console.log("image data to send=", imagesData);

    const onCreatePortfolio = (data: any, actions: any) => {
        const newData = {
            ...data,
            images: imagesData ? imagesData.images : [],
            files: filesData ? filesData.files : [],
        };
        console.log("new data=", newData, data);
        setfileId([]);
        setImageId([]);
        // mutate(newData, {
        //     onSuccess: (data: any) => {
        //         setImageId([]);
        //         setfileId([]);
        //         setIsImageEmpty(true);
        //         setIsFileEmpty(true);
        //         toast.success("Portfolio added successfully.");
        //         setShowAddPortfolioModal(false);
        //         queryClient.invalidateQueries(["tasker-portfolio"]);
        //     },
        //     onError: (error: any) => {
        //         const {
        //             data: { message },
        //         } = error.response;
        //         console.log("error data=", error, message);
        //     },
        // });
    };

    return (
        <div>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton></Modal.Header>
                <div className="modal-body-content">
                    <h3>Add Portfolio</h3>
                    <Formik
                        initialValues={
                            editDetails && isEditProfile == true
                                ? {
                                      ...editDetails,
                                      issued_date: parseISO(
                                          editDetails.issued_date
                                      ),
                                      //   images: editDetails.images,
                                      //   files: editDetails.files,
                                  }
                                : AddPortfolioFormData
                        }
                        validationSchema={addPortfolioSchema}
                        onSubmit={async (values, actions) => {
                            const formData: FormData = new FormData();
                            const fileFormData: FormData = new FormData();

                            let newValue;

                            delete values.imagePreviewUrl;
                            delete values.pdfPreviewUrl;

                            if (!values.files) {
                                const newvalidatedValue = {
                                    ...values,
                                    issued_date: format(
                                        new Date(values.issued_date),
                                        "yyyy-MM-dd"
                                    ),
                                    files: [],
                                };
                                setIsFileEmpty(true);
                                newValue = newvalidatedValue;
                            } else if (!values.images) {
                                const newvalidatedValue = {
                                    ...values,
                                    issued_date: format(
                                        new Date(values.issued_date),
                                        "yyyy-MM-dd"
                                    ),
                                    images: [],
                                };
                                setIsImageEmpty(true);
                                newValue = newvalidatedValue;
                            } else {
                                const newvalidatedValue = {
                                    ...values,
                                    issued_date: format(
                                        new Date(values.issued_date),
                                        "yyyy-MM-dd"
                                    ),
                                };
                                setIsImageEmpty(false);
                                setIsFileEmpty(false);

                                newValue = newvalidatedValue;
                            }

                            if (values.images.some((val) => val?.path)) {
                                values.images.forEach((file) => {
                                    if (file?.path)
                                        formData.append("medias", file);
                                    formData.append("media_type", "video");
                                    formData.append("placeholder", "image");
                                });
                                setIsImageEmpty(false);

                                onCreateThumbnail(formData, values, actions);
                            }
                            if (values.files.some((val) => val?.path)) {
                                values.files.forEach((file) => {
                                    // if (file?.path)
                                    fileFormData.append("medias", file);
                                    fileFormData.append("media_type", "pdf");
                                    fileFormData.append(
                                        "placeholder",
                                        "pdf-file"
                                    );
                                });
                                setIsFileEmpty(false);

                                onCreateFile(fileFormData, values, actions);
                            }
                            if (
                                values.images.some((val) => val?.path) ||
                                values.files.some((val) => val?.path)
                            ) {
                                const newData = {
                                    ...newValue,
                                    images: imageId ? imageId : [],
                                    files: fileId ? fileId : [],
                                };
                                console.log(" a very new data=", newData, data);
                                {
                                    imageId.length > 0 && fileId.length > 0
                                        ? onCreatePortfolio(newData, actions)
                                        : console.log("no", imageId, fileId);
                                }
                                //onCreatePortfolio(newData, actions);
                            } else {
                                const dataToSend = {
                                    ...values,
                                    files: [],
                                    description: values.description
                                        ? values.description
                                        : null,
                                    images: [],
                                    issued_date: values.issued_date
                                        ? format(
                                              new Date(values.issued_date),
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    credential_url: values.credential_url
                                        ? values.credential_url
                                        : null,
                                    title: values.title ? values.title : null,
                                };
                                // delete dataToSend.imagePreviewUrl;
                                console.log("datatosend=", dataToSend);
                                {
                                    editDetails && isEditProfile == true
                                        ? editMutation(formData, {
                                              onSuccess: async () => {
                                                  console.log(
                                                      "submitted values",
                                                      values
                                                  );
                                                  setShowAddPortfolioModal(
                                                      false
                                                  );
                                                  queryClient.invalidateQueries(
                                                      ["tasker-portfolio"]
                                                  );
                                                  toast.success(
                                                      "Portfolio updated successfully."
                                                  );
                                              },
                                              onError: async (error) => {
                                                  toast.error(error.message);
                                              },
                                          })
                                        : onCreatePortfolio(
                                              dataToSend,
                                              actions
                                          );
                                }
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
                                                {/* <CustomDropZone
                                                    name="files"
                                                    maxSize={200}
                                                    minSize={20}
                                                    multiple={true}
                                                    type="Pdf"
                                                    onDrop={
                                                        (formData) =>
                                                            setFieldValue(
                                                                "files",
                                                                formData.get(
                                                                    "files"
                                                                )
                                                            )
                                                        // console.log(formData.get("file"))
                                                    }
                                                /> */}
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
