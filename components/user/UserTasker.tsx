import { Tab } from "@components/common/Tab";
import { WelcomeComponent } from "@components/common/WelcomeComponent";
import { SearchBody } from "@components/SearchTask/searchBody";
import GettingStartedTask from "@components/Task/GettingStartedCard";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SearchBodyData } from "staticData/searchBody";

import { Recommended } from "./Recommended";

export const UserTasker = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    return (
        <>
            <section
                className="welcome-section-user-tasker"
                id="welcome-section-user-tasker"
            >
                <Container fluid="xl">
                    <WelcomeComponent />
                </Container>
            </section>

            <section className="user-tasker-body" id="user-tasker-body">
                <Container fluid="xl">
                    <Row>
                        <Col md={8} sm={12}>
                            <Tab
                                activeIndex={activeTabIdx}
                                onTabClick={setActiveTabIdx}
                                items={[
                                    {
                                        title: "Recommended",
                                        content: <Recommended />,
                                    },
                                    {
                                        title: "In Progress",
                                        content: <div>InProgress</div>,
                                    },
                                    {
                                        title: "History",
                                        content: <div>History</div>,
                                    },
                                ]}
                            />
                        </Col>
                        <Col md={4} sm={12}>
                            <GettingStartedTask />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};
