import BigButton from "@components/common/Button";
import { CustomDropZone } from "@components/common/CustomDropZone";
import { postTaskSchema } from "@components/Task/PostTaskModal/postTaskSchema";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import type { TaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { SelectTaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { ServiceOptions } from "@components/Task/PostTaskModal/ServiceOptions";
import { BudgetType } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskBudget } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskCurrency } from "@components/Task/PostTaskModal/TaskCurrency";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import {
    Anchor,
    Box,
    Checkbox,
    LoadingOverlay,
    Modal,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEditTask } from "hooks/task/use-edit-task";
import { usePostTask } from "hooks/task/use-post-task";
import { useUploadFile } from "hooks/use-upload-file";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    usePostTaskModalType,
    useShowPostTaskModal,
    useToggleShowPostTaskModal,
} from "store/use-show-post-task";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { ITask } from "types/task";

export interface PostTaskPayload {
    title: string;
    description: string;
    highlights: Record<string, string>;
    service: string;
    city: string;
    location: TaskType;
    currency: string;
    budget_type: BudgetType;
    budget_from: number;
    budget_to: number;
    is_negotiable: boolean;
    images: string;
    videos: string;
    estimated_time: number;
    is_recursion: boolean;
    is_requested: boolean;
    is_everyday: boolean;
    // start_date: string;
    // end_date: string;
    // start_time: string;
    // end_time: string;
    is_active: boolean;
    share_location: boolean;
}

