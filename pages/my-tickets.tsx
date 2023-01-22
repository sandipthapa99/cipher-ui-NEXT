import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Col, Grid, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
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
        is_resolved: boolean;
    }[];
}

const MyTickets = () => {
    const router = useRouter();
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

    const renderAllTickets = supportTickets?.result.map((ticket) => {
        return (
            <div key={ticket.id} className="all-support">
                <figure className="support-figure d-none d-md-block">
                    <Image
                        alt="support"
                        src={
                            ticket.attachment.length !== 0
                                ? ticket?.attachment[0]?.media
                                : "/logo/homaale-logo_png.png"
                        }
                        width={350}
                        height={250}
                        objectFit="contain"
                    />
                </figure>
                <SingleTickets
                    reason={ticket?.type.name}
                    description={ticket?.reason}
                    createdAt={ticket?.created_at}
                    status={ticket?.status}
                    supportId={ticket?.id.toString()}
                    isResolved={ticket?.is_resolved}
                />
            </div>
        );
    });

    return (
        <Layout
            title="My Tickets | Homaale"
            description="Homaale support tickets lists."
            keywords="homaale,  airtasker-nepali, tickets, homaale-tickets,nepali-working-platform, homaale-feeback, business, online-business"
        >
            <section className="my-order-section px-4" id="my-order-section">
                <BreadCrumb currentPage="My-Tickets" />
                <Container fluid="xl" className="px-0">
                    <div className="d-flex align-items-center justify-content-end m-4 ">
                        <Button
                            size="md"
                            onClick={() => router.push("/support")}
                        >
                            Create
                        </Button>
                    </div>
                    {supportTickets?.result.length === 0 && !isFetching ? (
                        <Alert
                            icon={<FontAwesomeIcon icon={faWarning} />}
                            title={"No Tickets Avaiable."}
                            color="orange"
                        >
                            {`You dont have opened any support tickets.`}
                        </Alert>
                    ) : (
                        renderAllTickets
                    )}
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
