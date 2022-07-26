import Reviews from "@components/common/Reviews";
import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { reviewsContent } from "staticData/reviews";
import { serviceCards } from "staticData/serviceCards";
import { TaskDetail } from "staticData/taskDetail";

export interface UserTaskDetailTabsProps {
    user: TaskDetail["user"];
}

export const UserTaskDetailTabs = ({ user }: UserTaskDetailTabsProps) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    return (
        <Tab
            activeIndex={activeTabIdx}
            onTabClick={setActiveTabIdx}
            items={[
                { title: "About", content: <div>About</div> },
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
