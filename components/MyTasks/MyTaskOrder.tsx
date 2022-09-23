import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { MyTaskOrderProps } from "types/myTasksProps";

export const MyTaskOrder = ({
    task_id,
    assigner_id,
    created_at,
    currency,
    image,
    title,
    assigner_name,
    budget_from,
    budget_to,
    budget_type,
    status,
}: MyTaskOrderProps) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { data: userData } = useUser();

    useEffect(() => {
        if (userData?.id === assigner_id) {
            setIsAuthor(true);
        } else {
            setIsAuthor(false);
        }
    }, [assigner_id, userData]);

    return (
        <div className="my-task-order">
            <div className="d-flex justify-content-between align-items-center order-section">
                <span className="order-id">
                    Order ID: #{task_id?.slice(0, 8)}
                </span>
                <span className="ordered-date">
                    {format(new Date(created_at), "EEEE, dd LLLL yyyy")}
                </span>
            </div>

            <div className="order-detail-section">
                <Row>
                    <Col lg={2} md={6} sm={6} xs={12}>
                        <figure className="d-flex align-items-center justify-content-start h-100 w-100 order-detail-section__image">
                            {image && (
                                <Image
                                    src={image}
                                    alt="order-detail-image"
                                    height={160}
                                    width={130}
                                />
                            )}
                        </figure>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="title-and-description">
                            <h4>{title}</h4>
                            {/* <p>By {assigner_name}</p> */}
                            <div className="price-section">
                                <span className="price">Price : </span>
                                <span className="value">
                                    {currency + " "}{" "}
                                    {budget_from && budget_from + "-"}
                                    {budget_to}
                                    {budget_type === "Hourly"
                                        ? "/hr"
                                        : budget_type === "Monthly"
                                        ? "/mnth"
                                        : ""}
                                </span>
                            </div>

                            {/* <div className="price-section">
                                <span className="price">Duration : </span>
                                <span className="value">2 max hr/ week</span>
                            </div> */}

                            <div className="price-section">
                                <span className="price">Completed On : </span>
                                <span className="value">
                                    {status === "completed"
                                        ? "12 May 2022"
                                        : "not completed yet"}
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={4}>
                        <div className="badge-and-status w-100 d-flex">
                            <figure className="d-flex w-100 author-image">
                                {isAuthor && (
                                    <Image
                                        src="/userprofile/author.png"
                                        alt="author-image"
                                        height={62}
                                        width={40}
                                    />
                                )}
                            </figure>
                            <div className="d-flex justify-content-end align-items-center status-section">
                                <span className="status">Status</span>
                                <span className={`status-value__${"Open"}`}>
                                    {"Open"}
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
