import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import { Form, Formik } from "formik";
import { useCountry } from "hooks/dropdown/useCountry";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useKYC } from "hooks/profile/kyc/useKYC";
import { useGetProfile } from "hooks/profile/useGetProfile";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { KYCFormSchema } from "utils/formValidation/kycFormValidationSchema";
import { isSubmittingClass } from "utils/helpers";

import { IdentityDocument } from "./IdentityDocument";

// const dropdownCountryOptions = [
//     { id: 1, label: "Citizenship ", value: "citizenship" },
//     { id: 2, label: "Passport", value: "passport" },
//     { id: 3, label: "Pan Card", value: "pancard" },
// ];

const KYCForm = () => {
    const { data: KYCData } = useGetKYC();

    const { mutate } = useKYC();
    const { data: countryName } = useCountry();
    const [showDocument, setShowDocument] = useState(false);
    // const [showButtons, setShowButtons] = useState(false);

    const { data: profileDetails } = useGetProfile();
    const [countryChange, setCountryChange] = useState<string | null>(null);

    const countryResults: SelectItem[] = countryName
        ? countryName.result.map((result) => ({
              label: result?.name,
              value: result?.id.toString(),
              id: result?.id,
          }))
        : ([] as SelectItem[]);
    //handle country change
    const handleCountryChanged = (
        id: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setCountryChange(id);
        if (id) setFieldValue("country", parseInt(id));
    };
    const country = profileDetails?.country ? profileDetails?.country : "";

    const foundCountry = countryResults.find((item) => item.label === country);

    return (
        <>
            {/* Modal component */}
            <div
                className="account-form mt-5"
                style={
                    profileDetails ? { display: "block" } : { display: "none" }
                }
            >
                <h3>KYC Details</h3>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        full_name: KYCData ? KYCData?.full_name : "",
                        address: KYCData ? KYCData?.address : "",
                        country: KYCData ? KYCData?.country : "",
                        company: KYCData ? KYCData?.company : "",
                        // passport_size_photo: "",
                        // personal_address_verification_document: "",
                        // bank_name: KYCData?.bank_name ?? "",
                        // bank_account_name: KYCData?.bank_account_name ?? "",
                        // bank_account_number: KYCData?.bank_account_number ?? "",
                        // bank_address: KYCData?.bank_address ?? "",
                    }}
                    validationSchema={KYCFormSchema}
                    onSubmit={async (values, action) => {
                        // const formData = new FormData();

                        console.log(values);
                        // const newvalidatedValue = {
                        //     ...values,
                        //     identity_issued_date: format(
                        //         new Date(values.identity_issued_date),
                        //         "yyyy-MM-dd"
                        //     ),
                        //     identity_valid_through: format(
                        //         new Date(values.identity_valid_through),
                        //         "yyyy-MM-dd"
                        //     ),
                        //     pan_issued_date: format(
                        //         new Date(values.pan_issued_date),
                        //         "yyyy-MM-dd"
                        //     ),
                        // };
                        // Object.entries(values).forEach((entry) => {
                        //     const [key, value] = entry;
                        //     if (value && key !== "passport_size_photo") {
                        //         formData.append(key, value.toString());
                        //     }
                        // });
                        // formData.append(
                        //     "passport_size_photo",
                        //     values.passport_size_photo
                        // );
                        // Object.entries(values).forEach((entry) => {
                        //     const [key, value] = entry;
                        //     if (
                        //         value &&
                        //         key !== "personal_address_verification_document"
                        //     ) {
                        //         formData.append(key, value.toString());
                        //     }
                        // });
                        // formData.append(
                        //     "personal_address_verification_document",
                        //     values.personal_address_verification_document
                        // );

                        mutate(values, {
                            onSuccess: () => {
                                // toggleSuccessModal();
                                toast.success("KYC Details Added Successfully");
                                setShowDocument(true);
                                // setShowButtons(false);
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
                                // disabled={
                                //     profileDetails?.full_name ? true : false
                                // }
                            />
                            <InputField
                                type="text"
                                name="address"
                                labelName="Address"
                                error={errors.address}
                                touch={touched.address}
                                placeHolder="Enter your Address"
                                // disabled={
                                //     profileDetails?.address_line1 ? true : false
                                // }
                            />
                            {/* <SelectInputField
                                name="country"
                                labelName="Country"
                                touch={touched.country}
                                error={errors.country}
                                placeHolder="Select Identity Type"
                                options={countryResults}
                                disabled={KYCData?.country ? true : false}
                            /> */}
                            <Select
                                label="Country"
                                placeholder="Pick one"
                                name="country"
                                // disabled={
                                //     profileDetails?.country ? true : false
                                // }
                                searchable
                                nothingFound="No result found."
                                // value={
                                //     profileDetails
                                //         ? foundCountry?.value
                                //         : countryChange
                                // }
                                onChange={(value) =>
                                    handleCountryChanged(value, setFieldValue)
                                }
                                data={countryResults ?? []}
                            />

                            {/* <h5>Bank Details (Optional)</h5>
                            <InputField
                                name="bank_name"
                                labelName="Bank Name"
                                error={errors.bank_name}
                                touch={touched.bank_name}
                                placeHolder="Enter your Account Name"
                            />
                            <InputField
                                name="bank_address"
                                labelName="Bank Address"
                                error={errors.bank_address}
                                touch={touched.bank_address}
                                placeHolder="Enter your bank address"
                            />
                            <Col md={5}></Col>
                            <Row className="gap-5">
                                <Col lg={5} md={6}>
                                    <InputField
                                        name="bank_account_name"
                                        labelName="Bank Account Name"
                                        error={errors.bank_account_name}
                                        touch={touched.bank_account_name}
                                        placeHolder="Enter bank Account Name"
                                    />
                                </Col>
                                <Col lg={5} md={8}>
                                    <InputField
                                        type="text"
                                        name="bank_account_number"
                                        labelName="Bank Account Number"
                                        error={errors.bank_account_number}
                                        touch={touched.bank_account_number}
                                        placeHolder="Enter your Account Number"
                                    />
                                </Col>
                            </Row> */}

                            {/* <Row>
                                <Col lg={5} md={6}>
                                    <h5>Passport Size Photo</h5>
                                    <p>
                                        Upload your recent passport sized
                                        picture
                                    </p>
                                    <CustomDropZone
                                        name="passport_size_photo"
                                        maxSize={200}
                                        minSize={20}
                                        onDrop={
                                            (formData) =>
                                                setFieldValue(
                                                    "passport_size_photo",
                                                    formData.get(
                                                        "passport_size_photo"
                                                    )
                                                )
                                            // console.log(formData.get("file"))
                                        }
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
                                        onDrop={
                                            (formData) =>
                                                setFieldValue(
                                                    "personal_address",
                                                    formData.get(
                                                        "personal_address"
                                                    )
                                                )
                                            // console.log(formData.get("file"))
                                        }
                                    />
                                </Col>
                            </Row> */}
                            {/* {showButtons ? ( */}
                            <div className="d-flex mt-5 justify-content-end">
                                <Button
                                    className="me-3 mb-0 cancel-btn"
                                    onClick={() => resetForm}
                                >
                                    Cancel
                                </Button>
                                <FormButton
                                    type="submit"
                                    variant="primary"
                                    name="Continue"
                                    className="submit-btn"
                                    isSubmitting={isSubmitting}
                                    isSubmittingClass={isSubmittingClass(
                                        isSubmitting
                                    )}
                                />
                            </div>
                            {/* ) : (
                                ""
                            )} */}
                        </Form>
                    )}
                </Formik>
                <IdentityDocument />
                {/* {(showDocument || KYCData) && <IdentityDocument />} */}
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
