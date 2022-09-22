import type { EditServicePayload } from "@components/services/EditService";
import type { PostTaskPayload } from "@components/Task/PostTaskModal/PostTaskModal";
import {
    Box,
    Group,
    NumberInput,
    Radio,
    Select,
    Space,
    Text,
} from "@mantine/core";
import type { FormikErrors, FormikTouched } from "formik";
import { useState } from "react";

export enum BudgetType {
    FIXED = "Fixed",
    VARIABLE = "Variable",
}
export interface TaskBudgetProps {
    initialBudgetFrom?: number;
    initialBudgetTo?: number;
    setFieldValue: (field: string, value: any) => void;
    setFieldError: (field: string, value: any) => void;
    setFieldTouched: (field: string, value: any) => void;
    getFieldProps: (field: string) => any;
    touched: FormikTouched<PostTaskPayload | EditServicePayload>;
    errors: FormikErrors<PostTaskPayload | EditServicePayload>;
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
        label: "Monthly",
        value: "Monthly",
    },
    {
        label: "Fixed",
        value: "Fixed",
    },
];
export const TaskBudget = ({
    initialBudgetFrom,
    initialBudgetTo,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    getFieldProps,
}: TaskBudgetProps) => {
    const [value, setValue] = useState<BudgetType>(() =>
        initialBudgetFrom && initialBudgetTo
            ? BudgetType.VARIABLE
            : BudgetType.FIXED
    );

    const resetFields = () => {
        setFieldValue("budget_from", "");
        setFieldValue("budget_to", "");
        setFieldTouched("budget_from", false);
        setFieldTouched("budget_to", false);
        setFieldError("budget_from", "");
        setFieldError("budget_to", "");
    };
    const handleBudgetTypeChange = (type: BudgetType) => {
        resetFields();
        setFieldValue("budgetTypeRadio", type);
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
                        // icon="Rs"
                        placeholder="Enter your price"
                        onChange={(value) => setFieldValue("budget_to", value)}
                        defaultValue={initialBudgetTo}
                    />
                    <Select
                        {...getFieldProps("budget_type")}
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
                        // icon="Rs"
                        placeholder="Starting budget"
                        onChange={(value) =>
                            setFieldValue("budget_from", value)
                        }
                        defaultValue={initialBudgetFrom}
                    />
                    <Text>To</Text>
                    <NumberInput
                        {...getFieldProps("budget_to")}
                        // icon="Rs"
                        placeholder="Final budget"
                        onChange={(value) => setFieldValue("budget_to", value)}
                        defaultValue={initialBudgetTo}
                    />
                    <Select
                        {...getFieldProps("budget_type")}
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
