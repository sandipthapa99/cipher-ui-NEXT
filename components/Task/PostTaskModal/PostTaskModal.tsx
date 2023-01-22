import BigButton from "@components/common/Button";
import MantineDateField from "@components/common/MantineDateField";
import MantineInputField from "@components/common/MantineInputField";
import MantineTimeField from "@components/common/MantineTimeField";
import MultiFileDropzone from "@components/common/MultiFileDropzone";
import { RichText } from "@components/RichText";
import { postEntityServiceSchema } from "@components/Task/PostTaskModal/postTaskSchema";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import type { TaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { SelectTaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { ServiceOptions } from "@components/Task/PostTaskModal/ServiceOptions";
import { TaskBudget } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskCurrency } from "@components/Task/PostTaskModal/TaskCurrency";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import { LoadingOverlay, Radio } from "@mantine/core";
import {
    Anchor,
    Box,
    Checkbox,
    Modal,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { CalendarTodayOutlined } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format, parseISO } from "date-fns";
import type { FormikErrors, FormikTouched } from "formik";
import { Form, Formik } from "formik";
import { useData } from "hooks/use-data";
import { useEntityService } from "hooks/use-entity-service";
import { useUploadFile } from "hooks/use-upload-file";
import _ from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
    useClearPostTaskserviceType,
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

export interface PostTaskPayloadProps {
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
    imagePreviewUrl?: any[];
    videos: any[];
    videoPreviewUrl?: any[];
    start_date?: string;
    end_date?: string;
    start_time?: string | null;
    end_time?: string | null;
    is_active: boolean;
    share_location: boolean;
    is_terms_condition?: boolean;
}

export const PostTaskModal = () => {
    const toggleSuccessModal = useToggleSuccessModal();

    const queryClient = useQueryClient();

    //required when editing
    const showPostTaskserviceType = usePostTaskserviceType();
    const clearPostTaskserviceType = useClearPostTaskserviceType();
    const entityServiceId = usePostTaskserviceId();

    //TO switch between entity service(is_requested='true' | 'false')
    const [is_requested, setIs_requested] = useState<"true" | "false">(
        showPostTaskserviceType ?? "true"
    );

    //TO change state of is_requested(true | false)
    useEffect(() => {
        if (showPostTaskserviceType) {
            setIs_requested(showPostTaskserviceType);
        }
    }, [showPostTaskserviceType]);

    //For Filestore API
    const { mutateAsync: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();

    //TO render Title according to entity Service Type
    const renderTitle = () => {
        switch (showPostTaskserviceType) {
            case "true":
                return "Edit Task";
            case "false":
                return "Edit Service";
            default:
                return "Post a Task or Service";
        }
    };

    const render_budget_price = () => {
        switch (is_requested) {
            case "true":
                return "Budget";
            case "false":
                return "Price";
            default:
                return "Budget";
        }
    };

    //To assign max file number of Images and videos
    const MaxImages = 5;
    const MaxVideos = 1;

    const { mutate, isLoading } = useEntityService(is_requested);

    const showPostTaskModal = useShowPostTaskModal();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();

    const handleCloseModal = () => {
        toggleShowPostTaskModal();
        clearPostTaskserviceType();
    };

    const { data: entityServiceData, isFetching } = useData<ITask>(
        ["get-entity-service", entityServiceId],
        `${urls.task.list}${entityServiceId}/`,
        !!entityServiceId
    );

    const entityService = entityServiceData?.data;

    const getServiceImages =
        entityService?.images &&
        entityService?.images.map((val) => {
            const fileName = _.split(val?.name, "/");
            return {
                id: val?.id,
                src: val?.media,
                file: {
                    name: _.last(fileName),
                    size: val?.size,
                    type: val?.media_type,
                },
            };
        });

    const getServiceVideos =
        entityService?.videos &&
        entityService?.videos.map((val) => {
            const fileName = _.split(val?.name, "/");
            return {
                id: val?.id,
                src: val?.media,
                file: {
                    name: _.last(fileName),
                    size: val?.size,
                    type: val?.media_type,
                },
            };
        });

    const isCreateTaskLoading = isLoading || uploadFileLoading || isFetching;

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
                title={renderTitle()}
                size="xl"
            >
                {!entityServiceId && (
                    <div className="choose-email-or-phone mb-5">
                        <Radio.Group
                            label="Please select task or service which you want to post "
                            onChange={(value: "true" | "false") =>
                                setIs_requested(value)
                            }
                            size="sm"
                            value={is_requested}
                        >
                            <Radio value="true" label="Post Task" />
                            <Radio value="false" label="Post Service" />
                        </Radio.Group>
                    </div>
                )}

                <Formik
                    initialValues={{
                        title: entityService ? entityService.title : "",
                        description: entityService
                            ? entityService.description
                            : "",
                        highlights: entityService?.highlights ?? [],
                        city: entityService
                            ? String(entityService?.city?.id)
                            : "",
                        location: entityService
                            ? (entityService.location as TaskType)
                            : "remote",
                        budget_type: "Project",
                        budget_from: entityService
                            ? Number(entityService.budget_from)
                            : null,
                        budget_to: entityService
                            ? Number(entityService.budget_to)
                            : "",
                        service: entityService
                            ? entityService?.service?.id ?? ({} as any)
                            : "",
                        is_negotiable: false,
                        is_requested: is_requested,
                        start_date: entityService?.start_date
                            ? (parseISO(
                                  entityService?.start_date
                              ) as unknown as string)
                            : "",
                        end_date: entityService?.end_date
                            ? (parseISO(
                                  entityService?.end_date
                              ) as unknown as string)
                            : "",
                        start_time: entityService?.start_time
                            ? convertTimeStringToDateString(
                                  entityService?.start_time
                              )
                            : null,
                        end_time: entityService?.end_time
                            ? convertTimeStringToDateString(
                                  entityService?.end_time
                              )
                            : null,
                        currency: entityService
                            ? String(entityService?.currency?.code)
                            : "NPR",
                        images: (entityService?.images as any[]) ?? [],
                        imagePreviewUrl: getServiceImages ?? [],
                        videos: (entityService?.videos as any[]) ?? [],
                        videoPreviewUrl: getServiceVideos ?? [],
                        is_active: true,
                        is_terms_condition: entityService ? true : false,
                        share_location: true,
                        // estimated_time: 5,
                        // is_recursion: false,
                        // is_everyday: false,
                    }}
                    validationSchema={postEntityServiceSchema(
                        is_requested,
                        MaxImages,
                        MaxVideos
                    )}
                    onSubmit={async (values: PostTaskPayloadProps, actions) => {
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
                        if (values.videos.some((val) => val?.path)) {
                            const uploadedVideosIds = await uploadFileMutation({
                                files: values?.videos.filter(
                                    (val) => val?.path
                                ) as unknown as string,
                                media_type: "video",
                            });
                            newUploadVideoID = uploadedVideosIds;
                        }

                        const imageIds = values?.images
                            .filter((val) => !val?.path)
                            .map((val) => val.id);
                        const videoIds = values?.videos
                            .filter((val) => !val?.path)
                            .map((val) => val.id);

                        const imagesIds = [...imageIds, ...newUploadImageID];
                        const videosIds = [...videoIds, ...newUploadVideoID];

                        const postTaskPayload = {
                            ...values,
                            highlights: values.highlights,
                            images: imagesIds,
                            videos: videosIds,
                            is_requested:
                                is_requested === "false" ? false : true,
                            start_date: values.start_date
                                ? format(
                                      new Date(String(values.start_date)),
                                      "yyyy-MM-dd"
                                  )
                                : null,
                            end_date: values.end_date
                                ? format(
                                      new Date(String(values.end_date)),
                                      "yyyy-MM-dd"
                                  )
                                : null,
                            start_time: values.start_time
                                ? format(
                                      new Date(String(values.start_time)),
                                      "HH:mm"
                                  )
                                : null,
                            end_time: values.end_time
                                ? format(
                                      new Date(String(values.end_time)),
                                      "HH:mm"
                                  )
                                : null,
                            extra_data: [],
                        };

                        //To remove unneccessary fields
                        delete postTaskPayload.imagePreviewUrl;
                        delete postTaskPayload.videoPreviewUrl;
                        delete postTaskPayload.is_terms_condition;

                        mutate(
                            {
                                id: String(entityServiceId),
                                data: postTaskPayload,
                            },
                            {
                                onSuccess: () => {
                                    toggleSuccessModal();
                                    actions.resetForm();
                                    handleCloseModal();
                                    queryClient.invalidateQueries([
                                        ReactQueryKeys.TASK_DETAIL,
                                        entityServiceId,
                                    ]);

                                    queryClient.invalidateQueries([
                                        ReactQueryKeys.TASKS,
                                    ]);
                                    queryClient.invalidateQueries([
                                        ReactQueryKeys.SERVICE_DETAIL,
                                        entityServiceId,
                                    ]);

                                    queryClient.invalidateQueries([
                                        ReactQueryKeys.SERVICES,
                                    ]);
                                },
                                onError: (e: any) => {
                                    toast.error("Post Failed");
                                    const { title, end_date, city } =
                                        e.response.data;
                                    actions.setFieldError(
                                        "title",
                                        title && title[0]
                                    );
                                    actions.setFieldError(
                                        "end_date",
                                        end_date && end_date[0]
                                    );
                                    actions.setFieldError(
                                        "city",
                                        city && city[0]
                                    );
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
                                    withAsterisk
                                    placeHolder={"Enter your title"}
                                    error={errors.title}
                                    touch={touched.title}
                                />

                                <RichText
                                    value={values.description}
                                    name={"description"}
                                    labelName={"Description"}
                                    withAsterisk
                                    onChange={(value) =>
                                        setFieldValue("description", value)
                                    }
                                    error={errors.description as string}
                                    touched={
                                        touched.description as unknown as boolean
                                    }
                                    placeholder="Enter your description"
                                    aria-errormessage="123"
                                />
                                <TaskRequirements
                                    initialRequirements={
                                        entityService?.highlights ?? []
                                    }
                                    onRequirementsChange={(requirements) =>
                                        setFieldValue(
                                            "highlights",
                                            requirements
                                        )
                                    }
                                    error={errors.highlights}
                                    name={"highlights"}
                                    labelName={
                                        is_requested === "true"
                                            ? `Requirements`
                                            : `Highlights`
                                    }
                                    description="This helps the tasker understand about your post better"
                                />
                                {is_requested === "true" && (
                                    <>
                                        <Row>
                                            <Col md={6}>
                                                <MantineDateField
                                                    name="start_date"
                                                    labelName="Start Date"
                                                    placeHolder="Select Start Date"
                                                    icon={
                                                        <CalendarTodayOutlined className="svg-icons" />
                                                    }
                                                    error={errors.start_date}
                                                    touch={touched.start_date}
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
                                                    fieldRequired
                                                    placeHolder="Select End Date"
                                                    error={errors.end_date}
                                                    touch={touched.end_date}
                                                    icon={
                                                        <CalendarTodayOutlined className="svg-icons" />
                                                    }
                                                    minDate={new Date()}
                                                    handleChange={(value) => {
                                                        setFieldValue(
                                                            "end_date",
                                                            value
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                <MantineTimeField
                                                    name="start_time"
                                                    labelName="Start Time"
                                                    placeHolder="hh/mm"
                                                    touch={touched.start_time}
                                                    error={errors.start_time}
                                                    handleChange={(value) => {
                                                        setFieldValue(
                                                            "start_time",
                                                            value
                                                        );
                                                    }}
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <MantineTimeField
                                                    name="end_time"
                                                    labelName="End time"
                                                    placeHolder="hh/mm"
                                                    touch={touched.end_time}
                                                    error={errors.end_time}
                                                    handleChange={(value) => {
                                                        setFieldValue(
                                                            "end_time",
                                                            value
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                )}

                                <SelectCity
                                    name="city"
                                    error={errors.city}
                                    value={values.city}
                                    touch={touched.city}
                                    onBlur={() => setFieldTouched("city")}
                                    onCitySelect={(cityId) =>
                                        setFieldValue("city", cityId)
                                    }
                                    initialCity={
                                        entityService?.city
                                            ? entityService?.city
                                            : ({} as ITask["city"])
                                    }
                                />
                                <ServiceOptions
                                    name={"service"}
                                    onServiceChange={(service) =>
                                        setFieldValue("service", service)
                                    }
                                    touch={touched.service}
                                    error={errors.service}
                                    onBlur={() => setFieldTouched("service")}
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
                                    name={"currency"}
                                    value={values?.currency}
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
                                    label={render_budget_price()}
                                    initialBudgetTo={values.budget_to as number}
                                    initialbudgetType={values.budget_type}
                                    setFieldValue={setFieldValue}
                                    setFieldError={setFieldError}
                                    setFieldTouched={setFieldTouched}
                                    touched={
                                        touched as FormikTouched<PostTaskPayloadProps>
                                    }
                                    errors={
                                        errors as FormikErrors<PostTaskPayloadProps>
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
                                        merchant for your post.
                                    </Text>

                                    <MultiFileDropzone
                                        name="images"
                                        labelName="Upload your images"
                                        textMuted={`More than ${MaxImages} images cannot be uploaded. File supported: .jpeg, .jpg, .png. Maximum size 4MB.`}
                                        error={
                                            (errors.imagePreviewUrl as string) ||
                                            (errors.images as string)
                                        }
                                        touch={touched.images as boolean}
                                        imagePreview="imagePreviewUrl"
                                        maxFiles={MaxImages}
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
                                        textMuted={`More than ${MaxVideos} videos cannot be uploaded. Maximum size 10MB.`}
                                        error={
                                            (errors.videoPreviewUrl as string) ||
                                            (errors.videos as string)
                                        }
                                        touch={touched.videos as boolean}
                                        imagePreview="videoPreviewUrl"
                                        accept={["video/mp4"]}
                                        maxFiles={MaxVideos}
                                        maxSize={100}
                                        multiple
                                        showFileDetail
                                    />
                                </Stack>
                                {!entityService ? (
                                    <Checkbox
                                        checked={values.is_terms_condition}
                                        name={"is_terms_condition"}
                                        onChange={(event) =>
                                            setFieldValue(
                                                "is_terms_condition",
                                                event.target.checked
                                            )
                                        }
                                        error={
                                            touched.is_terms_condition &&
                                            errors.is_terms_condition
                                                ? errors?.is_terms_condition
                                                : null
                                        }
                                        label={
                                            <Text>
                                                Accept all{" "}
                                                <Link
                                                    passHref
                                                    href="/terms-conditions"
                                                >
                                                    <Anchor>
                                                        Terms and Conditions
                                                    </Anchor>
                                                </Link>
                                            </Text>
                                        }
                                    />
                                ) : null}

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
                                        btnTitle="Submit"
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
