import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import { AboutTasker } from "@components/Tasker/AboutTasker";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Highlight } from "@mantine/core";
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
            {taskerService?.result &&
                taskerService?.result?.map((service, key) => (
                    <Col md={4} key={key}>
                        <ServiceCard serviceCard={service} />
                    </Col>
                ))}
            {!taskerService ||
                (taskerService?.result?.length <= 0 && (
                    <Alert
                        icon={<FontAwesomeIcon icon={faWarning} />}
                        title="No data Available!"
                        color="orange"
                        radius="md"
                        sx={{ minWidth: 100 }}
                    >
                        <Highlight highlight={["No Services", "user"]}>
                            {`There are No Services by this user`}
                        </Highlight>
                    </Alert>
                ))}
        </Row>
    );
};
