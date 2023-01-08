import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import MantineTimeField from "@components/common/MantineTimeField";
import RadioField from "@components/common/RadioField";
import SelectInputField from "@components/common/SelectInputField";
import { ImageUpload } from "@components/ImageUpload";
import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import { PostCard } from "@components/PostTask/PostCard";
import { SelectCity } from "@components/SelectCity";
import type { SelectItem } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import { Select } from "@mantine/core";
import {
    CalendarTodayOutlined,
    PhotoCameraOutlined,
    VerifiedRounded,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { useCountry } from "hooks/dropdown/useCountry";
import { useCurrency } from "hooks/dropdown/useCurrency";
import { useLanguage } from "hooks/dropdown/useLanguage";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useProfile } from "hooks/profile/profile";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { animateScroll as scroll } from "react-scroll";
// import { userGet } from "utils/auth";
import { axiosClient } from "utils/axiosClient";
import { convertTimeStringToDateString } from "utils/formatTime";
import { accountFormSchema } from "utils/formValidation/accountFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

import { db } from "../../firebase/firebase";
import { FillKyc } from "./FillKyc";
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
export interface IAllCategory {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

const AccountForm = ({ showAccountForm }: Display) => {
    //profile success modal
    const [show, setShow] = useState(false);

    //hooks call
    const { mutate, isLoading: postProfileLoading } = useProfile();
    const { data: currency } = useCurrency();
    const { data: language } = useLanguage();
    const { data: countryName } = useCountry();
    const [interestOptions, setInterestOptions] = useState<any>([]);
    const { data: profile } = useGetProfile();

    // useEffect(() => {
    //     setProfileData(data);
    // }, []);
    const { data: KYCData } = useGetKYC();
    const [blobUrl, setBlobUrl] = useState<RequestInfo | URL | undefined>();
    const [image, setImage] = useState();
    const [file, setFile] = useState("");
    const [display, setDisplay] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // const [showAccountForm, setShowAccountForm] = useState(false);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
    const [isNoProfileImage, setIsNoProfileImage] = useState(false);

    const skills = profile?.skill ? JSON.parse(profile?.skill) : [];
    const [dataSkills, setDataSkills] = useState(() => {
        return skills?.map((item: string) => {
            return {
                label: item,
                value: item,
            };
        });
    });

    const isInputDisabled = !isEditButtonClicked && profile ? true : false;

    useQuery(
        ["all-category"],
        () => {
            return axiosClient.get<IAllCategory[]>(
                "/task/cms/task-category/list/"
            );
        },
        {
            onSuccess: (data) => {
                const options = data?.data.map((item) => {
                    return {
                        value: item.id.toString(),
                        label: item.name.toString(),
                    };
                });
                setInterestOptions(options);
            },
        }
    );

    useEffect(() => {
        if (!profile?.profile_image) {
            setIsNoProfileImage(true);
        }
    }, []);
    const { data: userData } = useUser();

    const country = profile?.country ? profile?.country.name : "";

    const user_language = profile?.language ? profile?.language.name : "";

    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setScrollPosition(position);
    // };

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    const scrollToKyc = () => {
        scroll.scrollTo(2660);
    };

    const [countryChange, setCountryChange] = useState<string | null>(country);
    const [languageChange, setLanguageChange] = useState<string | null>(
        user_language
    );
    const [previewImage, setPreviewImage] = useState<
        RequestInfo | string | URL | undefined
    >();
    // const [value, onChange] = useState(new Date());
    // const userDateOfBirth = profile
    //     ? profile.date_of_birth
    //     : new Date("2022-09-09");
    // const [dateOfBirth, setDateOfBirth] = useState<string | null>(
    //     userDateOfBirth
    // );

    const [currencyChange, setCurrencyChange] = useState<string | null>(
        profile ? profile?.charge_currency?.code : ""
    );
    useEffect(() => {
        setCurrencyChange(
            profile ? profile.charge_currency?.code?.toString() : "NPR"
        );
        setLanguageChange(
            profile?.language ? profile?.language?.code?.toString() : "ne"
        );
        setCountryChange(profile ? profile.country?.code?.toString() : "");
    }, [profile]);

    const [showEditForm, setShowEditForm] = useState(false);

    const currencyResults: SelectItem[] = currency
        ? currency.result.map((result) => {
              return {
                  label: result?.code,
                  value: result.code.toString(),
              };
          })
        : ([] as SelectItem[]);

    const languageResults: SelectItem[] = language
        ? language.result.map((result) => ({
              label: result?.name,
              value: result?.code.toString(),
          }))
        : ([] as SelectItem[]);

    const countryResults: SelectItem[] = countryName
        ? countryName?.map((res) => ({
              label: res?.name,
              value: res?.code.toString(),
          }))
        : ([] as SelectItem[]);

    // const interestValues: SelectItem[] =
    //     allCategory?.data.length !== 0
    //         ? allCategory?.data?.map((item) => {
    //               return { label: item?.name, value: item?.id };
    //           })
    //         : ([] as SelectItem[]);
    //find the country
    // const foundCountry = countryResults.find((item) => item.label === country);

    // const foundLanguage = languageResults.find(
    //     (item) => item.label === user_language
    // );

    //handle country change
    const handleCountryChanged = (
        code: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setCountryChange(code);
        if (code) setFieldValue("country", code);
    };

    //handle language change
    const handleLanguageChanged = (
        code: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setLanguageChange(code);
        if (code) setFieldValue("language", code);
    };

    //handle currency change
    const handleCurrencyChanged = (
        code: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setCurrencyChange(code);
        if (code) setFieldValue("charge_currency", code);
    };
    //parse user_type
    const userType = profile?.user_type ? JSON.parse(profile?.user_type) : "";
    // const userType = "";
    //for city select field
    // const { data: BankDetails } = useData<UserBankDetails>(
    //     ["tasker-bank-account"],
    //     "/tasker/bank-details/"
    // );

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
    // {
    //       initialId: CityFilter.id?.toString() ?? "",
    //       initialData: CityFilter
    //           ? [
    //                 {
    //                     id: CityFilter.id,
    //                     label: CityFilter?.name,
    //                     value: CityFilter.id?.toString(),
    //                 },
    //             ]
    //           : [],
    //   };

    const queryClient = useQueryClient();

    const editProfile = useMutation((data: FormData) =>
        axiosClient.patch("/tasker/profile/", data)
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

    // const interests =
    //     typeof interestValues !== "undefined" ? interestValues : [];
    const defaultInterests = profile?.interests?.map((item) =>
        item.id.toString()
    );

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
                    initialValues={{
                        first_name: profile?.user.first_name ?? "",
                        middle_name: profile?.user.middle_name ?? "",
                        last_name: profile?.user.last_name ?? "",
                        city: profile?.city?.id ?? parseInt(""),
                        email: "",
                        bio: profile?.bio ?? "",
                        gender: profile?.gender ?? "",
                        date_of_birth:
                            profile && profile.date_of_birth
                                ? parseISO(profile.date_of_birth)
                                : "",
                        skill: skills,
                        interests: profile ? defaultInterests : [""],
                        experience_level: profile?.experience_level ?? "",
                        active_hour_start: profile?.active_hour_start
                            ? convertTimeStringToDateString(
                                  String(profile?.active_hour_start)
                              )
                            : null,
                        active_hour_end: profile?.active_hour_end
                            ? convertTimeStringToDateString(
                                  String(profile?.active_hour_end)
                              )
                            : null,
                        hourly_rate: profile?.hourly_rate ?? "",
                        user_type: userType ?? "",
                        country: profile ? countryChange : "",
                        address_line1: profile?.address_line1 ?? "",
                        address_line2: profile?.address_line2 ?? "",
                        language: profile ? languageChange : "ne",
                        charge_currency: profile ? currencyChange : "NPR",
                        profile_visibility: profile?.profile_visibility ?? "",
                        task_preferences: profile?.task_preferences ?? "",
                        profile_image: profile?.profile_image ?? "",
                        designation: profile?.designation ?? "",
                    }}
                    validationSchema={accountFormSchema}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        const formData = new FormData();

                        {
                            const newValidatedValues = {
                                ...values,
                                user_type: JSON.stringify(values.user_type),
                                skill: JSON.stringify(values.skill),

                                active_hour_start: format(
                                    new Date(
                                        values.active_hour_start
                                            ? values.active_hour_start
                                            : ""
                                    ),
                                    "HH:mm"
                                ),
                                active_hour_end: format(
                                    new Date(
                                        values.active_hour_end
                                            ? values.active_hour_end
                                            : ""
                                    ),
                                    "HH:mm"
                                ),
                                date_of_birth: format(
                                    new Date(values.date_of_birth),
                                    "yyyy-MM-dd"
                                ),
                                city: values.city,
                            };

                            Object.entries(newValidatedValues).forEach(
                                (entry) => {
                                    const [key, value] = entry;

                                    if (
                                        entry[0] == "profile_image" &&
                                        isValidURL(entry[1])
                                    ) {
                                        return false;
                                    }
                                    // if (
                                    //     key !== "profile_image" &&
                                    //     key !== "interests"
                                    // ) {
                                    //     formData.append(
                                    //         key,
                                    //         value ? value : ""
                                    //     );
                                    if (key !== "profile_image") {
                                        formData.append(
                                            key,
                                            value ? value?.toString() : ""
                                        );
                                    } else {
                                        formData.append(
                                            "profile_image",
                                            values?.profile_image
                                        );
                                    }

                                    //DO not change
                                    formData.delete("interests");
                                }
                            );

                            values?.interests?.forEach((value: any) => {
                                formData.append("interests", value);
                            });

                            {
                                isEditButtonClicked
                                    ? editProfile.mutate(formData, {
                                          onSuccess: async () => {
                                              {
                                                  userData?.id &&
                                                      (await setDoc(
                                                          doc(
                                                              db,
                                                              "users",
                                                              userData?.id
                                                          ),
                                                          {
                                                              name: `${
                                                                  values.first_name
                                                                      ? values.first_name
                                                                      : profile
                                                                            ?.user
                                                                            .first_name
                                                              } ${
                                                                  values.middle_name
                                                                      ? values.middle_name
                                                                      : profile
                                                                            ?.user
                                                                            .middle_name
                                                              } ${
                                                                  values.last_name
                                                                      ? values.last_name
                                                                      : profile
                                                                            ?.user
                                                                            .last_name
                                                              }`,
                                                              email: values.email
                                                                  ? values.email
                                                                  : profile
                                                                        ?.user
                                                                        .email,
                                                              profile: profile
                                                                  ?.user
                                                                  .profile_image
                                                                  ? profile
                                                                        ?.user
                                                                        .profile_image
                                                                  : profile
                                                                        ?.avatar
                                                                        ?.image
                                                                  ? profile
                                                                        ?.avatar
                                                                        ?.image
                                                                  : "",
                                                              uuid: userData?.id,
                                                          }
                                                      ));
                                              }
                                              {
                                                  const res = await getDoc(
                                                      doc(
                                                          db,
                                                          "userChats",
                                                          userData?.id
                                                              ? userData?.id
                                                              : ""
                                                      )
                                                  );

                                                  !res.exists() &&
                                                      userData?.id &&
                                                      (await setDoc(
                                                          doc(
                                                              db,
                                                              "userChats",
                                                              userData?.id
                                                          ),
                                                          {}
                                                      ));
                                              }
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
                                          onSuccess: async () => {
                                              {
                                                  userData?.id &&
                                                      (await setDoc(
                                                          doc(
                                                              db,
                                                              "users",
                                                              userData?.id
                                                          ),
                                                          {
                                                              name: `${
                                                                  values.first_name
                                                              } ${
                                                                  values.middle_name ??
                                                                  ""
                                                              } ${
                                                                  values.last_name
                                                              }`,
                                                              email: values.email,
                                                              profile: "",
                                                              uuid: userData?.id,
                                                          }
                                                      ));
                                              }
                                              {
                                                  const res = await getDoc(
                                                      doc(
                                                          db,
                                                          "userChats",
                                                          userData?.id
                                                              ? userData?.id
                                                              : ""
                                                      )
                                                  );

                                                  !res.exists() &&
                                                      userData?.id &&
                                                      (await setDoc(
                                                          doc(
                                                              db,
                                                              "userChats",
                                                              userData?.id
                                                          ),
                                                          {}
                                                      ));
                                              }
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
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <figure className="profile-img">
                                    {profile?.is_profile_verified ? (
                                        <VerifiedRounded className="badge-icon" />
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
                                                <PhotoCameraOutlined
                                                    className="camera-icon"
                                                    onClick={onButtonClick}
                                                />

                                                <ImageUpload
                                                    name="profile_image"
                                                    display={display}
                                                    setIsEditButtonClicked={
                                                        setIsEditButtonClicked
                                                    }
                                                    userId={profile?.id.toString()}
                                                    ref={inputRef}
                                                    onChange={(e: any) => {
                                                        const files =
                                                            e.target.files;
                                                        setFieldValue(
                                                            "profile_image",
                                                            files[0]
                                                        );
                                                        setDisplay(false);
                                                        setImage(files[0]);
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
                                                    onAvatarEdit={(avatar) => {
                                                        setPreviewImage(
                                                            avatar.image
                                                        );
                                                        setFieldValue(
                                                            "avatar",
                                                            avatar.id
                                                        );
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <Image
                                        src={
                                            profile && profile.profile_image
                                                ? profile.profile_image
                                                : profile?.avatar?.image
                                                ? profile?.avatar?.image
                                                : isNoProfileImage && file
                                                ? "/userprofile/unknownPerson.jpg"
                                                : isEditButtonClicked &&
                                                  !profile?.profile_image
                                                ? "/userprofile/unknownPerson.jpg"
                                                : !profile && previewImage
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
                                        fieldRequired
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
                                        fieldRequired
                                    />
                                </Col>
                            </Row>
                            <InputField
                                name="bio"
                                labelName="Bio"
                                touch={touched.bio}
                                error={errors.bio}
                                placeHolder="Enter your Bio"
                                as="textarea"
                                disabled={isInputDisabled}
                                fieldRequired
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
                            <RadioField
                                type="radio"
                                name="gender"
                                variables={genders}
                                labelName="Please specify your gender"
                                touch={touched.gender}
                                error={errors.gender}
                                disabled={isInputDisabled}
                                fieldRequired
                            />
                            <MantineDateField
                                name="date_of_birth"
                                labelName="Date of birth"
                                inputFormat="DD/MM/YYYY"
                                placeHolder="dd/mm/yy"
                                error={errors.date_of_birth}
                                touch={touched.date_of_birth}
                                icon={
                                    <CalendarTodayOutlined className="svg-icons" />
                                }
                                disabled={isInputDisabled}
                                handleChange={(value) => {
                                    setFieldValue(
                                        "date_of_birth",
                                        format(new Date(value), "yyyy-MM-dd")
                                    );
                                }}
                                excludeDate={(date) =>
                                    date.getFullYear() <= 1940
                                }
                            />
                            <hr />
                            <h3>Professional Information</h3>
                            <div className="d-flex">
                                <h4 className="me-2">Select User Type</h4>
                                <span className="asterisk"> * </span>
                            </div>
                            <div
                                role="group"
                                aria-labelledby="checkbox-group"
                                className="mb-3"
                                id="checkboxUser"
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
                            </div>
                            <MultiSelect
                                label="Skills"
                                data={dataSkills}
                                placeholder="Select Skills"
                                searchable
                                name="skill"
                                creatable
                                getCreateLabel={(query) => `+ Create ${query}`}
                                onChange={(value) => {
                                    setFieldValue("skill", value);
                                }}
                                value={profile && values?.skill}
                                onCreate={(query) => {
                                    const item = { label: query, value: query };
                                    setDataSkills((current: any) => [
                                        ...current,
                                        item,
                                    ]);

                                    const newValue = dataSkills?.map(
                                        (item: any) => item.value
                                    );

                                    setFieldValue("skill", newValue);

                                    return item;
                                }}
                                disabled={isInputDisabled}
                                withAsterisk
                            />
                            <MultiSelect
                                data={interestOptions}
                                name="interests"
                                onChange={(value) => {
                                    setFieldValue("interests", value);
                                }}
                                value={values?.interests}
                                label="Interests"
                                disabled={isInputDisabled}
                                placeholder="Enter your interests"
                            />

                            <RadioField
                                type="radio"
                                name="experience_level"
                                variables={experience}
                                labelName="Experience Level"
                                touch={touched.experience_level}
                                error={errors.experience_level}
                                disabled={isInputDisabled}
                                fieldRequired
                            />
                            <div className="d-flex">
                                <h4 className="me-2">Active Hours</h4>
                                <span className="asterisk">{` *`}</span>
                            </div>
                            <Row className="g-5">
                                <Col md={3}>
                                    <MantineTimeField
                                        name="active_hour_start"
                                        labelName="From"
                                        placeHolder="hh/mm"
                                        touch={touched.active_hour_start}
                                        error={errors.active_hour_start}
                                        handleChange={(value) => {
                                            setFieldValue(
                                                "active_hour_start",
                                                value
                                            );
                                        }}
                                        disabled={isInputDisabled}
                                    />
                                </Col>
                                <Col md={3}>
                                    <MantineTimeField
                                        name="active_hour_end"
                                        labelName="To"
                                        placeHolder="hh/mm"
                                        touch={touched.active_hour_end}
                                        error={errors.active_hour_end}
                                        handleChange={(value) => {
                                            setFieldValue(
                                                "active_hour_end",
                                                value
                                            );
                                        }}
                                        disabled={isInputDisabled}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <InputField
                                        type="number"
                                        name="hourly_rate"
                                        labelName="Base Rate Per Hour"
                                        error={errors.hourly_rate}
                                        touch={touched.hourly_rate}
                                        disabled={isInputDisabled}
                                        placeHolder="Base Rate Per Hour"
                                        fieldRequired
                                    />
                                </Col>
                            </Row>
                            <h3>Address</h3>

                            <Select
                                label="Country"
                                placeholder="Select your country"
                                name="country"
                                searchable
                                nothingFound="No result found."
                                value={countryChange}
                                onChange={(value) => {
                                    setCountryChange(value ? value : "");
                                    handleCountryChanged(value, setFieldValue);
                                }}
                                data={countryResults ?? []}
                                error={errors.country}
                                disabled={isInputDisabled}
                            />
                            <SelectCity
                                disabled={isInputDisabled || !countryChange}
                                countryId={countryChange ? countryChange : ""}
                                label="City"
                                placeholder="Select your city"
                                onCityChange={(city) =>
                                    setFieldValue("city", city, true)
                                }
                                value={cityData.initialId}
                                data={cityData.initialData}
                                nothingFound={"nothing found"}
                                error={errors.city}
                            />
                            <PlacesAutocomplete
                                size="md"
                                label="Address Line 1"
                                placeholder="Enter your primary address"
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
                                withAsterisk
                            />
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
                                error={errors.language}
                            />
                            <Select
                                label="Currency"
                                placeholder="Select your currency"
                                name="charge_currency"
                                searchable
                                nothingFound="No result found."
                                disabled={isInputDisabled}
                                value={currencyChange}
                                defaultValue="NPR"
                                key={currencyChange}
                                //value={currencyChange}
                                onChange={(value) => {
                                    setCurrencyChange(value ? value : "NPR");
                                    handleCurrencyChanged(value, setFieldValue);
                                }}
                                data={currencyResults ?? []}
                                error={errors.charge_currency}
                                withAsterisk
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
                                fieldRequired
                            />
                            <SelectInputField
                                name="task_preferences"
                                labelName="Task Preferences"
                                touch={touched.task_preferences}
                                error={errors.task_preferences}
                                placeHolder="Select your preferences"
                                options={task_preferences}
                                disabled={isInputDisabled}
                                fieldRequired
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
                                    {isEditButtonClicked || !profile ? (
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
                                    ) : null}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
            />
        </>
    );
};
export default AccountForm;
