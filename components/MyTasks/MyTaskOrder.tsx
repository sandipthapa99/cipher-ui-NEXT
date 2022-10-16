import { Button } from "@mantine/core";
import { format } from "date-fns";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
    budget_from,
    budget_to,
    budget_type,
    status,
}: MyTaskOrderProps) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const { data: userData } = useUser();

    const router = useRouter();

    useEffect(() => {
        if (userData?.id === assigner_id) {
            setIsAuthor(true);
        } else {
            setIsAuthor(false);
        }
    }, [assigner_id, userData]);

    return (
        <div className="my-task-order text-black-50">
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
                        <Link href={`/task/${task_id}`}>
                            <a>
                                <figure className="d-flex align-items-center justify-content-start h-100 w-100 order-detail-section__image">
                                    {!image && (
                                        <Image
                                            src={
                                                "/placeholder/taskPlaceholder.png"
                                            }
                                            alt="order-detail-image"
                                            objectFit="contain"
                                            height={160}
                                            width={140}
                                        />
                                    )}
                                    {image && (
                                        <Image
                                            src={image}
                                            alt="order-detail-image"
                                            height={160}
                                            width={140}
                                        />
                                    )}
                                </figure>
                            </a>
                        </Link>
                    </Col>
                    <Col md={6} sm={12}>
                        <Link href={`/task/${task_id}`}>
                            <a>
                                <div className="title-and-description text-black-50">
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
                                        <span className="price">
                                            Completed On :{" "}
                                        </span>
                                        <span className="value">
                                            {status === "completed"
                                                ? "12 May 2022"
                                                : "not completed yet"}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </Col>

                    <Col md={12} lg={4}>
                        <div className="badge-and-status w-100 d-flex">
                            <Link href={`/task/${task_id}`}>
                                <a>
                                    <figure className="d-flex w-100 author-image mb-5">
                                        {isAuthor && (
                                            <Image
                                                src="/userprofile/author.png"
                                                alt="author-image"
                                                height={50}
                                                width={30}
                                            />
                                        )}
                                    </figure>
                                </a>
                            </Link>
                            {router.query.activeTab === "1" && (
                                <Button
                                    className="w-50 ms-auto"
                                    variant="light"
                                >
                                    Pay Now
                                </Button>
                            )}
                            <Link href={`/task/${task_id}`}>
                                <a>
                                    <div className="d-flex justify-content-end align-items-center status-section">
                                        <span className="status text-black-50">
                                            Status
                                        </span>
                                        <span className={`status-value__Open`}>
                                            {"Open"}
                                        </span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
