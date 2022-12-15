import { BreadCrumb } from "@components/common/BreadCrumb";
import { Tab } from "@components/common/Tab";
import UserProfileCard from "@components/common/UserProfile";
import Layout from "@components/Layout";
import AboutProfile from "@components/Profile/AboutUser";
import UserActivities from "@components/Profile/Activities";
import UserDocument from "@components/Profile/Document";
import RewardCard from "@components/Profile/RewardCard";
import SavedBookings from "@components/Profile/SavedBookings";
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

    // const { data: userData } = useData<UserProfileProps["profileDetails"]>(
    //     ["profile"],
    //     "/tasker/profile/"
    // );
    // const profileDetails = userData?.data;

    // if (isLoading || !data) return <FullPageLoader />;
    //
    const remaining = {
        userRating: 4,
        userBadge: "Gold",
        userPoints: 58,
        pointGoal: 42,
        happyClients: 24,
        successRate: 30,
        userReviews: 14,
        tooltipMessage: "Profile Level",
        taskCompleted: 30,
        userActiveStatus: true,
    };
    // useEffect(() => {
    //     if (!profileDetails && !isLoading) {
    //         router.push("/settings/account/individual");
    //     }
    // }, [isLoading, profileDetails, router]);

    if (!profileDetails) {
        return (
            <>
                <Layout
                    title="Profile | Homaale"
                    description="Homaale is a platform designed to provide service booking solutions to the
                service seekers and business opportunities to various service providing companies by bridging a gap between them. 
                 It covers a wide range of services from various industries like Accounting, Gardening,
                Health, Beauty, and many more."
                    keywords="homaale, homaale-profile,  airtasker-nepali,nepali-working-platform, homaale-feeback, business, online-business"
                >
                    <Container fluid="xl" className="px-4">
                        <BreadCrumb currentPage="Profile" />
                        <Row className="row-create-profile">
                            <Col className="create-profile">
                                <h1>Your profile is incomplete!</h1>
                                <p>Redirecting to your Account Settings...</p>

                                <button className="btn-create-profile">
                                    <Link
                                        href={"settings/account/individual"}
                                        className="text-profile"
                                    >
                                        Complete Profile Now
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
        <Layout title="Profile | Homaale">
            <Container fluid="xl" className="px-4">
                <section className="user-profile">
                    <BreadCrumb currentPage="Profile" />

                    {/* Explore top container start */}

                    <section className="user-profile__top-container">
                        <UserProfileCard
                            user={profileDetails?.user}
                            stats={profileDetails?.stats}
                            country={profileDetails?.country}
                            key={profileDetails?.id}
                            points={profileDetails?.points}
                            profile_image={
                                profileDetails?.user?.profile_image
                                    ? profileDetails?.user?.profile_image
                                    : profileDetails?.avatar?.image
                                    ? profileDetails?.avatar?.image
                                    : "/userprofile/unknownPerson.jpg"
                            }
                            badge={profileDetails?.badge}
                            full_name={`${profileDetails?.user?.first_name} ${profileDetails?.user?.middle_name} ${profileDetails?.user?.last_name}`}
                            user_type={profileDetails?.user_type}
                            rating={profileDetails?.rating?.avg_rating}
                            hourly_rate={profileDetails?.hourly_rate}
                            phone={profileDetails?.user?.phone}
                            address_line1={profileDetails?.address_line1}
                            skill={profileDetails?.skill}
                            active_hour_start={
                                profileDetails?.active_hour_start
                            }
                            address_line2={profileDetails?.address_line2}
                            active_hour_end={profileDetails?.active_hour_end}
                            bio={profileDetails?.bio}
                            userBadge={remaining?.userBadge}
                            userPoints={profileDetails?.points}
                            pointGoal={remaining?.pointGoal}
                            charge_currency={
                                profileDetails?.charge_currency?.symbol
                            }
                            userActiveStatus={remaining?.userActiveStatus}
                            tooltipMessage={remaining?.tooltipMessage}
                            is_profile_verified={
                                profileDetails?.is_profile_verified
                            }
                            followers_count={profileDetails?.followers_count}
                            following_count={profileDetails?.following_count}
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
                                    // {
                                    //     title: "Services",
                                    //     content: <TasksProfileCard />,
                                    // },
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
            queryClient.prefetchQuery(["tasker-rating"]),
            queryClient.prefetchQuery(["tasker-document"]),
            queryClient.prefetchQuery(["tasker-activities"]),
            queryClient.prefetchQuery(["all-services"]),
            queryClient.prefetchQuery(["bookmarks", "user"]),
            queryClient.prefetchQuery(["bookmarks", "entityservice"]),
            queryClient.prefetchQuery(["followers"]),
            queryClient.prefetchQuery(["followings"]),
        ]);
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (err) {
        return {
            props: {
                certificationData: [],
                educationData: [],
                experienceData: [],
                profile: [],
                ratingData: [],
                documentData: [],
                activitiesData: [],
            },
        };
    }
};
