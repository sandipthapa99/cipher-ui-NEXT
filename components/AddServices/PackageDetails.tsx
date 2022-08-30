import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PackageOffersCard from "@components/common/packageCard";
import SelectInputField from "@components/common/SelectInputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useData } from "hooks/use-data";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import type { SelectOptionProps } from "types/selectInputField";
import { axiosClient } from "utils/axiosClient";
import { addServiceFormSchema } from "utils/formValidation/addServiceFormValidation";

import { ServiceVideo } from "./ServiceVideo";

interface PackageDetailsProps {
    handlePrev: () => void;
    handleNext: (data?: unknown) => void;
}

export const PackageDetails = ({
    handlePrev,
    handleNext,
}: PackageDetailsProps) => {
    const [checked, setChecked] = useState(false);

    const [packageArray, setPackageArray] = useState<any[]>([]);
    const { data: myService } = useData<{
        result: Array<{
            id: string;
            created_by: {
                id: string;
                email: string;
                full_name: string;
                profile_image: any;
            };
            category: {
                id: number;
                name: string;
                slug: string;
                icon: any;
            };
            city: {
                id: number;
                name: string;
                country: {
                    id: number;
                    name: string;
                };
            };
            images: any;
            created_at: string;
            updated_at: string;
            status: string;
            is_active: boolean;
            title: string;
            description: string;
            highlights: string;
            budget_type: string;
            budget_from: number;
            budget_to: any;
            views_count: number;
            location: any;
            is_professional: boolean;
            is_online: boolean;
            no_of_revisions: number;
            discount_type: any;
            discount_value: any;
            slug: string;
            meta_title: any;
            meta_description: any;
            meta_keyword: any;
            videos: Array<any>;
        }>;
    }>(["all-my-services"], "/task/my-services");
    console.log("serviceccce", myService);
    const serviceOptions = myService?.data?.result?.map((item) => {
        return { label: item.title, value: item.id, id: item.id };
    });
    const postPackageMutation = useMutation((packageData) =>
        axiosClient.post("/task/service-package/", packageData)
    );

    const handleChange = () => {
        setChecked(!checked);
    };

    const packageDetailsData = {
        title: "",
        description: "",
        service_offered: "",
        budget: 0,
        no_of_revisions: "",
        discount_type: "",
        // revision_price: "",
        // revision_day: "",
        service: "",
        discount_value: 0,
        is_recommended: null,
        is_active: false,
    };
    const allOptions: SelectOptionProps[] = [
        {
            id: 1,
            value: "House Keeping",
            label: "House Keeping",
        },
    ];
    const discountOptions = [
        {
            id: 0,
            label: "Percentage",
            value: "percentage",
        },
        {
            id: 1,
            label: "Amount",
            value: "amount",
        },
    ];
    return (
        <section id="package-details-section" className="service-details">
            <Container>
                <div className="service-details-body">
                    <Row>
                        <Col md={7} sm={12}>
                            <Row>
                                <h3 className="added-packages">Packages</h3>

                                {packageArray.map((item, index) => (
                                    <Col md={6} sm={12} key={index}>
                                        <PackageOffersCard
                                            title={item?.title}
                                            price={item?.budget}
                                            offers={item?.service_offered}
                                            isPermium={false}
                                            advantage={""}
                                            isRecommended={false}
                                            isFromAddService={true}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <div className="service-form-body">
                                <Formik
                                    initialValues={packageDetailsData}
                                    // validationSchema={addServiceFormSchema}
                                    onSubmit={(values) => {
                                        console.log(values);
                                        setPackageArray((prev) => {
                                            return prev.length < 3
                                                ? [...prev, values]
                                                : prev;
                                        });
                                        postPackageMutation.mutate(values, {
                                            onSuccess: () => {
                                                toast.success(
                                                    "successfully posted package"
                                                );
                                            },
                                            onError: (err: any) => {
                                                toast.error(err?.message);
                                            },
                                        });
                                    }}
                                >
                                    {({
                                        setFieldValue,
                                        // isSubmitting,
                                        errors,
                                        touched,
                                        values,
                                    }) => (
                                        <>
                                            <Form>
                                                {/* <pre>
                                                    {JSON.stringify(
                                                        values,
                                                        null,
                                                        4
                                                    )}
                                                </pre> */}
                                                {/* <pre>
                                                    {JSON.stringify(
                                                        errors,
                                                        null,
                                                        4
                                                    )}
                                                </pre> */}
                                                <h3>Package Details</h3>
                                                <SelectInputField
                                                    name="service"
                                                    labelName="Services"
                                                    touch={touched.service}
                                                    error={errors.service}
                                                    placeHolder="Select Service"
                                                    options={
                                                        serviceOptions
                                                            ? serviceOptions
                                                            : []
                                                    }
                                                />
                                                <InputField
                                                    labelName="Package Title"
                                                    placeHolder="package title"
                                                    name="title"
                                                    error={errors.title}
                                                    touch={touched.title}
                                                />
                                                <InputField
                                                    labelName="Package Description"
                                                    placeholder="Package Description"
                                                    name="description"
                                                    as="textarea"
                                                    error={errors.description}
                                                    touch={touched.description}
                                                />

                                                <AddRequirements
                                                    onSubmit={(requirements) =>
                                                        setFieldValue(
                                                            "service_offered",
                                                            requirements
                                                        )
                                                    }
                                                    title="Services Offered"
                                                    description="Add services which you Offer"
                                                />
                                                <InputField
                                                    name="budget"
                                                    labelName="Price"
                                                    placeHolder="Price"
                                                    error={errors.budget}
                                                    touch={touched.budget}
                                                />
                                                <InputField
                                                    type={"number"}
                                                    name="no_of_revisions"
                                                    labelName="Number of Revisions"
                                                    placeHolder="No. of Revisions"
                                                    error={
                                                        errors.no_of_revisions
                                                    }
                                                    touch={
                                                        touched.no_of_revisions
                                                    }
                                                />
                                                <SelectInputField
                                                    name="discount_type"
                                                    labelName="Discount Type"
                                                    touch={
                                                        touched.discount_type
                                                    }
                                                    error={errors.discount_type}
                                                    placeHolder="Select Discount Type"
                                                    options={discountOptions}
                                                />
                                                <InputField
                                                    name="discount_value"
                                                    labelName={
                                                        values.discount_type ===
                                                        "amount"
                                                            ? "Discount Value"
                                                            : "Discount Percentage"
                                                    }
                                                    placeHolder={
                                                        values.discount_type ===
                                                        "amount"
                                                            ? "Enter discount Value"
                                                            : "Enter discount Percentage"
                                                    }
                                                    error={
                                                        errors.discount_value
                                                    }
                                                    touch={
                                                        touched.discount_value
                                                    }
                                                />
                                                <Row>
                                                    <Col md={3}>
                                                        <div className="checkbox">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    checked
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                            Additional Revision
                                                        </div>
                                                    </Col>
                                                    <Col md={2}>
                                                        <div className="checkbox">
                                                            <input
                                                                name="is_active"
                                                                type="checkbox"
                                                                onChange={() => {
                                                                    setFieldValue(
                                                                        "is_active",
                                                                        !values.is_active
                                                                    );
                                                                }}
                                                            />
                                                            Is Active
                                                        </div>
                                                    </Col>
                                                    <Col md={3}>
                                                        <div className="checkbox">
                                                            <input
                                                                name="is_recommended"
                                                                type="checkbox"
                                                                onChange={() => {
                                                                    setFieldValue(
                                                                        "is_recommended",
                                                                        !values.is_recommended
                                                                    );
                                                                }}
                                                            />
                                                            Is Recommended
                                                        </div>
                                                    </Col>
                                                </Row>

                                                {/* {checked && (
                                                    <Row>
                                                        <Col md={6} sm={12}>
                                                            <InputField
                                                                name="revision_price"
                                                                labelName="Revision Price"
                                                                placeHolder="Revision Price"
                                                                error={
                                                                    errors.revision_price
                                                                }
                                                                touch={
                                                                    touched.revision_price
                                                                }
                                                            />
                                                        </Col>
                                                        <Col md={6} sm={12}>
                                                            <SelectInputField
                                                                name="revision_day"
                                                                labelName="Revision Day"
                                                                placeHolder="Select Revision Day"
                                                                error={
                                                                    errors.revision_day
                                                                }
                                                                touch={
                                                                    touched.revision_day
                                                                }
                                                                options={
                                                                    allOptions
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                )} */}
                                                <span className="add-more-button">
                                                    <FormButton
                                                        name={
                                                            "+ add more package"
                                                        }
                                                    />
                                                </span>

                                                <div className="d-flex justify-content-end next-button">
                                                    <span className="previous-step-button">
                                                        <BigButton
                                                            btnTitle={
                                                                "Previous Step"
                                                            }
                                                            backgroundColor={
                                                                "#fff"
                                                            }
                                                            textColor="black"
                                                            handleClick={
                                                                handlePrev
                                                            }
                                                        />
                                                    </span>
                                                    <BigButton
                                                        btnTitle={"Next"}
                                                        backgroundColor={
                                                            "#211D4F"
                                                        }
                                                        textColor="#fff"
                                                        handleClick={() =>
                                                            handleNext(values)
                                                        }
                                                    />
                                                </div>
                                            </Form>
                                        </>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                        <Col md={5} sm={12}>
                            <ServiceVideo
                                title="How to create Packages? "
                                upperDescription="Watch this video to get help for your services"
                                videoId="gfWr2_H39N0"
                                lowerDescription="Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.  Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum."
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};
