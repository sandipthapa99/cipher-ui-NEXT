import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosClient } from "utils/axiosClient";

export interface ServiceCategory {
    id: number;
    name: string;
    slug: string;
    icon: string;
}
export const useServiceCategories = () => {
    return useQuery(["service-categories"], async () => {
        const { data } = await axiosClient.get<ServiceCategory[]>(
            "/task/cms/task-category/list/"
        );
        const categoryItems = data.map((category) => ({
            id: category.id,
            label: category.name,
            value: category.id.toString(),
        }));
        return categoryItems;
    });
};

interface TaskCategoryProps extends Omit<SelectProps, "data"> {
    onCategoryChange: (category: string) => void;
}
export const TaskCategory = ({
    onCategoryChange,
    ...rest
}: TaskCategoryProps) => {
    const { data: serviceCategories = [] } = useServiceCategories();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const handleCategoryChange = (category: string | null) => {
        if (!category) return;
        onCategoryChange(category);
        setSelectedCategory(category);
    };
    return (
        <Select
            {...rest}
            searchable
            label="Category"
            placeholder="Select a category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            data={serviceCategories}
            required
        />
    );
};
