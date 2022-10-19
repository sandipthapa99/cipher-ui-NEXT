import BigButton from "@components/common/Button";
import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import RadioField from "@components/common/RadioField";
import SelectInputField from "@components/common/SelectInputField";
import TagInputField from "@components/common/TagInputField";
import { ImageUpload } from "@components/ImageUpload";
import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import { PostCard } from "@components/PostTask/PostCard";
import PhotoEdit from "@components/Profile/PhotoEdit";
import { SelectCity } from "@components/SelectCity";
// import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import { faCamera } from "@fortawesome/pro-light-svg-icons";
import {
    faCalendarDays,
    faSquareCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { faDisplay } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import { Select } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useCountry } from "hooks/dropdown/useCountry";
import { useCurrency } from "hooks/dropdown/useCurrency";
import { useLanguage } from "hooks/dropdown/useLanguage";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useProfile } from "hooks/profile/profile";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { animateScroll as scroll } from "react-scroll";
import type { UserBankDetails } from "types/bankDetail";
import { axiosClient } from "utils/axiosClient";
import { accountFormSchema } from "utils/formValidation/accountFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { safeParse } from "utils/safeParse";
import { toast } from "utils/toast";

import { FillKyc } from "./FillKyc";
import { CompleteProfile } from "./ProfileForm";
import ProfileSuccessModalCard from "./ProfileSuccessModal";

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

interface Display {
    showAccountForm: boolean;
}

