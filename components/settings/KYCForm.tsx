import { CustomDropZone } from "@components/common/CustomDropZone";
import DatePickerField from "@components/common/DateTimeField";
import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useKYC } from "hooks/profile/kyc/useKYC";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import { KYCFormSchema } from "utils/formValidation/kycFormValidationSchema";
import { isSubmittingClass } from "utils/helpers";

const dropdownCountryOptions = [
    { id: 1, label: "Citizenship ", value: "citizenship" },
    { id: 2, label: "Passport", value: "passport" },
    { id: 3, label: "Pan Card", value: "pancard" },
];

const KYCForm = () => {
    const toggleSuccessModal = useToggleSuccessModal();
    const { data: KYCData } = useGetKYC();
    console.log(KYCData);
    const { mutate } = useKYC();
    const [kycData, setKycData] = useState("");

    const getKYCData = (data: string) => {
        setKycData(data);
    };
    console.log(kycData);

    return (
        <>
            {/* Modal component */}
            <div className="account-form mt-5">
                <h3>KYC Details</h3>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        full_name: KYCData?.full_name ?? "",
                        identity_type: KYCData?.identity_type ?? "",
                        identity_id: KYCData?.identity_id ?? "",
                        identity_issued_date:
                            KYCData && KYCData.identity_issued_date
                                ? parseISO(KYCData.identity_issued_date)
                                : "",
                        identity_valid_through:
                            KYCData && KYCData.identity_valid_through
                                ? parseISO(KYCData.identity_valid_through)
                                : "",
                        identity_issuer_organization:
                            KYCData?.identity_issuer_organization ?? "",
                        identity_card_file: "",
                        pan_number: KYCData?.pan_number ?? null,
                        pan_issued_from: KYCData?.pan_issued_from ?? "",
                        pan_issued_date:
                            KYCData && KYCData.pan_issued_date
                                ? parseISO(KYCData.pan_issued_date)
                                : "",
                        pan_card_file: "",
                        passport_size_photo: "",
                        personal_address_verification_document: "",
                        bank_name: KYCData?.bank_name ?? "",
                        bank_account_name: KYCData?.bank_account_name ?? "",
                        bank_account_number: KYCData?.bank_account_number ?? "",
                    }}
                    validationSchema={KYCFormSchema}
                    onSubmit={async (values, action) => {
                        const formData = new FormData();

                        console.log(values);
                        const newvalidatedValue = {
                            ...values,
                            identity_issued_date: format(
                                new Date(values.identity_issued_date),
                                "yyyy-MM-dd"
                            ),
                            identity_valid_through: format(
                                new Date(values.identity_valid_through),
                                "yyyy-MM-dd"
                            ),
                            pan_issued_date: format(
                                new Date(values.pan_issued_date),
                                "yyyy-MM-dd"
                            ),
                        };
                        Object.entries(newvalidatedValue).forEach((entry) => {
                            const restrictedkey = [
                                "identity_card_file",
                                "pan_card_file",
                                "passport_size_photo",
                                "personal_address_verification_document",
                            ];
                            const [key, value] = entry;
                            if (value && !restrictedkey.includes(key)) {
                                formData.append(key, value.toString());
                            }
                        });
                        formData.append(
                            "identity_card_file",
                            values.identity_card_file
                        );
                        formData.append("pan_card_file", values.pan_card_file);
                        formData.append(
                            "passport_size_photo",
                            values.passport_size_photo
                        );
                        formData.append(
                            "personal_address_verification_document",
                            values.personal_address_verification_document
                        );

                        mutate(formData, {
                            onSuccess: () => {
                                toggleSuccessModal();
                            },
                            onError: (error) => {
                                toast.error(error.message);
                            },
                        });
                        action.resetForm();
                    }}
                >
                    {({
                        isSubmitting,
                        errors,
                        touched,
                        resetForm,
                        setFieldValue,
                    }) => (
                        <Form autoComplete="off">
                            {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                            <InputField
                                type="text"
                                name="full_name"
                                labelName="Name"
                                error={errors.full_name}
                                touch={touched.full_name}
                                placeHolder="Enter your Full Name"
                            />
                            <h5>Identity Information</h5>
                            <Col md={5}>
                                <SelectInputField
                                    name="identity_type"
                                    labelName="Identity Type"
                                    touch={touched.identity_type}
                                    error={errors.identity_type}
                                    placeHolder="Select Identity Type"
                                    options={dropdownCountryOptions}
                                    getData={getKYCData}
                                />
                            </Col>
                            {kycData === "citizenship" && (
                                <>
                                    <Row>
                                        <Col lg={5} md={6}>
                                            <InputField
                                                name="identity_id"
                                                labelName="Identity Number"
                                                error={errors.identity_id}
                                                touch={touched.identity_id}
                                                placeHolder="Enter your identity Number"
                                            />
                                            <DatePickerField
                                                name="identity_issued_date"
                                                labelName="Issued date"
                                                placeHolder="dd/mm/yy"
                                                touch={
                                                    touched.identity_issued_date
                                                }
                                                error={
                                                    errors.identity_issued_date
                                                }
                                            />
                                        </Col>
                                        <Col lg={{ span: 5, offset: 2 }} md={6}>
                                            <InputField
                                                name="identity_issuer_organization"
                                                labelName="Issued From"
                                                placeHolder="dd/mm/yy"
                                                touch={
                                                    touched.identity_issuer_organization
                                                }
                                                error={
                                                    errors.identity_issuer_organization
                                                }
                                            />
                                            <DatePickerField
                                                name="identity_valid_through"
                                                labelName="Expiry Date"
                                                placeHolder="dd/mm/yy"
                                                touch={
                                                    touched.identity_valid_through
                                                }
                                                error={
                                                    errors.identity_valid_through
                                                }
                                            />
                                        </Col>
                                    </Row>

                                    <h4>Identity Card</h4>
                                    <p>
                                        Document can be Citizenship Card or
                                        Driving License or Passport{" "}
                                    </p>
                                    <Col md={5}>
                                        {/* <DragDrop
                                    name="identity_card_file"
                                    image="/service-details/file-upload.svg"
                                    fileType="Image/Video"
                                    maxImageSize={20}
                                    maxVideoSize={200}
                                    field={setFieldValue}
                                /> */}
                                        <CustomDropZone
                                            name="identity_card_file"
                                            maxSize={200}
                                            minSize={20}
                                            onDrop={(files) =>
                                                console.log(files)
                                            }
                                        />
                                    </Col>
                                    <hr />
                                </>
                            )}
                            {kycData === "pancard" && (
                                <>
                                    <h5>PAN/VAT Information </h5>
                                    <Row>
                                        <Col lg={5} md={6}>
                                            <InputField
                                                type="text"
                                                name="pan_number"
                                                labelName="PAN Number"
                                                error={errors.pan_number}
                                                touch={touched.pan_number}
                                                placeHolder="Enter your Pan Number"
                                            />
                                            <DatePickerField
                                                name="pan_issued_date"
                                                labelName="Issued Date"
                                                placeHolder="dd/mm/yy"
                                                touch={touched.pan_issued_date}
                                                error={errors.pan_issued_date}
                                            />
                                        </Col>
                                        <Col lg={{ span: 5, offset: 2 }} md={6}>
                                            <InputField
                                                type="text"
                                                name="pan_issued_from"
                                                labelName="Issued Loaction"
                                                error={errors.pan_issued_from}
                                                touch={touched.pan_issued_from}
                                                placeHolder="Enter your Issued Loaction"
                                            />
                                        </Col>
                                    </Row>

                                    <h4>PAN/ VAT Card</h4>
                                    <p>Document can be PAN or VAT Card </p>
                                    <Col md={5}>
                                        {/* <DragDrop
                                    name="pan_card_file"
                                    image="/service-details/file-upload.svg"
                                    fileType="Image/Video"
                                    maxImageSize={20}
                                    maxVideoSize={200}
                                    field={setFieldValue}
                                /> */}
                                        <CustomDropZone
                                            name="pan_card_file"
                                            maxSize={200}
                                            minSize={20}
                                            onDrop={(files) =>
                                                console.log(files)
                                            }
                                        />
                                    </Col>

                                    <hr />
                                </>
                            )}
                            <Row>
                                <Col lg={5} md={6}>
                                    <h5>Passport Size Photo</h5>
                                    <p>
                                        Upload your recent passport sized
                                        picture
                                    </p>
                                    {/* <DragDrop
                                        name="passport_size_photo"
                                        image="/service-details/file-upload.svg"
                                        fileType="Image/Video"
                                        maxImageSize={20}
                                        maxVideoSize={200}
                                        field={setFieldValue}
                                    /> */}
                                    <CustomDropZone
                                        name="passport_size_photo"
                                        maxSize={200}
                                        minSize={20}
                                        onDrop={(files) => console.log(files)}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <h5>Address Verification Document</h5>
                                    <p>
                                        Document can be Electricity Bill, Water
                                        Bill, Rental Aggrement.
                                    </p>
                                    <CustomDropZone
                                        name="personal_address"
                                        onDrop={(formData) =>
                                            console.log(
                                                "onDroppedImageConvert",
                                                formData.get("personal_address")
                                            )
                                        }
                                    />
                                    {/* <DragDrop
                                        name="personal_address_verification_document"
                                        image="/service-details/file-upload.svg"
                                        fileType="Image/Video"
                                        maxImageSize={20}
                                        maxVideoSize={200}
                                        field={setFieldValue}
                                    /> */}
                                </Col>
                            </Row>
                            <hr />
                            <h5>Bank Details (Optional)</h5>
                            <Col md={5}>
                                <InputField
                                    name="bank_name"
                                    labelName="Bank Name"
                                    error={errors.bank_name}
                                    touch={touched.bank_name}
                                    placeHolder="Enter your Account Name"
                                />
                            </Col>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        name="bank_account_name"
                                        labelName="Bank Account Name"
                                        error={errors.bank_account_name}
                                        touch={touched.bank_account_name}
                                        placeHolder="Enter bank Account Name"
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <InputField
                                        type="text"
                                        name="bank_account_number"
                                        labelName="Bank Account Number"
                                        error={errors.bank_account_number}
                                        touch={touched.bank_account_number}
                                        placeHolder="Enter your Account Number"
                                    />
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <Button
                                    className="me-3 mb-0 cancel-btn"
                                    onClick={() => resetForm}
                                >
                                    Cancel
                                </Button>
                                <FormButton
                                    type="submit"
                                    variant="primary"
                                    name="Save"
                                    className="submit-btn w-25"
                                    isSubmitting={isSubmitting}
                                    isSubmittingClass={isSubmittingClass(
                                        isSubmitting
                                    )}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};
export default KYCForm;
