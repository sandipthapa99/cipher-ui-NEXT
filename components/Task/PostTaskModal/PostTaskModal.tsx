import { AddServiceModalComponent } from "@components/AddServices/AddServiceModalComponent";
import BigButton from "@components/common/Button";
import { CustomDropZone } from "@components/common/CustomDropZone";
import MantineDateField from "@components/common/MantineDateField";
import MantineInputField from "@components/common/MantineInputField";
import MultiFileDropzone from "@components/common/MultiFileDropzone";
import MultiFileDropzoneDuplicate from "@components/common/MultiFileDropzoneDuplicate";
import { RichText } from "@components/RichText";
import {
    postServiceSchema,
    postTaskSchema,
} from "@components/Task/PostTaskModal/postTaskSchema";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import type { TaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { SelectTaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { ServiceOptions } from "@components/Task/PostTaskModal/ServiceOptions";
import { TaskBudget } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskCurrency } from "@components/Task/PostTaskModal/TaskCurrency";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import { faCalendarDays } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingOverlay, Radio } from "@mantine/core";
import {
    Anchor,
    Box,
    Checkbox,
    Modal,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { MIME_TYPES } from "@mantine/dropzone";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format, parseISO } from "date-fns";
import type { FormikErrors, FormikTouched } from "formik";
import { Form, Formik } from "formik";
import { useSerivceEntity } from "hooks/service/use-service-entity";
import { useEditTask } from "hooks/task/use-edit-task";
import { usePostTask } from "hooks/task/use-post-task";
import { useData } from "hooks/use-data";
import { useEntityService } from "hooks/use-entity-service";
import { useUploadFile } from "hooks/use-upload-file";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useEditTaskDetail } from "store/use-edit-task";
import {
    usePostTaskserviceId,
    usePostTaskserviceType,
    useShowPostTaskModal,
    useToggleShowPostTaskModal,
} from "store/use-show-post-task";
import { useToggleSuccessModal } from "store/use-success-modal";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITask } from "types/task";
import { convertTimeStringToDateString } from "utils/formatTime";
import { toast } from "utils/toast";

export interface PostTaskPayload {
    title: string;
    description: string;
    highlights: string[];
    service: string;
    city: string;
    location: TaskType;
    currency: string;
    budget_type: string;
    budget_from?: number | string | null;
    budget_to: number | string;
    is_negotiable: boolean;
    images: any[];
    imagePreviewUrl: any[];
    videos: any[];
    videoPreviewUrl: any[];
    estimated_time: number;
    is_recursion: boolean;
    is_requested: boolean;
    is_everyday: boolean;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    is_active: boolean;
    share_location: boolean;
}

