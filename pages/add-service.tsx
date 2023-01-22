import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MultiFileDropzone from "@components/common/MultiFileDropzone";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import AddRequirements from "@components/PostTask/AddRequirements";
import type { SelectItem } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import type { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import { Button, Col, Container, FormCheck, Row } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { CityOptionsProps } from "types/cityOptionsProps";
import type { ServicePostProps } from "types/serviceCard";
import { axiosClient } from "utils/axiosClient";
import { ServicePostData } from "utils/formData";
import { addServiceFormSchema } from "utils/formValidation/addServiceFormValidation";
import { isSubmittingClass } from "utils/helpers";
interface ServicePageProps {
    cityOptionsData: CityOptionsProps;
}

const AddService: NextPage<{
    cityOptionsData: ServicePageProps["cityOptionsData"];
}> = ({ cityOptionsData }) => {
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

    // const ActiveType = [
    //     {
    //         id: 1,
    //         value: true,
    //         label: "true",
    //     },
    //     {
    //         id: 2,
    //         value: false,
    //         label: "false",
    //     },
    // ];

    const [showVariable, setShowVariable] = useState({
        showBudget: false,
        showTime: false,
    });

    const [checked, setChecked] = useState(false);

    //Authorization cannot be send through get static props. So service category options fetched here
    const { data: serviceCategoryOptions } = useQuery(
        ["service-category"],
        async () => {
            const response = await axiosClient.get(
                "/task/cms/task-category/list/"
            );
            return response.data;
        }
    );

    const [serviceCategory, setServiceCategory] = useState<string | null>(null);

    const renderCityOptions = cityOptionsData?.map((item) => {
        return {
            id: item?.id,
            value: item?.id,
            label: item?.name,
        };
    });

    const handleCategoryChanged = (
        id: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setServiceCategory(id);
        if (id) setFieldValue("category", parseInt(id));
    };

    const renderCategoryOptions: SelectItem[] = serviceCategoryOptions?.map(
        (item: any) => {
            return {
                id: item?.id,
                value: item?.id,
                label: item?.name,
            };
        }
    );

    const handleChange = () => {
        setChecked(!checked);
    };

    // const serviceImageMutation = useForm("/task/service-image/");
    const serviceImageMutation = useForm("/task/filestore/");
    const serviceMutation = useForm("/task/service/");

    // const [onSearchCategory, setOnSearchCategory] = useState<string>("");

    // const [searchCategory, setSearchCategory] = useState<string>(""); // Read the value from category select field after values

    const [rowId, setRowId] = useState<number | null>();

    // const onHandleCategorySearch = (query: string) => {
    //     setSearchCategory(query);
    //     setOnSearchCategory(query);
    // };

    const onCreateThumbnail = (
        formData: FormData,
        values: ServicePostProps,
        actions: FormikHelpers<ServicePostProps>
    ) =>
        serviceImageMutation.mutate(formData, {
            onSuccess: (data: any) => {
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
                setRowId(null);
                toggleSuccessModal();

                actions.resetForm();
            },
            onError: (error: any) => {
                const {
                    data: { message },
                } = error.response;
            },
        });
    };

    const toggleSuccessModal = useToggleSuccessModal();
    return (
        <Layout
            title="Add-service | Homaale"
            description="Add Service in a homaale"
            keywords="homaale, airtasker-nepali, working-platform"
        >
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
                                            formData.append("medias", file);
                                        formData.append("media_type", "image");
                                        formData.append(
                                            "placeholder",
                                            "new image"
                                        );
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
                                        {/* <SelectInputField
                                            name="category"
                                            labelName="Category"
                                            placeHolder="Choose Category"
                                            options={options}
                                            error={errors.category}
                                            touch={touched.category}
                                        /> */}
                                        <Select
                                            label="Category"
                                            placeholder="Pick one"
                                            name="category"
                                            searchable
                                            nothingFound="No options"
                                            value={serviceCategory}
                                            onChange={(value) =>
                                                handleCategoryChanged(
                                                    value,
                                                    setFieldValue
                                                )
                                            }
                                            data={renderCategoryOptions ?? []}
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
                                                    placeHolder="Choose budget type"
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

                                        <SelectInputField
                                            name={"city"}
                                            labelName="City"
                                            placeHolder="Select city"
                                            error={errors.city}
                                            touch={touched.city}
                                            options={renderCityOptions}
                                        />

                                        <AddRequirements
                                            onSubmit={(value) =>
                                                setFieldValue(
                                                    "highlights",
                                                    value
                                                )
                                            }
                                            title="Highligits"
                                            placeHolder="e.g.Bring something"
                                            description="Add services which you Offer"
                                        />

                                        <InputField
                                            labelName="Video URL"
                                            placeHolder="e.g. https://www.youtube.com/jirIbhruHHHb"
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
                                            accept={{
                                                "image/*": [],
                                            }}
                                            showFileDetail
                                        />

                                        <Checkbox
                                            label="is active?"
                                            name="is_active"
                                            defaultChecked={true}
                                            onChange={(event) =>
                                                setFieldValue(
                                                    "is_active",
                                                    event.currentTarget.checked
                                                )
                                            }
                                        />

                                        <div className="d-flex justify-content-center">
                                            <Button className="btn close-btn p-3 h-25 w-25 add-service-cancel">
                                                Cancel
                                            </Button>
                                            <FormButton
                                                type="submit"
                                                variant="primary"
                                                name="Apply"
                                                className="submit-btn w-25 ms-3 add-service-submit"
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

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: cityOptionsData } = await axiosClient.get(
            "/locale/client/city/options/"
        );

        return {
            props: {
                cityOptionsData: cityOptionsData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                cityOptionsData: [],
            },
            revalidate: 10,
        };
    }
};