const AccountForm = ({ showAccountForm }: Display) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    //profile success modal
    const [show, setShow] = useState(false);
    //hooks call
    const { mutate, isLoading: postProfileLoading } = useProfile();
    const { data: currency } = useCurrency();
    const { data: language } = useLanguage();
    const { data: countryName } = useCountry();
    const { data: profile, isLoading } = useGetProfile();
    const { data: KYCData } = useGetKYC();
    const [blobUrl, setBlobUrl] = useState<RequestInfo | URL | undefined>();
    const [image, setImage] = useState();
    const [file, setFile] = useState("");
    const [display, setDisplay] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // const [showAccountForm, setShowAccountForm] = useState(false);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
    const [isNoProfileImage, setIsNoProfileImage] = useState(false);

    const skills = profile && profile.skill ? JSON.parse(profile.skill) : [];

    const isInputDisabled = !isEditButtonClicked && profile ? true : false;

    const { classes } = useStyles();

    useEffect(() => {
        if (!profile?.profile_image) {
            setIsNoProfileImage(true);
        }
    }, []);

    // const router = useRouter();
    //  !profile?.profile_image ?? setIsEditButtonClicked(true);\
    // const [city, setCity] = useState(profile?.city?.id);

    const country = profile?.country ? profile?.country.name : "";

    // console.log(
    //     "🚀 ~ file: AccountForm.tsx ~ line 122 ~ AccountForm ~ profile",
    //     profile
    // );

    const user_language = profile?.language ? profile?.language.name : "";

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

    //converting string time value to datetime time value
    const start: string = profile?.active_hour_start
        ? profile?.active_hour_start.replace(":00", "")
        : "";
    const end: string = profile?.active_hour_end
        ? profile?.active_hour_end.replace(":00", "")
        : "";

    const endparsed = profile?.active_hour_end
        ? (parseInt(end) < 12 ? parseInt(end) + 12 : parseInt(end)).toString()
        : "";

    const finalend = profile?.active_hour_end
        ? `${endparsed}:${end?.substring(end.indexOf(":") + 1)}`
        : "";

    const endTime = finalend.toString();
    const startTime = start.toString();
    const [countryChange, setCountryChange] = useState<string | null>(country);
    const [languageChange, setLanguageChange] = useState<string | null>(
        user_language
    );
    const [previewImage, setPreviewImage] = useState<
        RequestInfo | URL | undefined
    >();
    const [value, onChange] = useState(new Date());
    const userDateOfBirth = profile
        ? profile.date_of_birth
        : new Date("2022-09-09");
    // const [dateOfBirth, setDateOfBirth] = useState<string | null>(
    //     userDateOfBirth
    // );

    const [currencyChange, setCurrencyChange] = useState<string | null>(
        profile ? profile.charge_currency.code : ""
    );
    useEffect(() => {
        setCurrencyChange(profile ? profile.charge_currency.id.toString() : "");
        setLanguageChange(profile ? profile.language.id.toString() : "");
        setCountryChange(profile ? profile.country.id.toString() : "");
    }, [profile]);

    const [showEditForm, setShowEditForm] = useState(false);

    const currencyResults: SelectItem[] = currency
        ? currency.result.map((result) => {
              return {
                  label: result?.code,
                  value: result.id.toString(),
                  id: result?.id,
              };
          })
        : ([] as SelectItem[]);

    const languageResults: SelectItem[] = language
        ? language.result.map((result) => ({
              label: result?.name,
              value: result?.id.toString(),
              id: result?.id,
          }))
        : ([] as SelectItem[]);

    const countryResults: SelectItem[] = countryName
        ? countryName.result.map((result) => ({
              label: result?.name,
              value: result?.id.toString(),
              id: result?.id,
          }))
        : ([] as SelectItem[]);

    //find the country
    // const foundCountry = countryResults.find((item) => item.label === country);

    // const foundLanguage = languageResults.find(
    //     (item) => item.label === user_language
    // );

    //handle country change
    const handleCountryChanged = (
        id: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setCountryChange(id);
        if (id) setFieldValue("country", parseInt(id));
    };

    //handle language change
    const handleLanguageChanged = (
        id: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setLanguageChange(id);
        if (id) setFieldValue("language", parseInt(id));
    };

    //handle currency change
    const handleCurrencyChanged = (
        id: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setCurrencyChange(id);
        if (id) setFieldValue("charge_currency", parseInt(id));
    };
    //parse user_type
    const userType = profile?.user_type ? JSON.parse(profile?.user_type) : "";
    // const userType = "";
    //for city select field
    const { data: BankDetails } = useData<UserBankDetails>(
        ["tasker-bank-account"],
        "/tasker/bank-details/"
    );
    const LinkedBank = BankDetails?.data.result;
    const cityData = profile
        ? {
              initialId: profile?.city?.id?.toString() ?? "",
              initialData: profile?.city
                  ? [
                        {
                            id: profile?.city?.id,
                            label: profile?.city?.name,
                            value: profile?.city?.id?.toString(),
                        },
                    ]
                  : [],
          }
        : {};

    const queryClient = useQueryClient();

    const editProfile = useMutation((data: FormData) =>
        axiosClient.patch("/tasker/profile/", data)
    );
    const loadingOverlayVisible = useMemo(
        () => editProfile.isLoading,
        [editProfile.isLoading]
    );
    if (loadingOverlayVisible)
        return (
            <LoadingOverlay
                visible={loadingOverlayVisible}
                className={classes.overlay}
                overlayBlur={2}
            />
        );

    //edit profile
    function isValidURL(str: any) {
        const regex =
            /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
        if (!regex.test(str)) {
            return false;
        } else {
            return true;
        }
    }
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        profile?.profile_image
            ? setShowEditForm(true)
            : inputRef?.current?.click();
        // inputRef?.current?.click();
        setDisplay(true);
        //  setIsEdtButtonClicked(!isEditButtonClicked);
    };

    return (
        <>
            {!KYCData && profile ? <FillKyc onClick={scrollToKyc} /> : ""}
            <LoadingOverlay
                visible={postProfileLoading}
                sx={{ position: "fixed", inset: 0 }}
            />
            <ProfileSuccessModalCard
                show={show}
                setShowForm={setShow}
                onClick={scrollToKyc}
                handleClose={scrollToKyc}
            />{" "}
            {/* Modal component */}
            <div
                className={"account-form"}
                style={
                    showAccountForm || profile
                        ? { display: "block" }
                        : { display: "none" }
                }
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        first_name: profile?.user.first_name ?? "",
                        middle_name: profile?.user.middle_name ?? "",
                        last_name: profile?.user.last_name ?? "",
                        city: profile?.city?.id ?? "",
                        email: "",
                        bio: profile?.bio ?? "",
                        gender: profile?.gender ?? "",
                        date_of_birth:
                            profile && profile.date_of_birth
                                ? parseISO(profile.date_of_birth)
                                : "",
                        skill: profile?.skill ? skills : "",
                        experience_level: profile?.experience_level ?? "",
                        active_hour_start:
                            new Date(`2022-09-24 ${startTime}`) ?? "",
                        active_hour_end:
                            new Date(`2022-09-24 ${endTime}`) ?? "",
                        hourly_rate: profile?.hourly_rate ?? "",
                        user_type: userType ?? "",
                        country: profile ? countryChange : "",
                        education: "abc",
                        address_line1: profile?.address_line1 ?? "",
                        address_line2: profile?.address_line2 ?? "",
                        language: profile ? languageChange : "",
                        charge_currency: profile ? currencyChange : "",
                        profile_visibility: profile?.profile_visibility ?? "",
                        task_preferences: profile?.task_preferences ?? "",
                        profile_image: profile?.profile_image ?? "",
                        designation: profile?.designation ?? "",
                    }}
                    validationSchema={accountFormSchema}
                    onSubmit={async (values, action) => {
                        const formData = new FormData();
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

                            if (
                                entry[0] == "profile_image" &&
                                isValidURL(entry[1])
                            ) {
                                return false;
                            }
                            if (key !== "profile_image") {
                                formData.append(
                                    key,
                                    value ? value?.toString() : ""
                                );
                            } else {
                                formData.append(
                                    "profile_image",
                                    values.profile_image
                                );
                            }
                        });

                        const editedData = formData;
                        {
                            isEditButtonClicked
                                ? editProfile.mutate(editedData, {
                                      onSuccess: () => {
                                          toast.success(
                                              "Profile updated successfully."
                                          );
                                          setIsEditButtonClicked(
                                              !isEditButtonClicked
                                          );
                                          queryClient.invalidateQueries([
                                              "profile",
                                          ]);
                                      },
                                      onError: (err: any) => {
                                          toast.error(err.message);
                                      },
                                  })
                                : mutate(formData, {
                                      onSuccess: () => {
                                          setShow(true);
                                          queryClient.invalidateQueries([
                                              "profile",
                                          ]);
                                      },
                                      onError: (err) => {
                                          toast.error(err.message);
                                      },
                                  });
                        }
                    }}
                >
                    {({
                        isSubmitting,
                        errors,
                        touched,
                        values,
                        resetForm,
                        setFieldValue,
                        getFieldProps,
                    }) => (
                        <Form autoComplete="off">
                            {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <figure className="profile-img">
                                    {profile?.is_profile_verified ? (
                                        <FontAwesomeIcon
                                            icon={faBadgeCheck}
                                            //onClick={onButtonClick}
                                            className="badge-icon"
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <div
                                        className={`${
                                            !profile || isEditButtonClicked
                                                ? "img-dragdrop"
                                                : "d-flex align-items-center justify-content-center"
                                        }`}
                                    >
                                        {!profile || isEditButtonClicked ? (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faCamera}
                                                    className="camera-icon"
                                                    // onClick={() => {
                                                    //     setDisplay(!display);
                                                    // }}
                                                    onClick={onButtonClick}
                                                />

                                                <ImageUpload
                                                    name="profile_image"
                                                    display={display}
                                                    setIsEditButtonClicked={
                                                        setIsEditButtonClicked
                                                    }
                                                    // setDisplay={setDisplay}
                                                    ref={inputRef}
                                                    onChange={(e: any) => {
                                                        const files =
                                                            e.target.files;
                                                        setFieldValue(
                                                            "profile_image",
                                                            files[0]
                                                        );
                                                        setDisplay(false);
                                                        // setFile(
                                                        //     URL.createObjectURL(
                                                        //         files[0]
                                                        //     )
                                                        // );

                                                        setImage(files[0]);
                                                        // image
                                                        //     ? (previewImage =
                                                        //           blobUrl)
                                                        //     : "";
                                                        setShowEditForm(
                                                            !showEditForm
                                                        );
                                                    }}
                                                    photo={image}
                                                    showEditForm={showEditForm}
                                                    setShowEditForm={
                                                        setShowEditForm
                                                    }
                                                    handleClose={() => {
                                                        setShowEditForm(false);
                                                        setDisplay(false);
                                                    }}
                                                    // handleSubmit={() => {
                                                    //     isEditButtonClicked
                                                    //         ? onEditProfile(
                                                    //               image
                                                    //           )
                                                    //         : setShowEditForm(
                                                    //               false
                                                    //           );
                                                    // }}
                                                    isEditButtonClicked={
                                                        isEditButtonClicked
                                                    }
                                                    onPhotoEdit={(
                                                        data,
                                                        file
                                                    ) => {
                                                        setPreviewImage(data);
                                                        setBlobUrl(data);
                                                        setFieldValue(
                                                            "profile_image",
                                                            file
                                                        );
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <Image
                                        //src={"/userprofile/unknownPerson.jpg"}
                                        src={
                                            profile && profile.profile_image
                                                ? profile.profile_image
                                                : isNoProfileImage && file
                                                ? file
                                                : isEditButtonClicked &&
                                                  !profile?.profile_image
                                                ? "/userprofile/unknownPerson.jpg"
                                                : !profile
                                                ? previewImage
                                                : isEditButtonClicked
                                                ? previewImage
                                                : "/userprofile/unknownPerson.jpg"
                                        }
                                        layout="fill"
                                        alt="profile-pic"
                                        className="rounded-circle"
                                        objectFit="cover"
                                        priority={true}
                                    />
                                </figure>
                                {profile ? (
                                    <div>
                                        {isEditButtonClicked ||
                                        !profile ? null : (
                                            <BigButton
                                                className="sticky-wrapper"
                                                btnTitle={"Edit Profile"}
                                                backgroundColor={"#FFCA6A"}
                                                textColor={"#212529"}
                                                handleClick={() =>
                                                    setIsEditButtonClicked(true)
                                                }
                                            />
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <Row className="mt-3">
                                <Col md={4}>
                                    <InputField
                                        type="text"
                                        name="first_name"
                                        labelName="First Name"
                                        error={errors.first_name}
                                        touch={touched.first_name}
                                        placeHolder="First Name"
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
                                    />
                                </Col>
                                <Col md={4}>
                                    <InputField
                                        type="text"
                                        name="middle_name"
                                        labelName="Middle Name"
                                        error={errors.middle_name}
                                        touch={touched.middle_name}
                                        placeHolder="Middle Name"
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
                                    />
                                </Col>
                                <Col md={4}>
                                    <InputField
                                        type="text"
                                        name="last_name"
                                        labelName="Last Name"
                                        error={errors.last_name}
                                        touch={touched.last_name}
                                        placeHolder="Last Name"
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
                                    />
                                </Col>
                            </Row>

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
                                disabled={isInputDisabled}
                            />

                            <InputField
                                name="designation"
                                labelName="Designation"
                                touch={touched.designation as boolean}
                                error={errors.designation as string}
                                placeHolder="Enter your designation"
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                            />
                            {/* <Row className="g-5">
                                <Col md={6}>
                                    {isEditButtonClicked || !profile ? (
                                        <PhoneNumberInput
                                            name={"phone"}
                                            labelName="Phone Number"
                                            touch={touched.phone}
                                            error={errors.phone}
                                        />
                                    ) : (
                                        <InputField
                                            name="phone"
                                            labelName="Phone Number"
                                            touch={touched.phone}
                                            error={errors.phone}
                                            disabled={true}
                                        />
                                    )}
                                </Col>
                            </Row> */}
                            <RadioField
                                type="radio"
                                name="gender"
                                variables={genders}
                                labelName="Please specify your gender"
                                touch={touched.gender}
                                error={errors.gender}
                                disabled={isInputDisabled}
                            />
                            {/* <DatePickerField
                                name="date_of_birth"
                                labelName="Date of birth"
                                dateFormat="yyyy-MM-dd"
                                placeHolder="dd/mm/yy"
                                touch={touched.date_of_birth}
                                error={errors.date_of_birth}
                                disabled={isInputDisabled}
                            /> */}
                            <MantineDateField
                                name="date_of_birth"
                                labelName="Date of birth"
                                placeHolder="dd/mm/yy"
                                error={errors.date_of_birth}
                                touch={touched.date_of_birth}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faCalendarDays}
                                        className="svg-icons"
                                    />
                                }
                                disabled={isInputDisabled}
                                // minDate={new Date()}
                                handleChange={(value) => {
                                    setFieldValue(
                                        "date_of_birth",
                                        format(new Date(value), "yyyy-MM-dd")
                                    );
                                }}
                            />
                            {/* <DatePicker
                                label="Date of birth"
                                // value={
                                //     (profile && profile?.date_of_birth) ??
                                //     parseISO(profile.date_of_birth)
                                // }
                                // defaultValue={
                                //     (profile && profile?.date_of_birth) ??
                                //     parseISO(profile.date_of_birth)
                                // }
                                inputFormat="yyyy-MM-dd"
                                value={value}
                                //onChange={onChange}
                                placeholder="dd/mm/yy"
                                firstDayOfWeek="sunday"
                                name="date_of_birth"
                                disabled={isInputDisabled}
                            /> */}
                            <hr />
                            <h3>Professional Information</h3>
                            {/* <h4>Select User Type</h4>
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
                                        disabled={isInputDisabled}
                                    />
                                    Client
                                </label>
                                <label className="me-3">
                                    <Field
                                        type="checkbox"
                                        name="user_type"
                                        className="me-2"
                                        disabled={isInputDisabled}
                                        value="Tasker"
                                    />
                                    Tasker
                                </label>
                            </div> */}
                            <TagInputField
                                data={skills}
                                name="skill"
                                // error={!profile && errors.skill}
                                // touch={!profile && touched.skill}
                                labelName="Specialities"
                                placeHolder="Enter your skills"
                                disabled={isInputDisabled}
                            />
                            <RadioField
                                type="radio"
                                name="experience_level"
                                variables={experience}
                                labelName="Experience Level"
                                touch={touched.experience_level}
                                error={errors.experience_level}
                                disabled={isInputDisabled}
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
                                        disabled={isInputDisabled}
                                        timeOnly
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
                                        disabled={isInputDisabled}
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
                                        disabled={isInputDisabled}
                                        placeHolder="Base Rate Per Hour"
                                    />
                                </Col>
                            </Row>
                            <h3>Address</h3>
                            {/* <SelectInputField
                                name="country"
                                labelName="Country"
                                touch={touched.country}
                                error={errors.country}
                                placeHolder="Select your country"
                                options={countryResults}
                               
                            /> */}
                            <Select
                                label="Country"
                                placeholder="Select your country"
                                name="country"
                                searchable
                                nothingFound="No result found."
                                value={countryChange}
                                // key={countryChange}
                                onChange={(value) => {
                                    setCountryChange(value ? value : "");
                                    handleCountryChanged(value, setFieldValue);
                                }}
                                data={countryResults ?? []}
                                disabled={isInputDisabled}
                            />
                            <SelectCity
                                disabled={isInputDisabled}
                                label="City"
                                placeholder="Select your city"
                                onCityChange={(city) =>
                                    setFieldValue("city", city)
                                }
                                value={cityData.initialId}
                                data={cityData.initialData}
                                nothingFound={"nothing found"}
                            />

                            {/* <SelectCity
                                key={city}
                                onCitySelect={(cityId) => {
                                    setCity(cityId);
                                    setFieldValue("city", cityId);
                                }}
                                value={city?.toString() ?? ""}
                                disabled={isInputDisabled}
                            /> */}

                            <PlacesAutocomplete
                                size="md"
                                label="Address Line 1"
                                placeholder="Enter your available address"
                                disabled={isInputDisabled}
                                error={
                                    touched.address_line1 &&
                                    errors.address_line1
                                        ? errors.address_line1
                                        : undefined
                                }
                                {...getFieldProps("address_line1")}
                                value={values.address_line1}
                                onPlaceChange={(value) =>
                                    setFieldValue("address_line1", value)
                                }
                            />
                            {/* <PlacesAutocomplete
                                size="md"
                                label="Address Line 2"
                                placeholder="Enter your temporary address"
                                disabled={isInputDisabled}
                                error={
                                    touched.address_line2 &&
                                    errors.address_line2
                                        ? errors.address_line2
                                        : undefined
                                }
                                {...getFieldProps("address_line2")}
                                value={values.address_line2}
                                onPlaceChange={(value) =>
                                    setFieldValue("address_line2", value)
                                }
                            /> */}
                            <InputField
                                type="text"
                                name="address_line2"
                                labelName="Address Line 2"
                                error={errors.address_line2}
                                touch={touched.address_line2}
                                disabled={isInputDisabled}
                                placeHolder="Enter your secondary address"
                            />
                            <Select
                                label="Language"
                                placeholder="Select your language"
                                name="language"
                                searchable
                                disabled={isInputDisabled}
                                nothingFound="No result found."
                                value={languageChange}
                                //   key={languageChange}
                                onChange={(value) => {
                                    setLanguageChange(value ? value : "");
                                    handleLanguageChanged(value, setFieldValue);
                                }}
                                data={languageResults ?? []}
                            />
                            {/* <SelectInputField
                                name="charge_currency"
                                labelName="Currency"
                                touch={touched.charge_currency}
                                error={errors.charge_currency}
                                placeHolder="Select your currency"
                                options={currencyResults}
                               
                            /> */}
                            <Select
                                label="Currency"
                                placeholder="Select your currency"
                                name="charge_currency"
                                searchable
                                nothingFound="No result found."
                                disabled={isInputDisabled}
                                value={currencyChange}
                                key={currencyChange}
                                //value={currencyChange}
                                onChange={(value) => {
                                    setCurrencyChange(value ? value : "");
                                    handleCurrencyChanged(value, setFieldValue);
                                }}
                                data={currencyResults ?? []}
                            />
                            <hr />
                            <h3>Profile Configurations</h3>
                            <SelectInputField
                                name="profile_visibility"
                                labelName="Visibility"
                                touch={touched.profile_visibility}
                                error={errors.profile_visibility}
                                disabled={isInputDisabled}
                                placeHolder="Select your visibility"
                                options={profile_visibility}
                            />
                            <SelectInputField
                                name="task_preferences"
                                labelName="Task Preferences"
                                touch={touched.task_preferences}
                                error={errors.task_preferences}
                                placeHolder="Select your preferences"
                                options={task_preferences}
                                disabled={isInputDisabled}
                            />
                            {profile ? null : (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        className="me-3 mb-0 cancel-btn"
                                        onClick={() => resetForm()}
                                    >
                                        Cancel
                                    </Button>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Save"
                                        className="submit-btn"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </div>
                            )}
                            {profile ? (
                                <div>
                                    {
                                        isEditButtonClicked || !profile ? (
                                            <FormButton
                                                type="submit"
                                                variant="primary"
                                                name="Save"
                                                className="submit-btn"
                                                isSubmitting={isSubmitting}
                                                isSubmittingClass={isSubmittingClass(
                                                    isSubmitting
                                                )}
                                            />
                                        ) : null
                                        // (
                                        //     <BigButton
                                        //         btnTitle={"Edit Profile"}
                                        //         backgroundColor={"#FFCA6A"}
                                        //         textColor={"#212529"}
                                        //         handleClick={() =>
                                        //             setIsEditButtonClicked(true)
                                        //         }
                                        //     />
                                        // )
                                    }
                                </div>
                            ) : (
                                ""
                            )}
                            {/* {isEditButtonClicked ? (
                                <div className="d-flex justify-content-end">
                                    <Button
                                        className="me-3 mb-0 submit-btn"
                                        onClick={() => resetForm}
                                    >
                                        Cancel Editing
                                    </Button>
                                </div>
                            ) : null} */}
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
const useStyles = createStyles(() => ({
    overlay: {
        postion: "fixed",
        inset: 0,
        zIndex: 9999,
    },
}));
export default AccountForm;
