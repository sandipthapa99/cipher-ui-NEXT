import { MyEarnings } from "@components/Profile/MyEarnings";
import {
    faAt,
    faCircleQuestion,
    faEllipsisVertical,
    faGear,
    faLocationDot,
    faPhone,
    faSparkles,
    faStar as emptyStar,
    faTimer,
} from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress } from "@mantine/core";
import { Rating } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useGetCountryBYId } from "hooks/profile/getCountryById";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import type { UserProfileInfoProps } from "types/userProfile";
// import { userGet } from "utils/auth";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

import ShareIcon from "./ShareIcon";
import TooltipMessage from "./Tooltip";
import { UserFollowersModal } from "./UserFollowersModal";
const UserProfileCard = ({
    profile_image,
    user,
    user_type,
    rating,
    hourly_rate,
    stats,
    address_line1,
    skill,
    charge_currency,
    active_hour_start,
    active_hour_end,
    bio,
    badge,
    full_name,
    points,
    country,
    tooltipMessage,
    is_profile_verified,
    followers_count,
    following_count,
}: UserProfileInfoProps) => {
    const [showFollowers, setShowFollowers] = useState(false);
    const [followerClick, setFollowerClick] = useState("followers");
    const { data: countryData } = useGetCountryBYId(country);
    const services = skill ? JSON.parse(skill) : [];

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

    const newProfileUrl = new URL(window.location.href);

    const { data: followersData } = useQuery(["followers"], async () => {
        const data = await axiosClient.get(urls.followers.list);
        return data.data.result;
    });

    const { data: followingsData } = useQuery(["followings"], async () => {
        const data = await axiosClient.get(urls.followings.list);
        return data.data.result;
    });

    const userType: string[] = user_type ? JSON.parse(user_type) : [];

    const renderType = userType.map((type: string, index: number) => {
        return (
            <p className="organization" key={index}>
                Individual | {type}
            </p>
        );
    });

    // Modal close when the following list is empty

    useEffect(() => {
        if (following_count === 0) {
            setShowFollowers(false);
        }
    }, [following_count]);

    const finalfrom =
        active_hour_start?.charAt(0) === "0"
            ? active_hour_start?.slice(1)
            : active_hour_start;
    const finalto =
        active_hour_end?.charAt(0) === "0"
            ? active_hour_end?.slice(1)
            : active_hour_end;

    interface DropdownProps {
        children?: ReactNode;
    }

    // const style = {
    //     backgroundColor: "#d9d9d9",
    //     height: "1.2rem",
    //     width: "100%",
    //     borderRadius: "7rem",

    //     ":hover": {
    //         width: "58vw",
    //         content: "",
    //         height: "1.2rem",
    //         background:
    //             "linearGradient(270.06deg,rgba(241, 163, 65, 0.58) 0.06%,e8b873 46.12%,#f79c19 86.42%)",
    //         backgroundColor: "#111",
    //     },
    // };

    const router = useRouter();
    const ProfileDropdown = ({ children }: DropdownProps) => {
        return (
            <div className="ellipsis">
                <Dropdown>
                    <Dropdown.Toggle>
                        {children && <>{children}</>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
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
            <Row className="gx-5">
                <Col md={3} className="profile-card-block__profile">
                    <figure className="profile-img mx-auto">
                        {is_profile_verified ?? (
                            <FontAwesomeIcon
                                icon={faBadgeCheck}
                                className="badge-icon"
                            />
                        )}

                        {/* <div className="img-dragdrop d-flex align-items-center justify-content-center">
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
                                    
                                    setShowEditForm(!showEditForm);
                                }}
                            />
                        </div> */}

                        <Image
                            src={
                                profile_image
                                    ? profile_image
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

                    {/* <PhotoEdit
                        photo={image}
                        show={showEditForm}
                        setShowEditForm={setShowEditForm}
                        handleClose={() => setShowEditForm(false)}
                        handleSubmit={() => onEditProfile(image)}
                    /> */}
                    <div className="profile-intro d-flex">
                        <h1 className="name text-center">{full_name}</h1>
                        {/* <div className="active"></div> */}
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="svg-icon active"
                        />
                    </div>

                    {renderType}
                    <div className="followers-following d-flex justify-content-between gap-5 px-2 py-4 text-sm">
                        <span
                            className="followers"
                            onClick={() => {
                                if (followers_count === 0) {
                                    toast.message("You have no followers");
                                } else {
                                    setShowFollowers(true);
                                }
                                setFollowerClick("followers");
                            }}
                        >
                            <strong>{followers_count}</strong> Followers
                        </span>
                        <span
                            className="following"
                            onClick={() => {
                                if (following_count === 0) {
                                    toast.message("You have no followings");
                                } else {
                                    setShowFollowers(true);
                                }

                                setFollowerClick("following");
                            }}
                        >
                            <strong>{following_count}</strong> Followings
                        </span>
                    </div>
                    <div className="rating">
                        {" "}
                        <Rating
                            defaultValue={rating > 0 ? rating : 0}
                            readOnly
                            emptySymbol={
                                <FontAwesomeIcon
                                    icon={emptyStar}
                                    className="unrated-star star"
                                />
                            }
                            fullSymbol={
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="star"
                                />
                            }
                        />
                    </div>

                    <div className="price">
                        {charge_currency} {hourly_rate}/hr
                    </div>
                    <button
                        className="button"
                        onClick={() =>
                            router.push("/settings/account/individual")
                        }
                        // disabled={userGet()?.is_suspended}
                    >
                        Edit Profile
                    </button>
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
                                    {user.phone ? (
                                        <p>
                                            {countryData?.phone_code}
                                            {user.phone
                                                ? user.phone
                                                : "Add new phone number"}
                                        </p>
                                    ) : (
                                        <Link href="/settings/account/security">
                                            Add a phone number.
                                        </Link>
                                    )}
                                </div>
                                {/* {user.email && (
                                    <div className="type d-flex flex-col">
                                        <FontAwesomeIcon
                                            icon={faAt}
                                            className="thumbnail-img"
                                        />

                           const { data: followersData } = useQuery(["followers"], async () => {
        const data = await axiosClient.get(urls.followers.list);
        return data.data.result;
    });             <p>{user.email}</p>
                                    </div>
                                )} */}
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faAt}
                                        className="thumbnail-img"
                                    />
                                    {user.email ? (
                                        <p>{user.email}</p>
                                    ) : (
                                        <Link
                                            className="text-Link"
                                            href="/settings/account/security"
                                        >
                                            Add an email.
                                        </Link>
                                    )}
                                </div>
                                <div className="type d-flex flex-col">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="thumbnail-img"
                                    />

                                    <p>{address_line1}</p>
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

                                <div className="type d-flex flex-wrap flex-col">
                                    <FontAwesomeIcon
                                        icon={faSparkles}
                                        className="thumbnail-img"
                                    />
                                    {services
                                        ? services.map(
                                              (info: any, index: any) => (
                                                  <span key={index}>
                                                      &nbsp;{info}
                                                      {index <
                                                      services.length - 2
                                                          ? ", "
                                                          : index <
                                                            services.length - 1
                                                          ? " and"
                                                          : ""}
                                                  </span>
                                              )
                                          )
                                        : "No skills to show. Please add them"}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="reactions d-flex align-items-center">
                                <div className="d-flex flex-col share">
                                    <ShareIcon
                                        url={`${newProfileUrl.origin}/tasker/${user.id}`}
                                        quote={
                                            "Hi guys checkout my Homaale Profile"
                                        }
                                        hashtag={"Homaale-profile"}
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
                                <p className="details">{bio}</p>
                            </div>
                            <div className="user-type-status">
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            badge?.image
                                                ? badge?.image
                                                : "/userprofile/userprofile.jpg"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="user-type-icon"
                                    />
                                </figure>
                                <div className="left">
                                    <div className="user-type d-flex">
                                        <h1>{badge?.title}</h1>
                                        <TooltipMessage
                                            message={tooltipMessage}
                                            place="top"
                                        >
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCircleQuestion}
                                                    className="svg-icon"
                                                />
                                            </span>
                                        </TooltipMessage>
                                    </div>

                                    <p className="user-point">
                                        {badge?.next ? points : "Max Level"}{" "}
                                        points
                                    </p>
                                    <div>
                                        <Progress
                                            color="yellow"
                                            value={
                                                badge?.next
                                                    ? (points /
                                                          badge?.next
                                                              ?.progress_level_start) *
                                                      100
                                                    : 100
                                            }
                                        />
                                    </div>
                                    {/* <div className="progress-bar">
                                        <div className="inside-progress-bar"></div>
                                    </div> */}
                                    {badge?.next && (
                                        <p>
                                            Earn{" "}
                                            {badge?.next?.progress_level_start -
                                                points}{" "}
                                            points more to reach {""}
                                            {badge?.next?.title}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="d-flex status">
                        <Col md={2} xs={6}>
                            <div className="type success-rate">
                                <h1 className="number">
                                    {stats?.success_rate
                                        ? stats?.success_rate.toFixed(1)
                                        : 0}
                                </h1>
                                <p>
                                    Success
                                    <br />
                                    Rate
                                </p>
                            </div>
                        </Col>
                        <Col md={2} xs={6}>
                            <div className="type happy-clients">
                                <h1 className="number">
                                    {stats?.happy_clients}
                                </h1>
                                <p>
                                    Happy
                                    <br />
                                    Clients
                                </p>
                            </div>
                        </Col>

                        <Col md={2} xs={6}>
                            <div className="type task-completed">
                                <h1 className="number">
                                    {stats?.task_completed}
                                </h1>
                                <p>
                                    Tasks
                                    <br />
                                    Completed
                                </p>
                            </div>
                        </Col>
                        <Col md={2} xs={6}>
                            <div className="type user-reviews">
                                <h1 className="number">
                                    {stats?.user_reviews}
                                </h1>
                                <p>
                                    User
                                    <br />
                                    Reviews
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <MyEarnings />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <UserFollowersModal
                opened={showFollowers}
                setShowFollowers={setShowFollowers}
                title={
                    followerClick == "followers"
                        ? "My Followers"
                        : "My Followings"
                }
                followersData={
                    followerClick === "followers"
                        ? followersData
                        : followingsData
                }
                followerClick={followerClick}
            />
        </div>
    );
};

export default UserProfileCard;
