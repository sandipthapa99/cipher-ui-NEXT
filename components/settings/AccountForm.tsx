import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import RadioField from "@components/common/RadioField";
import SelectInputField from "@components/common/SelectInputField";
import TagInputField from "@components/common/TagInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faCamera } from "@fortawesome/pro-light-svg-icons";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, parseISO } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useCountry } from "hooks/dropdown/useCountry";
import { useCurrency } from "hooks/dropdown/useCurrency";
import { useLanguage } from "hooks/dropdown/useLanguage";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useKYC } from "hooks/profile/kyc/useKYC";
import { useProfile } from "hooks/profile/profile";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { animateScroll as scroll } from "react-scroll";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import { formatTime } from "utils/FormatTime/formatTime";
import { accountFormSchema } from "utils/formValidation/accountFormValidation";
import { isSubmittingClass } from "utils/helpers";

import { FillKyc } from "./FillKyc";

const task_preferences = [
    { id: 1, label: "Part time", value: "partTime" },
    { id: 2, label: "Full Time", value: "fullTime" },
    { id: 3, label: "Freelance", value: "freelance" },
    { id: 4, label: "Remote", value: "remote" },
    { id: 5, label: "On Site", value: "onSite" },
];
const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
];
const experience = [
    { label: "Beginner (0 to 1 years experience)", value: "beginner" },
    {
        label: "Intermediate (2 to 4 years experience)",
        value: "intermediate",
    },
    { label: "Expert (5 or more years experience)", value: "expert" },
];
const profile_visibility = [
    {
        label: "To everyone",
        id: 1,
        value: "Public",
    },
    {
        id: 2,
        label: "To you only",
        value: "Private",
    },
];

