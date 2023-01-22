import ServiceHighlights from "@components/common/ServiceHighlights";
import { Carousel } from "@mantine/carousel";
import { Alert, Badge, Loader, Modal, Skeleton, Spoiler } from "@mantine/core";
import { format } from "date-fns";
import { useData } from "hooks/use-data";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { BookingDetailProps } from "types/myBookingProps";
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";

interface BookingDetailsProps {
    show: boolean;
    handleClose?: () => void;
    setShow: Dispatch<SetStateAction<boolean>>;
    bookingId: string;
}

const BookingDetails = ({ show, setShow, bookingId }: BookingDetailsProps) => {
    const { data, isFetching } = useData<BookingDetailProps>(
        ["booking-detail", bookingId],
        `/task/entity/service-booking/${bookingId}/`,
        show
    );

    const BookingDetail = data && data.data;

    const taskVideosAndImages = [
        ...(BookingDetail?.images ?? []),
        ...(BookingDetail?.videos ?? []),
    ];
    const hasMultipleVideosOrImages = taskVideosAndImages.length > 1;

    return (
        <Modal
            opened={show}
            onClose={() => setShow(false)}
            title=" Booking Details"
            overlayOpacity={0.55}
            overlayBlur={3}
            size="xl"
        >
            {isFetching && (
                <>
                    <div>
                        <Skeleton height={50} circle mb="xl" />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </div>

                    <div className="d-flex">
                        <Skeleton
                            height={264}
                            mt={16}
                            width="70%"
                            radius="sm"
                        />
                    </div>
                </>
            )}
            {!isFetching && (
                <div className="border-0 p-2 my-5 my-lg-0 booking-detail">
                    <div className="d-flex align-items-center pb-3 simple-card__profile">
                        {/* {service?.created_by?.profile_image && ( */}
                        {BookingDetail?.created_by?.profile_image && (
                            <figure className="thumbnail-img">
                                <Image
                                    src={
                                        BookingDetail?.created_by?.profile_image
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    placeholder="blur"
                                    blurDataURL="/placeholder/profilePlaceholder.png"
                                    alt="serviceprovider-image"
                                />
                            </figure>
                        )}
                        {!BookingDetail?.created_by?.profile_image ||
                            (BookingDetail?.created_by?.profile_image.length <=
                                0 && (
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            "/placeholder/profilePlaceholder.png"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL="/placeholder/profilePlaceholder.png"
                                        alt="serviceprovider-image"
                                    />
                                </figure>
                            ))}
                        <div className="intro">
                            <p className="name">
                                {BookingDetail?.created_by?.user?.first_name}{" "}
                                {BookingDetail?.created_by?.user?.middle_name ??
                                    ""}{" "}
                                {BookingDetail?.created_by?.user?.last_name}
                            </p>
                            <p className="job">
                                Booked on{" "}
                                {BookingDetail?.created_at &&
                                    format(
                                        new Date(BookingDetail?.created_at),
                                        "PP"
                                    )}
                            </p>
                        </div>
                    </div>
                    <Row>
                        <Col sm={8}>
                            {(taskVideosAndImages ?? []).length === 1 &&
                                taskVideosAndImages.map((file) => (
                                    <Fragment key={file.id}>
                                        {isImage(file.media_type) ? (
                                            <figure className="thumbnail-img">
                                                <Image
                                                    src={file.media}
                                                    alt={file.placeholder}
                                                    width={500}
                                                    height={350}
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
                                                        width={350}
                                                        height={350}
                                                        objectFit="contain"
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
                                                    Your browser does not
                                                    support playing videos.
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
                                        width={350}
                                        height={350}
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL="/placeholder/loadingLightPlaceHolder.jpg"
                                        alt="servicecard-image"
                                    />
                                </figure>
                            )}
                        </Col>
                        <Col sm={4}>
                            <h3 className="mt-0">Date & Time :</h3>
                            <ul>
                                <li>
                                    <span>Start Date: </span>
                                    {BookingDetail?.start_date
                                        ? format(
                                              new Date(
                                                  BookingDetail?.start_date
                                              ),
                                              "PP"
                                          )
                                        : "N/A"}
                                </li>
                                <li>
                                    <span>End Date: </span>
                                    {BookingDetail?.end_date
                                        ? format(
                                              new Date(BookingDetail?.end_date),
                                              "PP"
                                          )
                                        : "N/A"}
                                </li>
                                <li>
                                    <span>Start Time: </span>
                                    {BookingDetail?.start_time
                                        ? format(
                                              new Date(
                                                  BookingDetail?.start_date
                                              ),
                                              "p"
                                          )
                                        : "N/A"}
                                </li>
                                <li>
                                    <span>End Time: </span>
                                    {BookingDetail?.end_time
                                        ? format(
                                              new Date(BookingDetail?.end_time),
                                              "p"
                                          )
                                        : "N/A"}
                                </li>
                            </ul>
                            <h3>Budget :</h3>
                            {
                                BookingDetail?.entity_service?.currency?.symbol
                            }{" "}
                            {BookingDetail?.budget_to}
                            {BookingDetail?.location && (
                                <>
                                    <h3>Location :</h3>
                                    {BookingDetail?.location}
                                </>
                            )}
                            <h3>Status :</h3>
                            <Badge radius="sm">{BookingDetail?.status}</Badge>
                        </Col>
                    </Row>

                    <h3>Problem Description :</h3>
                    <Spoiler
                        maxHeight={100}
                        showLabel="Read more"
                        hideLabel="Hide"
                        className="p-0"
                    >
                        {BookingDetail?.description}
                    </Spoiler>
                    <h3>Requirements :</h3>
                    {BookingDetail &&
                    BookingDetail?.requirements?.length > 0 ? (
                        <div className="mt-5">
                            <ServiceHighlights
                                highlights={BookingDetail?.requirements}
                            />
                        </div>
                    ) : (
                        <Alert color="gray" radius="md" sx={{ minWidth: 100 }}>
                            No requirements are provided for this booking.
                        </Alert>
                    )}
                </div>
            )}
        </Modal>
    );
};

export default BookingDetails;
