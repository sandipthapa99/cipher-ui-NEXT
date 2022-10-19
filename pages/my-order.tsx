import { ApplyPostComponent } from "@components/common/ApplyPostComponent";
import { BreadCrumb } from "@components/common/BreadCrumb";
import { MyOrderItem } from "@components/common/MyOrderItem";
import Layout from "@components/Layout";
import { MyTaskOrder } from "@components/MyTasks/MyTaskOrder";
import { Alert, Button, Col, Grid, Loader, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import type { MyOrderProps } from "types/myOrderProps";
import type { MyTaskProps } from "types/myTasksProps";
import { axiosClient } from "utils/axiosClient";

const MyOrder = () => {
    const { data: userData } = useUser();
    const userId = userData?.id ?? "";
    const { data: mytaskData, isLoading } = useQuery(
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
                            {isLoading ? (
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
                            ) : (
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
                                ))
                            )}
                        </div>
                    </div>
                </Container>
            </section>
        </Layout>
    );
};

export default MyOrder;
