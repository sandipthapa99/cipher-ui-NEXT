import ServiceHighlights from "@components/common/ServiceHighlights";
import { Requirements } from "@components/UserTask/UserTaskDetail/atoms/Requirements";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "@mantine/carousel";
import { Alert, Highlight, Modal, Spoiler } from "@mantine/core";
import { format } from "date-fns";
import { useData } from "hooks/use-data";
import parse from "html-react-parser";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { BookingDetailProps } from "types/myBookingProps";

interface ApplicantsDetailProps {
    show: boolean;
    handleClose?: () => void;
    setShow: Dispatch<SetStateAction<boolean>>;
    bookingId: string;
}

const ApplicantsDetail = ({
    show,
    setShow,
    bookingId,
}: ApplicantsDetailProps) => {
    const { data } = useData<BookingDetailProps>(
        ["booking-detail", bookingId],
        `/task/entity/service-booking/${bookingId}`
    );

    const BookingDetail = data?.data;
    console.log(
        "🚀 ~ file: ApplicantsDetail.tsx ~ line 34 ~ BookingDetail",
        BookingDetail
    );

    const taskVideosAndImages = [
        ...(BookingDetail?.images ?? []),
        ...(BookingDetail?.videos ?? []),
    ];

    return (
        <Modal
            opened={show}
            onClose={() => setShow(false)}
            title=" Booking Details"
            size="xl"
            centered
        >
            <div className="border-0 p-2 my-5 my-lg-0 booking-detail">
                <div className="d-flex align-items-center pb-3 simple-card__profile">
                    {BookingDetail?.created_by?.profile_image && (
                        <figure className="thumbnail-img">
                            <Image
                                src={BookingDetail?.created_by?.profile_image}
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
                                    src={"/placeholder/profilePlaceholder.png"}
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
                            {BookingDetail?.created_by?.user?.middle_name}{" "}
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
                    <Col md={12} lg={7}>
                        <h3>Description</h3>
                        {BookingDetail?.description}
                        <h3>Budget</h3>
                        {BookingDetail?.created_by.charge_currency.symbol}{" "}
                        {BookingDetail?.budget_from
                            ? `${BookingDetail?.budget_from + " - "}`
                            : ""}
                        {BookingDetail?.budget_to
                            ? `${BookingDetail?.budget_to}`
                            : ""}
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default ApplicantsDetail;
