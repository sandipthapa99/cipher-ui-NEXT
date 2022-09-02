import type { TextInputProps } from "@mantine/core";
import { Box, Radio, Space, TextInput } from "@mantine/core";
import React, { useState } from "react";

export enum TaskType {
    REMOTE = "remote",
    ONPREMISE = "onPremise",
}
interface SelectTaskTypeProps {
    onTypeChange: (type: TaskType) => void;
    addressInputProps: TextInputProps;
}
export const SelectTaskType = ({
    onTypeChange,
    addressInputProps,
}: SelectTaskTypeProps) => {
    console.log(addressInputProps);
    const [value, setValue] = useState<TaskType>(TaskType.REMOTE);

    const handleTaskTypeChange = (value: string) => {
        setValue(value as TaskType);
        onTypeChange(value as TaskType);
    };
    return (
        <Box>
            <Radio.Group
                label="Select Task Type"
                value={value}
                onChange={handleTaskTypeChange}
                required
            >
                <Radio value={TaskType.REMOTE} label="Remote" />
                <Radio value={TaskType.ONPREMISE} label="On Premise" />
            </Radio.Group>
            {value === TaskType.ONPREMISE && (
                <>
                    <Space h={10} />
                    <TextInput
                        {...addressInputProps}
                        placeholder="Default Address (HOME)"
                    />
                </>
            )}
        </Box>
    );
};
