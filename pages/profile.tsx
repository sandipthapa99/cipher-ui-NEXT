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
import { useGetProfile } from "hooks/profile/useGetProfile";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { UserProfileProps } from "types/userProfileProps";

const UserProfile: NextPage<UserProfileProps> = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const { data: profileDetails } = useGetProfile();

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
    if (profileDetails?.message) {
        return (
            <>
                <Layout title="Profile | Cipher">
                    <Container fluid="xl" className="px-5">
                        <BreadCrumb currentPage="Profile" />
                        <Row className="row-create-profile">
                            <Col className="create-profile">
                                <h1>{profileDetails?.message}</h1>
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

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await Promise.all([
            queryClient.prefetchQuery(["tasker-certification"]),
            queryClient.prefetchQuery(["tasker-education"]),
            queryClient.prefetchQuery(["tasker-experience"]),
            queryClient.prefetchQuery(["tasker-portfolio"]),
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
            },
        };
    }
};