export const PostTaskModal = () => {
    const toggleSuccessModal = useToggleSuccessModal();
    // const { mutate: createTaskMutation, isLoading: createTaskLoading } =
    //     usePostTask();

    // const { mutate: editTaskMutation, isLoading: editTaskLoading } =
    //     useEditTask();

    const showPostTaskserviceType = usePostTaskserviceType();
    console.log(
        "🚀 ~ file: PostTaskModal.tsx:99 ~ PostTaskModal ~ showPostTaskserviceType",
        showPostTaskserviceType
    );

    const entityServiceId = usePostTaskserviceId();
    console.log(
        "🚀 ~ file: PostTaskModal.tsx:102 ~ PostTaskModal ~ entityServiceId",
        entityServiceId
    );

    const [is_requested, setIs_requested] = useState<"true" | "false">(
        showPostTaskserviceType ?? "true"
    );
    console.log(
        "🚀 ~ file: PostTaskModal.tsx:109 ~ PostTaskModal ~ is_requested",
        is_requested
    );

    useEffect(() => {
        if (showPostTaskserviceType) {
            setIs_requested(showPostTaskserviceType);
        }
    }, [showPostTaskserviceType]);

    const { mutate, isLoading } = useEntityService(is_requested);
    const showPostTaskModal = useShowPostTaskModal();

    const toggleShowPostTaskModal = useToggleShowPostTaskModal();

    const handleCloseModal = () => {
        toggleShowPostTaskModal();
    };

    const { data: entityServiceData } = useData<ITask>(
        ["get-entity-serviceser", entityServiceId],
        `${urls.task.list}${entityServiceId}/`,
        !!entityServiceId
    );

    const entityService = entityServiceData?.data;
    console.log(
        "🚀 ~ file: PostTaskModal.tsx:138 ~ PostTaskModal ~ entityService",
        entityService
    );

    const [termsAccepted, setTermsAccepted] = useState(true);

    const { mutateAsync: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();

    const isCreateTaskLoading = isLoading || uploadFileLoading;

    return (
        <>
            <LoadingOverlay
                visible={isCreateTaskLoading}
                sx={{ position: "fixed", inset: 0 }}
            />

            <Modal
                opened={!isCreateTaskLoading && showPostTaskModal}
                onClose={handleCloseModal}
                closeOnClickOutside={false}
                overlayOpacity={0.55}
                overlayBlur={3}
                title="Post a Task or Service"
                size="xl"
            >
                <div className="choose-email-or-phone mb-5">
                    <Radio.Group
                        label="Please select task or service which you want to post "
                        onChange={(value: "true" | "false") =>
                            setIs_requested(value)
                        }
                        size="sm"
                        defaultValue={is_requested}
                    >
                        <Radio value="true" label="Post Task" />
                        <Radio value="false" label="Post Service" />
                    </Radio.Group>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        title: entityService ? entityService.title : "",
                        description: entityService
                            ? entityService.description
                            : "",
                        //   highlights: taskDetail ? initialHighlights : [],
                        highlights: [],
                        city: entityService
                            ? String(entityService?.city?.id)
                            : "",
                        location: entityService
                            ? (entityService.location as TaskType)
                            : "remote",
                        budget_type: "Project",
                        budget_from: entityService
                            ? Number(entityService.budget_from)
                            : "",
                        budget_to: entityService
                            ? Number(entityService.budget_to)
                            : "",
                        service: entityService
                            ? entityService?.service?.id ?? ({} as any)
                            : "",
                        is_negotiable: false,
                        estimated_time: 5,
                        is_recursion: false,
                        is_requested: true,
                        is_everyday: false,
                        start_date: entityService?.start_date
                            ? parseISO(entityService?.start_date)
                            : null,
                        end_date: entityService?.end_date
                            ? parseISO(entityService?.end_date)
                            : null,
                        start_time: entityService?.start_time
                            ? entityService?.start_time
                            : null,
                        end_time: entityService?.end_time
                            ? entityService?.end_time
                            : null,
                        currency: entityService
                            ? String(entityService?.currency?.code)
                            : "NPR",
                        images: (entityService?.images as any[]) ?? [],
                        imagePreviewUrl: entityService?.images as any[],
                        videos: (entityService?.videos as any[]) ?? [],
                        videoPreviewUrl: entityService?.videos as any[],
                        is_active: true,
                        share_location: true,
                    }}
                    validationSchema={postServiceSchema}
                    onSubmit={async (values, actions) => {
                        let newUploadImageID: number[] = [];
                        if (values.images.some((val) => val?.path)) {
                            const uploadedImageIds = await uploadFileMutation({
                                files: values?.images.filter(
                                    (val) => val?.path
                                ) as unknown as string,
                                media_type: "image",
                            });
                            newUploadImageID = uploadedImageIds;
                        }

                        let newUploadVideoID: number[] = [];
                        if (values.images.some((val) => val?.path)) {
                            const uploadedVideosIds = await uploadFileMutation({
                                files: values?.images.filter(
                                    (val) => val?.path
                                ) as unknown as string,
                                media_type: "image",
                            });
                            newUploadVideoID = uploadedVideosIds;
                        }

                        const imageIds = values?.images
                            .filter((val) => !val?.path)
                            .map((val) => val.id);
                        const videoIds = values?.images
                            .filter((val) => !val?.path)
                            .map((val) => val.id);

                        const imagesIds = [...imageIds, ...newUploadImageID];
                        const videosIds = [...videoIds, ...newUploadVideoID];

                        const postTaskPayload = {
                            ...values,
                            highlights: values.highlights,
                            images: imagesIds,
                            videos: videosIds,
                            start_date: format(
                                new Date(String(values.start_date)),
                                "yyyy-MM-dd"
                            ),
                            end_date: format(
                                new Date(String(values.end_date)),
                                "yyyy-MM-dd"
                            ),
                            start_time: format(
                                new Date(
                                    convertTimeStringToDateString(
                                        String(values.start_time)
                                    )
                                ),
                                "hh:mm aa"
                            ),
                            end_time: format(
                                new Date(
                                    convertTimeStringToDateString(
                                        String(values.start_time)
                                    )
                                ),
                                "hh:mm aa"
                            ),
                            extra_data: [],
                        };
                        mutate(
                            {
                                id: String(entityServiceId),
                                data: postTaskPayload,
                            },
                            {
                                onSuccess: () => {
                                    toggleSuccessModal(
                                        "Task Updated Successfully"
                                    );
                                    actions.resetForm();

                                    // queryClient.invalidateQueries([
                                    //     ReactQueryKeys.TASK_DETAIL,
                                    //     taskId,
                                    // ]);

                                    // queryClient.invalidateQueries([
                                    //     ReactQueryKeys.TASKS,
                                    // ]);
                                    // queryClient.setQueryData(
                                    //     ["task-detail"],
                                    //     taskId
                                    // );
                                    // setshowPostModel(false);
                                },
                                onError: () => {
                                    toggleSuccessModal("Failed");
                                },
                            }
                        );
                    }}
                >
                    {({
                        getFieldProps,
                        values,
                        setFieldValue,
                        setFieldTouched,
                        errors,
                        setFieldError,
                        touched,
                    }) => (
                        <Form encType="multipart/formData">
                            <Stack spacing="md">
                                <MantineInputField
                                    name="title"
                                    labelName={"Title"}
                                    placeHolder={"Enter your title"}
                                />

                                <RichText
                                    {...getFieldProps("description")}
                                    value={values.description ?? ""}
                                    onChange={(value) =>
                                        setFieldValue("description", value)
                                    }
                                    placeholder="Enter your description"
                                    aria-errormessage="123"
                                />
                                <TaskRequirements
                                    initialRequirements={[]}
                                    onRequirementsChange={(requirements) =>
                                        setFieldValue(
                                            "highlights",
                                            requirements
                                        )
                                    }
                                    error={errors.highlights}
                                    {...getFieldProps("highlights")}
                                    labelName="Requirements"
                                    description="This helps the tasker understand about your task better"
                                />
                                <Row>
                                    <Col md={6}>
                                        <MantineDateField
                                            name="start_date"
                                            labelName="Start Date"
                                            placeHolder="Select Start Date"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            minDate={new Date()}
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "start_date",
                                                    value
                                                );
                                            }}
                                        />
                                    </Col>

                                    <Col md={6}>
                                        <MantineDateField
                                            name="end_date"
                                            labelName="End Date"
                                            placeHolder="Select End Date"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            minDate={new Date()}
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "end_date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <TimeInput
                                            name="start_time"
                                            label="Start time"
                                            format="12"
                                            onChange={(value) => {
                                                setFieldValue(
                                                    "start_time",
                                                    value
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <TimeInput
                                            name="end_time"
                                            label="End time"
                                            format="12"
                                            onChange={(value) => {
                                                setFieldValue(
                                                    "end_time",
                                                    value
                                                );
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <SelectCity
                                    name="city"
                                    onCitySelect={(cityId) =>
                                        setFieldValue("city", cityId)
                                    }
                                    value={
                                        entityService ? entityService?.city : ""
                                    }
                                />
                                <ServiceOptions
                                    onServiceChange={(service) =>
                                        setFieldValue("service", service)
                                    }
                                    name={"service"}
                                    error={errors.service}
                                />
                                <SelectTaskType
                                    setFieldValue={setFieldValue}
                                    name="location"
                                    onTypeChange={(type) =>
                                        setFieldValue("location", type)
                                    }
                                    location={values.location}
                                    error={errors.location}
                                />
                                <TaskCurrency
                                    value={
                                        entityService
                                            ? entityService?.currency?.code?.toString()
                                            : ""
                                    }
                                    name={"currency"}
                                    data={
                                        entityService?.currency
                                            ? [
                                                  {
                                                      label: entityService
                                                          ?.currency?.name,
                                                      value: entityService?.currency?.code.toString(),
                                                  },
                                              ]
                                            : []
                                    }
                                    onCurrencyChange={(currencyId) =>
                                        setFieldValue("currency", currencyId)
                                    }
                                    error={errors.currency}
                                />
                                <TaskBudget
                                    initialBudgetFrom={
                                        values.budget_from as number
                                    }
                                    initialBudgetTo={values.budget_to as number}
                                    initialbudgetType={values.budget_type}
                                    setFieldValue={setFieldValue}
                                    setFieldError={setFieldError}
                                    setFieldTouched={setFieldTouched}
                                    touched={
                                        touched as FormikTouched<PostTaskPayload>
                                    }
                                    errors={
                                        errors as FormikErrors<PostTaskPayload>
                                    }
                                />
                                <Checkbox
                                    defaultChecked={
                                        entityService?.is_negotiable
                                    }
                                    label="Yes, it is negotiable."
                                    {...getFieldProps("is_negotiable")}
                                />
                                <Stack sx={{ maxWidth: "40rem" }}>
                                    <Title order={6}>Images</Title>
                                    <Text color="dimmed" size="sm">
                                        Including images helps you find best
                                        merchant for your task.
                                    </Text>

                                    <MultiFileDropzone
                                        name="images"
                                        labelName="Upload your images"
                                        textMuted="More than 5 images are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 4MB."
                                        error={errors.images as string}
                                        touch={touched.images as boolean}
                                        imagePreview="imagePreviewUrl"
                                        maxFiles={5}
                                        maxSize={4}
                                        multiple
                                        showFileDetail
                                    />
                                </Stack>
                                <Stack sx={{ maxWidth: "40rem" }}>
                                    <Title order={6}>Videos</Title>
                                    <MultiFileDropzone
                                        name="videos"
                                        labelName="Upload your Video"
                                        textMuted="More than 5 images are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 4MB."
                                        error={errors.videos as string}
                                        touch={touched.videos as boolean}
                                        imagePreview="videoPreviewUrl"
                                        accept={["video/mp4"]}
                                        maxFiles={2}
                                        maxSize={100}
                                        multiple
                                        showFileDetail
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
                                            <Link
                                                passHref
                                                href="/terms-and-conditions"
                                            >
                                                <Anchor>
                                                    Terms and Conditions
                                                </Anchor>
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
                                        btnTitle="Post Task"
                                        backgroundColor="#211D4F"
                                    />
                                </Box>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};
