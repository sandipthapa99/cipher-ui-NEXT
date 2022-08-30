import {
    faClock,
    faClose,
    faPlusCircle,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ActionIcon,
    Box,
    Checkbox,
    createStyles,
    Space,
    Text,
    TextInput,
} from "@mantine/core";
import { TimeRangeInput } from "@mantine/dates";
import { useState } from "react";

export const FixedDate = () => {
    const { classes } = useStyles();
    const [selectSpecificTime, setSelectSpecificTime] = useState(false);
    const [totalInputs, setTotalInputs] = useState(0);

    const handleAddInput = () => {
        setTotalInputs((currentTotalInputs) => currentTotalInputs + 1);
    };
    const handleRemoveInput = () => {
        setTotalInputs((currentTotalInputs) => currentTotalInputs - 1);
    };
    return (
        <Box>
            <Box className={classes.dateContainer}>
                <Text>Date</Text>
                <TextInput type="date" />
            </Box>
            <Space h={20} />
            <Checkbox
                checked={selectSpecificTime}
                onChange={(event) =>
                    setSelectSpecificTime(event.currentTarget.checked)
                }
                label="Set specific time"
            />
            {selectSpecificTime && (
                <>
                    <Space h={10} />
                    <Box className={classes.specificTimes}>
                        {Array.from({ length: totalInputs })
                            .map((_, index) => index)
                            .map((index) => (
                                <TimeRangeInput
                                    icon={<FontAwesomeIcon icon={faClock} />}
                                    rightSection={
                                        <ActionIcon onClick={handleRemoveInput}>
                                            <FontAwesomeIcon icon={faClose} />
                                        </ActionIcon>
                                    }
                                    key={index}
                                />
                            ))}
                        <ActionIcon onClick={handleAddInput}>
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                color="#3EAEFF"
                            />
                        </ActionIcon>
                    </Box>
                </>
            )}
        </Box>
    );
};
const useStyles = createStyles(() => ({
    dateContainer: {
        display: "flex",
        alignItems: "center",
        gap: "3.2rem",
    },
    specificTimes: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
        gap: "1.6rem",
    },
}));
