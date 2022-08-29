import {
    Box,
    Checkbox,
    Group,
    NumberInput,
    Radio,
    Select,
    Space,
    Text,
    TextInput,
} from "@mantine/core";
import { useState } from "react";

export enum BudgetType {
    FIXED = "fixed",
    VARIABLE = "variable",
}
export const TaskBudget = () => {
    const [value, setValue] = useState<BudgetType>(BudgetType.FIXED);
    return (
        <Box>
            <Radio.Group
                label="Budget"
                required
                value={value}
                onChange={(value) => setValue(value as BudgetType)}
            >
                <Radio label="Fixed" value={BudgetType.FIXED} />
                <Radio label="Variable" value={BudgetType.VARIABLE} />
            </Radio.Group>
            <Space h={20} />
            {value === BudgetType.FIXED ? <FixedBudget /> : <VariableBudget />}
            <Space h={20} />
            <Checkbox label="Yes, it is negotiable." />
        </Box>
    );
};
const FixedBudget = () => {
    return (
        <Group>
            <TextInput placeholder="Enter your price" />
            <Select
                placeholder="Per Project"
                data={[{ label: "Per Project", value: "perProject" }]}
            />
        </Group>
    );
};
const VariableBudget = () => {
    return (
        <Group>
            <NumberInput placeholder="Starting budget" />
            <Text>To</Text>
            <NumberInput placeholder="Final budget" />
            <Select
                placeholder="Per project"
                data={[{ label: "Per Project", value: "perProject" }]}
            />
        </Group>
    );
};
