import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import { AboutTasker } from "@components/Tasker/AboutTasker";
import { Carousel } from "@mantine/carousel";
import { Alert } from "@mantine/core";
import {
    EastOutlined,
    ErrorOutlineOutlined,
    WestOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITasker } from "types/tasker";

interface UserTaskDetailTabsProps {
    taskerDetail: ITasker;
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
        <div>
            <Carousel
                withIndicators
                slideSize="40%"
                slideGap="md"
                className="mt-5"
                dragFree
                breakpoints={[
                    { maxWidth: "md", slideSize: "50%" },
                    { maxWidth: "xs", slideSize: "80%", slideGap: 0 },
                ]}
                align="start"
                nextControlIcon={<EastOutlined />}
                previousControlIcon={<WestOutlined />}
                styles={{
                    control: {
                        "&[data-inactive]": {
                            opacity: 0,
                            cursor: "default",
                        },
                    },
                }}
            >
                {taskerService?.result &&
                    taskerService?.result?.map((service, key) => (
                        <Carousel.Slide key={key}>
                            <ServiceCard
                                className="border border border-light"
                                serviceCard={service}
                            />
                        </Carousel.Slide>
                    ))}
            </Carousel>
            {!taskerService ||
                (taskerService?.result?.length <= 0 && (
                    <Alert
                        icon={<ErrorOutlineOutlined />}
                        title="No data Available"
                        color="orange"
                        radius="md"
                        sx={{ minWidth: 100 }}
                    >
                        There are No Services by this user
                    </Alert>
                ))}
        </div>
    );
};
