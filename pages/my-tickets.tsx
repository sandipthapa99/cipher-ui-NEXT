import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { Button, Col, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import SingleTickets from "../components/myTickets/SingleTickets";

interface TicketResponse {
    result: {
        id: number;
        type: {
            id: number;
            name: string;
        };
        created_by: {
            id: string;
            username: string;
            email: string;
            phone: string;
            first_name: string;
            middle_name: string;
            last_name: string;
            profile_image: string;
            bio: string;
            created_at: string;
        };
        user: {
            id: string;
            username: string;
            email: string;
            phone: string;
            first_name: string;
            middle_name: string;
            last_name: string;
            profile_image: string;
            bio: string;
            created_at: string;
        };
        attachment: Array<{
            id: number;
            name: string;
            size: string;
            media_type: string;
            media: string;
        }>;
        created_at: string;
        updated_at: string;
        is_active: boolean;
        status: string;
        full_name: string;
        email: string;
        phone: string;
        reason: string;
    }[];
}

const MyTickets = () => {
    const { data: supportTickets, isFetching } = useQuery(
        ["my-tickets"],
        async () => {
            try {
                const { data } = await axiosClient.get<TicketResponse>(
                    "/support/support-ticket/"
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Support ticket failed");
            }
        }
    );
    console.log("data", supportTickets?.result);

    const renderAllTickets = supportTickets?.result.map((ticket) => {
        return (
            <div key={ticket.id}>
                <SingleTickets
                    reason={ticket?.type.name}
                    description={ticket?.reason}
                    createdAt={ticket?.created_at}
                    status={ticket?.status}
                    supportId={ticket?.id.toString()}
                />
            </div>
        );
    });

    return (
        <Layout title="My Tickets | Homaale">
            <section className="my-order-section" id="my-order-section">
                <BreadCrumb currentPage="My-Tickets" />
                <Container fluid="xl">
                    {renderAllTickets}
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
                </Container>
            </section>
        </Layout>
    );
};

export default MyTickets;
