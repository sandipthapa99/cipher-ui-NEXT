import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const urlValidation = Yup.string().url().required("Required field");
const fileValidation = Yup.string().nullable();

export const addPortfolioSchema = Yup.object().shape({
    title: stringReqOnly,
    description: stringReqOnly,
    credential_url: urlValidation,
    issued_date: dateValidation,
    // image: fileValidation,
    //files: fileValidation,
});

// import { CustomDropZone } from "@components/common/CustomDropZone";
// import DatePickerField from "@components/common/DateTimeField";
// import FormButton from "@components/common/FormButton";
// import InputField from "@components/common/InputField";
// import MultiFileDropzone from "@components/common/MultiFileDropzone";
// import MultiImageDropzone from "@components/common/MultiImageDropzone";
// import { useQueryClient } from "@tanstack/react-query";
// import { format, parseISO } from "date-fns";
// import { Form, Formik } from "formik";
// import { useEditForm } from "hooks/use-edit-form";
// import { useForm } from "hooks/use-form";
// import type { Dispatch, SetStateAction } from "react";
// import { useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { toast } from "react-toastify";
// import type { AddPortfolioProps } from "types/editProfile";
// import { AddPortfolioFormData } from "utils/formData";
// import { addPortfolioSchema } from "utils/formValidation/AddPortFolioFormValidation";
// import { isSubmittingClass } from "utils/helpers";
// interface AddPortfolioModalProps {
//     show?: boolean;
//     id?: number;
//     handleClose?: () => void;
//     setShowAddPortfolioModal: Dispatch<SetStateAction<boolean>>;
//     isEditProfile?: boolean;
// }
// interface EditDetailProps {
//     data: { result: AddPortfolioProps[] };
// }
// const AddPortfolio = ({
//     show,
//     handleClose,
//     setShowAddPortfolioModal,
//     id,
//     isEditProfile,
// }: AddPortfolioModalProps) => {
//     const { mutate } = useForm(`/tasker/portfolio/`);
//     const { mutate: editMutation } = useEditForm(`/tasker/portfolio/${id}/`);
//     const [imageSrc, setImageSrc] = useState();
//     const queryClient = useQueryClient();
//     const data = queryClient.getQueryData<EditDetailProps>([
//         "tasker-portfolio",
//     ]);

//     function isValidURL(str: any) {
//         const regex =
//             /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
//         if (!regex.test(str)) {
//             return false;
//         } else {
//             return true;
//         }
//     }

//     const editDetails = data?.data?.result.find((item) => item.id === id);

//     return (
//         <div>
//             {/* Modal component */}
//             <Modal show={show} onHide={handleClose} backdrop="static">
//                 <Modal.Header closeButton></Modal.Header>
//                 <div className="modal-body-content">
//                     <h3>Add Portfolio</h3>
//                     <Formik
//                         initialValues={
//                             editDetails && isEditProfile == true
//                                 ? {
//                                       ...editDetails,
//                                       issued_date: parseISO(
//                                           editDetails.issued_date
//                                       ),
//                                       //   image: editDetails.image,
//                                       //   file: editDetails.file,
//                                   }
//                                 : AddPortfolioFormData
//                         }
//                         validationSchema={addPortfolioSchema}
//                         onSubmit={async (values) => {
//                             const formData: FormData = new FormData();
//                             let newValue;
//
//                             delete values.imagePreviewUrl;

//                             if (!values.file) {
//                                 const newvalidatedValue = {
//                                     ...values,
//                                     issued_date: format(
//                                         new Date(values.issued_date),
//                                         "yyyy-MM-dd"
//                                     ),
//                                     file: "",
//                                 };
//                                 newValue = newvalidatedValue;
//                             } else if (!values.image) {
//                                 const newvalidatedValue = {
//                                     ...values,
//                                     issued_date: format(
//                                         new Date(values.issued_date),
//                                         "yyyy-MM-dd"
//                                     ),
//                                     image: [],
//                                 };
//                                 newValue = newvalidatedValue;
//                             } else {
//                                 const newvalidatedValue = {
//                                     ...values,
//                                     issued_date: format(
//                                         new Date(values.issued_date),
//                                         "yyyy-MM-dd"
//                                     ),
//                                 };

//                                 newValue = newvalidatedValue;
//                             }

//
//                             if (values.image.some((val) => val?.path)) {
//                                 values.image.forEach((file) => {
//                                     if (file?.path)
//                                         formData.append("image", file);
//                                 });
//
//                                 // onCreateThumbnail(formData, values, actions);
//                             }
//                             Object.entries(newValue).forEach((entry) => {
//                                 const [key, value] = entry;
//

//                                 if (
//                                     (entry[0] == "file" &&
//                                         isValidURL(entry[1])) ||
//                                     (entry[0] == "image" &&
//                                         isValidURL(entry[1]))
//                                 ) {
//                                     return false;
//                                 }
//                                 formData.append(key, value);
//                             });

