import { Collaboration } from "@components/Collaboration/Collaboration";
import { ElipsisReport } from "@components/common/ElipsisReport";
import { GoBack } from "@components/common/GoBack";
import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import SimpleProfileCard from "@components/common/SimpleProfileCard";
import { Tab } from "@components/common/Tab";
import { Carousel } from "@mantine/carousel";
import { Tooltip } from "@mantine/core";
import {
    CalendarTodayOutlined,
    Check,
    LocationOnOutlined,
    ScheduleOutlined,
    Search,
    SupervisorAccountOutlined,
} from "@mui/icons-material";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import { useIsBookmarked } from "hooks/use-bookmarks";
import parse from "html-react-parser";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { useRef } from "react";
import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { ITask, TaskApplicantsProps } from "types/task";
import { axiosClient } from "utils/axiosClient";
import { getPageUrl } from "utils/helpers";
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";

import { TaskersTab } from "./TaskersTab";

const AppliedTaskDetail = ({
    type,
    taskDetail,
}: {
    type?: string;
    taskDetail: ITask;
}) => {
    const queryClient = useQueryClient();
    const { data: user } = useUser();
    const [activeTabIdx, setActiveTabIdx] = useState<number | undefined>(0);
    const [showInput, setShowInput] = useState(false);

    const RenderInputBox = () => {
        return (
            <input
                type="text"
                className="input"
                //value={search_category}
                placeholder="search"
            />
        );
    };

    const isTaskBookmarked = useIsBookmarked("entityservice", taskDetail?.id);

    const isUserTask = user ? taskDetail?.created_by?.id === user?.id : false;

    const taskVideosAndImages = [
        ...(taskDetail?.images ?? []),
        ...(taskDetail?.videos ?? []),
    ];
    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="aside-detail-wrapper">
            <div className="task-detail">
                <GoBack
                    href={
                        type === "you may like" ? `/task-you-may-like` : `/task`
                    }
                />

                <h3>{taskDetail?.title}</h3>
                <Row>
                    <div className="d-flex flex-sm-row flex-column justify-content-between mb-5">
                        {taskDetail?.created_at && (
                            <span className="pb-3 pb-sm-0 provider-name">
                                {format(new Date(taskDetail?.created_at), "PP")}
                            </span>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                            {isUserTask ? null : (
                                <SaveIcon
                                    object_id={taskDetail?.id}
                                    model="entityservice"
                                    filled={isTaskBookmarked}
                                    showText
                                    onSuccess={() =>
                                        queryClient.invalidateQueries([
                                            "bookmarks",
                                            "task",
                                        ])
                                    }
                                />
                            )}
                            <ShareIcon
                                showText
                                url={getPageUrl()}
                                quote="This is the task from Homaale"
                                hashtag="cipher-task"
                            />

                            <ElipsisReport
                                task={true}
                                taskId={taskDetail?.id}
                                taskTitle={taskDetail?.title}
                                taskDescription={taskDetail?.description}
                                owner={isUserTask}
                                isService={false}
                            />
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col md={12} lg={7}>
                        {(taskVideosAndImages ?? []).length === 1 &&
                            taskVideosAndImages.map((file) => (
                                <Fragment key={file.id}>
                                    {isImage(file.media_type) ? (
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={file.media}
                                                alt={file.placeholder}
                                                objectFit="cover"
                                                layout="fill"
                                                placeholder="blur"
                                                blurDataURL="/placeholder/loadingLightPlaceHolder.jpg"
                                            />
                                        </figure>
                                    ) : isVideo(file.media_type) ? (
                                        <video
                                            className="thumbnail-img"
                                            width="100%"
                                            height="100%"
                                            controls
                                        >
                                            <source
                                                id={`task-video-${file.id}`}
                                                src={file.media}
                                            />
                                            Your browser does not support
                                            playing videos.
                                        </video>
                                    ) : null}
                                </Fragment>
                            ))}
                        {(taskVideosAndImages ?? []).length > 1 ? (
                            <Carousel
                                withIndicators={hasMultipleVideosOrImages}
                                withControls={hasMultipleVideosOrImages}
                                draggable={hasMultipleVideosOrImages}
                                styles={{
                                    control: {
                                        "&[data-inactive]": {
                                            opacity: 0,
                                            cursor: "default",
                                        },
                                    },
                                }}
                            >
                                {taskVideosAndImages.map((file) => (
                                    <Carousel.Slide key={file.id}>
                                        {isImage(file.media_type) ? (
                                            <figure className="thumbnail-img">
                                                <Image
                                                    src={file.media}
                                                    alt={file.placeholder}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    placeholder="blur"
                                                    blurDataURL="/placeholder/loadingLightPlaceHolder.jpg"
                                                />
                                            </figure>
                                        ) : isVideo(file.media_type) ? (
                                            <video
                                                className="thumbnail-img"
                                                width="100%"
                                                height="100%"
                                                controls
                                            >
                                                <source
                                                    id={`task-video-${file.id}`}
                                                    src={file.media}
                                                />
                                                Your browser does not support
                                                playing videos.
                                            </video>
                                        ) : null}
                                    </Carousel.Slide>
                                ))}
                            </Carousel>
                        ) : null}
                        {(taskVideosAndImages ?? []).length <= 0 && (
                            <figure className="thumbnail-img">
                                <Image
                                    src={"/placeholder/taskPlaceholder.png"}
                                    layout="fill"
                                    objectFit="contain"
                                    alt="servicecard-image"
                                />
                            </figure>
                        )}
                    </Col>
                    <Col md={12} lg={5} className="d-flex">
                        {taskDetail && (
                            <SimpleProfileCard
                                task={taskDetail}
                                handleScroll={handleClick}
                            />
                        )}
                    </Col>
                </Row>
                <div className="d-flex mt-4 task-detail__loc-time">
                    <Tooltip.Floating label="Task Location" color={"blue"}>
                        <p className="d-flex align-items-center">
                            <LocationOnOutlined className="svg-icon svg-icon-location" />
                            <span>
                                {" "}
                                {taskDetail?.city?.name
                                    ? taskDetail?.city?.name
                                    : "Not Provided"}
                            </span>
                        </p>
                    </Tooltip.Floating>

                    {taskDetail?.created_at && (
                        <Tooltip.Floating label="Date Posted" color={"blue"}>
                            <p className="d-flex align-items-center">
                                <CalendarTodayOutlined className="svg-icon svg-icon-calender" />
                                {format(new Date(taskDetail?.created_at), "PP")}
                            </p>
                        </Tooltip.Floating>
                    )}
                    <Tooltip.Floating label="Time posted" color={"blue"}>
                        <p className="d-flex align-items-center">
                            <ScheduleOutlined className="svg-icon svg-icon-clock" />
                            {taskDetail?.updated_at
                                ? format(new Date(taskDetail?.updated_at), "p")
                                : "N/A"}
                        </p>
                    </Tooltip.Floating>
                    {/* <Tooltip.Floating label="No. of Application" color={"blue"}>
                        <p className="d-flex align-items-center">
                            <FontAwesomeIcon
                                icon={faEye}
                                className="svg-icon svg-icon-eye"
                            />
                            <span> 200 Views</span>
                        </p>
                    </Tooltip.Floating> */}
                    <Tooltip.Floating label="No. of Application" color={"blue"}>
                        <p className="d-flex align-items-center">
                            <SupervisorAccountOutlined className="svg-icon svg-icon-user-group" />
                            <span> {taskDetail.count} Applied</span>
                        </p>
                    </Tooltip.Floating>
                </div>

                <div className="task-detail__desc">
                    <h3>Description</h3>
                    {taskDetail?.description
                        ? parse(taskDetail.description)
                        : ""}
                </div>
                {taskDetail?.highlights.length > 0 ? (
                    <>
                        <h3>Requirements</h3>
                        <div className="mt-5">
                            {/* {taskDetail?.highlights && (
                                <ServiceHighlights highlights={highlights} />
                            )} */}
                            {taskDetail?.highlights.map((highlight, index) => (
                                <p className="mb-4" key={index}>
                                    <Check className="me-3 svg-icon svg-icon-check" />
                                    {highlight}
                                </p>
                            ))}
                        </div>
                    </>
                ) : null}

                {/* <TeamMembersSection /> */}
                <div ref={ref}>
                    {isUserTask ? (
                        <Tab
                            activeIndex={activeTabIdx}
                            onTabClick={setActiveTabIdx}
                            items={[
                                {
                                    title: `Taskers (${taskDetail.count})`,
                                    content: (
                                        <TaskersTab
                                            taskId={
                                                taskDetail ? taskDetail.id : ""
                                            }
                                            count={taskDetail?.count ?? 0}
                                        />
                                    ),
                                },
                                {
                                    title: "Collaboration",
                                    content: <Collaboration />,
                                },
                            ]}
                            icons={[
                                {
                                    index: 0,
                                    type: (
                                        <Search
                                            className="svg-icon"
                                            onClick={() =>
                                                setShowInput(!showInput)
                                            }
                                        />
                                    ),
                                    iconContent: showInput ? (
                                        <RenderInputBox />
                                    ) : null,
                                },
                                // {
                                //     index: 1,
                                //     type: (
                                //         <EllipsisDropdown
                                //             showModal={true}
                                //             handleOnClick={() => setShowModal(true)}
                                //         >
                                //             <FontAwesomeIcon
                                //                 icon={faFilterList}
                                //                 className="svg-icon"
                                //             />
                                //         </EllipsisDropdown>
                                //     ),
                                // },
                            ]}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AppliedTaskDetail;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: applicants } = await axiosClient.get<TaskApplicantsProps>(
            `${urls.task.my_task}`
        );

        const queryClient = new QueryClient();
        await Promise.all([
            queryClient.prefetchQuery(["get-my-applicants"]),
            //  queryClient.prefetchQuery(["get-task-applicants"]),
            queryClient.prefetchQuery(["task-detail"]),
            queryClient.prefetchQuery(["tasks"]),
        ]);

        return {
            props: {
                applicants,
                dehydratedState: dehydrate(queryClient),
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                applicants: [],
            },
            revalidate: 10,
        };
    }
};
