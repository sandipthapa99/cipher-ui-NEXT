import BigButton from "@components/common/Button";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { Form, Formik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import type { SelectOptionProps } from "types/selectInputField";
import { addServiceFormSchema } from "utils/formValidation/addServiceFormValidation";

import { ServiceVideo } from "./ServiceVideo";

interface ServiceDetailsProps {
    handleNext: (data: unknown) => void;
}

export const ServiceDetails = ({ handleNext }: ServiceDetailsProps) => {
    const serviceDetailsData = {
        service_title: "",
        service_description: "",
        service_type: "",
        service_category: "",
        starting_price: "",
        revision_number: "",
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
                                    validationSchema={addServiceFormSchema}
                                    onSubmit={() => {
                                        //  console.log(values);
                                    }}
                                >
                                    {({
                                        setFieldValue,
                                        errors,
                                        touched,
                                        values,
                                    }) => (
                                        <>
                                            <Form>
                                                <h3>Service Details</h3>
                                                <InputField
                                                    labelName="Service Title"
                                                    placeHolder="service title"
                                                    name="service_title"
                                                    error={errors.service_title}
                                                    touch={
                                                        touched.service_title
                                                    }
                                                />

                                                <InputField
                                                    labelName="Description"
                                                    placeholder="Service Description"
                                                    name="service_description"
                                                    as="textarea"
                                                    error={
                                                        errors.service_description
                                                    }
                                                    touch={
                                                        touched.service_description
                                                    }
                                                />

                                                <SelectInputField
                                                    name="service_type"
                                                    labelName="Service Type"
                                                    placeHolder="Choose Service Type"
                                                    options={options}
                                                    error={errors.service_type}
                                                    touch={touched.service_type}
                                                />

                                                <SelectInputField
                                                    name="service_category"
                                                    labelName="Category"
                                                    placeHolder="Choose Category"
                                                    options={options}
                                                    error={
                                                        errors.service_category
                                                    }
                                                    touch={
                                                        touched.service_category
                                                    }
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
                                                    error={
                                                        errors.starting_price
                                                    }
                                                    touch={
                                                        touched.starting_price
                                                    }
                                                />

                                                <SelectInputField
                                                    name="revision_number"
                                                    labelName="Number of Revisions"
                                                    placeHolder="No. of Revisions"
                                                    options={options}
                                                    error={
                                                        errors.revision_number
                                                    }
                                                    touch={
                                                        touched.revision_number
                                                    }
                                                />

                                                <div className="d-flex justify-content-end next-button">
                                                    <BigButton
                                                        btnTitle={"Next Step"}
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
