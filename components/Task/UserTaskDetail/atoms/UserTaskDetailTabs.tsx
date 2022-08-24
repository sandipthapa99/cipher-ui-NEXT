import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import { AboutTasker } from "@components/Tasker/AboutTasker";
import { useData } from "hooks/use-data";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";
import type { TaskerDetail } from "types/tasks";

interface UserTaskDetailTabs {
    taskerDetail: TaskerDetail;
}

export const UserTaskDetailTabs = ({ taskerDetail }: UserTaskDetailTabs) => {
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
                { title: "Service", content: <ServiceList /> },
                { title: "Documents", content: <div>Photos</div> },
            ]}
        />
    );
};
const ServiceList = () => {
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    return (
        <Row className="td-user-services">
            {servicesData?.data?.result?.map((service, key) => (
                <Col key={key}>
                    <ServiceCard serviceCard={service} />
                </Col>
            ))}
        </Row>
    );
};
