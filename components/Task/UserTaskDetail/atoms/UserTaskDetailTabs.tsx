import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import { AboutTasker } from "@components/Tasker/AboutTasker";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
import type { TaskerProps } from "types/taskerProps";

interface UserTaskDetailTabsProps {
    taskerDetail: TaskerProps["result"][0];
    taskerService: ServicesValueProps;
}

export const UserTaskDetailTabs = ({
    taskerDetail,
    taskerService,
}: UserTaskDetailTabsProps) => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    return (
        <Tab
            activeIndex={activeTabIdx}
            onTabClick={setActiveTabIdx}
            items={[
                {
                    title: "About",
                    content: <AboutTasker taskerDetail={taskerDetail} />,
                },
                {
                    title: "Services",
                    content: <ServiceList taskerService={taskerService} />,
                },
                // { title: "Documents", content: <div>Photos</div> },
            ]}
        />
    );
};
const ServiceList = ({
    taskerService,
}: {
    taskerService: ServicesValueProps;
}) => {
    return (
        <Row className="td-user-services">
            {taskerService?.result?.map((service, key) => (
                <Col md={4} key={key}>
                    <ServiceCard serviceCard={service} />
                </Col>
            ))}
        </Row>
    );
};
