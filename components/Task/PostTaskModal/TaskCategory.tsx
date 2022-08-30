import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useState } from "react";

const DUMMY_CATEGORIES = [
    "Gardening",
    "Cooking",
    "Housework",
    "Babysitting",
    "Pet Care",
    "Other",
];
const data: SelectItem[] = DUMMY_CATEGORIES.map((category, index) => ({
    id: index,
    label: category,
    value: category,
}));

interface TaskCategoryProps extends Omit<SelectProps, "data"> {
    onCategoryChange: (category: string) => void;
}
export const TaskCategory = ({
    onCategoryChange,
    ...rest
}: TaskCategoryProps) => {
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
            label="Category"
            placeholder="Select a category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            data={data}
            required
        />
    );
};
