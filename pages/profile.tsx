import { BreadCrumb } from "@components/common/BreadCrumb";
import { Tab } from "@components/common/Tab";
import UserProfileCard from "@components/common/UserProfile";
import Layout from "@components/Layout";
import AboutProfile from "@components/Profile/AboutProfile";
import UserActivities from "@components/Profile/Activities";
import UserDocument from "@components/Profile/Document";
import RewardCard from "@components/Profile/RewardCard";
import SavedBookings from "@components/Profile/SavedBookings";
import TasksProfileCard from "@components/Profile/TasksProfile";
import { useQuery } from "@tanstack/react-query";
import { useCountryById } from "hooks/country/useCountryById";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { NextPage } from "next";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
const remainingData = {
    userImage: "/service-details/provider1.svg",
    userRating: 4,
    userBadge: "Gold",
    userPoints: 58,
    pointGoal: 42,
    happyClients: 24,
    successRate: 30,
    userReviews: 14,
    tooltipMessage: "Tooltip Message will show up here",
    taskCompleted: 30,
    userActiveStatus: true,
};

const UserProfile: NextPage = () => {
    const { data: profileDetails } = useGetProfile();
    const { data: countryDetail } = useCountryById(profileDetails?.country);

    const [activeTabIdx, setActiveTabIdx] = useState(0);

    return (
        <Layout title="Profile | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="user-profile">
                    <BreadCrumb currentPage="Profile" />

                    {/* Explore top container start */}
                    <section className="user-profile__top-container">
                        {profileDetails && (
                            <UserProfileCard
                                key={profileDetails.id}
                                countryCode={countryDetail?.phone_code}
                                userImage={remainingData.userImage}
                                userName={profileDetails.full_name}
                                userJob={profileDetails.user_type}
                                userRating={remainingData.userRating}
                                userPrice={profileDetails.hourly_rate}
                                userLocation={profileDetails.address_line1}
                                userPhone={profileDetails.phone}
                                userEmail={profileDetails.user.email}
                                moreServices={profileDetails.skill}
                                activeFrom={profileDetails.active_hour_start}
                                activeTo={profileDetails.active_hour_end}
                                userBio={profileDetails.bio}
                                userBadge={remainingData.userBadge}
                                userPoints={remainingData.userPoints}
                                pointGoal={remainingData.pointGoal}
                                happyClients={remainingData.happyClients}
                                successRate={remainingData.successRate}
                                userReviews={remainingData.userReviews}
                                taskCompleted={remainingData.taskCompleted}
                                userActiveStatus={
                                    remainingData.userActiveStatus
                                }
                                tooltipMessage={remainingData.tooltipMessage}
                            />
                        )}
                        {/* <UserProfileCard
                            key={profileDetails.id}
                            userImage={profileDetails.userImage}
                            userName={profileDetails.userName}
                            userJob={profileDetails.userJob}
                            userRating={profileDetails.userRating}
                            userPrice={profileDetails.userPrice}
                            userLocation={profileDetails.userLocation}
                            userPhone={profileDetails.userPhone}
                            userEmail={profileDetails.userEmail}
                            moreServices={profileDetails.moreServices}
                            activeFrom={profileDetails.activeFrom}
                            activeTo={profileDetails.activeTo}
                            userBio={profileDetails.userBio}
                            userBadge={profileDetails.userBadge}
                            userPoints={profileDetails.userPoints}
                            pointGoal={profileDetails.pointGoal}
                            happyClients={profileDetails.happyClients}
                            successRate={profileDetails.successRate}
                            userReviews={profileDetails.userReviews}
                            taskCompleted={profileDetails.taskCompleted}
                            userActiveStatus={profileDetails.userActiveStatus}
                            tooltipMessage={profileDetails.tooltipMessage}
                        /> */}
                    </section>
                    <section className="user-profile__bottom-container">
                        <div className="tabs">
                            <Tab
                                activeIndex={activeTabIdx}
                                onTabClick={setActiveTabIdx}
                                items={[
                                    {
                                        title: "About",
                                        content: <AboutProfile />,
                                    },
                                    {
                                        title: "Tasks",
                                        content: <TasksProfileCard />,
                                    },
                                    {
                                        title: "Saved",
                                        content: <SavedBookings />,
                                    },
                                    {
                                        title: "Documents",
                                        content: <UserDocument />,
                                    },
                                    {
                                        title: "Activities",
                                        content: <UserActivities />,
                                    },
                                    {
                                        title: "Rewards",
                                        content: <RewardCard />,
                                    },
                                ]}
                            />
                        </div>
                    </section>
                </section>
            </Container>
        </Layout>
    );
};

export default UserProfile;
