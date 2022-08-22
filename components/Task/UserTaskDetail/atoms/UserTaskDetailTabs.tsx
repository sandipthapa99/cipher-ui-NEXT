import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import AboutProfile from "@components/Profile/AboutProfile";
import { AboutTasker } from "@components/Tasker/AboutTasker";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { serviceCards } from "staticData/serviceCards";
import type { TaskerDetails } from "staticData/taskDetail";

export interface UserTaskDetailTabsProps {
    user: TaskerDetails;
}

export const UserTaskDetailTabs = ({ user }: UserTaskDetailTabsProps) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    return (
        <Tab
            activeIndex={activeTabIdx}
            onTabClick={setActiveTabIdx}
            items={[
                { title: "About", content: <AboutTasker /> },
                { title: "Service", content: <ServiceList /> },
                { title: "Documents", content: <div>Photos</div> },
            ]}
        />
    );
};
const ServiceList = () => {
    return (
        <Row className="td-user-services">
            {serviceCards.map((serviceCard, index) => (
                <Col key={index}>
                    <ServiceCard {...serviceCard} />
                </Col>
            ))}
        </Row>
    );
};
