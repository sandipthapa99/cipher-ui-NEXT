import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { Button, Col, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { axiosClient } from "utils/axiosClient";

interface TicketResponse {
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
}

const MyTickets = () => {
    const { data: supportTickets } = useQuery<
        TicketResponse[],
        AxiosError,
        null
    >(["my-tickets"], async () => {
        try {
            const { data } = await axiosClient.get<TicketResponse[]>(
                "/support/support-ticket/"
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Support ticket failed");
        }
    });
    console.log("data", supportTickets);

    return (
        <Layout title="My Tickets | Homaale">
            <section className="my-order-section" id="my-order-section">
                <BreadCrumb currentPage="My-Tickets" />
            </section>
        </Layout>
    );
};

export default MyTickets;
