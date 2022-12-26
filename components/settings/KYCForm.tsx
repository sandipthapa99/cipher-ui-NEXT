import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import { Form, Formik } from "formik";
import { useCountry } from "hooks/dropdown/useCountry";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useKYC } from "hooks/profile/kyc/useKYC";
import { useGetProfile } from "hooks/profile/useGetProfile";
import React from "react";
import Button from "react-bootstrap/Button";
import { KYCFormSchema } from "utils/formValidation/kycFormValidationSchema";
import { getFullName } from "utils/getFullName";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

import { IdentityDocument } from "./IdentityDocument";

// const dropdownCountryOptions = [
//     { id: 1, label: "Citizenship ", value: "citizenship" },
//     { id: 2, label: "Passport", value: "passport" },
//     { id: 3, label: "Pan Card", value: "pancard" },
// ];

const KYCForm = () => {
    const { data: KYCData, refetch: refetchKycData } = useGetKYC();

    const { mutate } = useKYC();
    const { data: countryName } = useCountry();
    // const [showDocument, setShowDocument] = useState(false);
    // const [showButtons, setShowButtons] = useState(false);

    const { data: profileDetails } = useGetProfile();

    const countryResults: SelectItem[] = countryName
        ? countryName?.map((result) => ({
              label: result?.name,
              value: result?.code,
          }))
        : ([] as SelectItem[]);
    //handle country change
    const handleCountryChanged = (
        code: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        if (code) setFieldValue("country", code);
    };
    const country = profileDetails?.country
        ? profileDetails?.country?.code
        : "";

    // const foundCountry = countryResults.find((item) => item.label === country);
    // const [showKYCRead, setShowKYCRead] = useState(false);

    console.log(profileDetails);

    if (!profileDetails) return null;
    return (
        <>
            {/* Modal component */}

            <div
                className="account-form mt-5"
                id="kycform"
                style={{ scrollMarginTop: "10rem" }}
            >
                {!KYCData?.is_kyc_verified && (
                    <>
                        <h3>KYC Details</h3>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                full_name: KYCData
                                    ? KYCData?.full_name
                                    : profileDetails?.user
                                    ? getFullName(profileDetails.user)
                                    : "",
                                address: KYCData
                                    ? KYCData?.address
                                    : profileDetails?.address_line1
                                    ? profileDetails.address_line1
                                    : "",
                                country: KYCData
                                    ? KYCData?.country
                                    : profileDetails?.country
                                    ? profileDetails?.country?.code
                                    : "",
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
                                mutate(values, {
                                    onSuccess: () => {
                                        // toggleSuccessModal();
                                        refetchKycData();
                                        toast.success(
                                            "KYC Details Added Successfully and Add a verification document"
                                        );

                                        //queryClient.invalidateQueries(["GET_KYC"]);
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
                                getFieldProps,
                            }) => (
                                <Form autoComplete="off">
                                    <InputField
                                        type="text"
                                        name="full_name"
                                        labelName="Name"
                                        error={errors.full_name}
                                        touch={touched.full_name}
                                        placeHolder="Enter your Full Name"
                                        disabled={
                                            KYCData?.full_name ? true : false
                                        }
                                        // disabled={
                                        //     profileDetails?.full_name ? true : false
                                        // }
                                    />
                                    <PlacesAutocomplete
                                        {...getFieldProps("address")}
                                        error={
                                            touched.address && errors.address
                                                ? errors.address
                                                : ""
                                        }
                                        size="md"
                                        label="Address"
                                        placeholder="Enter your address"
                                        onPlaceChange={(place) =>
                                            setFieldValue("address", place)
                                        }
                                        disabled={
                                            KYCData?.address ? true : false
                                        }
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
                                        placeholder="Pick One"
                                        name="country"
                                        defaultValue={country}
                                        data={countryResults ?? []}
                                        searchable
                                        onChange={(value) =>
                                            handleCountryChanged(
                                                value,
                                                setFieldValue
                                            )
                                        }
                                        disabled={
                                            KYCData?.country ? true : false
                                        }
                                        error={errors.country}
                                    />
                                    {/* <Select
                                        label="Country"
                                        placeholder="Pick one"
                                        name="country"
                                        value={country}
                                        searchable
                                        nothingFound="No result found."
                                        onChange={(value) =>
                                            handleCountryChanged(
                                                value,
                                                setFieldValue
                                            )
                                        }
                                        data={countryResults ?? []}
                                        disabled={
                                            KYCData?.country ? true : false
                                        }
                                        error={errors.country}
                                    /> */}

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
                                            //
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
                                            //
                                        }
                                    />
                                </Col>
                            </Row> */}
                                    {/* {showButtons ? ( */}
                                    {!KYCData && (
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
                                    )}
                                </Form>
                            )}
                        </Formik>
                        <div>
                            <hr />
                            {KYCData && <IdentityDocument />}
                        </div>
                    </>
                )}

                {/* {(showDocument || KYCData) && <IdentityDocument />} */}
            </div>
            {/* {KYCData && <KYCStatus />} */}
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
            />
        </>
    );
};
export default KYCForm;
