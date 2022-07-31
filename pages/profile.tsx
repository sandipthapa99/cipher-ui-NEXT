import Breadcrum from "@components/common/Breadcrum";
import { Tab } from "@components/common/Tab";
import UserProfileCard from "@components/common/UserProfile";
import Layout from "@components/Layout";
import AboutProfile from "@components/Profile/AboutProfile";
import UserActivities from "@components/Profile/Activities";
import UserDocument from "@components/Profile/Document";
import RewardCard from "@components/Profile/RewardCard";
import SavedBookings from "@components/Profile/SavedBookings";
import TasksProfileCard from "@components/Profile/TasksProfile";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Button, Col, Container, Row, Tabs } from "react-bootstrap";
import { userProfileCardInfo } from "staticData/userProfileCard";
import { withAuth } from "utils/Auth/withAuth";

const UserProfile: NextPage = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    return (
        <Layout title="Profile | Cipher">
            <Container fluid="xl">
                <section className="user-profile">
                    <Breadcrum
                        currentPage="Profile"
                        subPage="Detail"
                        hasSubPage={false}
                    />

                    {/* Explore top container start */}
                    <section className="user-profile__top-container">
                        {userProfileCardInfo &&
                            userProfileCardInfo.map((info) => (
                                <UserProfileCard
                                    key={info.id}
                                    userImage={info.userImage}
                                    userName={info.userName}
                                    userJob={info.userJob}
                                    userRating={info.userRating}
                                    userPrice={info.userPrice}
                                    userLocation={info.userLocation}
                                    userPhone={info.userPhone}
                                    userEmail={info.userEmail}
                                    moreServices={info.moreServices}
                                    activeFrom={info.activeFrom}
                                    activeTo={info.activeTo}
                                    userBio={info.userBio}
                                    userBadge={info.userBadge}
                                    userPoints={info.userPoints}
                                    pointGoal={info.pointGoal}
                                    happyClients={info.happyClients}
                                    successRate={info.successRate}
                                    userReviews={info.userReviews}
                                    taskCompleted={info.taskCompleted}
                                    userActiveStatus={info.userActiveStatus}
                                    tooltipMessage={info.tooltipMessage}
                                />
                            ))}
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
