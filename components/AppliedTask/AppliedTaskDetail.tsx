import { Collaboration } from "@components/Collaboration/Collaboration";
import EllipsisDropdown from "@components/common/EllipsisDropdown";
import UserLoadingOverlay from "@components/common/FullPageLoader";
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
import { ScrollArea } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";
import { safeParse } from "utils/safeParse";

import { TaskersTab } from "./TaskersTab";
import { TeamMembersSection } from "./TeamMembersSection";
import { TimelineTab } from "./TimelineTab";

const AppliedTaskDetail = ({ type }: { type?: string }) => {
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
    const router = useRouter();

    const slug = router?.query?.slug as string;

    const { data: taskDetail } = useQuery(
        ["task-detail", slug],
        async () => {
            const { data } = await axiosClient.get<ITask>(`/task/${slug}`);
            return data;
        },
        { initialData: {} as ITask }
    );

    const isTaskBookmarked = useIsBookmarked("task", taskDetail?.id);

    const taskRequirements = safeParse<Array<{ id: string; title: string }>>({
        rawString: taskDetail.requirements,
        initialData: [],
    });
    const isUserTask = taskDetail?.assigner?.id === user?.id;
    const taskVideosAndImages = [
        ...(taskDetail?.images ?? []),
        ...(taskDetail?.videos ?? []),
    ];
    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;

    if (!taskDetail) {
        return <UserLoadingOverlay />;
    }
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
                        {taskDetail.created_at && (
                            <span className="pb-3 pb-sm-0 provider-name">
                                {format(new Date(taskDetail?.created_at), "PP")}
                            </span>
                        )}
                        <div className="d-flex justify-content-between align-items-center">
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
                            <button className="btn d-flex flex-col align-items-center mx-5">
                                <ShareIcon
                                    url={`http://localhost:3005/task/${slug}`}
                                    quote={"This is the task from cipher"}
                                    hashtag={"cipher-task"}
                                />
                                <span className="name">Share</span>
                            </button>
                            {isUserTask && (
                                <EllipsisDropdown
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
                        {(taskVideosAndImages ?? []).length > 0 ? (
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
                                {taskVideosAndImages.map((file, key) => (
                                    <Carousel.Slide key={key}>
                                        {file.media_type === "image" ? (
                                            <figure className="thumbnail-img">
                                                <Image
                                                    src={file.media}
                                                    alt={file.placeholder}
                                                    layout="fill"
                                                />
                                            </figure>
                                        ) : file.media_type === "video" ? (
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
                        ) : (
                            <figure className="thumbnail-img">
                                <Image
                                    src="/service-details/Garden.svg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="garden-image"
                                />
                            </figure>
                        )}
                    </Col>
                    <Col md={12} lg={5} className="d-flex">
                        {taskDetail && (
                            <SimpleProfileCard
                                task={taskDetail}
                                onApply={() => setShowModal(false)}
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
                        {taskDetail?.start_time}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="svg-icon svg-icon-eye"
                        />
                        <span> 2500 Views</span>
                    </p>
                    <p className="d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon svg-icon-user-group"
                        />
                        <span> {taskDetail?.applicants_count} Applied</span>
                    </p>
                </div>

                <div className="task-detail__desc">
                    <h3>Description</h3>
                    <p>{taskDetail?.description}</p>
                </div>

                <h3>Requirements</h3>
                <div className="mt-5">
                    {taskRequirements.map(({ id, title }) => (
                        <div key={id}>
                            <ServiceHighlights title={title} />
                        </div>
                    ))}
                </div>

                {/* <TeamMembersSection /> */}

                <Tab
                    activeIndex={activeTabIdx}
                    onTabClick={setActiveTabIdx}
                    items={[
                        { title: "Taskers", content: <TaskersTab /> },
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
