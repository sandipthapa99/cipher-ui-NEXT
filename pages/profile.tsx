import Breadcrum from "@components/common/Breadcrum";
import UserProfileCard from "@components/common/UserProfile";
import Layout from "@components/Layout";
import AboutProfile from "@components/Profile/AboutProfile";
import UserActivities from "@components/Profile/Activities";
import UserDocument from "@components/Profile/Document";
import RewardCard from "@components/Profile/RewardCard";
import SavedBookings from "@components/Profile/SavedBookings";
import TasksProfileCard from "@components/Profile/TasksProfile";
import type { NextPage } from "next";
import { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { rewardCardContent } from "staticData/rewardCard";
import { userActivitiesTimeline } from "staticData/userActivitiesTimeline";
import { userDocument } from "staticData/userDocument";
import { userProfileCardInfo } from "staticData/userProfileCard";

const UserProfile: NextPage = () => {
    const [key, setKey] = useState("about");
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
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey((prev) => k ?? prev)}
                                className="mb-3"
                            >
                                {/* {tabContent &&
                  tabContent.map((tabName) => (
                    <Tab
                      key={tabName.id}
                      eventKey={tabName.title.toLowerCase()}
                      title={tabName.title}
                    >



                      <OrganizationProfile />
                    </Tab>
                  ))} */}
                                <Tab key="0" eventKey="about" title="About">
                                    <AboutProfile />
                                </Tab>
                                {/* <Tab
                                    key="1"
                                    eventKey="organization"
                                    title="Organization"
                                >
                                    <OrganizationProfile />
                                </Tab> */}
                                <Tab key="2" eventKey="tasks" title="Tasks">
                                    <TasksProfileCard />
                                </Tab>
                                <Tab key="3" eventKey="saved" title="Saved">
                                    <SavedBookings />
                                </Tab>
                                <Tab
                                    key="4"
                                    eventKey="activities"
                                    title="Activities"
                                >
                                    <div className="activities">
                                        {userActivitiesTimeline &&
                                            userActivitiesTimeline.map(
                                                (activity) => (
                                                    <UserActivities
                                                        key={activity.id}
                                                        title={activity.title}
                                                        date={activity.date}
                                                        image={activity.image}
                                                        editService={
                                                            activity.editService
                                                        }
                                                        loggedInDate={
                                                            activity.loggedInDate
                                                        }
                                                        ipAddress={
                                                            activity.ipAddress
                                                        }
                                                    />
                                                )
                                            )}
                                    </div>
                                </Tab>
                                <Tab
                                    key="5"
                                    eventKey="documents"
                                    title="Documents"
                                >
                                    <div className="user-document">
                                        <div className="title-wrapper d-flex justify-content-between">
                                            <h1>My Documents</h1>
                                            <a href="#!">Add New</a>
                                        </div>
                                        <div className="content">
                                            <Row>
                                                {userDocument &&
                                                    userDocument.map(
                                                        (document) => (
                                                            <Col
                                                                key={
                                                                    document.id
                                                                }
                                                                md={3}
                                                                lg={2}
                                                                sm={4}
                                                                xs={6}
                                                                className="gx-5"
                                                            >
                                                                <UserDocument
                                                                    name={
                                                                        document.name
                                                                    }
                                                                    type={
                                                                        document.type
                                                                    }
                                                                />
                                                            </Col>
                                                        )
                                                    )}
                                            </Row>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab key="6" eventKey="rewards" title="Rewards">
                                    <div className="rewards">
                                        <Row className="d-flex align-items-stretch">
                                            {rewardCardContent &&
                                                rewardCardContent.map(
                                                    (info) => (
                                                        <Col
                                                            key={info.id}
                                                            className="d-flex gx-4 align-items-stretch"
                                                            lg={3}
                                                            md={4}
                                                            sm={6}
                                                        >
                                                            <RewardCard
                                                                rewardImage={
                                                                    info.rewardImage
                                                                }
                                                                title={
                                                                    info.title
                                                                }
                                                                haveDiscount={
                                                                    info.haveDiscount
                                                                }
                                                                btnText={
                                                                    info.btnText
                                                                }
                                                                description={
                                                                    info.description
                                                                }
                                                                isAvailable={
                                                                    info.isAvailable
                                                                }
                                                                discount={
                                                                    info.discount
                                                                }
                                                                daysLeft={
                                                                    info.daysLeft
                                                                }
                                                                couponCode={
                                                                    info.couponCode
                                                                }
                                                                haveCouponCode={
                                                                    info.haveCouponCode
                                                                }
                                                                isCouponCodeAvailable={
                                                                    info.isCouponCodeAvailable
                                                                }
                                                            />
                                                        </Col>
                                                    )
                                                )}
                                        </Row>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </section>
                </section>
            </Container>
        </Layout>
    );
};

export default UserProfile;