const AccountForm = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const toggleSuccessModal = useToggleSuccessModal();
    const { mutate } = useProfile();
    const { data: currency } = useCurrency();
    const { data: language } = useLanguage();
    const { data: countryName } = useCountry();
    const { data: profile } = useGetProfile();
    const { data: KYCData } = useGetKYC();

    const inputRef = useRef<HTMLInputElement>(null);

    const skills = profile && profile.skill ? JSON.parse(profile.skill) : [];
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputRef?.current?.click();
    };

    const currencyResults = currency?.result.map((result) => ({
        label: result.code,
        value: result.id,
        id: result.id,
    }));
    const languageResults = language?.result.map((result) => ({
        label: result.name,
        value: result.id,
        id: result.id,
    }));
    const countryResults = countryName?.result.map((result) => ({
        label: result.name,
        value: result.id,
        id: result.id,
    }));
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToKyc = () => {
        scroll.scrollTo(2660);
    };
    console.log("hour", profile?.user_type);

    //converting string time value to datetime time value
    const start: string = profile?.active_hour_start
        ? profile?.active_hour_start.replace(":00", "")
        : "";
    const end: string = profile?.active_hour_end
        ? profile?.active_hour_end.replace(":00", "")
        : "";

    const endparsed = (
        parseInt(end) < 12 ? parseInt(end) + 12 : parseInt(end)
    ).toString();
    const finalend = `${endparsed}:${end?.substring(end.indexOf(":") + 1)}`;

    const endTime = finalend.toString();

    //parse user_type
    const userType = profile?.user_type ? JSON.parse(profile?.user_type) : "";
    return (
        <>
            {!KYCData ? <FillKyc onClick={scrollToKyc} /> : ""}
            {/* Modal component */}
            <div className="account-form">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        full_name: profile?.full_name ?? "",
                        phone: profile?.phone ?? "",
                        email: "",
                        bio: profile?.bio ?? "",
                        gender: profile?.gender ?? "",
                        date_of_birth:
                            profile && profile.date_of_birth
                                ? parseISO(profile.date_of_birth)
                                : "",
                        skill: "",
                        experience_level: profile?.experience_level ?? "",
                        active_hour_start: "" ?? "",
                        active_hour_end: "" ?? "",
                        hourly_rate: profile?.hourly_rate ?? "",
                        user_type: userType ?? "",
                        country: profile?.country ?? "",
                        education: "abc",
                        address_line1: profile?.address_line1 ?? "",
                        address_line2: profile?.address_line2 ?? "",
                        language: profile?.language ?? "",
                        charge_currency: profile?.charge_currency,
                        profile_visibility: profile?.profile_visibility ?? "",
                        task_preferences: profile?.task_preferences ?? "",
                        profile_image: "",
                    }}
                    validationSchema={accountFormSchema}
                    onSubmit={async (values, action) => {
                        const formData = new FormData();

                        console.log(values);

                        const newValidatedValues = {
                            ...values,
                            user_type: JSON.stringify(values.user_type),
                            skill: JSON.stringify(values.skill),
                            active_hour_start: new Date(
                                values.active_hour_start ?? ""
                            )?.toLocaleTimeString(),
                            active_hour_end: new Date(
                                values.active_hour_end ?? ""
                            )?.toLocaleTimeString(),
                            date_of_birth: format(
                                new Date(values.date_of_birth),
                                "yyyy-MM-dd"
                            ),
                        };

                        Object.entries(newValidatedValues).forEach((entry) => {
                            const [key, value] = entry;
                            if (value && key !== "profile_image") {
                                formData.append(key, value.toString());
                            }
                        });
                        formData.append("profile_image", values.profile_image);

                        mutate(formData, {
                            onSuccess: () => {
                                toggleSuccessModal();
                            },
                            onError: (err) => {
                                toast.error(err.message);
                            },
                        });

                        // setShowSuccessModal(true);
                    }}
                >
                    {({
                        isSubmitting,
                        errors,
                        touched,
                        values,
                        resetForm,
                        setFieldValue,
                    }) => (
                        <Form autoComplete="off">
                            {/* <pre>{JSON.stringify(errors, null, 4)}</pre>
                            <pre>{JSON.stringify(values, null, 4)}</pre> */}
                            <figure className="profile-img mx-auto">
                                <FontAwesomeIcon
                                    icon={faBadgeCheck}
                                    className="badge-icon"
                                />
                                {!profile && (
                                    <div
                                        className="img-dragdrop d-flex align-items-center justify-content-center"
                                        onClick={onButtonClick}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCamera}
                                            className="camera-icon"
                                        />
                                        <input
                                            hidden
                                            type="file"
                                            ref={inputRef}
                                            onChange={(e: any) => {
                                                const files = e.target.files;

                                                setFieldValue(
                                                    "profile_image",
                                                    files[0]
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                                <Image
                                    // src={"/userprofile/unknownPerson.jpg"}
                                    src={
                                        profile && profile.profile_image
                                            ? profile.profile_image
                                            : "/userprofile/unknownPerson.jpg"
                                    }
                                    layout="fill"
                                    alt="profile-pic"
                                    className="rounded-circle"
                                    objectFit="cover"
                                    priority={true}
                                />
                            </figure>

                            <InputField
                                type="text"
                                name="full_name"
                                labelName="Full Name"
                                error={errors.full_name}
                                touch={touched.full_name}
                                placeholder="Full Name"
                                disabled={profile ? true : false}
                            />
                            {/* <InputField
                                type="email"
                                name="email"
                                labelName="Email"
                                error={errors.email}
                                touch={touched.email}
                                placeHolder="Enter your Email"
                            /> */}
                            <InputField
                                name="bio"
                                labelName="Bio"
                                touch={touched.bio}
                                error={errors.bio}
                                placeHolder="Enter your Bio"
                                as="textarea"
                                disabled={profile ? true : false}
                            />
                            <Row className="g-5">
                                <Col md={6}>
                                    <InputField
                                        name="phone"
                                        labelName="Phone Number"
                                        touch={touched.phone}
                                        error={errors.phone}
                                        placeHolder="Enter your Phone Number"
                                        disabled={profile ? true : false}
                                    />
                                </Col>
                            </Row>
                            <RadioField
                                type="radio"
                                name="gender"
                                variables={genders}
                                labelName="Please specify your gender"
                                touch={touched.gender}
                                error={errors.gender}
                                disabled={profile ? true : false}
                            />
                            <DatePickerField
                                name="date_of_birth"
                                labelName="Date of birth"
                                dateFormat="yyyy-MM-dd"
                                placeHolder="dd/mm/yy"
                                touch={touched.date_of_birth}
                                error={errors.date_of_birth}
                                disabled={profile ? true : false}
                            />
                            <hr />
                            <h3>Profession Information</h3>
                            <h4>Select User Type</h4>
                            <div
                                role="group"
                                aria-labelledby="checkbox-group"
                                className="mb-3"
                            >
                                <label className="me-3">
                                    <Field
                                        type="checkbox"
                                        name="user_type"
                                        value="Client"
                                        className="me-2"
                                    />
                                    Client
                                </label>
                                <label className="me-3">
                                    <Field
                                        type="checkbox"
                                        name="user_type"
                                        className="me-2"
                                        value="Tasker"
                                    />
                                    Tasker
                                </label>
                            </div>
                            <TagInputField
                                defaultValue={skills}
                                data={skills}
                                name="skill"
                                error={errors.skill}
                                touch={touched.skill}
                                labelName="Specialities"
                                placeHolder="Enter your price"
                            />
                            <RadioField
                                type="radio"
                                name="experience_level"
                                variables={experience}
                                labelName="Experience Level"
                                touch={touched.experience_level}
                                error={errors.experience_level}
                                disabled={profile ? true : false}
                            />
                            <h4>Active Hours</h4>
                            <Row className="g-5">
                                <Col md={3}>
                                    <DatePickerField
                                        name="active_hour_start"
                                        labelName="From"
                                        placeHolder="hh/mm"
                                        dateFormat="HH:mm aa"
                                        touch={touched.active_hour_start}
                                        error={errors.active_hour_start}
                                        timeOnly
                                        disabled={profile ? true : false}
                                    />
                                </Col>
                                <Col md={3}>
                                    <DatePickerField
                                        name="active_hour_end"
                                        labelName="To"
                                        dateFormat="HH:mm aa"
                                        placeHolder="hh/mm"
                                        touch={touched.active_hour_end}
                                        error={errors.active_hour_end}
                                        timeOnly
                                        disabled={profile ? true : false}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <InputField
                                        type="number"
                                        name="hourly_rate"
                                        labelName="Base Rate Per Hour"
                                        error={errors.hourly_rate}
                                        touch={touched.hourly_rate}
                                        placeHolder="Base Rate Per Hour"
                                        disabled={profile ? true : false}
                                    />
                                </Col>
                            </Row>
                            <h3>Address</h3>
                            <SelectInputField
                                name="country"
                                labelName="Country"
                                touch={touched.country}
                                error={errors.country}
                                placeHolder="Select your country"
                                options={countryResults}
                                disabled={profile ? true : false}
                            />
                            <InputField
                                type="text"
                                name="address_line1"
                                labelName="Address Line 1"
                                error={errors.address_line1}
                                touch={touched.address_line1}
                                disabled={profile ? true : false}
                                placeHolder="Enter your price"
                            />
                            <InputField
                                type="text"
                                name="address_line2"
                                labelName="Address Line 2"
                                error={errors.address_line2}
                                touch={touched.address_line2}
                                placeHolder="Enter your price"
                                disabled={profile ? true : false}
                            />
                            <SelectInputField
                                name="language"
                                labelName="Language"
                                touch={touched.language}
                                error={errors.language}
                                placeHolder="Select your language"
                                options={languageResults}
                                disabled={profile ? true : false}
                            />
                            <SelectInputField
                                name="charge_currency"
                                labelName="Currency"
                                touch={touched.charge_currency}
                                error={errors.charge_currency}
                                placeHolder="Select your currency"
                                options={currencyResults}
                                disabled={profile ? true : false}
                            />
                            <hr />
                            <h3>Profile Configurations</h3>
                            <SelectInputField
                                name="profile_visibility"
                                labelName="Visibility"
                                touch={touched.profile_visibility}
                                error={errors.profile_visibility}
                                placeHolder="Select your visibility"
                                options={profile_visibility}
                                disabled={profile ? true : false}
                            />
                            <SelectInputField
                                name="task_preferences"
                                labelName="Task Preferences"
                                touch={touched.task_preferences}
                                error={errors.task_preferences}
                                placeHolder="Select your preferences"
                                options={task_preferences}
                                disabled={profile ? true : false}
                            />
                            <div className="d-flex justify-content-end">
                                <Button
                                    className="me-3 mb-0 cancel-btn"
                                    onClick={() => resetForm}
                                >
                                    Cancel
                                </Button>
                                <FormButton
                                    disabled={profile ? true : false}
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
export default AccountForm;
