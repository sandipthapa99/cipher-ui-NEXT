import {
    Box,
    Group,
    NumberInput,
    Radio,
    Select,
    Space,
    Text,
} from "@mantine/core";
import type { FieldInputProps } from "formik";
import { useState } from "react";

export enum BudgetType {
    FIXED = "Fixed",
    VARIABLE = "Variable",
}
export interface TaskBudgetProps {
    setFieldValue: (fieldName: string, value: any) => void;
    budgetTypeError?: string | null;
    budgetFromError?: string | null;
    budgetToError?: string | null;
    getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
}

const budgetType = [
    {
        label: "Per Project",
        value: "Project",
    },
    {
        label: "Hourly",
        value: "Hourly",
    },
    {
        label: "Fixed",
        value: "Fixed",
    },
];
export const TaskBudget = ({
    budgetTypeError,
    budgetFromError,
    budgetToError,
    setFieldValue,
    getFieldProps,
}: TaskBudgetProps) => {
    const [value, setValue] = useState<BudgetType>(BudgetType.FIXED);

    const handleBudgetTypeChange = (type: BudgetType) => {
        if (type === BudgetType.FIXED) {
            setFieldValue("budget_from", undefined);
            setFieldValue("budget_to", undefined);
        } else {
            setFieldValue("budget_fixed", undefined);
        }
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
                <Group>
                    <NumberInput
                        {...getFieldProps("budget_to")}
                        icon="Rs"
                        placeholder="Enter your price"
                        error={budgetToError}
                        onChange={(value) => setFieldValue("budget_to", value)}
                    />
                    <Select
                        {...getFieldProps("budget_type")}
                        error={budgetTypeError}
                        placeholder="Per Project"
                        data={budgetType}
                        onChange={(value) =>
                            setFieldValue("budget_type", value)
                        }
                    />
                </Group>
            ) : (
                <Group>
                    <NumberInput
                        {...getFieldProps("budget_from")}
                        icon="Rs"
                        placeholder="Starting budget"
                        error={budgetFromError}
                        onChange={(value) =>
                            setFieldValue("budget_from", value)
                        }
                    />
                    <Text>To</Text>
                    <NumberInput
                        {...getFieldProps("budget_to")}
                        icon="Rs"
                        placeholder="Final budget"
                        error={budgetToError}
                        onChange={(value) => setFieldValue("budget_to", value)}
                    />
                    <Select
                        {...getFieldProps("budget_type")}
                        error={budgetTypeError}
                        placeholder="Per project"
                        data={budgetType}
                        onChange={(value) =>
                            setFieldValue("budget_type", value)
                        }
                    />
                </Group>
            )}
        </Box>
    );
};
