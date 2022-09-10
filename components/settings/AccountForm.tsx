import BigButton from "@components/common/Button";
import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import RadioField from "@components/common/RadioField";
import SelectInputField from "@components/common/SelectInputField";
import TagInputField from "@components/common/TagInputField";
import { PostCard } from "@components/PostTask/PostCard";
import PhotoEdit from "@components/Profile/PhotoEdit";
import { faCamera } from "@fortawesome/pro-light-svg-icons";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useCountry } from "hooks/dropdown/useCountry";
import { useCurrency } from "hooks/dropdown/useCurrency";
import { useLanguage } from "hooks/dropdown/useLanguage";
import { useGetCountryBYId } from "hooks/profile/getCountryById";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useProfile } from "hooks/profile/profile";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import { useEditForm } from "hooks/use-edit-form";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { animateScroll as scroll } from "react-scroll";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { ProfileEditValueProps } from "types/ProfileEditValueProps";
import { axiosClient } from "utils/axiosClient";
import { accountFormSchema } from "utils/formValidation/accountFormValidation";
import { isSubmittingClass } from "utils/helpers";

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

const AccountForm = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    //hooks call
    const { mutate } = useProfile();
    const { data: currency } = useCurrency();
    const { data: language } = useLanguage();
    const { data: countryName } = useCountry();
    const { data: profile } = useGetProfile();
    const { data: KYCData } = useGetKYC();
    const [image, setImage] = useState();
    const [file, setFile] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [showAccountForm, setShowAccountForm] = useState(false);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
    const [isNoProfileImage, setIsNoProfileImage] = useState(false);
    const skills = profile && profile.skill ? JSON.parse(profile.skill) : [];
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputRef?.current?.click();
        //  setIsEdtButtonClicked(!isEditButtonClicked);
    };

    useEffect(() => {
        if (!profile?.profile_image) {
            setIsNoProfileImage(true);
        }
    }, []);
    //  !profile?.profile_image ?? setIsEditButtonClicked(true);\
    const country = profile?.country ? profile?.country : "";

    const user_language = profile?.language ? profile?.language : "";

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
    const [countryChange, setCountryChange] = useState<string | null>(null);
    const [languageChange, setLanguageChange] = useState<string | null>(null);
    const [currencyChange, setCurrencyChange] = useState<string | null>(null);
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
    const foundCountry = countryResults.find((item) => item.label === country);

    const foundLanguage = languageResults.find(
        (item) => item.label === user_language
    );

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

    const queryClient = useQueryClient();

    const editProfile = useMutation((data: FormData) =>
        axiosClient.patch("/tasker/profile/", data)
    );
    const onEditProfile = (data: any) => {
        const formData: FormData = new FormData();
        formData.append("profile_image", data);
        data = formData;
        editProfile.mutate(data, {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["profile"]);
                setShowEditForm(false);
                toast.success(data?.data?.message);
            },
            onError: (error: any) => {
                toast.error(data?.data?.message);
            },
        });
    };
    let previewImage: any;
    //profile success modal
    const [show, setShow] = useState(false);

    //edit profile
    function isValidURL(str: any) {
        const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
        if (!regex.test(str)) {
            return false;
        } else {
            return true;
        }
    }
    return (
        <>
            {!KYCData && profile ? <FillKyc onClick={scrollToKyc} /> : ""}
            <ProfileSuccessModalCard
                show={show}
                setShowForm={setShow}
                onClick={scrollToKyc}
                handleClose={scrollToKyc}
            />{" "}
            {!profile ? (
                <CompleteProfile onClick={() => setShowAccountForm(true)} />
            ) : (
                ""
            )}
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
                        full_name: profile?.full_name ?? "",
                        phone: profile?.phone ?? "",
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
                        active_hour_end: endTime
                            ? new Date(`2022-09-24 ${endTime}`)
                            : "",
                        hourly_rate: profile?.hourly_rate ?? "",
                        user_type: userType ?? "",
                        country:
                            foundCountry && profile
                                ? parseInt(foundCountry.value)
                                : "",
                        education: "abc",
                        address_line1: profile?.address_line1 ?? "",
                        address_line2: profile?.address_line2 ?? "",
                        language:
                            profile && foundLanguage
                                ? parseInt(foundLanguage.value)
                                : "",
                        charge_currency: profile
                            ? profile.charge_currency?.id
                            : "",
                        profile_visibility: profile?.profile_visibility ?? "",
                        task_preferences: profile?.task_preferences ?? "",
                        profile_image: profile?.profile_image ?? "",
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
                    }) => (
                        <Form autoComplete="off">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <figure className="profile-img">
                                    {profile?.is_profile_verified ? (
                                        <FontAwesomeIcon
                                            icon={faBadgeCheck}
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
                                        onClick={onButtonClick}
                                    >
                                        {!profile || isEditButtonClicked ? (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faCamera}
                                                    className="camera-icon"
                                                />
                                                <input
                                                    hidden
                                                    type="file"
                                                    name="profile_image"
                                                    ref={inputRef}
                                                    onChange={(e: any) => {
                                                        const files =
                                                            e.target.files;
                                                        setFieldValue(
                                                            "profile_image",
                                                            files[0]
                                                        );
                                                        setFile(
                                                            URL.createObjectURL(
                                                                files[0]
                                                            )
                                                        );

                                                        setImage(files[0]);
                                                        image
                                                            ? (previewImage = URL.createObjectURL(
                                                                  image
                                                              ))
                                                            : "http://localhost:3005/91d7fdd7-8af5-4e1c-ab1e-0b2b4585eea7";

                                                        isEditButtonClicked
                                                            ? setShowEditForm(
                                                                  !showEditForm
                                                              )
                                                            : null;
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <Image
                                        // src={"/userprofile/unknownPerson.jpg"}
                                        src={
                                            profile && profile.profile_image
                                                ? profile.profile_image
                                                : isNoProfileImage && file
                                                ? file
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
                                        {isEditButtonClicked || !profile ? (
                                            <FormButton
                                                type="submit"
                                                variant="primary"
                                                name="Update Profile"
                                                className="submit-btn"
                                                isSubmitting={isSubmitting}
                                                isSubmittingClass={isSubmittingClass(
                                                    isSubmitting
                                                )}
                                            />
                                        ) : (
                                            <BigButton
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

                            <PhotoEdit
                                photo={image}
                                show={showEditForm}
                                setShowEditForm={setShowEditForm}
                                handleClose={() => setShowEditForm(false)}
                                handleSubmit={() => {
                                    isEditButtonClicked
                                        ? onEditProfile(image)
                                        : setShowEditForm(false);
                                }}
                            />

                            <InputField
                                type="text"
                                name="full_name"
                                labelName="Full Name"
                                error={errors.full_name}
                                touch={touched.full_name}
                                placeHolder="Full Name"
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
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
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                            />
                            <Row className="g-5">
                                <Col md={6}>
                                    <InputField
                                        name="phone"
                                        labelName="Phone Number"
                                        touch={touched.phone}
                                        error={errors.phone}
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
                                        placeHolder="Enter your Phone Number"
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
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                            />
                            <DatePickerField
                                name="date_of_birth"
                                labelName="Date of birth"
                                dateFormat="yyyy-MM-dd"
                                placeHolder="dd/mm/yy"
                                touch={touched.date_of_birth}
                                error={errors.date_of_birth}
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
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
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
                                    />
                                    Client
                                </label>
                                <label className="me-3">
                                    <Field
                                        type="checkbox"
                                        name="user_type"
                                        className="me-2"
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
                                        value="Tasker"
                                    />
                                    Tasker
                                </label>
                            </div>
                            <TagInputField
                                data={skills}
                                name="skill"
                                // error={!profile && errors.skill}
                                // touch={!profile && touched.skill}
                                labelName="Specialities"
                                placeHolder="Enter your skills"
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                            />
                            <RadioField
                                type="radio"
                                name="experience_level"
                                variables={experience}
                                labelName="Experience Level"
                                touch={touched.experience_level}
                                error={errors.experience_level}
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
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
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
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
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
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
                                        disabled={
                                            isEditButtonClicked || !profile
                                                ? false
                                                : true
                                        }
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
                                value={
                                    profile
                                        ? foundCountry?.value
                                        : countryChange
                                }
                                onChange={(value) =>
                                    handleCountryChanged(value, setFieldValue)
                                }
                                data={countryResults ?? []}
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                            />
                            <InputField
                                type="text"
                                name="address_line1"
                                labelName="Address Line 1"
                                error={errors.address_line1}
                                touch={touched.address_line1}
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                                placeHolder="Enter your permanent address"
                            />
                            <InputField
                                type="text"
                                name="address_line2"
                                labelName="Address Line 2"
                                error={errors.address_line2}
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                                touch={touched.address_line2}
                                placeHolder="Enter your temporary address"
                            />
                            {/* <SelectInputField
                                name="language"
                                labelName="Language"
                                touch={touched.language}
                                error={errors.language}
                                placeHolder="Select your language"
                                options={languageResults}
                               
                            /> */}
                            <Select
                                label="Language"
                                placeholder="Select your language"
                                name="language"
                                searchable
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                                nothingFound="No result found."
                                value={
                                    profile
                                        ? foundLanguage?.value
                                        : languageChange
                                }
                                onChange={(value) =>
                                    handleLanguageChanged(value, setFieldValue)
                                }
                                // sx={{
                                //     height: "4.8rem",
                                // }}
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
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                                value={
                                    profile
                                        ? profile.charge_currency?.id.toString()
                                        : currencyChange
                                }
                                //value={currencyChange}
                                onChange={(value) =>
                                    handleCurrencyChanged(value, setFieldValue)
                                }
                                data={currencyResults ?? []}
                            />
                            <hr />
                            <h3>Profile Configurations</h3>
                            <SelectInputField
                                name="profile_visibility"
                                labelName="Visibility"
                                touch={touched.profile_visibility}
                                error={errors.profile_visibility}
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
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
                                disabled={
                                    isEditButtonClicked || !profile
                                        ? false
                                        : true
                                }
                            />
                            {profile ? null : (
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
                                        className="submit-btn"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </div>
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
export default AccountForm;
