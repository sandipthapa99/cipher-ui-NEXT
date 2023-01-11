import { ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";

export interface BreadCrumbProps {
    currentPage?: string;
}

export const BreadCrumb = ({ currentPage }: BreadCrumbProps) => {
    const router = useRouter();
    const routes = router.asPath.split("/").filter((route) => route);

    const breadCrumbRoutes = routes.slice(0, routes.length - 1);
    return (
        <div id="breadcrumb-section" className="breadcrumb-section">
            <Container fluid="xl" className="p-0">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <ChevronRight className="svg-icon me-0" />
                    {breadCrumbRoutes.map((route, key) => (
                        <span key={key}>
                            <Link href={`/${route?.toLowerCase()}`}>
                                <a>{route}</a>
                            </Link>
                            <ChevronRight className="svg-icon ms-3 me-0" />
                        </span>
                    ))}
                    <Breadcrumb.Item active className="text-capitalize">
                        {currentPage}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Container>
        </div>
    );
};