export const AddServiceModalComponent = () => {
    const [choosedValue, setChoosedValue] = useState("task");
    const toggleSuccessModal = useToggleSuccessModal();
    const queryClient = useQueryClient();
    const { mutate: createTaskMutation, isLoading: createTaskLoading } =
        usePostTask();
    const showPostTaskModalType = usePostTaskModalType();
    const showPostTaskModal = useShowPostTaskModal();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const router = useRouter();

    const taskSlug = router.query?.slug;
    const taskDetail =
        showPostTaskModalType === "EDIT"
            ? queryClient.getQueryData<ITask>(["task-detail", taskSlug])
            : undefined;

    const [termsAccepted, setTermsAccepted] = useState(true);
    const { mutateAsync: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();

    const createServiceLoading = createTaskLoading || uploadFileLoading;

    const formik = useFormik<PostTaskPayload>({
        initialValues: {
            title: taskDetail ? taskDetail.title : "",
            description: taskDetail ? taskDetail.description : "",
            highlights: taskDetail ? taskDetail.highlights : {},
            city: "",
            location: "remote",
            budget_type: BudgetType.FIXED,
            budget_from: 0.0,
            budget_to: 0.0,
            service: "",
            is_negotiable: false,
            estimated_time: 5,
            is_recursion: false,
            is_requested: false,
            is_everyday: false,
            // start_date: "",
            // end_date: "",
            // start_time: "",
            // end_time: "",
            currency: "",
            images: "",
            videos: "",
            is_active: true,
            share_location: true,
        },
        enableReinitialize: true,
        validationSchema: postTaskSchema,
        onSubmit: async (values, action) => {
            if (!termsAccepted) {
                toast.error(
                    "You must accept the terms and conditions before posting a task"
                );
                return;
            }
            const imageIds = await uploadFileMutation({
                files: values.images,
                media_type: "image",
            });
            const videoIds = await uploadFileMutation({
                files: values.videos,
                media_type: "video",
            });
            const postTaskPayload = {
                ...values,
                images: imageIds,
                videos: videoIds,
                extra_data: [],
            };

            createTaskMutation(postTaskPayload, {
                onSuccess: async ({ message }) => {
                    handleCloseModal();
                    action.resetForm();
                    toggleSuccessModal();
                    // toast.success(message);
                    await queryClient.invalidateQueries(["all-tasks"]);
                    await queryClient.invalidateQueries(["notification"]);
                    // router.push({ pathname: "/task" });
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        },
    });

    const {
        getFieldProps,
        handleSubmit,
        touched,
        errors,
        values,
        setFieldValue,
    } = formik;
    const getFieldError = (key: keyof PostTaskPayload) =>
        touched[key] && errors[key] ? (errors[key] as string) : null;

    const handleCloseModal = () => {
        formik.resetForm();
        toggleShowPostTaskModal("CREATE");
        setChoosedValue("task");
    };
    const isCreateTaskLoading = createTaskLoading || uploadFileLoading;
    return (
        <>
            <LoadingOverlay
                visible={isCreateTaskLoading}
                sx={{ position: "fixed", inset: 0 }}
            />

            <form encType="multipart/formData" onSubmit={handleSubmit}>
                <Stack spacing="md">
                    <TextInput
                        placeholder="Enter your title"
                        label="Title"
                        required
                        {...getFieldProps("title")}
                        error={getFieldError("title")}
                    />
                    <Textarea
                        label="Service Description"
                        placeholder="Enter your description"
                        minRows={5}
                        required
                        {...getFieldProps("description")}
                        error={getFieldError("description")}
                    />
                    <TaskRequirements
                        initialRequirements={taskDetail?.highlights ?? {}}
                        onRequirementsChange={(requirements) =>
                            setFieldValue("highlights", requirements)
                        }
                        error={getFieldError("highlights")}
                        {...getFieldProps("highlights")}
                        labelName="Highlights"
                        description="This helps clients to find about your service highlights"
                    />
                    <TaskCurrency
                        value={
                            taskDetail
                                ? taskDetail?.currency?.id?.toString()
                                : ""
                        }
                        onCurrencyChange={(currencyId) =>
                            setFieldValue("currency", currencyId)
                        }
                        error={getFieldError("currency")}
                    />
                    <SelectCity
                        onCitySelect={(cityId) => setFieldValue("city", cityId)}
                    />

                    <ServiceOptions
                        {...getFieldProps("service")}
                        onServiceChange={(service) =>
                            setFieldValue("service", service)
                        }
                        error={getFieldError("service")}
                        value={
                            taskDetail
                                ? taskDetail?.category?.id?.toString()
                                : ""
                        }
                    />
                    <SelectTaskType
                        location={values.location}
                        setFieldValue={setFieldValue}
                        onTypeChange={(type) => setFieldValue("location", type)}
                        {...getFieldProps("location")}
                        error={getFieldError("location")}
                    />
                    <TaskBudget
                        initialBudgetFrom={taskDetail?.budget_from}
                        initialBudgetTo={taskDetail?.budget_to}
                        {...formik}
                    />
                    <Checkbox
                        defaultChecked={taskDetail?.is_negotiable}
                        label="Yes, it is negotiable."
                        {...getFieldProps("is_negotiable")}
                    />
                    <Stack sx={{ maxWidth: "40rem" }}>
                        <Title order={6}>Images</Title>
                        <Text color="dimmed" size="sm">
                            Including images helps you find best merchant for
                            your task.
                        </Text>
                        <CustomDropZone
                            accept={IMAGE_MIME_TYPE}
                            fileType="image"
                            sx={{ maxWidth: "30rem" }}
                            name="task-image"
                            onDrop={(images) => setFieldValue("images", images)}
                        />
                    </Stack>
                    <Stack sx={{ maxWidth: "40rem" }}>
                        <Title order={6}>Videos</Title>
                        <Text color="dimmed" size="sm">
                            Including images or videos helps you find best
                            merchant for your task.
                        </Text>
                        <CustomDropZone
                            accept={[MIME_TYPES.mp4]}
                            fileType="video"
                            name="task-video"
                            onDrop={(videos) => setFieldValue("videos", videos)}
                        />
                    </Stack>
                    <Checkbox
                        label="is active"
                        name="is_active"
                        defaultChecked={true}
                        onChange={(event) =>
                            setFieldValue(
                                "is_active",
                                event.currentTarget.checked
                            )
                        }
                    />
                    {/* <TaskDate setFieldValue={setFieldValue} /> */}
                    <Checkbox
                        checked={termsAccepted}
                        onChange={(event) =>
                            setTermsAccepted(event.target.checked)
                        }
                        label={
                            <Text>
                                Accept all{" "}
                                <Link passHref href="/terms-and-conditions">
                                    <Anchor>Terms and Conditions</Anchor>
                                </Link>
                            </Text>
                        }
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                        }}
                    >
                        <Button
                            onClick={handleCloseModal}
                            className="close-btn close-btn-mod btn p-3 h-25"
                        >
                            Cancel
                        </Button>
                        <BigButton
                            type="submit"
                            className="close-btn btn p-3 h-25 text-white"
                            btnTitle="Post Service"
                            backgroundColor="#211D4F"
                        />
                    </Box>
                </Stack>
            </form>
        </>
    );
};

// import FormButton from "@components/common/FormButton";
// import InputField from "@components/common/InputField";
// import MultiFileDropzone from "@components/common/MultiFileDropzone";
// import SelectInputField from "@components/common/SelectInputField";
// import AddRequirements from "@components/PostTask/AddRequirements";
// import type { SelectItem } from "@mantine/core";
// import { Checkbox } from "@mantine/core";
// import { Select } from "@mantine/core";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import type { FormikHelpers } from "formik";
// import { Form, Formik } from "formik";
// import { useGetProfile } from "hooks/profile/useGetProfile";
// import { useCities } from "hooks/use-cities";
// import { useForm } from "hooks/use-form";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { Button, Col, FormCheck, Row } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useToggleShowPostTaskModal } from "store/use-show-post-task";
// import { useToggleSuccessModal } from "store/use-success-modal";
// import type { ServicePostProps } from "types/serviceCard";
// import { axiosClient } from "utils/axiosClient";
// import { ServicePostData } from "utils/formData";
// import { addServiceFormSchema } from "utils/formValidation/addServiceFormValidation";
// import { isSubmittingClass } from "utils/helpers";

// interface serviceModalProps {
//     handleClose: () => void;
// }

// export const AddServiceModalComponent = ({
//     handleClose,
// }: serviceModalProps) => {
//     const { data: profileDetails } = useGetProfile();
//     const toogleShowPostTaskModal = useToggleShowPostTaskModal();
//     const router = useRouter();
//     const [value, setValue] = useState("");
//     const [query, setQuery] = useState("");
//     const options = [
//         {
//             id: 1,
//             value: 1,
//             label: "Hourly",
//         },
//         {
//             id: 2,
//             value: 2,
//             label: "Monthly",
//         },
//         {
//             id: 3,
//             value: 3,
//             label: "Fixed",
//         },
//     ];
//     const BudgetType = [
//         {
//             id: 1,
//             value: "Hourly",
//             label: "Hourly",
//         },
//         {
//             id: 2,
//             value: "Monthly",
//             label: "Monthly",
//         },
//         {
//             id: 3,
//             value: "Fixed",
//             label: "Fixed",
//         },
//     ];

//     const DiscountType = [
//         {
//             id: 1,
//             value: "Percentage",
//             label: "Percentage",
//         },
//         {
//             id: 2,
//             value: "Amount",
//             label: "Amount",
//         },
//     ];

//     const [showVariable, setShowVariable] = useState({
//         showBudget: false,
//         showTime: false,
//     });

//     const [checked, setChecked] = useState(false);

//     //queryclient
//     const queryClient = useQueryClient();

//     //Authorization cannot be send through get static props. So service category options fetched here
//     const { data: serviceCategoryOptions } = useQuery(
//         ["service-category"],
//         async () => {
//             const response = await axiosClient.get(
//                 "/task/cms/task-category/list/"
//             );
//             return response.data;
//         }
//     );

//     const { data: currencyOptionsData } = useQuery(
//         ["currency-options"],
//         async () => {
//             const response = await axiosClient.get("/locale/currency/options/");
//             return response.data;
//         }
//     );
//     const { data: cities } = useCities(query);
//     const [serviceCategory, setServiceCategory] = useState<string | null>(null);

//     const renderCityOptions = cities?.map((item: any) => {
//         return {
//             id: item?.id,
//             value: item?.id,
//             label: item?.name,
//         };
//     });

//     const renderCurrencyOptions = currencyOptionsData?.map((item: any) => {
//         return {
//             value: item?.id,
//             label: item?.code,
//         };
//     });

//     const handleCategoryChanged = (
//         id: string | null,
//         setFieldValue: (field: string, value: any) => void
//     ) => {
//         setServiceCategory(id);
//         if (id) setFieldValue("category", parseInt(id));
//     };

//     const renderCategoryOptions: SelectItem[] = serviceCategoryOptions?.map(
//         (item: any) => {
//             return {
//                 id: item?.id,
//                 value: item?.id,
//                 label: item?.name,
//             };
//         }
//     );

//     const handleChange = () => {
//         setChecked(!checked);
//     };

//     const serviceImageMutation = useForm("/task/filestore/");
//     const serviceMutation = useForm("/task/service/");

//     const onCreateThumbnail = (
//         formData: FormData,
//         values: ServicePostProps,
//         actions: FormikHelpers<ServicePostProps>
//     ) =>
//         serviceImageMutation.mutate(formData, {
//             onSuccess: (data: any) => {
//                 const getImagesId = values?.images
//                     .filter((val) => !val.path)
//                     .map((val) => val?.id);
//                 const dataToSend = {
//                     ...JSON.parse(JSON.stringify(values)),
//                     budget_to: values.budget_to ? values.budget_to : null,
//                     discount_value: values.discount_value
//                         ? values.discount_value
//                         : null,
//                     images: Object.values(data.data),
//                     highlights: JSON.stringify(values.highlights),
//                 };

//                 console.log("data to send", dataToSend);
//                 delete dataToSend.imagePreviewUrl;
//                 delete dataToSend.highlights_list;
//                 delete dataToSend.is_discount_offer;
//                 delete dataToSend.budget_select;

//                 onCreateService(dataToSend, actions);
//             },
//             onError: (error) => {
//                 error.message;
//             },
//         });

//     const onCreateService = (
//         data: any,
//         actions: FormikHelpers<ServicePostProps>
//     ) => {
//         serviceMutation.mutate(data, {
//             onSuccess: (data: any) => {
//                 toggleSuccessModal();
//                 toogleShowPostTaskModal();
//                 queryClient.invalidateQueries(["all-services"]);

//                 actions.resetForm();
//             },
//             onError: (error: any) => {
//                 const {
//                     data: { message },
//                 } = error.response;
//             },
//         });
//     };

//     const toggleSuccessModal = useToggleSuccessModal();
//     return (
//         <div className="service-details">
//             <Formik
//                 initialValues={ServicePostData}
//                 validationSchema={addServiceFormSchema}
//                 onSubmit={(values, actions) => {
//                     if (profileDetails) {
//                         const formData = new FormData();

//                         if (values.images.some((val) => val?.path)) {
//                             values.images.forEach((file) => {
//                                 if (file?.path) formData.append("medias", file);
//                                 formData.append("media_type", "image");
//                                 formData.append("placeholder", "new image");
//                             });
//                             onCreateThumbnail(formData, values, actions);
//                         } else {
//                             const getImagesId = values?.images.map(
//                                 (val) => val?.id
//                             );
//                             const dataToSend = {
//                                 ...JSON.parse(JSON.stringify(values)),
//                                 budget_to: values.budget_to
//                                     ? values.budget_to
//                                     : null,
//                                 discount_value: values.discount_value
//                                     ? values.discount_value
//                                     : null,
//                                 images: getImagesId,
//                                 highlights: values.highlights
//                                     ? JSON.stringify(values.highlights)
//                                     : null,
//                             };
//                             delete dataToSend.imagePreviewUrl;
//                             delete dataToSend.highlights_list;
//                             delete dataToSend.is_discount_offer;
//                             delete dataToSend.budget_select;

//                             onCreateService(dataToSend, actions);
//                             console.log("data to send", dataToSend);
//                         }
//                     } else {
//                         toogleShowPostTaskModal();
//                         router.push("/settings/account/individual");
//                         toast.error(
//                             "Please Create a profile to post a service"
//                         );
//                     }
//                 }}
//             >
//                 {({ setFieldValue, errors, touched, isSubmitting, values }) => (
//                     <>
//                         <Form>
//                             <InputField
//                                 labelName="Title"
//                                 placeHolder="service title"
//                                 name="title"
//                                 error={errors.title}
//                                 touch={touched.title}
//                                 fieldRequired
//                             />
//                             <InputField
//                                 labelName="Description"
//                                 placeHolder="Service Description"
//                                 name="description"
//                                 as="textarea"
//                                 error={errors.description}
//                                 touch={touched.description}
//                                 fieldRequired
//                             />

//                             <Select
//                                 label="Category"
//                                 placeholder="Pick one"
//                                 name="category"
//                                 searchable
//                                 nothingFound="No options"
//                                 value={serviceCategory}
//                                 onChange={(value) =>
//                                     handleCategoryChanged(value, setFieldValue)
//                                 }
//                                 data={renderCategoryOptions ?? []}
//                             />

//                             <h4>Budget</h4>
//                             <span className="d-flex mb-4">
//                                 <FormCheck
//                                     type="radio"
//                                     name="budget"
//                                     label="Fixed"
//                                     className="me-3"
//                                     onChange={() =>
//                                         setShowVariable((prev) => {
//                                             return {
//                                                 ...prev,
//                                                 showBudget: false,
//                                             };
//                                         })
//                                     }
//                                     defaultChecked
//                                 />
//                                 <FormCheck
//                                     type="radio"
//                                     name="budget"
//                                     label="Variable"
//                                     className="mb-8"
//                                     onChange={() =>
//                                         setShowVariable((prev) => {
//                                             return {
//                                                 ...prev,
//                                                 showBudget: true,
//                                             };
//                                         })
//                                     }
//                                 />
//                             </span>
//                             <Row className="gx-5">
//                                 <Col md={4}>
//                                     <Select
//                                         placeholder="choose currency"
//                                         name="currency"
//                                         error={errors.currency}
//                                         searchable
//                                         data={renderCurrencyOptions ?? []}
//                                         onChange={(value) =>
//                                             setFieldValue("currency", value)
//                                         }
//                                     />
//                                 </Col>
//                                 <Col md={4}>
//                                     <InputField
//                                         type="text"
//                                         name="budget_from"
//                                         error={errors.budget_from}
//                                         touch={touched.budget_from}
//                                         fieldRequired
//                                         className="mb-0"
//                                         placeHolder={
//                                             showVariable.showBudget
//                                                 ? "Budget From"
//                                                 : "Enter your Budget"
//                                         }
//                                     />
//                                 </Col>
//                                 {showVariable.showBudget && (
//                                     <Col md={4} classNam="mt-2">
//                                         <InputField
//                                             type="text"
//                                             name="budget_to"
//                                             error={errors.budget_to}
//                                             touch={touched.budget_to}
//                                             fieldRequired
//                                             className="mb-0"
//                                             placeHolder="Budget to"
//                                         />
//                                     </Col>
//                                 )}

//                                 <Col md={4}>
//                                     <Select
//                                         placeholder="Fixed"
//                                         name="budget_type"
//                                         data={BudgetType ?? []}
//                                         defaultValue="Fixed"
//                                         onChange={(value) =>
//                                             setFieldValue("budget_type", value)
//                                         }
//                                     />
//                                 </Col>
//                             </Row>

//                             <div className="checkbox">
//                                 <input
//                                     type="checkbox"
//                                     checked={checked}
//                                     onChange={handleChange}
//                                 />
//                                 Add Discount & offers
//                             </div>

//                             {checked && (
//                                 <Row>
//                                     <Col md={6} sm={12}>
//                                         <InputField
//                                             name="discount_value"
//                                             labelName="discount_value"
//                                             placeHolder="discount_value"
//                                             error={errors.discount_value}
//                                             touch={touched.discount_value}
//                                         />
//                                     </Col>
//                                     <Col md={6} sm={12}>
//                                         <SelectInputField
//                                             name="discount_type"
//                                             labelName="Discount Type"
//                                             placeholder="select discount type"
//                                             error={errors.discount_type}
//                                             touch={touched.discount_type}
//                                             options={DiscountType}
//                                         />
//                                     </Col>
//                                 </Row>
//                             )}
//                             <InputField
//                                 labelName="Location"
//                                 placeHolder="e.g. Buddhanagar"
//                                 name="location"
//                                 error={errors.location}
//                                 touch={touched.location}
//                             />
//                             <Select
//                                 value={value}
//                                 name="city"
//                                 label="city"
//                                 searchable
//                                 onSearchChange={(search) => setQuery(search)}
//                                 placeholder="Select City"
//                                 data={renderCityOptions ?? []}
//                                 onChange={(value) => {
//                                     if (value) {
//                                         setFieldValue("city", value);
//                                         setValue(value);
//                                     }
//                                 }}
//                             />
//                             <AddRequirements
//                                 onSubmit={(value) =>
//                                     setFieldValue("highlights", value)
//                                 }
//                                 title="Highligits"
//                                 placeHolder="e.g.Bring something"
//                                 description="Add services which you Offer"
//                             />

//                             <InputField
//                                 labelName="Video URL"
//                                 placeHolder="e.g. https://www.youtube.com/jirIbhruHHHb"
//                                 name="video"
//                                 error={errors.video}
//                                 touch={touched.video}
//                             />
//                             <MultiFileDropzone
//                                 name="images"
//                                 labelName="Upload your images"
//                                 textMuted="More than 5 images are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 1MB."
//                                 error={
//                                     values?.images.length > 0
//                                         ? undefined
//                                         : (errors.images as string)
//                                 }
//                                 touch={touched.images as boolean}
//                                 imagePreview="imagePreviewUrl"
//                                 maxFiles={5}
//                                 multiple
//                                 showFileDetail
//                             />

//                             <Checkbox
//                                 label="is active"
//                                 name="is_active"
//                                 defaultChecked={true}
//                                 onChange={(event) =>
//                                     setFieldValue(
//                                         "is_active",
//                                         event.currentTarget.checked
//                                     )
//                                 }
//                             />

//                             <div className="d-flex justify-content-center">
//                                 <Button
//                                     className="btn close-btn p-3 h-25 w-25"
//                                     onClick={handleClose}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <FormButton
//                                     type="submit"
//                                     variant="primary"
//                                     name="Apply"
//                                     className="submit-btn w-25 ms-3"
//                                     isSubmitting={isSubmitting}
//                                     isSubmittingClass={isSubmittingClass(
//                                         isSubmitting
//                                     )}
//                                 />
//                             </div>
//                         </Form>
//                     </>
//                 )}
//             </Formik>
//         </div>
//     );
// };
