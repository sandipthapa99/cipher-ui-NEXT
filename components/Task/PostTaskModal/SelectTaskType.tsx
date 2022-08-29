import { Box, Radio, Space, TextInput } from "@mantine/core";
import React, { useState } from "react";

export enum TaskType {
    REMOTE = "remote",
    ONPREMISE = "onPremise",
}
interface SelectTaskTypeProps {
    onTypeChange: (type: TaskType) => void;
}
export const SelectTaskType = ({ onTypeChange }: SelectTaskTypeProps) => {
    const [value, setValue] = useState<TaskType>(TaskType.REMOTE);
    const [premise, setPremise] = useState("");

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
                        value={premise}
                        onChange={(event) =>
                            setPremise(event.currentTarget.value)
                        }
                        placeholder="Default Address (HOME)"
                    />
                </>
            )}
        </Box>
    );
};
