import { Collaboration } from "@components/Collaboration/Collaboration";
import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { GoBack } from "@components/common/GoBack";
import SaveIcon from "@components/common/SaveIcon";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ShareIcon from "@components/common/ShareIcon";
import SimpleProfileCard from "@components/common/SimpleProfileCard";
import { Tab } from "@components/common/Tab";
import PostModal from "@components/PostTask/PostModal";
import UserLoadingOverlay from "@components/user/UserLoadingOverlay";
import {
    faCalendar,
    faClockEight,
    faEllipsisVertical,
    faEye,
    faHeart,
    faLocationDot,
    faShare,
    faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { parse } from "path";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { serviceHighlights } from "staticData/serviceHighlights";
import { serviceProvider } from "staticData/serviceProvider";
import { taskApplied } from "staticData/taskApplied";
import { axiosClient } from "utils/axiosClient";

import { TaskersTab } from "./TaskersTab";
import { TeamMembersSection } from "./TeamMembersSection";
import { TimelineTab } from "./TimelineTab";

const AppliedTaskDetail: NextPage = () => {
    const [activeTabIdx, setActiveTabIdx] = useState<number | undefined>();
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const uuid = router?.query?.slug;

    const { data: taskDetail } = useQuery(["task-detail", uuid], async () => {
        const response = await axiosClient.get(`/task/task/${uuid}`);
        return response?.data;
    });

    console.log("taskdetail in applied-task-detail", taskDetail);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const requirements = taskDetail?.requirements?.split("\r");

    if (!taskDetail) {
        return <UserLoadingOverlay />;
    }

    return (
        <div className="aside-detail-wrapper">
            <div className="task-detail mb-5 p-5">
                <GoBack href="/task" />
                {/* <Link href="/task">
                    <a>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="svg-icon"
                        />
                        Go Back
                    </a>
                </Link> */}

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
                            <div className="d-flex flex-col align-items-center">
                                <SaveIcon object_id={uuid} model="task" />
                                <span className="name">Save</span>
                            </div>
                            <div className="d-flex flex-col align-items-center mx-5">
                                <ShareIcon />
                                <span className="name">Share</span>
                            </div>
                            <EllipsisDropdown
                                showModal={true}
                                handleOnClick={handleShowModal}
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
                                        onSubmit={() => setShowModal(false)}
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
                            image={taskDetail?.image}
                            speciality={taskDetail?.speciality}
                            startingPrice={taskDetail?.budget_from}
                            endPrice={taskDetail?.budget_to}
                            isApplied={true}
                            isPermission={false}
                            currency={taskDetail?.currency}
                            name={taskDetail?.assigner}
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
