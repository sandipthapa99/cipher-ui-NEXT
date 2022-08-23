import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import { Box, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

interface RenderListProps<T> {
    title: string;
    subtitle: string;
    data: T[];
    renderItem: (data: T, index: number) => JSX.Element;
}
export const useTasksByCategory = (category: string) => {
    return useQuery(["tasks-by-category", category], () =>
        axiosClient
            .get(`/task/task-by-category/${category}`)
            .then((res) => res.data)
    );
};
export const useServicesByCategory = (category: string) => {
    return useQuery(["services-by-category", category], () =>
        axiosClient
            .get(`/task/service?category=${category}`)
            .then((res) => res.data)
    );
};

const RenderList = <T,>({
    title,
    subtitle,
    data,
    renderItem,
}: RenderListProps<T>) => {
    return (
        <Box>
            <Title order={3}>{title}</Title>
            <Text mt="sm">{subtitle}</Text>
            {data.map((item, index) => (
                <Fragment key={index}>{renderItem(item, index)}</Fragment>
            ))}
        </Box>
    );
};

const ServiceCategoryPage = () => {
    const router = useRouter();
    const categorySlug = router.query.name as string;
    const categoryName = router.query.category as string;

    const { data: tasksByCategory, error: taskByCategoryError } =
        useTasksByCategory(categorySlug);
    const { data: servicesByCategory, error: servicesByCategoryError } =
        useServicesByCategory(categorySlug);

    return (
        <Layout>
            <Container className="py-4">
                <BreadCrumb currentPage={categorySlug} />
                <RenderList
                    title={categoryName}
                    subtitle={`${categoryName} Services Near You`}
                    data={[1, 2, 3]}
                    renderItem={(service, index) => <h1>{service}</h1>}
                />
            </Container>
        </Layout>
    );
};
export default ServiceCategoryPage;
