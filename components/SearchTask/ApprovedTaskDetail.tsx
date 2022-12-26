import { TimelineTab } from "@components/AppliedTask/TimelineTab";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ShareIcon from "@components/common/ShareIcon";
import SimpleProfileCard from "@components/common/SimpleProfileCard";
import {
    faCalendar,
    faClockEight,
    faEye,
    faLocationDot,
    faUserGroup,
    faWarning,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { Alert, Modal } from "@mantine/core";
import { format } from "date-fns";
import { useData } from "hooks/use-data";
import parse from "html-react-parser";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useRef } from "react";
import { Fragment } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { ApprovedTaskDetailProps } from "types/approvedTaskProps";
import type { TaskTimeLineProps } from "types/taskTimeLine";
import { getPageUrl } from "utils/helpers";
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";
import { safeParse } from "utils/safeParse";

interface ApprovedDetailsProps {
    show: boolean;
    handleClose?: () => void;
    setShow: Dispatch<SetStateAction<boolean>>;
    approvedId: string;
}

export const ApprovedTaskDetail = ({
    show,
    setShow,
    approvedId,
}: ApprovedDetailsProps) => {
    const { data: approvedTask } = useData<ApprovedTaskDetailProps>(
        ["approved-data", approvedId],
        `/task/entity/service/task/${approvedId}`,
        show && !!approvedId
    );

    const { data: timeline } = useData<TaskTimeLineProps>(
        ["timeline-data", approvedId],
        `/history/task/timeline/${approvedId}`,
        show && !!approvedId
    );
    // const router = useRouter();

    // const slug = router?.query?.slug as string;

    // const isUserTask = user ? taskDetail?.created_by?.id === user?.id : false;

    const taskVideosAndImages = [
        ...(approvedTask?.data?.entity_service?.images ?? []),
        ...(approvedTask?.data?.entity_service?.videos ?? []),
    ];
    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;
    const requirements = safeParse<string[]>({
        rawString: approvedTask?.data?.requirements
            ? approvedTask?.data?.requirements
            : "",
        initialData: [],
    });

    //for scroll

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <Modal
            opened={show}
            onClose={() => setShow(false)}
            title={"Approved task"}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="xl"
        >
            <div className="task-detail">
                <h3>{approvedTask?.data?.title}</h3>
                <Row>
                    <div className="d-flex flex-sm-row flex-column justify-content-between mb-5">
                        {approvedTask?.data?.created_at && (
                            <span className="pb-3 pb-sm-0 provider-name">
                                {format(
                                    new Date(approvedTask?.data?.created_at),
                                    "PP"
                                )}
                            </span>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                            <ShareIcon
                                showText
                                url={getPageUrl()}
                                quote={"This is the task from Homaale"}
                                hashtag={"cipher-task"}
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
                                                objectFit="contain"
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
                        {approvedTask?.data && (
                            <SimpleProfileCard
                                approvedTaskDetail={approvedTask?.data}
                                handleScroll={handleClick}
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
                            {approvedTask?.data?.location
                                ? approvedTask?.data?.location
                                : "Not Provided"}
                        </span>
                    </p>
                    {approvedTask?.data?.created_at && (
                        <p className="d-flex align-items-center">
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="svg-icon svg-icon-calender"
                            />
                            {format(
                                new Date(approvedTask?.data?.created_at),
                                "PP"
                            )}
                        </p>
                    )}
                    <p className="d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faClockEight}
                            className="svg-icon svg-icon-clock"
                        />
                        {approvedTask?.data?.updated_at
                            ? format(
                                  new Date(approvedTask?.data?.updated_at),
                                  "p"
                              )
                            : "N/A"}
                    </p>
                    <p className="d-flex align-items-center">
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
                    </p>
                </div>
                <div className="task-detail__desc">
                    <h3>Description</h3>
                    {approvedTask?.data?.description
                        ? parse(approvedTask?.data?.description)
                        : ""}
                </div>{" "}
                <h3>Requirements</h3>
                {requirements && requirements.length >= 1 ? (
                    <>
                        <div className="mt-5">
                            {requirements && (
                                <ServiceHighlights highlights={requirements} />
                            )}
                        </div>
                    </>
                ) : (
                    <Alert
                        icon={<FontAwesomeIcon icon={faWarning} />}
                        title="No data Available"
                        color="orange"
                        radius="md"
                        sx={{ minWidth: 100 }}
                    >
                        This task has no requirements.
                    </Alert>
                )}
            </div>
            {timeline && <TimelineTab TimeLine={timeline?.data} />}
        </Modal>
    );
};
