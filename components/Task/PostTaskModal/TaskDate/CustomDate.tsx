import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Checkbox,
    createStyles,
    Space,
    Text,
    TextInput,
} from "@mantine/core";
import { useState } from "react";

export const CustomDate = () => {
    const { classes } = useStyles();
    const [selectSpecificTime, setSelectSpecificTime] = useState(false);
    return (
        <Box>
            <Box className={classes.datesContainer}>
                <Box className={classes.date}>
                    <Text color="dimmed">Start Date</Text>
                    <TextInput
                        icon={<FontAwesomeIcon icon={faCalendar} />}
                        type="date"
                    />
                </Box>
                <Box className={classes.date}>
                    <Text color="dimmed">End Date</Text>
                    <TextInput
                        type="date"
                        icon={<FontAwesomeIcon icon={faCalendar} />}
                    />
                </Box>
            </Box>
            <Space h={16} />
            <Checkbox
                checked={selectSpecificTime}
                onChange={(event) =>
                    setSelectSpecificTime(event.currentTarget.checked)
                }
                label="Set specific time"
            />
        </Box>
    );
};
const useStyles = createStyles(() => ({
    datesContainer: {
        display: "flex",
        gap: "3rem",
    },
    date: {
        display: "flex",
        gap: "1.6rem",
        alignItems: "center",
    },
}));
