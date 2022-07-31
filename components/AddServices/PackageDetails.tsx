import BigButton from "@components/common/Button";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SelectOptionProps } from "types/selectInputField";

import { ServiceVideo } from "./ServiceVideo";

interface PackageDetailsProps {
    handlePrev: () => void;
    handleNext: () => void;
}

export const PackageDetails = ({
    handlePrev,
    handleNext,
}: PackageDetailsProps) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    const packageDetailsData = {
        package_title: "",
        package_description: "",
        service_offered: "",
        package_price: "",
        package_revisions: "",
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
                            <div className="service-form-body">
                                <Formik
                                    initialValues={packageDetailsData}
                                    onSubmit={() => {}}
                                >
                                    {({ errors, touched }) => (
                                        <>
                                            <Form>
                                                <h3>Package Details</h3>
                                                <InputField
                                                    labelName="Package Title"
                                                    placeHolder="package title"
                                                    name="package_title"
                                                />
                                                <InputField
                                                    labelName="Package Description"
                                                    placeholder="Package Description"
                                                    name="package_description"
                                                    as="textarea"
                                                />
                                                <h5>Services Offered </h5>
                                                <h6>
                                                    Add services which you Offer
                                                </h6>
                                                <InputField
                                                    name="package_price"
                                                    labelName="Price"
                                                    placeHolder="Price"
                                                />
                                                <SelectInputField
                                                    name="package_revisions"
                                                    labelName="Revisions"
                                                    placeHolder="Select Revisions"
                                                    options={options}
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
                                                            />
                                                        </Col>
                                                        <Col md={6} sm={12}>
                                                            <SelectInputField
                                                                name="revision_day"
                                                                labelName="Revision Day"
                                                                placeHolder="Select Revision Day"
                                                                options={
                                                                    options
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                )}
                                                <Link href="">
                                                    <a>Create More Package</a>
                                                </Link>
                                                <div className="d-flex justify-content-end next-button">
                                                    <BigButton
                                                        btnTitle={"Go Back"}
                                                        backgroundColor={"#fff"}
                                                        textColor="black"
                                                        handleClick={handlePrev}
                                                    />
                                                    <BigButton
                                                        btnTitle={"Next"}
                                                        backgroundColor={
                                                            "#211D4F"
                                                        }
                                                        textColor="#fff"
                                                        handleClick={handleNext}
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
