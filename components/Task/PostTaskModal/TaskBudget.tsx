import {
    Box,
    Group,
    NumberInput,
    Radio,
    Select,
    Space,
    Text,
} from "@mantine/core";
import { useState } from "react";

export enum BudgetType {
    FIXED = "fixed",
    VARIABLE = "variable",
}
export interface TaskBudgetProps {
    onBudgetTypeChange: (type: BudgetType) => void;
    setFieldValue: (fieldName: string, value: any) => void;
    budgetFixedError?: string | null;
    budgetFromError?: string | null;
    budgetToError?: string | null;
}
export interface BudgetInputProps {
    error?: string | null;
    setFieldValue: (field: string, value: any) => void;
}
export interface VariableBudgetProps extends Omit<BudgetInputProps, "error"> {
    budgetFromError?: string | null;
    budgetToError?: string | null;
}

export const TaskBudget = ({
    onBudgetTypeChange,
    budgetFixedError,
    budgetFromError,
    budgetToError,
    setFieldValue,
}: TaskBudgetProps) => {
    const [value, setValue] = useState<BudgetType>(BudgetType.FIXED);

    const handleBudgetTypeChange = (type: BudgetType) => {
        if (type === BudgetType.FIXED) {
            setFieldValue("budget_from", undefined);
            setFieldValue("budget_to", undefined);
        } else {
            setFieldValue("budget_fixed", undefined);
        }
        onBudgetTypeChange(type);
        setValue(type);
    };
    return (
        <Box>
            <Radio.Group
                label="Budget"
                required
                value={value}
                onChange={(value) =>
                    handleBudgetTypeChange(value as BudgetType)
                }
            >
                <Radio label="Fixed" value={BudgetType.FIXED} />
                <Radio label="Variable" value={BudgetType.VARIABLE} />
            </Radio.Group>
            <Space h={20} />
            {value === BudgetType.FIXED ? (
                <FixedBudget
                    error={budgetFixedError}
                    setFieldValue={setFieldValue}
                />
            ) : (
                <VariableBudget
                    budgetFromError={budgetFromError}
                    budgetToError={budgetToError}
                    setFieldValue={setFieldValue}
                />
            )}
        </Box>
    );
};
const FixedBudget = ({ error, setFieldValue }: BudgetInputProps) => {
    return (
        <Group>
            <NumberInput
                icon="Rs"
                placeholder="Enter your price"
                error={error}
                onChange={(value) => setFieldValue("budget_fixed", value)}
            />
            <Select
                placeholder="Per Project"
                data={[{ label: "Per Project", value: "perProject" }]}
            />
        </Group>
    );
};
const VariableBudget = ({
    budgetFromError,
    budgetToError,
    setFieldValue,
}: VariableBudgetProps) => {
    return (
        <Group>
            <NumberInput
                icon="Rs"
                placeholder="Starting budget"
                error={budgetFromError}
                onChange={(value) => setFieldValue("budget_from", value)}
            />
            <Text>To</Text>
            <NumberInput
                icon="Rs"
                placeholder="Final budget"
                error={budgetToError}
                onChange={(value) => setFieldValue("budget_to", value)}
            />
            <Select
                placeholder="Per project"
                data={[{ label: "Per Project", value: "perProject" }]}
            />
        </Group>
    );
};
