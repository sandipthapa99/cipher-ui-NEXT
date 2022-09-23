import { Collaboration } from "@components/Collaboration/Collaboration";
import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { GoBack } from "@components/common/GoBack";
import SaveIcon from "@components/common/SaveIcon";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ShareIcon from "@components/common/ShareIcon";
import SimpleProfileCard from "@components/common/SimpleProfileCard";
import { Tab } from "@components/common/Tab";
import PostModal from "@components/PostTask/PostModal";
import {
    faCalendar,
    faClockEight,
    faEllipsisVertical,
    faEye,
    faLocationDot,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import {
    faFilterList,
    faMagnifyingGlass,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import type { MyBookings } from "hooks/task/use-get-service-booking";
import { useIsBookmarked } from "hooks/use-bookmarks";
import { useData } from "hooks/use-data";
import parse from "html-react-parser";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import type { ITask, TaskApplicantsProps, TaskerCount } from "types/task";
import { axiosClient } from "utils/axiosClient";
import { getPageUrl } from "utils/helpers";
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";
import { safeParse } from "utils/safeParse";

import { TaskersTab } from "./TaskersTab";
import { TimelineTab } from "./TimelineTab";

const AppliedTaskDetail = ({
    type,
    taskDetail,
}: // taskApplicants,
{
    type?: string;
    taskDetail: ITask;
}) => {
    const { data: myRequestedTask } = useData<MyBookings>(
        ["my-requested-task"],
        `${urls.task.requested_task}`
    );

    const requestedTask = myRequestedTask?.data.result.find(
        (requestedTask: any) =>
            requestedTask?.entity_service.id === taskDetail.id
    );
    const taskId = taskDetail ? requestedTask?.entity_service.id : "";

    const { data: taskApplicants } = useData<TaskerCount>(
        ["get-task-applicants"],
        `${urls.task.taskApplicants}/${taskId}`
    );

    const queryClient = useQueryClient();
    const { data: user } = useUser();
    const [activeTabIdx, setActiveTabIdx] = useState<number | undefined>();
    const [showModal, setShowModal] = useState(false);
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

    const isTaskBookmarked = useIsBookmarked("task", taskDetail?.id);

    const isUserTask = user ? taskDetail?.created_by?.id === user?.id : false;

    const taskVideosAndImages = [
        ...(taskDetail?.images ?? []),
        ...(taskDetail?.videos ?? []),
    ];
    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;
    const highlights = safeParse<string[]>({
        rawString: taskDetail?.highlights,
        initialData: [],
    });

    return (
        <div className="aside-detail-wrapper">
            <div className="task-detail mb-5 p-5">
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
                                    model="task"
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
                            <button className="btn d-flex flex-col align-items-center mx-5">
                                <ShareIcon
                                    url={getPageUrl()}
                                    quote={"This is the task from cipher"}
                                    hashtag={"cipher-task"}
                                />
                                <span className="name">Share</span>
                            </button>
                            {isUserTask && (
                                <EllipsisDropdown
                                    task={taskDetail}
                                    showModal={true}
                                    handleOnClick={() => setShowModal(true)}
                                >
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                        className="svg-icon option"
                                    />
                                </EllipsisDropdown>
                            )}
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                backdrop="static"
                                className="post-modal"
                            >
                                <Modal.Header
                                    className="mt-4"
                                    closeButton
                                ></Modal.Header>
                                <Modal.Body>
                                    <PostModal
                                        setshowPostModel={() =>
                                            setShowModal(false)
                                        }
                                    />
                                </Modal.Body>
                            </Modal>
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
                                                blurDataURL="/service-details/Garden.svg"
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
                                                    blurDataURL="/service-details/Garden.svg"
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
                                onApply={() => {
                                    console.log("onApply");

                                    //setShowModal(false);
                                }}
                            />
                        )}
                    </Col>
                </Row>
                <div className="d-flex mt-4 task-detail__loc-time">
                    <p className="d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon svg-icon-location"
                        />
                        <span>
                            {" "}
                            {taskDetail?.location
                                ? taskDetail?.location
                                : "Buddhanagar, Kathmandu"}
                        </span>
                    </p>
                    {taskDetail?.created_at && (
                        <p>
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="svg-icon svg-icon-calender"
                            />
                            {format(new Date(taskDetail?.created_at), "PP")}
                        </p>
                    )}
                    <p>
                        <FontAwesomeIcon
                            icon={faClockEight}
                            className="svg-icon svg-icon-clock"
                        />
                        {taskDetail?.updated_at
                            ? format(new Date(taskDetail?.updated_at), "p")
                            : "N/A"}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="svg-icon svg-icon-eye"
                        />
                        <span> 200 Views</span>
                    </p>
                    <p className="d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon svg-icon-user-group"
                        />
                        <span>
                            {" "}
                            {taskApplicants?.data.count[0].tasker_count} Applied
                        </span>
                    </p>
                </div>

                <div className="task-detail__desc">
                    <h3>Description</h3>
                    {taskDetail?.description
                        ? parse(taskDetail.description)
                        : ""}
                </div>
                {highlights.length > 0 && (
                    <>
                        <h3>Requirements</h3>
                        <div className="mt-5">
                            {taskDetail?.highlights && (
                                <ServiceHighlights highlights={highlights} />
                            )}
                        </div>
                    </>
                )}

                {/* <TeamMembersSection /> */}

                <Tab
                    activeIndex={activeTabIdx}
                    onTabClick={setActiveTabIdx}
                    items={[
                        {
                            title: `Taskers (${taskApplicants?.data.count[0].tasker_count})`,
                            content: <TaskersTab />,
                        },
                        { title: "Timeline", content: <TimelineTab /> },
                        {
                            title: "Collaboration",
                            content: <Collaboration />,
                        },
                    ]}
                    icons={[
                        {
                            index: 0,
                            type: (
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="svg-icon"
                                    onClick={() => setShowInput(!showInput)}
                                />
                            ),
                            iconContent: showInput ? <RenderInputBox /> : null,
                        },
                        {
                            index: 1,
                            type: (
                                <EllipsisDropdown
                                    showModal={true}
                                    handleOnClick={() => setShowModal(true)}
                                >
                                    <FontAwesomeIcon
                                        icon={faFilterList}
                                        className="svg-icon"
                                    />
                                </EllipsisDropdown>
                            ),
                        },
                    ]}
                />
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
        await queryClient.prefetchQuery(["get-my-applicants"]);
        await queryClient.prefetchQuery(["get-task-applicants"]);

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
