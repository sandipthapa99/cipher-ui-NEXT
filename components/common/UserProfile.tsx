import PhotoEdit from "@components/Profile/PhotoEdit";
import { faCamera } from "@fortawesome/pro-light-svg-icons";
import {
    faAt,
    faCircleQuestion,
    faEllipsisVertical,
    faGear,
    faLocationDot,
    faPencil,
    faPhone,
    faSparkles,
    faStar,
    faTimer,
} from "@fortawesome/pro-regular-svg-icons";
import { faCircle, faStar as rated } from "@fortawesome/pro-solid-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCountryBYId } from "hooks/profile/getCountryById";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import type { ProfileEditValueProps } from "types/ProfileEditValueProps";
import type { UserProfileInfoProps } from "types/userProfile";
import { axiosClient } from "utils/axiosClient";

import ProfileEditForm from "./ProfileEditForm";
import ShareIcon from "./ShareIcon";
import TooltipMessage from "./Tooltip";
const UserProfileCard = ({
    userImage,
    userJob,
    userName,
    userRating,
    userPrice,
    userLocation,
    userPhone,
    userEmail,
    moreServices,
    activeFrom,
    activeTo,
    userBio,
    userBadge,
    userPoints,
    pointGoal,
    happyClients,
    successRate,
    taskCompleted,
    tooltipMessage,
    countryCode,
    isProfileVerified,
    field,
}: UserProfileInfoProps) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const { data: country } = useGetCountryBYId(countryCode);
    const [image, setImage] = useState();
    const services = moreServices ? JSON.parse(moreServices) : [];
    const queryClient = useQueryClient();
    // const renderServices: string[] | undefined = services?.map(
    //     (service: string, index: number) => (
    //         <p key={index}>
    //             {service}
    //             {index < services.length - 2
    //                 ? ", "
    //                 : index < services.length - 1
    //                 ? " and"
    //                 : ""}
    //         </p>
    //     )
    // );
    const editProfile = useMutation((data: ProfileEditValueProps) =>
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
    const userType: string[] = userJob ? JSON.parse(userJob) : [];

    const renderType = userType.map((type: string, index: number) => {
        return (
            <p className="organization" key={index}>
                Individual | {type}
            </p>
        );
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const finalfrom =
        activeFrom?.charAt(0) === "0" ? activeFrom?.slice(1) : activeFrom;
    const finalto = activeTo?.charAt(0) === "0" ? activeTo?.slice(1) : activeTo;

    interface DropdownProps {
        children?: ReactNode;
    }

    const ProfileDropdown = ({ children }: DropdownProps) => {
        return (
            <div className="ellipsis">
                <Dropdown>
                    <Dropdown.Toggle>
                        {children && <>{children}</>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            href="#/action-1"
                            onClick={() => setShowEdit(!showEdit)}
                            className="d-flex align-items-center"
                        >
                            <FontAwesomeIcon
                                className="svg-icon"
                                icon={faPencil}
                            />
                            Edit
                        </Dropdown.Item>
                        <Link href="/settings/account/individual">
                            <Dropdown.Item
                                href="#/action-3"
                                className="d-flex align-items-center"
                            >
                                <FontAwesomeIcon
                                    className="svg-icon"
                                    icon={faGear}
                                />
                                Settings
                            </Dropdown.Item>
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    };

    return (
        <div className="profile-card-block">
            <Row>
                <Col md={3} className="profile-card-block__profile">
                    <figure className="profile-img mx-auto">
                        {isProfileVerified ?? (
                            <FontAwesomeIcon
                                icon={faBadgeCheck}
                                className="badge-icon"
                            />
                        )}

                        <div className="img-dragdrop d-flex align-items-center justify-content-center">
                            <label
                                htmlFor="choosefile"
                                className="browse text-primary"
                                role="button"
                            >
                                <FontAwesomeIcon
                                    icon={faCamera}
                                    className="camera-icon"
                                />
                            </label>

                            <input
                                hidden
                                id="choosefile"
                                type="file"
                                ref={inputRef}
                                name="image"
                                onChange={(event: any) => {
                                    const files = event.target.files;
                                    field?.("image", (files ?? [])[0]);
                                    setImage(files[0]);
                                    console.log("image=", image);
                                    setShowEditForm(!showEditForm);
                                }}
                            />
                        </div>

                        <Image
                            src={
                                userImage
                                    ? userImage
                                    : "/userprofile/unknownPerson.jpg"
                            }
                            alt="profile-pic"
                            className="rounded-circle"
                            objectFit="cover"
                            height={150}
                            width={150}
                            priority={true}
                        />
                    </figure>

                    <PhotoEdit
                        photo={image}
                        show={showEditForm}
                        setShowEditForm={setShowEditForm}
                        handleClose={() => setShowEditForm(false)}
                        handleSubmit={() => onEditProfile(image)}
                    />
                    <div className="profile-intro d-flex">
                        <h1 className="name text-center">{userName}</h1>
                        {/* <div className="active"></div> */}
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="svg-icon active"
                        />
                    </div>
                    {renderType}
                    <div className="rating">
                        {Array.from({ length: userRating }, (_, i) => (
                            <span key={i}>
                                <FontAwesomeIcon
                                    icon={rated}
                                    className="svg-icon star rated-star"
                                />
                            </span>
                        ))}
                        {Array.from({ length: 5 - userRating }, (_, i) => (
                            <span key={i}>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="svg-icon star unrated"
                                />
                            </span>
                        ))}
                    </div>
                    <div className="price">${userPrice}/hr</div>
                    <button
                        className="button"
                        onClick={() => setShowEdit(!showEdit)}
                    >
                        Edit Profile
                    </button>
                    <ProfileEditForm
                        show={showEdit}
                        setShowEdit={setShowEdit}
                        handleClose={() => setShowEdit(false)}
                        userName={userName}
                    />
                </Col>

                <Col md={9} className="profile-card-block__general-info">
                    <Row className="top-container">
                        <Col md={6}>
                            <h1>General Information</h1>

                            <div className="content">
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className="thumbnail-img"
                                    />

                                    <p>
                                        +{country?.phone_code}
                                        {userPhone}
                                    </p>
                                </div>
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faAt}
                                        className="thumbnail-img"
                                    />

                                    <p>{userEmail}</p>
                                </div>
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="thumbnail-img"
                                    />

                                    <p>{userLocation}</p>
                                </div>

                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faTimer}
                                        className="thumbnail-img"
                                    />
                                    <p>
                                        &nbsp;Active Hours: &nbsp;
                                        {finalfrom?.replace(":00", "")} AM
                                        &nbsp;to &nbsp;
                                        {finalto?.replace(":00", "")} PM
                                    </p>
                                </div>

                                <div className="success-rate type d-flex flex-col">
                                    <div className="count d-flex flex-row">
                                        <FontAwesomeIcon
                                            icon={faSparkles}
                                            className="thumbnail-img"
                                        />
                                        {services
                                            ? services.map(
                                                  (info: any, index: any) => (
                                                      <p key={index}>
                                                          &nbsp;{info}
                                                          {index <
                                                          services.length - 2
                                                              ? ", "
                                                              : index <
                                                                services.length -
                                                                    1
                                                              ? " and"
                                                              : ""}
                                                      </p>
                                                  )
                                              )
                                            : "No skills to show. Please add them"}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="reactions d-flex align-items-center">
                                <div className="d-flex flex-col share">
                                    <ShareIcon
                                        url={`http://localhost:3005/profile/`}
                                        quote={
                                            "Hi guys checkout my Cipher Profile"
                                        }
                                        hashtag={"cipher-profile"}
                                    />
                                </div>
                                <ProfileDropdown>
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                        className="svg-icon option"
                                    />
                                </ProfileDropdown>
                            </div>
                            <div className="bio d-flex">
                                <p className="title">Bio</p>
                                <p className="details">{userBio}</p>
                            </div>
                            <div className="user-type-status">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/userprofile/userprofile.jpg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="user-type-icon"
                                    />
                                </figure>
                                <div className="left">
                                    <div className="user-type d-flex">
                                        <TooltipMessage
                                            message={tooltipMessage}
                                            place="top"
                                        >
                                            <h1>{userBadge}</h1>
                                        </TooltipMessage>
                                        <FontAwesomeIcon
                                            icon={faCircleQuestion}
                                            className="svg-icon"
                                        />
                                    </div>

                                    <p className="user-point">
                                        {userPoints} points
                                    </p>
                                    <div className="progress-bar"></div>
                                    <p>
                                        Earn {pointGoal} points more to reach
                                        Gold
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex status">
                        <Col md={3} xs={6}>
                            <div className="type success-rate">
                                <h1 className="number">{successRate}</h1>
                                <p>
                                    Success
                                    <br />
                                    Rate
                                </p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            <div className="type happy-clients">
                                <h1 className="number">{happyClients}</h1>
                                <p>
                                    Happy
                                    <br />
                                    Clients
                                </p>
                            </div>
                        </Col>

                        <Col md={3} xs={6}>
                            <div className="type task-completed">
                                <h1 className="number">{taskCompleted}</h1>
                                <p>
                                    Tasks
                                    <br />
                                    Completed
                                </p>
                            </div>
                        </Col>
                        <Col md={3} xs={6}>
                            {" "}
                            <div className="type user-reviews">
                                <h1 className="number">{taskCompleted}</h1>
                                <p>
                                    User
                                    <br />
                                    Reviews
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default UserProfileCard;
