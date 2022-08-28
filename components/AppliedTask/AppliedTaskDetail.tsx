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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useIsBookmarked } from "hooks/use-bookmarks";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import { TaskersTab } from "./TaskersTab";
import { TeamMembersSection } from "./TeamMembersSection";
import { TimelineTab } from "./TimelineTab";

const AppliedTaskDetail: NextPage = () => {
    const queryClient = useQueryClient();
    const [activeTabIdx, setActiveTabIdx] = useState<number | undefined>();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const slug = router?.query?.slug as string;

    const { data: taskDetail } = useQuery(["task-detail", slug], async () => {
        const response = await axiosClient.get(`/task/${slug}`);
        return response?.data;
    });

    const requirements = taskDetail?.requirements?.split(",");

    const isTaskBookmarked = useIsBookmarked("task", taskDetail?.id);

    if (!taskDetail) {
        return <UserLoadingOverlay />;
    }
    return (
        <div className="aside-detail-wrapper">
            <div className="task-detail mb-5 p-5">
                <GoBack href="/task" />
                <h3>{taskDetail?.title}</h3>
                <Row>
                    <div className="d-flex flex-sm-row flex-column justify-content-between mb-5">
                        <span className="pb-3 pb-sm-0 provider-name">
                            {format(
                                new Date(taskDetail?.created_at),
                                "dd MMM, yyyy - hh:mm a"
                            )}
                        </span>
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
                            <EllipsisDropdown
                                showModal={true}
                                handleOnClick={() => setShowModal(true)}
                            >
                                <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    className="svg-icon option"
                                />
                            </EllipsisDropdown>
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
                        <figure className="thumbnail-img">
                            <Image
                                src="/service-details/Garden.svg"
                                layout="fill"
                                objectFit="cover"
                                alt="garden-image"
                            />
                        </figure>
                    </Col>
                    <Col md={12} lg={5} className="d-flex">
                        <SimpleProfileCard
                            id={taskDetail.id}
                            image={taskDetail?.assigner?.profile_image}
                            speciality={taskDetail?.category?.name}
                            startingPrice={taskDetail?.budget_from}
                            endPrice={taskDetail?.budget_to}
                            isApplied={false}
                            isPermission={false}
                            currency={taskDetail?.currency}
                            name={taskDetail?.assigner?.full_name}
                        />
                    </Col>
                </Row>
                <div className="d-flex mt-4 task-detail__loc-time">
                    <p>
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon svg-icon-location"
                        />
                        {taskDetail?.location
                            ? taskDetail?.location
                            : "Buddhanagar, Kathmandu"}
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="svg-icon svg-icon-calender"
                        />
                        {format(
                            new Date(taskDetail?.start_date),
                            "dd MMM, yyyy"
                        )}
                    </p>
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
                        2500 Views
                    </p>
                    <p>
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="svg-icon svg-icon-user-group"
                        />
                        {taskDetail?.applicants_count} Applied
                    </p>
                </div>

                <div className="task-detail__desc">
                    <h3>Description</h3>
                    <p>{taskDetail?.description}</p>
                </div>

                <h3>Requirements</h3>
                <div className="mt-5">
                    {requirements &&
                        requirements.map((name: string, index: number) => (
                            <div key={index}>
                                <ServiceHighlights title={name} />
                            </div>
                        ))}
                </div>

                <TeamMembersSection />

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
                />
            </div>
        </div>
    );
};

export default AppliedTaskDetail;
