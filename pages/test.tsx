import { CipherAPI, urls } from "@cagtu-cms/data-access";
import {
    Button,
    ErrorAlert,
    FormModal,
    InputField,
    MultiFileDropzone,
    PaperBox,
    SelectField,
    SelectInputField,
    SwitchCheckbox,
    TextEditor,
} from "@cagtu-cms/ui-shared";
import type {
    ServicesFormValuesProps,
    ServicesResult,
} from "@cagtu-cms/util-formatter";
import {
    budgetTypeOptions,
    discountTypeOptions,
    serviceSchema,
    useIconColorMode,
} from "@cagtu-cms/util-formatter";
import { faCirclePlus } from "@fortawesome/pro-duotone-svg-icons";
import { faCheck, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Checkbox,
    Code,
    Grid,
    Group,
    List,
    Loader,
    Radio,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import * as _ from "lodash";
import { useState } from "react";

import ServiceListTable from "./ServiceListTable";

const urlsPath = urls?.cipher?.services;
const urlsCatPath = urls?.cipher?.category;

const ServiceList = () => {
    const [checked, setChecked] = useState<string[]>([]);
    const queryClient = useQueryClient();
    const [formModal, setFormModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [multiDeleteModal, setMultiDeleteModal] = useState(false);
    const [rowId, setRowId] = useState<number | null>();
    const [page, setPage] = useState(1);
    const [highlights, setHighlights] = useState<string[]>([]);
    const [isServiceSubmitting, setIsServiceSubmitting] =
        useState<boolean>(false);
    const [searchCategory, setSearchCategory] = useState<string>(""); // Read the value from category select field after values enter i.e; more than 3 letter
    const [onSearchCategory, setOnSearchCategory] = useState<string>(""); // Category will set after the 'Enter' Hot key press
    const [categoryOptions, setCategoryOptions] = useState<
        { value: string; label: string }[]
    >([]);

    const theme = useMantineTheme();
    const [iconColorMode] = useIconColorMode();

    const [serviceFormData, setServiceFormData] =
        useState<ServicesFormValuesProps>({
            id: null,
            title: "",
            description: "",
            category: "",
            highlights: "",
            is_professional: false,
            is_online: false,
            budget_from: "",
            budget_to: "",
            budget_type: "",
            discount_value: "",
            discount_type: "",
            location: "",
            status: "Pending",
            highlights_list: "",
            video: "",
            images: [],
            imagePreviewUrl: [],
            budget_select: "fixed",
            is_discount_offer: false,
        });

    const serviceAPI = new CipherAPI(urlsPath?.path);
    const categorySelectOptionsAPI = new CipherAPI(urlsCatPath?.selectOptions);
    const serviceImageAPI = new CipherAPI(urlsPath?.image);
    const serviceMultiDeleteAPI = new CipherAPI(urlsPath?.multipleDelete);

    const { isLoading, isError, isSuccess, data } = useQuery(
        ["services", page],
        () => serviceAPI.list({ page })
    );

    // Fetch the category list from the API as the per user keywords request
    const { isFetching: isCategoryFetching } = useQuery(
        ["category-options"],
        () => categorySelectOptionsAPI.list({ search: onSearchCategory }),
        {
            enabled: !!searchCategory || !!rowId,
            onSuccess: (data) => {
                const categoryOptions = data?.data.map(
                    ({ id, name }: { id: number; name: string }) => {
                        return {
                            value: String(id),
                            label: name,
                        };
                    }
                );
                setCategoryOptions(categoryOptions);
            },
        }
    );

    // Fetch and filter the current category select in the category field
    useQuery(
        ["current-category", serviceFormData?.category],
        () => categorySelectOptionsAPI.list(),
        {
            enabled: !!rowId,
            onSuccess: (data) => {
                const findCurrentCategory = data?.data?.filter(
                    ({ id }: { id: number }) =>
                        id === Number(serviceFormData?.category)
                );
                const formatCurrentCategory = findCurrentCategory?.map(
                    ({ id, name }: { id: number; name: string }) => {
                        return {
                            value: String(id),
                            label: name,
                        };
                    }
                );
                setCategoryOptions(formatCurrentCategory);
            },
        }
    );
    const serviceImageMutation = useMutation((data: FormData) =>
        serviceImageAPI.store(data)
    );
    const serviceMutation = useMutation((data: ServicesFormValuesProps) =>
        serviceAPI.store(data, Number(rowId))
    );

    const pageToFecth = data?.data?.result.length <= 1 ? page - 1 : page;
    const pageToFetchMultiple =
        data?.data?.result.length <= checked.length ? page - 1 : page;

    const serviceMultiDeleteMutation = useMutation(
        (checkedIds: string[]) =>
            serviceMultiDeleteAPI.store({ id: checkedIds }),
        {
            onSuccess: (data) => {
                if (data.data?.status === "failure") {
                    setMultiDeleteModal(false);
                    showNotification({
                        title: "Uh oh! something went wrong",
                        message: data.data?.message,
                        color: "red",
                        icon: <FontAwesomeIcon icon={faXmark} />,
                    });
                } else {
                    setMultiDeleteModal(false);
                    setChecked([]);
                    showNotification({
                        title: "Congrats! Service Deleted",
                        message: data.data?.message,
                        color: "green",
                        icon: <FontAwesomeIcon icon={faCheck} />,
                    });
                    const pageToSet =
                        pageToFetchMultiple < 1 ? 1 : pageToFetchMultiple;
                    if (pageToSet === page)
                        queryClient.invalidateQueries(["services", pageToSet]);
                    else setPage(pageToSet);
                }
            },
            onError: (error: any) => {
                const {
                    data: { message },
                } = error.response;
                setMultiDeleteModal(false);
                showNotification({
                    title: "Uh oh! something went wrong",
                    message:
                        message ??
                        "Sorry! There was a problem with your request.",
                    color: "red",
                    icon: <FontAwesomeIcon icon={faXmark} />,
                });
            },
        }
    );

    const serviceDeleteMutation = useMutation(
        (id: number) => serviceAPI.delete(id),
        {
            onSuccess: (data) => {
                if (data.data?.status === "failure") {
                    setDeleteModal(false);
                    setRowId(null);
                    showNotification({
                        title: "Uh oh! something went wrong",
                        message: data.data?.message,
                        color: "red",
                        icon: <FontAwesomeIcon icon={faXmark} />,
                    });
                } else {
                    setDeleteModal(false);
                    setRowId(null);
                    showNotification({
                        title: "Congrats! Service Deleted",
                        message: data.data?.message,
                        color: "green",
                        icon: <FontAwesomeIcon icon={faCheck} />,
                    });
                    const pageToSet = pageToFecth < 1 ? 1 : pageToFecth;
                    if (pageToSet === page)
                        queryClient.invalidateQueries(["services", pageToSet]);
                    else setPage(pageToSet);
                }
            },
            onError: (error: any) => {
                const {
                    data: { message },
                } = error.response;
                setDeleteModal(false);
                setRowId(null);
                showNotification({
                    title: "Uh oh! something went wrong",
                    message:
                        message ??
                        "Sorry! There was a problem with your request.",
                    color: "red",
                    icon: <FontAwesomeIcon icon={faXmark} />,
                });
            },
        }
    );

    const onCreateThumbnail = (
        formData: FormData,
        values: ServicesFormValuesProps,
        actions: FormikHelpers<ServicesFormValuesProps>
    ) =>
        serviceImageMutation.mutate(formData, {
            onSuccess: (data) => {
                const getImagesId = values?.images
                    .filter((val) => !val.path)
                    .map((val) => val?.id);
                const dataToSend = {
                    ...JSON.parse(JSON.stringify(values)),
                    highlights: JSON.stringify(highlights),
                    budget_to: values.budget_to ? values.budget_to : null,
                    discount_value: values.discount_value
                        ? values.discount_value
                        : null,
                    images: [...getImagesId, ...(data?.data?.data ?? [])],
                };
                delete dataToSend.imagePreviewUrl;
                delete dataToSend.highlights_list;
                delete dataToSend.is_discount_offer;
                delete dataToSend.budget_select;

                onCreateService(dataToSend, actions);
            },
            onError: () => {
                setIsServiceSubmitting(false);
                showNotification({
                    title: "Uh oh! something went wrong",
                    message: "Sorry! There was a problem with your request.",
                    color: "red",
                    icon: <FontAwesomeIcon icon={faXmark} />,
                });
            },
        });

    const onCreateService = (
        data: any,
        actions: FormikHelpers<ServicesFormValuesProps>
    ) => {
        serviceMutation.mutate(data, {
            onSuccess: (data) => {
                if (data.data.status === "failure") {
                    setIsServiceSubmitting(false);
                    setFormModal(false);
                    setRowId(null);
                    showNotification({
                        title: "Uh oh! something went wrong",
                        message: data.data.message.title[0],
                        color: "red",
                        icon: <FontAwesomeIcon icon={faXmark} />,
                    });
                } else {
                    actions.resetForm();
                    setIsServiceSubmitting(false);
                    setFormModal(false);
                    setRowId(null);
                    showNotification({
                        title: "Congrats! Service Created",
                        message: data.data.message,
                        color: "green",
                        icon: <FontAwesomeIcon icon={faCheck} />,
                    });
                    const pageToSet = pageToFecth < 1 ? 1 : pageToFecth;
                    if (pageToSet === page)
                        queryClient.invalidateQueries(["services", pageToSet]);
                    else setPage(pageToSet);
                }
            },
            onError: (error: any) => {
                const {
                    data: { message },
                } = error.response;
                setIsServiceSubmitting(false);
                showNotification({
                    title: "Uh oh! something went wrong",
                    message:
                        message ??
                        "Sorry! There was a problem with your request.",
                    color: "red",
                    icon: <FontAwesomeIcon icon={faXmark} />,
                });
            },
        });
    };

    const onHandleSearch = (query: string) => {
        queryClient.prefetchQuery(["services", page], () =>
            serviceAPI.list({ search: query })
        );
    };

    const onSelectAll = () => {
        const isSelectAll = isAllCheckboxSelected();
        if (isSelectAll) {
            setChecked([]);
        } else {
            const checkedRowId = data?.data?.result.map(
                (service: ServicesResult) => String(service.id)
            );
            setChecked(checkedRowId);
        }
    };

    const isCheckboxSelect = (id: number) => checked.includes(String(id));

    const handleSelect = (id: number) => {
        const isChecked = isCheckboxSelect(id);
        if (isChecked) {
            const filterCheckedList = checked.filter(
                (val) => val !== String(id)
            );
            setChecked(filterCheckedList);
        } else {
            setChecked((prevValue) => [...prevValue, String(id)]);
        }
    };

    const isAllCheckboxSelected = () => {
        const checkedRowId = data?.data?.result.map((service: ServicesResult) =>
            String(service.id)
        );
        const isAllSelected = checkedRowId.every((id: number) =>
            checked.includes(String(id))
        );
        return isAllSelected;
    };

    const handleSingleDelete = (id: number) => {
        setDeleteModal(true);
        setRowId(id);
    };

    const handleCloseModal = () => {
        if (!serviceDeleteMutation.isLoading) {
            setDeleteModal(false);
            setRowId(null);
        }
    };

    const handleMultiDeleteCloseModal = () => {
        if (!serviceMultiDeleteMutation.isLoading) {
            setMultiDeleteModal(false);
        }
    };

    const handleFormClose = () => {
        if (!isServiceSubmitting) {
            setFormModal(false);
            setRowId(null);
            setServiceFormData({
                id: null,
                title: "",
                description: "",
                category: "",
                highlights: "",
                is_professional: false,
                is_online: false,
                budget_from: "",
                budget_to: "",
                budget_type: "",
                discount_value: "",
                discount_type: "",
                location: "",
                status: "Pending",
                highlights_list: "",
                video: "",
                images: [],
                imagePreviewUrl: [],
                budget_select: "fixed",
                is_discount_offer: false,
            });
            setHighlights([]);
        }
    };

    const handleFormModal = () => {
        setFormModal(true);
        setRowId(null);
    };

    const handleFormModalEdit = (object: ServicesResult) => {
        setServiceFormData(mapToViewModal(object));
        setFormModal(true);
        setRowId(object?.id);
    };

    const mapToViewModal = (value: ServicesResult) => {
        const getServiceImages =
            value?.images &&
            value?.images.map((val) => {
                const fileName = _.split(val?.name, "/");
                return {
                    id: val?.id,
                    src: val?.image,
                    file: {
                        name: _.last(fileName),
                        size: val?.size,
                    },
                };
            });

        setHighlights(JSON.parse(value?.highlights));
        return {
            id: null,
            title: value?.title,
            description: value?.description,
            category: String(value?.category?.id),
            highlights: JSON.parse(value?.highlights),
            is_professional: value?.is_professional,
            is_online: value?.is_online,
            location: value?.location,
            status: value?.status,
            highlights_list: "",
            video: value?.video,
            images: value?.images as any[],
            imagePreviewUrl: getServiceImages as any[],
            budget_from: value?.budget_from,
            budget_to: value?.budget_to ?? "",
            budget_type: value?.budget_type,
            budget_select: value?.budget_to ? "variable" : "fixed",
            discount_value: value?.discount_value ?? "",
            discount_type: value?.discount_type,
            is_discount_offer: value?.discount_value ? true : false,
        };
    };

    const onRemoveHighlights = (index: number) => {
        setHighlights((prevState) =>
            prevState.filter((_, key) => key !== index)
        );
    };

    const onCreateHighlights = (
        setFieldValue: any,
        setFieldError: any,
        values: any
    ) =>
        getHotkeyHandler([
            [
                "Enter",
                () => {
                    if (highlights.includes(values.highlights_list)) {
                        setFieldError(
                            "highlights_list",
                            "Mention highlights is already created"
                        );
                    } else {
                        setFieldValue("highlights_list", "");
                        setHighlights((prevState) => [
                            ...prevState,
                            values.highlights_list,
                        ]);
                    }
                },
            ],
        ]);

    const onHandleCategorySearch = (query: string) => {
        setSearchCategory(query);
        setOnSearchCategory(query);
    };

    if (isError) {
        return <ErrorAlert />;
    }

    return (
        <>
            <PaperBox>
                <Group position="right">
                    <Button name="Create" onClick={handleFormModal} />
                </Group>
                <ServiceListTable
                    data={data?.data?.result}
                    page={page}
                    checked={checked}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    total={data?.data?.total_pages}
                    isDeleteModalOpened={deleteModal}
                    isMultiDeleteModalOpened={multiDeleteModal}
                    isSingleDeleteMutationLoading={
                        serviceDeleteMutation.isLoading
                    }
                    isMultiDeleteMutationLoading={
                        serviceMultiDeleteMutation.isLoading
                    }
                    isAllCheckboxSelected={isAllCheckboxSelected}
                    isCheckboxSelect={isCheckboxSelect}
                    handleSelect={handleSelect}
                    handleSingleDelete={handleSingleDelete}
                    onSelectAll={onSelectAll}
                    onSetPage={setPage}
                    onClickDeleteAll={() => setMultiDeleteModal(true)}
                    onConfirmSingleDelete={() =>
                        serviceDeleteMutation.mutate(Number(rowId))
                    }
                    onConfirmMultiDelete={() =>
                        serviceMultiDeleteMutation.mutate(checked)
                    }
                    handleSingleDeleteCloseModal={handleCloseModal}
                    handleMultiDeleteCloseModal={handleMultiDeleteCloseModal}
                    onHandleSearch={onHandleSearch}
                    handleFormModalEdit={handleFormModalEdit}
                />
            </PaperBox>
            <Formik
                enableReinitialize
                initialValues={serviceFormData}
                validationSchema={serviceSchema}
                onSubmit={(values, actions) => {
                    const formData = new FormData();
                    setIsServiceSubmitting(true);

                    if (values.images.some((val) => val?.path)) {
                        values.images.forEach((file) => {
                            if (file?.path) formData.append("images", file);
                        });
                        onCreateThumbnail(formData, values, actions);
                    } else {
                        const getImagesId = values?.images.map(
                            (val) => val?.id
                        );
                        const dataToSend = {
                            ...JSON.parse(JSON.stringify(values)),
                            highlights: JSON.stringify(highlights),
                            budget_to: values.budget_to
                                ? values.budget_to
                                : null,
                            discount_value: values.discount_value
                                ? values.discount_value
                                : null,
                            images: getImagesId,
                        };
                        delete dataToSend.imagePreviewUrl;
                        delete dataToSend.highlights_list;
                        delete dataToSend.is_discount_offer;
                        delete dataToSend.budget_select;

                        onCreateService(dataToSend, actions);
                    }
                }}
            >
                {({
                    errors,
                    touched,
                    handleSubmit,
                    handleReset,
                    values,
                    setFieldValue,
                    handleBlur,
                    setFieldError,
                }) => (
                    <FormModal
                        opened={formModal}
                        onClose={() => {
                            handleReset();
                            handleFormClose();
                        }}
                        title={`${rowId ? "Edit Service" : "Add Service"}`}
                        onConfirm={handleSubmit}
                        confirmButtonText={`${rowId ? "Save" : "Add"}`}
                        loading={isServiceSubmitting}
                        size="xl"
                    >
                        <Form>
                            <InputField
                                name="title"
                                error={errors.title}
                                touch={touched.title}
                                labelName="Title"
                                placeHolder="Enter service title"
                            />
                            <TextEditor
                                name="description"
                                labelName="Description"
                                value={values.description}
                                onChange={(value: string) => {
                                    setFieldValue("description", value);
                                }}
                                error={errors.description}
                                touch={touched.description}
                                onBlur={handleBlur}
                                height={250}
                                sticky={false}
                            />
                            <SelectInputField
                                name="category"
                                labelName="Category"
                                placeHolder="e.g. Gardening"
                                error={errors.category}
                                touch={touched.category}
                                options={categoryOptions}
                                textMuted={
                                    <>
                                        Write at least 3 letters and hit
                                        <Code style={{ margin: "0 5px" }}>
                                            Enter
                                        </Code>
                                        to get the categories data
                                    </>
                                }
                                handleChange={(value) => {
                                    setFieldValue("category", value);
                                }}
                                mt={20}
                                onSearchChange={(value) => {
                                    if (value && value.length >= 3) {
                                        setOnSearchCategory(value);
                                    } else {
                                        onHandleCategorySearch("");
                                    }
                                }}
                                onKeyDown={getHotkeyHandler([
                                    [
                                        "Enter",
                                        () => {
                                            onHandleCategorySearch(
                                                onSearchCategory
                                            );
                                        },
                                    ],
                                ])}
                                rightSection={
                                    isCategoryFetching && <Loader size="xs" />
                                }
                                searchable
                                clearable
                            />
                            <Radio.Group
                                value={values.budget_select}
                                onChange={(e) => {
                                    if (e === "fixed") {
                                        setFieldValue("budget_to", "");
                                        setFieldValue("budget_select", e);
                                    } else {
                                        setFieldValue("budget_select", e);
                                    }
                                }}
                                label="Budget"
                                spacing="lg"
                                offset={5}
                                mb={20}
                            >
                                <Radio value="fixed" label="Fixed" />
                                <Radio value="variable" label="Variable" />
                            </Radio.Group>
                            <Grid>
                                <Grid.Col md={4} py={0}>
                                    <InputField
                                        name="budget_from"
                                        error={errors.budget_from}
                                        touch={touched.budget_from}
                                        placeHolder={
                                            values.budget_select === "variable"
                                                ? "From: e.g.5000"
                                                : "e.g.5000"
                                        }
                                    />
                                </Grid.Col>
                                {values.budget_select === "variable" && (
                                    <Grid.Col md={4} py={0}>
                                        <InputField
                                            name="budget_to"
                                            error={errors.budget_to}
                                            touch={touched.budget_to}
                                            placeHolder="To: e.g.6000"
                                        />
                                    </Grid.Col>
                                )}
                                <Grid.Col md={4} py={0}>
                                    <SelectField
                                        name="budget_type"
                                        placeHolder="e.g. Hourly/Monthly/Fixed"
                                        error={errors.budget_type}
                                        touch={touched.budget_type}
                                        options={budgetTypeOptions}
                                        handleChange={(value) => {
                                            setFieldValue("budget_type", value);
                                        }}
                                        clearable
                                    />
                                </Grid.Col>
                            </Grid>
                            <Box
                                mb={values.is_discount_offer ? 20 : 15}
                                mt={10}
                            >
                                <Checkbox
                                    name="is_discount_offer"
                                    label="Add Discount &amp; Offers"
                                    checked={values.is_discount_offer}
                                    onChange={(e) => {
                                        if (e.currentTarget.checked) {
                                            setFieldValue(
                                                "discount_value",
                                                values.discount_value
                                            );
                                            setFieldValue(
                                                "discount_type",
                                                values.discount_type
                                            );
                                            setFieldValue(
                                                "is_discount_offer",
                                                e.currentTarget.checked
                                            );
                                        } else {
                                            setFieldValue("discount_value", "");
                                            setFieldValue("discount_type", "");
                                            setFieldValue(
                                                "is_discount_offer",
                                                e.currentTarget.checked
                                            );
                                        }
                                    }}
                                    mb={20}
                                />
                                {values.is_discount_offer && (
                                    <Grid>
                                        <Grid.Col md={4} py={0}>
                                            <InputField
                                                name="discount_value"
                                                error={errors.discount_value}
                                                touch={touched.discount_value}
                                                placeHolder="Enter discount/offer value"
                                                style={{
                                                    marginBottom: `${
                                                        values.is_discount_offer &&
                                                        0
                                                    }`,
                                                }}
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={4} py={0}>
                                            <SelectField
                                                name="discount_type"
                                                placeHolder="e.g. Percentage/Value"
                                                error={errors.discount_type}
                                                touch={touched.discount_type}
                                                options={discountTypeOptions}
                                                handleChange={(value) => {
                                                    setFieldValue(
                                                        "discount_type",
                                                        value
                                                    );
                                                }}
                                                style={{
                                                    marginBottom: `${
                                                        values.is_discount_offer &&
                                                        0
                                                    }`,
                                                }}
                                                clearable
                                            />
                                        </Grid.Col>
                                    </Grid>
                                )}
                            </Box>
                            <InputField
                                name="location"
                                error={errors.location}
                                touch={touched.location}
                                labelName="Location"
                                placeHolder="e.g. Buddhanagar, Kathmandu, Nepal"
                            />
                            <Text
                                size="sm"
                                component="label"
                                weight={500}
                                mb={4}
                                sx={{ display: "inline-block" }}
                            >
                                Highlights
                            </Text>
                            <Text
                                size="xs"
                                mb={7}
                                color={`${theme.colors.gray[6]}`}
                            >
                                This helps merchants to find about your
                                requirements better.
                            </Text>
                            {highlights.length >= 1 && (
                                <List
                                    type="ordered"
                                    mb={10}
                                    mt={5}
                                    styles={{
                                        item: {
                                            padding: `${4}px ${0}px`,
                                            fontSize: 13,
                                        },
                                    }}
                                >
                                    {highlights.map((name, key) => (
                                        <Group key={key} position="apart">
                                            <List.Item>{name}</List.Item>
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                onClick={() =>
                                                    onRemoveHighlights(key)
                                                }
                                                color={iconColorMode}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </Group>
                                    ))}
                                </List>
                            )}
                            <InputField
                                name="highlights_list"
                                error={errors.highlights_list}
                                touch={touched.highlights_list}
                                placeHolder="e.g. Bring something screw driver"
                                rightSection={
                                    <FontAwesomeIcon
                                        icon={faCirclePlus}
                                        color={iconColorMode}
                                        fontSize={22}
                                    />
                                }
                                onKeyDown={onCreateHighlights(
                                    setFieldValue,
                                    setFieldError,
                                    values
                                )}
                            />
                            <InputField
                                name="video"
                                error={errors.video}
                                touch={touched.video}
                                labelName="Video URL"
                                placeHolder="e.g. https://www.youtube.com/watch?v=rokGy0huYEA"
                                textMuted="We only support youtube video URL."
                            />
                            <MultiFileDropzone
                                name="images"
                                labelName="Upload your images"
                                textMuted="More than 5 images are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 1MB."
                                error={errors.images as string}
                                touch={touched.images as boolean}
                                imagePreview="imagePreviewUrl"
                                maxFiles={5}
                                multiple
                                showFileDetail
                            />
                            <SwitchCheckbox
                                name="is_professional"
                                checked={values.is_professional}
                                onChange={(e) =>
                                    setFieldValue(
                                        "is_professional",
                                        e.currentTarget.checked
                                    )
                                }
                                labelName="Is it Professional?"
                                mb={15}
                            />
                            <SwitchCheckbox
                                name="is_online"
                                checked={values.is_online}
                                onChange={(e) =>
                                    setFieldValue(
                                        "is_online",
                                        e.currentTarget.checked
                                    )
                                }
                                labelName="Is it Online?"
                                mb={20}
                            />
                        </Form>
                    </FormModal>
                )}
            </Formik>
        </>
    );
};

export default ServiceList;
