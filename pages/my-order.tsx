import { BreadCrumb } from "@components/common/BreadCrumb";
import { MyOrderItem } from "@components/common/MyOrderItem";
import Layout from "@components/Layout";
import { Button, Col, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import type { MyOrderProps } from "types/myOrderProps";
import { axiosClient } from "utils/axiosClient";

const MyOrder = () => {
    const { data: userData } = useUser();
    const userId = userData?.id ?? "";
    const { data: mytaskData, isFetching } = useQuery(
        ["my-orders", userId],
        async () => {
            const response = await axiosClient.get<{
                result: MyOrderProps["result"];
            }>(`/payment/order/`);
            return response.data.result;
        },
        {
            enabled: !!userId,
            initialData: [],
        }
    );

    return (
        <Layout title="My Orders | Homaale">
            <section className="my-order-section" id="my-order-section">
                <BreadCrumb currentPage="My-Orders" />
                <Container fluid="xl">
                    <div className="my-task">
                        {/* <h3>My Tasks</h3> */}

                        <div className="my-task__each-orders">
                            {isFetching && (
                                <Grid className="p-5">
                                    <Col span={3}>
                                        <Skeleton height={150} mb="xl" />
                                    </Col>
                                    <Col span={9}>
                                        <Skeleton
                                            height={50}
                                            radius="sm"
                                            className="mb-4"
                                        />
                                        <Skeleton height={50} radius="sm" />
                                    </Col>
                                </Grid>
                            )}
                            {!isFetching &&
                                mytaskData &&
                                mytaskData?.map((item, index) => (
                                    <div
                                        className="task-wrapper my-task-order"
                                        key={index}
                                    >
                                        <div className="d-flex justify-content-between align-items-center order-section">
                                            <span className="order-id">
                                                Order ID: #{item?.id}
                                            </span>
                                            <span className="ordered-date">
                                                <Link
                                                    href={{
                                                        pathname: "/checkout/",
                                                        query: {
                                                            id: item?.id,
                                                        },
                                                    }}
                                                >
                                                    <a className="ms-auto mb-3">
                                                        <Button variant="light">
                                                            Pay Now
                                                        </Button>
                                                    </a>
                                                </Link>
                                            </span>
                                        </div>
                                        <MyOrderItem
                                            orderItem={item?.order_item}
                                        />
                                    </div>
                                ))}
                        </div>
                        {!isFetching && mytaskData.length <= 0 && (
                            <div className="bg-white p-5 text-center">
                                <figure className="position-relative">
                                    <Image
                                        src={"/orderEmpty.png"}
                                        alt="order-empty-img"
                                        height={243}
                                        width={243}
                                    />
                                </figure>
                                <p
                                    className="mb-3"
                                    style={{ fontSize: "2.4rem" }}
                                >
                                    You Have No Approved Bookings Yet.
                                </p>
                                <p>
                                    <Link href={"/home?activeTab=1"}>
                                        <a>Click here </a>
                                    </Link>
                                    to see your booking details.
                                </p>
                            </div>
                        )}
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default MyOrder;
