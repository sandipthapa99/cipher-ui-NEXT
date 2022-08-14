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
import { useGetCountryBYId } from "hooks/profile/getCountryById";
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { NextPage } from "next";
import { useState } from "react";
import { Container } from "react-bootstrap";

const UserProfile: NextPage = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const { data: profileDetails } = useGetProfile();
    console.log(profileDetails);

    const remaining = {
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

    return (
        <Layout title="Profile | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="user-profile">
                    <BreadCrumb currentPage="Profile" />

                    {/* Explore top container start */}
                    <section className="user-profile__top-container">
                        <UserProfileCard
                            countryCode={profileDetails?.country}
                            key={profileDetails?.id}
                            userImage={remaining.userImage}
                            userName={profileDetails?.full_name}
                            userJob={profileDetails?.user_type}
                            userRating={remaining.userRating}
                            userPrice={profileDetails?.hourly_rate}
                            userLocation={profileDetails?.address_line1}
                            userPhone={profileDetails?.phone}
                            userEmail={profileDetails?.user?.email}
                            moreServices={profileDetails?.skill}
                            activeFrom={profileDetails?.active_hour_start}
                            activeTo={profileDetails?.active_hour_end}
                            userBio={profileDetails?.bio}
                            userBadge={remaining.userBadge}
                            userPoints={remaining.userPoints}
                            pointGoal={remaining.pointGoal}
                            happyClients={remaining.happyClients}
                            successRate={remaining.successRate}
                            userReviews={remaining.userReviews}
                            taskCompleted={remaining.taskCompleted}
                            userActiveStatus={remaining.userActiveStatus}
                            tooltipMessage={remaining.tooltipMessage}
                        />
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
