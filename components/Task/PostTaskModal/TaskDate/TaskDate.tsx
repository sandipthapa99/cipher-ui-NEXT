import { Box, Radio, Space } from "@mantine/core";
import { useState } from "react";

import { CustomDate } from "./CustomDate";
import { FixedDate } from "./FixedDate";

export enum TaskDateType {
    FIXED = "Fixed",
    CUSTOM = "Custom",
}
export const TaskDate = () => {
    const [value, setValue] = useState(TaskDateType.FIXED);
    return (
        <Box>
            <Radio.Group
                value={value}
                onChange={(value) => setValue(value as TaskDateType)}
                label="When do you need this done ?"
                required
            >
                <Radio label="Fixed" value={TaskDateType.FIXED} />
                <Radio label="Custom" value={TaskDateType.CUSTOM} />
            </Radio.Group>
            <Space h={20} />
            {value === TaskDateType.FIXED ? <FixedDate /> : <CustomDate />}
        </Box>
    );
};
