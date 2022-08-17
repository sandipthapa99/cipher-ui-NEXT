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
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { UserProfileProps } from "types/userProfileProps";

const UserProfile: NextPage<UserProfileProps> = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    // const { data: data } = useGetProfile();

    const { data: userData } = useData<UserProfileProps["profileData"]>(
        ["profile"],
        "/tasker/profile/"
    );
    const profileData = userData?.data;

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
    if (!profileData) {
        return (
            <>
                <Layout title="Profile | Cipher">
                    <Container fluid="xl" className="px-5">
                        <BreadCrumb currentPage="Profile" />
                        <Row className="row-create-profile">
                            <Col className="create-profile">
                                <h1>Create Profile. Start Your Journey</h1>
                                <button className="btn-create-profile">
                                    <Link
                                        href={"settings/account/individual"}
                                        className="text-profile"
                                    >
                                        Create Profile
                                    </Link>
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </Layout>
            </>
        );
    }

    return (
        <Layout title="Profile | Cipher">
            <Container fluid="xl" className="px-5">
                <section className="user-profile">
                    <BreadCrumb currentPage="Profile" />

                    {/* Explore top container start */}

                    {/* <section className="user-profile__top-container">
                        <UserProfileCard
                            countryCode={profileData?.country}
                            key={profileData?.id}
                            userImage={profileData?.profile_image}
                            userName={profileData?.full_name}
                            userJob={profileData?.user_type}
                            userRating={remaining.userRating}
                            userPrice={profileData?.hourly_rate}
                            userLocation={profileData?.address_line1}
                            userPhone={profileData?.phone}
                            userEmail={profileData?.user?.email}
                            moreServices={profileData?.skill}
                            activeFrom={profileData?.active_hour_start}
                            activeTo={profileData?.active_hour_end}
                            userBio={profileData?.bio}
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
                    </section> */}

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

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await Promise.all([
            queryClient.prefetchQuery(["tasker-certification"]),
            queryClient.prefetchQuery(["tasker-education"]),
            queryClient.prefetchQuery(["tasker-experience"]),
            queryClient.prefetchQuery(["tasker-portfolio"]),
            queryClient.prefetchQuery(["profile"]),
        ]);
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (err: any) {
        return {
            props: {
                certificationData: [],
                educationData: [],
                experienceData: [],
                profileData: [],
            },
        };
    }
};
