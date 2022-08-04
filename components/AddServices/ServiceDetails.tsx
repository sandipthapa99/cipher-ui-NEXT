import BigButton from "@components/common/Button";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { SelectOptionProps } from "types/selectInputField";

import { ServiceVideo } from "./ServiceVideo";

interface ServiceDetailsProps {
    handleNext: () => void;
}

export const ServiceDetails = ({ handleNext }: ServiceDetailsProps) => {
    const [reqList, setReqList] = useState([]);

    const serviceDetailsData = {
        service_title: "",
        service_description: "",
        service_type: "",
        category: "",
        sub_category: "",
        requirements: "",
    };
    const options: SelectOptionProps[] = [
        {
            id: 1,
            value: "House Keeping",
            label: "House Keeping",
        },
    ];
    return (
        <section id="service-details-section" className="service-details">
            <Container>
                <div className="service-details-body">
                    <Row>
                        <Col md={7} sm={12}>
                            <div className="service-form-body">
                                <Formik
                                    initialValues={serviceDetailsData}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({ setFieldValue, errors, touched }) => (
                                        <>
                                            <Form>
                                                <h3>Service Details</h3>
                                                <InputField
                                                    labelName="Service Title"
                                                    placeHolder="service title"
                                                    name="service_title"
                                                />

                                                <InputField
                                                    labelName="Description"
                                                    placeholder="Service Description"
                                                    name="service_description"
                                                    as="textarea"
                                                />

                                                <SelectInputField
                                                    name="service_type"
                                                    labelName="Service Type"
                                                    placeHolder="Choose Service Type"
                                                    options={options}
                                                />

                                                <SelectInputField
                                                    name="category"
                                                    labelName="Category"
                                                    placeHolder="Choose Category"
                                                    options={options}
                                                />

                                                <AddRequirements
                                                    onSubmit={(requirements) =>
                                                        setFieldValue(
                                                            "reuqirement",
                                                            requirements
                                                        )
                                                    }
                                                    title="Requirement"
                                                    description="Add services which you Offer"
                                                />

                                                <InputField
                                                    labelName="Starting Price"
                                                    placeholder="Starting Price"
                                                    name="starting_price"
                                                />

                                                <SelectInputField
                                                    name="no_of_revisioins"
                                                    labelName="Number of Revisions"
                                                    placeHolder="No. of Revisions"
                                                    options={options}
                                                />

                                                <div className="d-flex justify-content-end next-button">
                                                    <BigButton
                                                        btnTitle={"Next Step"}
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
                                title="How to ?"
                                upperDescription="Watch this video to get help for your services"
                                videoId="bNvFLRPuhJs"
                                lowerDescription="Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.  Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum."
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};
