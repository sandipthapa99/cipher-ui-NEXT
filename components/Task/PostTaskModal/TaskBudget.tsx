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
import { Col, Row } from "react-bootstrap";

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
        label: "Daily",
        value: "Daily",
    },
    {
        label: "Monthly",
        value: "Monthly",
    },
];
export const TaskBudget = ({
    initialBudgetFrom,
    initialBudgetTo,
    setFieldValue,
    getFieldProps,
    touched,
    errors,
}: TaskBudgetProps) => {
    const [value, setValue] = useState<BudgetType>(() =>
        initialBudgetFrom && initialBudgetTo
            ? BudgetType.VARIABLE
            : BudgetType.FIXED
    );

    const handleBudgetTypeChange = (type: BudgetType) => {
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
                <Row className="gx-5">
                    <Col md={4}>
                        <NumberInput
                            {...getFieldProps("budget_to")}
                            // icon="Rs"
                            placeholder="Enter your price"
                            onChange={(value) =>
                                setFieldValue("budget_to", value)
                            }
                            defaultValue={initialBudgetTo}
                            min={1}
                            max={100000}
                            error={
                                touched.budget_to && errors.budget_to
                                    ? errors.budget_to
                                    : undefined
                            }
                            className="mb-4 mb-md-0"
                        />
                    </Col>
                    <Col md={3}>
                        <Select
                            {...getFieldProps("budget_type")}
                            placeholder="Per Project"
                            data={budgetType}
                            min={1}
                            max={100000}
                            onChange={(value) =>
                                setFieldValue("budget_type", value)
                            }
                        />
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col md={4}>
                        <NumberInput
                            {...getFieldProps("budget_from")}
                            // icon="Rs"
                            placeholder="Starting budget"
                            onChange={(value) =>
                                setFieldValue("budget_from", value)
                            }
                            min={1}
                            max={100000}
                            defaultValue={initialBudgetFrom}
                            error={
                                touched.budget_from && errors.budget_from
                                    ? errors.budget_from
                                    : undefined
                            }
                        />
                    </Col>
                    <Col md={1} className="my-4 my-md-auto text-center">
                        <Text>To</Text>
                    </Col>
                    <Col md={4}>
                        <NumberInput
                            {...getFieldProps("budget_to")}
                            // icon="Rs"
                            placeholder="Final budget"
                            onChange={(value) =>
                                setFieldValue("budget_to", value)
                            }
                            min={1}
                            max={100000}
                            defaultValue={initialBudgetTo}
                            error={
                                touched.budget_to && errors.budget_to
                                    ? errors.budget_to
                                    : undefined
                            }
                            className="mb-4 mb-md-0"
                        />
                    </Col>
                    <Col md={3}>
                        <Select
                            {...getFieldProps("budget_type")}
                            placeholder="Per project"
                            data={budgetType}
                            onChange={(value) =>
                                setFieldValue("budget_type", value)
                            }
                        />
                    </Col>
                </Row>
            )}
        </Box>
    );
};