//                             // formData.append("file", values.file);
//                             // formData.append("image", values.image);
//
//                                 "file image",
//                                 values.file,
//                                 values.image
//                             );
//                             {
//                                 editDetails && isEditProfile == true
//                                     ? editMutation(formData, {
//                                           onSuccess: async () => {
//
//                                                   "submitted values",
//                                                   values
//                                               );
//                                               setShowAddPortfolioModal(false);
//                                               queryClient.invalidateQueries([
//                                                   "tasker-portfolio",
//                                               ]);
//                                               toast.success(
//                                                   "Portfolio updated successfully."
//                                               );
//                                           },
//                                           onError: async (error) => {
//                                               toast.error(error.message);
//                                           },
//                                       })
//                                     : mutate(formData, {
//                                           onSuccess: async () => {
//
//                                                   "submitted values",
//                                                   values
//                                               );
//                                               setShowAddPortfolioModal(false);
//                                               queryClient.invalidateQueries([
//                                                   "tasker-portfolio",
//                                               ]);
//                                               toast.success(
//                                                   "Portfolio added successfully."
//                                               );
//                                           },
//                                           onError: async (error) => {
//                                               toast.error(error.message);
//                                           },
//                                       });
//                             }
//                         }}
//                     >
//                         {({ isSubmitting, errors, touched, setFieldValue }) => (
//                             <Form>
//                                 <div className="d-flex add-portfolio justify-content-between align-items-end flex-column flex-md-row">
//                                     <Row>
//                                         <h4>Title</h4>
//                                         <InputField
//                                             type="text"
//                                             name="title"
//                                             min="1"
//                                             error={errors.title}
//                                             touch={touched.title}
//                                             placeHolder="Portfolio Title"
//                                         />
//                                         <h4>Description</h4>
//                                         <InputField
//                                             as="textarea"
//                                             name="description"
//                                             min="1"
//                                             error={errors.description}
//                                             touch={touched.description}
//                                             placeHolder="Portfolio Description"
//                                         />
//                                         <h4>Issued Date</h4>
//                                         <DatePickerField
//                                             name="issued_date"
//                                             min="1"
//                                             error={errors.issued_date}
//                                             touch={touched.issued_date}
//                                             dateFormat="yyyy-MM-dd"
//                                             placeHolder="2022-03-06"
//                                         />
//                                         <h4>Credential URL</h4>
//                                         <InputField
//                                             type="url"
//                                             name="credential_url"
//                                             min="1"
//                                             error={errors.credential_url}
//                                             touch={touched.credential_url}
//                                             placeHolder="URL"
//                                         />

//                                         <Row>
//                                             <Col md={5}>
//                                                 <h4>Gallery</h4>
//                                                 <p>
//                                                     Add relevant image or video
//                                                 </p>

//                                                 {/* <CustomDropZone
//                                                     name="image"
//                                                     maxSize={200}
//                                                     minSize={20}
//                                                     onDrop={(formData) =>
//                                                         setFieldValue(
//                                                             "image",
//                                                             formData.get(
//                                                                 "image"
//                                                             )
//                                                         )
//                                                     }
//                                                 /> */}
//                                                 <MultiImageDropzone
//                                                     name="image"
//                                                     labelName="Upload your image"
//                                                     textMuted="More than 5 image are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 1MB."
//                                                     imagePreview="imagePreviewUrl"
//                                                     maxFiles={5}
//                                                     multiple
//                                                     maxSize={200}
//                                                     minSize={20}
//                                                     showFileDetail
//                                                     type="Image/Video"
//                                                     //  editImage={imageSrc}
//                                                 />
//                                             </Col>
//                                         </Row>
//                                         <Row>
//                                             <Col md={5}>
//                                                 <h4>Pdf</h4>
//                                                 <p>Add relevant pdf</p>

//                                                 <CustomDropZone
//                                                     name="file"
//                                                     maxSize={200}
//                                                     minSize={20}
//                                                     multiple={true}
//                                                     type="Pdf"
//                                                     onDrop={
//                                                         (formData) =>
//                                                             setFieldValue(
//                                                                 "file",
//                                                                 formData.get(
//                                                                     "file"
//                                                                 )
//                                                             )
//                                                         //
//                                                     }
//                                                 />
//                                             </Col>
//                                         </Row>
//                                     </Row>
//                                 </div>
//                                 <Modal.Footer>
//                                     <Button
//                                         className="btn close-btn"
//                                         onClick={handleClose}
//                                     >
//                                         Cancel
//                                     </Button>
//                                     <FormButton
//                                         type="submit"
//                                         variant="primary"
//                                         name="Add"
//                                         className="submit-btn w-25"
//                                         isSubmitting={isSubmitting}
//                                         isSubmittingClass={isSubmittingClass(
//                                             isSubmitting
//                                         )}
//                                         onClick={handleClose}
//                                     />
//                                 </Modal.Footer>
//                             </Form>
//                         )}
//                     </Formik>
//                 </div>
//             </Modal>
//         </div>
//     );
// };
// export default AddPortfolio;
