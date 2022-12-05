import BigButton from "@components/common/Button";
import { CustomDropZone } from "@components/common/CustomDropZone";
import { RichText } from "@components/RichText";
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
    TextInput,
    Title,
} from "@mantine/core";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useFormik } from "formik";
import { useEditService } from "hooks/service/use-edit-service";
import { useUploadFile } from "hooks/use-upload-file";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { ServicesValueProps } from "types/serviceCard";
import { safeParse } from "utils/safeParse";
import { toast } from "utils/toast";

interface EditServiceProps {
    showEditModal: boolean;
    handleClose: () => void;
    serviceDetail: ServicesValueProps["result"][0];
}

export interface EditServicePayload {
    title: string;
    description: string;
    highlights: string[];
    service: string;
    city: string;
    location: TaskType;
    currency: number;
    budget_type: BudgetType;
    budget_from: number;
    budget_to: number;
    is_negotiable: boolean;
    images: "";
    videos: "";
    estimated_time: number;
    is_recursion: boolean;
    is_requested: boolean;
    is_everyday: boolean;
    is_active: boolean;
    share_location: boolean;
}

export const EditService = ({
    showEditModal,
    handleClose,
    serviceDetail,
}: EditServiceProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const { mutate: editServiceMutation, isLoading: editServiceLoading } =
        useEditService();

    const getInitialImageIds = useCallback(
        () => (serviceDetail?.images ?? []).map((image) => image.id),
        [serviceDetail?.images]
    );
    const getInitialVideoIds = useCallback(
        () => (serviceDetail?.videos ?? []).map((video) => video.id),
        [serviceDetail?.videos]
    );

    const [initialImageIds, setInitialImageIds] = useState<number[]>(() =>
        getInitialImageIds()
    );
    const [initialVideoIds, setInitialVideoIds] = useState<number[]>(() =>
        getInitialVideoIds()
    );

    useEffect(() => {
        setInitialImageIds(getInitialImageIds());
    }, [getInitialImageIds]);

    useEffect(() => {
        setInitialVideoIds(getInitialVideoIds());
    }, [getInitialVideoIds]);

    const [termsAccepted, setTermsAccepted] = useState(true);
    const { mutateAsync: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();

    const loading = editServiceLoading || uploadFileLoading;

    const initialHighlights = safeParse<string[]>({
        rawString: serviceDetail?.highlights ?? "",
        initialData: [],
    });

    const formik = useFormik<EditServicePayload>({
        initialValues: {
            title: serviceDetail?.title ?? "",
            description: serviceDetail?.description ?? "",
            highlights: initialHighlights,
            city: serviceDetail?.city?.id ?? "",
            location: (serviceDetail?.location as TaskType) ?? "remote",
            budget_type:
                (serviceDetail?.budget_type as BudgetType) ?? BudgetType.FIXED,
            budget_from: serviceDetail?.budget_from ?? 0,
            budget_to: serviceDetail?.budget_to ?? 0,
            service: serviceDetail?.service?.id ?? ({} as any),
            is_negotiable: serviceDetail?.is_negotiable ?? false,
            estimated_time: 5,
            is_recursion: false,
            is_requested: false,
            is_everyday: false,
            currency: serviceDetail?.currency?.id ?? "",
            images: "",
            videos: "",
            is_active: serviceDetail?.is_active ?? true,
            share_location: serviceDetail?.share_location ?? true,
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
            const editServicePayload = {
                ...values,
                images: imageIds,
                videos: videoIds,
                extra_data: [],
            };

            editServiceMutation(
                { id: serviceDetail?.id, data: editServicePayload },
                {
                    onSuccess: async () => {
                        handleClose();
                        action.resetForm();
                        toggleSuccessModal("Successfully edited service");
                    },
                    onError: (error: any) => {
                        toast.error(error.message);
                    },
                }
            );
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

    const getFieldError = (key: keyof EditServicePayload) =>
        touched[key] && errors[key] ? (errors[key] as string) : null;

    return (
        <div className="edit-service-wrapper">
            <LoadingOverlay
                visible={loading}
                sx={{ position: "fixed", inset: 0 }}
            />
            <Modal
                opened={showEditModal}
                onClose={handleClose}
                title="Edit Service"
                size="xl"
            >
                <form encType="multipart/formData" onSubmit={handleSubmit}>
                    <Stack spacing="lg">
                        <TextInput
                            placeholder="Enter your title"
                            label="Title"
                            required
                            {...getFieldProps("title")}
                            error={getFieldError("title")}
                        />
                        <RichText
                            {...getFieldProps("description")}
                            placeholder="Enter your description"
                            value={values?.description ?? ""}
                            onChange={(value) =>
                                setFieldValue("description", value)
                            }
                        />
                        <TaskRequirements
                            initialRequirements={initialHighlights}
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
                                serviceDetail
                                    ? serviceDetail?.currency?.id?.toString()
                                    : ""
                            }
                            data={
                                serviceDetail?.currency
                                    ? [
                                          {
                                              id: serviceDetail?.currency?.id,
                                              label: serviceDetail?.currency
                                                  ?.name,
                                              value: serviceDetail?.currency?.id?.toString(),
                                          },
                                      ]
                                    : []
                            }
                            onCurrencyChange={(currencyId) =>
                                setFieldValue("currency", currencyId)
                            }
                            error={getFieldError("currency")}
                        />
                        <SelectCity
                            onCitySelect={(cityId) =>
                                setFieldValue("city", cityId)
                            }
                            value={serviceDetail ? serviceDetail?.city : ""}
                        />

                        <ServiceOptions
                            {...getFieldProps("service")}
                            onServiceChange={(service) =>
                                setFieldValue("service", service)
                            }
                            error={getFieldError("service")}
                            data={
                                serviceDetail?.service
                                    ? [
                                          {
                                              id: serviceDetail?.service?.id,
                                              label: serviceDetail?.service
                                                  ?.title,
                                              value: serviceDetail?.service?.id,
                                          },
                                      ]
                                    : []
                            }
                            value={
                                serviceDetail ? serviceDetail?.service?.id : ""
                            }
                        />
                        <SelectTaskType
                            location={values.location}
                            setFieldValue={setFieldValue}
                            onTypeChange={(type) =>
                                setFieldValue("location", type)
                            }
                            {...getFieldProps("location")}
                            error={getFieldError("location")}
                        />
                        <TaskBudget
                            initialBudgetFrom={serviceDetail?.budget_from}
                            initialBudgetTo={serviceDetail?.budget_to}
                            {...formik}
                        />
                        <Checkbox
                            defaultChecked={serviceDetail?.is_negotiable}
                            label="Yes, it is negotiable."
                            {...getFieldProps("is_negotiable")}
                        />
                        <Stack sx={{ maxWidth: "40rem" }}>
                            <Title order={6}>Images</Title>
                            <Text color="dimmed" size="sm">
                                Including images helps you find best merchant
                                for your task.
                            </Text>
                            <CustomDropZone
                                accept={IMAGE_MIME_TYPE}
                                uploadedFiles={serviceDetail?.images ?? []}
                                fileType="image"
                                sx={{ maxWidth: "30rem" }}
                                name="task-image"
                                onRemoveUploadedFiles={setInitialImageIds}
                                onDrop={(images) =>
                                    setFieldValue("images", images)
                                }
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
                                uploadedFiles={serviceDetail?.videos ?? []}
                                fileType="video"
                                name="task-video"
                                onRemoveUploadedFiles={setInitialVideoIds}
                                onDrop={(videos) =>
                                    setFieldValue("videos", videos)
                                }
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
                                onClick={handleClose}
                                className="close-btn close-btn-mod btn p-3 h-25"
                            >
                                Cancel
                            </Button>
                            <BigButton
                                type="submit"
                                className="close-btn btn p-3 h-25 text-white"
                                btnTitle="Edit Service"
                                backgroundColor="#211D4F"
                            />
                        </Box>
                    </Stack>
                </form>
            </Modal>
        </div>
    );
};
