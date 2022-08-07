import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PackageOffersCard from "@components/common/packageCard";
import SelectInputField from "@components/common/SelectInputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { SelectOptionProps } from "types/selectInputField";
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

    const handleChange = () => {
        setChecked(!checked);
    };

    const packageDetailsData = {
        package_title: "",
        package_description: "",
        service_offered: "",
        package_price: "",
        package_revisions_number: "",
        revision_price: "",
        revision_day: "",
    };
    const options: SelectOptionProps[] = [
        {
            id: 1,
            value: "House Keeping",
            label: "House Keeping",
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
                                            title={item?.package_title}
                                            price={item?.package_price}
                                            offers={item?.services}
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
                                    validationSchema={addServiceFormSchema}
                                    onSubmit={(values) => {
                                        console.log(values);
                                        setPackageArray((prev) => {
                                            return prev.length < 3
                                                ? [...prev, values]
                                                : prev;
                                        });
                                    }}
                                >
                                    {({
                                        setFieldValue,
                                        isSubmitting,
                                        errors,
                                        touched,
                                        values,
                                    }) => (
                                        <>
                                            <Form>
                                                <h3>Package Details</h3>
                                                <InputField
                                                    labelName="Package Title"
                                                    placeHolder="package title"
                                                    name="package_title"
                                                    error={errors.package_title}
                                                    touch={
                                                        touched.package_title
                                                    }
                                                />
                                                <InputField
                                                    labelName="Package Description"
                                                    placeholder="Package Description"
                                                    name="package_description"
                                                    as="textarea"
                                                    error={
                                                        errors.package_description
                                                    }
                                                    touch={
                                                        touched.package_description
                                                    }
                                                />

                                                <AddRequirements
                                                    onSubmit={(requirements) =>
                                                        setFieldValue(
                                                            "services",
                                                            requirements
                                                        )
                                                    }
                                                    title="Services Offered"
                                                    description="Add services which you Offer"
                                                />
                                                <InputField
                                                    name="package_price"
                                                    labelName="Price"
                                                    placeHolder="Price"
                                                    error={errors.package_price}
                                                    touch={
                                                        touched.package_price
                                                    }
                                                />
                                                <SelectInputField
                                                    name="package_revisions_number"
                                                    labelName="Number of Revisions"
                                                    placeHolder="No. of Revisions"
                                                    options={options}
                                                    error={
                                                        errors.package_revisions_number
                                                    }
                                                    touch={
                                                        touched.package_revisions_number
                                                    }
                                                />
                                                <div className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={handleChange}
                                                    />
                                                    Additional Revision
                                                </div>

                                                {checked && (
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
                                                                    options
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                )}
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
