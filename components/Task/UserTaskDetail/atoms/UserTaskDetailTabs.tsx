import TaskAppliedCard from "@components/AppliedTask/taskAppliedCard";
import ServiceCard from "@components/common/ServiceCard";
import { Tab } from "@components/common/Tab";
import { AboutTasker } from "@components/Tasker/AboutTasker";
import { Carousel } from "@mantine/carousel";
import { Alert } from "@mantine/core";
import { EastOutlined, WestOutlined } from "@mui/icons-material";
import { useState } from "react";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITaskApiResponse } from "types/task";
import type { ITasker } from "types/tasker";

interface UserTaskDetailTabsProps {
    taskerDetail: ITasker;
    taskerService: ServicesValueProps;
    taskerTask: ITaskApiResponse;
}

export const UserTaskDetailTabs = ({
    taskerDetail,
    taskerService,
    taskerTask,
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
                {
                    title: "Task",
                    content: <TaskList taskerTask={taskerTask} />,
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
                    <Alert color="gray" radius="md" sx={{ minWidth: 100 }}>
                        There are no services by this user.
                    </Alert>
                ))}
        </div>
    );
};

const TaskList = ({ taskerTask }: { taskerTask: ITaskApiResponse }) => {
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
                {taskerTask &&
                    taskerTask?.result?.map((task, key) => (
                        <Carousel.Slide key={key}>
                            <TaskAppliedCard task={task} />
                        </Carousel.Slide>
                    ))}
            </Carousel>
            {!taskerTask ||
                (taskerTask?.result?.length <= 0 && (
                    <Alert color="gray" radius="md" sx={{ minWidth: 100 }}>
                        There are no tasks by this user.
                    </Alert>
                ))}
        </div>
    );
};
