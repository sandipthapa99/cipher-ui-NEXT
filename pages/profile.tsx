import Breadcrum from "@components/common/Breadcrum";

import Layout from "@components/Layout";
import AboutProfile from "@components/Profile/AboutProfile";
import OrganizationProfile from "@components/Profile/OrganizationProfile";
import UserProfileCard from "@components/common/UserProfile";
import type { NextPage } from "next";

import { useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";

import { tabContent } from "staticData/tab";
import { userProfileCardInfo } from "staticData/userProfileCard";
import TasksProfileCard from "@components/Profile/TasksProfile";
import { profileTaskCard } from "staticData/profileTaskCard";

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
                                <Tab
                                    key="1"
                                    eventKey="organization"
                                    title="Organization"
                                >
                                    <OrganizationProfile />
                                </Tab>
                                <Tab key="2" eventKey="tasks" title="Tasks">
                                    <div className="task-container">
                                        <Row>
                                            {profileTaskCard &&
                                                profileTaskCard.map((info) => (
                                                    <Col
                                                        lg={4}
                                                        md={3}
                                                        key={info.id}
                                                    >
                                                        <TasksProfileCard
                                                            title={info.title}
                                                            cardImage={
                                                                info.cardImage
                                                            }
                                                            description={
                                                                info.description
                                                            }
                                                            address={
                                                                info.address
                                                            }
                                                            rating={info.rating}
                                                            price={info.price}
                                                        />
                                                    </Col>
                                                ))}
                                        </Row>
                                    </div>
                                </Tab>
                                <Tab key="3" eventKey="saved" title="Saved">
                                    <AboutProfile />
                                </Tab>
                                <Tab
                                    key="4"
                                    eventKey="activities"
                                    title="Activities"
                                >
                                    <AboutProfile />
                                </Tab>
                                <Tab
                                    key="5"
                                    eventKey="documents"
                                    title="Documents"
                                >
                                    <AboutProfile />
                                </Tab>
                                <Tab key="6" eventKey="rewards" title="Rewards">
                                    <AboutProfile />
                                </Tab>
                            </Tabs>
                        </div>
                    </section>
                    {/* Service detail reviews section start */}

                    {/* Service detail reviews setion end */}
                </section>
            </Container>
        </Layout>
    );
};

export default UserProfile;
