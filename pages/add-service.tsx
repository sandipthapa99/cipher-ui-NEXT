import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MultiFileDropzone from "@components/common/MultiFileDropzone";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import AddRequirements from "@components/PostTask/AddRequirements";
import { Code, Loader } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import router from "next/router";
import React, { useState } from "react";
import { Button, Col, Container, FormCheck, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { CategoryFieldProps } from "types/categorySearchProps";
import type { SelectOptionProps } from "types/selectInputField";
import type { ServicePostProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";
import { ServicePostData } from "utils/formData";
import { addServiceFormSchema } from "utils/formValidation/addServiceFormValidation";
import { isSubmittingClass } from "utils/helpers";

const AddService = () => {
    const options = [
        {
            id: 1,
            value: 1,
            label: "Hourly",
        },
        {
            id: 2,
            value: 2,
            label: "Monthly",
        },
        {
            id: 3,
            value: 3,
            label: "Fixed",
        },
    ];
    const BudgetType = [
        {
            id: 1,
            value: "Hourly",
            label: "Hourly",
        },
        {
            id: 2,
            value: "Monthly",
            label: "Monthly",
        },
        {
            id: 3,
            value: "Fixed",
            label: "Fixed",
        },
    ];

    const [showVariable, setShowVariable] = useState({
        showBudget: false,
        showTime: false,
    });

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    const serviceImageMutation = useForm("/task/service-image/");
    const serviceMutation = useForm("/task/service/");

    const [onSearchCategory, setOnSearchCategory] = useState<string>("");

    const [searchCategory, setSearchCategory] = useState<string>(""); // Read the value from category select field after values

    const [rowId, setRowId] = useState<number | null>();

    const [categoryOptions, setCategoryOptions] = useState<
        { value: string; label: string }[]
    >([]);

    const onHandleCategorySearch = (query: string) => {
        setSearchCategory(query);
        setOnSearchCategory(query);
    };

    const onCreateThumbnail = (
        formData: FormData,
        values: ServicePostProps,
        actions: FormikHelpers<ServicePostProps>
    ) =>
        serviceImageMutation.mutate(formData, {
            onSuccess: (data: any) => {
                console.log("sdfasdasdasd", data);
                const getImagesId = values?.images
                    .filter((val) => !val.path)
                    .map((val) => val?.id);
                const dataToSend = {
                    ...JSON.parse(JSON.stringify(values)),
                    budget_to: values.budget_to ? values.budget_to : null,
                    discount_value: values.discount_value
                        ? values.discount_value
                        : null,
                    images: Object.values(data.data),
                    highlights: JSON.stringify(data.highlights),
                };
                delete dataToSend.imagePreviewUrl;
                delete dataToSend.highlights_list;
                delete dataToSend.is_discount_offer;
                delete dataToSend.budget_select;

                onCreateService(dataToSend, actions);
            },
            onError: (error) => {
                error.message;
            },
        });

    const onCreateService = (
        data: any,
        actions: FormikHelpers<ServicePostProps>
    ) => {
        serviceMutation.mutate(data, {
            onSuccess: (data: any) => {
                if (data.data.status === "failure") {
                    setRowId(null);
                } else {
                    actions.resetForm();
                    setRowId(null);
                }
            },
            onError: (error: any) => {
                const {
                    data: { message },
                } = error.response;
            },
        });
    };

    // Fetch the category list from the API as the per user keywords request
    const { isFetching: isCategoryFetching } = useQuery(
        ["category-options", onSearchCategory],
        () =>
            axiosClient
                .get<CategoryFieldProps>(
                    `/task/cms/task-category/list/?search=${onSearchCategory}`
                )
                .then((response) => response.data),
        {
            enabled: !!searchCategory || !!rowId,
            onSuccess: (data) => {
                const categoryOptions = data?.map(
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

    const { mutate } = useForm("/task/service/");
    const toggleSuccessModal = useToggleSuccessModal();
    return (
        <Layout title="Add-service | Cipher">
            <BreadCrumb currentPage="add-service" />
            <section id="service-details-section" className="service-details">
                <Container>
                    <div className="service-details-body">
                        <Formik
                            initialValues={ServicePostData}
                            validationSchema={addServiceFormSchema}
                            onSubmit={(values, actions) => {
                                const formData = new FormData();

                                if (values.images.some((val) => val?.path)) {
                                    values.images.forEach((file) => {
                                        if (file?.path)
                                            formData.append("images", file);
                                    });
                                    onCreateThumbnail(
                                        formData,
                                        values,
                                        actions
                                    );
                                } else {
                                    const getImagesId = values?.images.map(
                                        (val) => val?.id
                                    );
                                    const dataToSend = {
                                        ...JSON.parse(JSON.stringify(values)),
                                        budget_to: values.budget_to
                                            ? values.budget_to
                                            : null,
                                        discount_value: values.discount_value
                                            ? values.discount_value
                                            : null,
                                        images: getImagesId,
                                        highlights: values.highlights
                                            ? JSON.stringify(values.highlights)
                                            : null,
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
                                setFieldValue,
                                errors,
                                touched,
                                isSubmitting,
                            }) => (
                                <>
                                    <Form>
                                        <pre>{JSON.stringify(errors)}</pre>
                                        <h3>Service Details</h3>
                                        <InputField
                                            labelName="Title"
                                            placeHolder="service title"
                                            name="title"
                                            error={errors.title}
                                            touch={touched.title}
                                        />
                                        <InputField
                                            labelName="Description"
                                            placeHolder="Service Description"
                                            name="description"
                                            as="textarea"
                                            error={errors.description}
                                            touch={touched.description}
                                        />
                                        <SelectInputField
                                            name="category"
                                            labelName="Category"
                                            placeHolder="Choose Category"
                                            options={options}
                                            error={errors.category}
                                            touch={touched.category}
                                        />
                                        {/* <SelectInputField
                                            name="category"
                                            labelName="The Category"
                                            placeHolder="e.g. Gardening"
                                            error={errors.category}
                                            touch={touched.category}
                                            options={categoryOptions}
                                            textMuted={
                                                <>
                                                    Write at least 3 letters and
                                                    hit
                                                    <Code
                                                        style={{
                                                            margin: "0 5px",
                                                        }}
                                                    >
                                                        Enter
                                                    </Code>
                                                    to get the categories data
                                                </>
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "category",
                                                    value
                                                );
                                            }}
                                            mt={20}
                                            onSearchChange={(value) => {
                                                if (
                                                    value &&
                                                    value.length >= 3
                                                ) {
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
                                                isCategoryFetching && (
                                                    <Loader size="xs" />
                                                )
                                            }
                                            searchable
                                            clearable
                                        /> */}
                                        <h4>Budget</h4>
                                        <span className="d-flex mb-4">
                                            <FormCheck
                                                type="radio"
                                                name="budget"
                                                label="Fixed"
                                                className="me-3"
                                                onChange={() =>
                                                    setShowVariable((prev) => {
                                                        return {
                                                            ...prev,
                                                            showBudget: false,
                                                        };
                                                    })
                                                }
                                                defaultChecked
                                            />
                                            <FormCheck
                                                type="radio"
                                                name="budget"
                                                label="Variable"
                                                className="mb-8"
                                                onChange={() =>
                                                    setShowVariable((prev) => {
                                                        return {
                                                            ...prev,
                                                            showBudget: true,
                                                        };
                                                    })
                                                }
                                            />
                                        </span>
                                        <Row className="gx-5">
                                            <Col md={4}>
                                                <InputField
                                                    type="text"
                                                    name="budget_from"
                                                    error={errors.budget_from}
                                                    touch={touched.budget_from}
                                                    fieldRequired
                                                    className="mb-0"
                                                    placeHolder="Enter your price"
                                                />
                                            </Col>
                                            {showVariable.showBudget && (
                                                <Col md={4}>
                                                    <InputField
                                                        type="text"
                                                        name="budget_to"
                                                        error={errors.budget_to}
                                                        touch={
                                                            touched.budget_to
                                                        }
                                                        fieldRequired
                                                        className="mb-0"
                                                        placeHolder="Enter your price"
                                                    />
                                                </Col>
                                            )}

                                            <Col md={4}>
                                                <SelectInputField
                                                    name="budget_type"
                                                    placeHolder="Choose Category"
                                                    options={BudgetType}
                                                    error={errors.budget_type}
                                                    touch={touched.budget_type}
                                                />
                                            </Col>
                                        </Row>

                                        <div className="checkbox">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={handleChange}
                                            />
                                            Add Discount & offers
                                        </div>

                                        {checked && (
                                            <Row>
                                                <Col md={6} sm={12}>
                                                    <InputField
                                                        name="discount_value"
                                                        labelName="discount_value"
                                                        placeHolder="discount_value"
                                                        error={
                                                            errors.discount_value
                                                        }
                                                        touch={
                                                            touched.discount_value
                                                        }
                                                    />
                                                </Col>
                                                <Col md={6} sm={12}>
                                                    <SelectInputField
                                                        name="discount_type"
                                                        labelName="Revision Day"
                                                        placeHolder="Select Revision Day"
                                                        error={
                                                            errors.discount_type
                                                        }
                                                        touch={
                                                            touched.discount_type
                                                        }
                                                        options={options}
                                                    />
                                                </Col>
                                            </Row>
                                        )}
                                        <InputField
                                            labelName="Location"
                                            placeHolder="e.g. Buddhanagar"
                                            name="location"
                                            error={errors.location}
                                            touch={touched.location}
                                        />
                                        <AddRequirements
                                            onSubmit={(requirements) =>
                                                setFieldValue(
                                                    "highlights",
                                                    requirements
                                                )
                                            }
                                            title="Highligits"
                                            placeHolder="e.g.Bring something"
                                            description="Add services which you Offer"
                                        />

                                        <InputField
                                            labelName="Video URL"
                                            placeHolder="e.g. Buddhanagar"
                                            name="video"
                                            error={errors.video}
                                            touch={touched.video}
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
                                        <div className="d-flex justify-content-center">
                                            <Button className="btn close-btn p-3 h-25 w-25">
                                                Cancel
                                            </Button>
                                            <FormButton
                                                type="submit"
                                                variant="primary"
                                                name="Apply"
                                                className="submit-btn w-25 ms-3"
                                                isSubmitting={isSubmitting}
                                                isSubmittingClass={isSubmittingClass(
                                                    isSubmitting
                                                )}
                                            />
                                        </div>
                                    </Form>
                                </>
                            )}
                        </Formik>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default AddService;
