import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import { Form, Formik } from "formik";
import { useCountry } from "hooks/dropdown/useCountry";
import type { KYCResponse } from "hooks/profile/kyc/useGetKYC";
import { useKYC } from "hooks/profile/kyc/useKYC";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import React from "react";
import Button from "react-bootstrap/Button";
import { KYCFormSchema } from "utils/formValidation/kycFormValidationSchema";
import { getFullName } from "utils/getFullName";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

import { IdentityDocument } from "./IdentityDocument";

const KYCForm = () => {
    const { mutate } = useKYC();
    const { data: countryName } = useCountry();

    const { data: profileDetails } = useGetProfile();

    const { data: KYCDetails, refetch: refetchKycData } = useData<KYCResponse>(
        ["GET_KYC", profileDetails?.user?.id],
        "/tasker/my-kyc/",
        !!profileDetails?.user?.id
    );

    const KYCData = KYCDetails?.data;

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
                                        refetchKycData();
                                        toast.success(
                                            "KYC Details Added Successfully and Add a verification document"
                                        );
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

                                    <Select
                                        label="Country"
                                        placeholder="Pick One"
                                        name="country"
                                        value={country}
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
