import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import type { TextInputProps } from "@mantine/core";
import { Box, Radio, Space } from "@mantine/core";
import React, { useState } from "react";

export type TaskType = "remote" | "onPremise";
interface SelectTaskTypeProps extends TextInputProps {
    onTypeChange: (type: TaskType) => void;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => void;
    location: string;
}
export const SelectTaskType = ({
    setFieldValue,
    onTypeChange,
    location,
}: SelectTaskTypeProps) => {
    const [taskType, setTaskType] = useState<TaskType>(() =>
        location === "remote" ? "remote" : "onPremise"
    );

    const handleTaskTypeChange = (value: TaskType) => {
        setFieldValue("taskTypeRadio", value);
        setTaskType(value);
        if (value === "remote") {
            onTypeChange("remote");
        } else {
            setFieldValue("location", "");
        }
    };
    return (
        <Box>
            <Radio.Group
                label="Select Task Type"
                value={taskType}
                onChange={handleTaskTypeChange}
                required
            >
                <Radio value="remote" label="Remote" />
                <Radio value="onPremise" label="On Premise" />
            </Radio.Group>
            {taskType === "onPremise" && (
                <>
                    <Space h={10} />
                    <PlacesAutocomplete
                        placeholder="Enter your location"
                        value={location}
                        onPlaceChange={(place) =>
                            setFieldValue("location", place)
                        }
                    />
                </>
            )}
        </Box>
    );
};
