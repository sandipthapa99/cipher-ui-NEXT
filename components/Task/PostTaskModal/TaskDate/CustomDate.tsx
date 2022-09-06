import { faCalendar, faCirclePlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ActionIcon,
    Box,
    Checkbox,
    createStyles,
    Group,
    Space,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { TimeRangeInput } from "@mantine/dates";
import { useState } from "react";

interface CustomDateProps {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => void;
}
const SPECIFIC_DAYS = [
    {
        day: "Sunday",
        selected: false,
        inputLength: 0,
    },
    {
        day: "Monday",
        selected: false,
        inputLength: 0,
    },
    {
        day: "Tuesday",
        selected: false,
        inputLength: 0,
    },
    {
        day: "Wednesday",
        selected: false,
        inputLength: 0,
    },
    {
        day: "Thursday",
        selected: false,
        inputLength: 0,
    },
    {
        day: "Friday",
        selected: false,
        inputLength: 0,
    },
    {
        day: "Saturday",
        selected: false,
        inputLength: 0,
    },
];

export const CustomDate = ({ setFieldValue }: CustomDateProps) => {
    const { classes } = useStyles();
    const [selectSpecificTime, setSelectSpecificTime] = useState(false);
    const [specificDays, setSpecificDays] = useState(SPECIFIC_DAYS);

    const handleDayChecked = (day: string) => {
        setSpecificDays((currentSpecificDays) =>
            currentSpecificDays.map((currentSpecificDay) =>
                currentSpecificDay.day === day
                    ? {
                          ...currentSpecificDay,
                          selected: !currentSpecificDay.selected,
                      }
                    : currentSpecificDay
            )
        );
    };
    const handleAddTime = (day: string) => {
        setSpecificDays((currentSpecificDays) =>
            currentSpecificDays.map((currentSpecificDay) =>
                currentSpecificDay.day === day
                    ? {
                          ...currentSpecificDay,
                          inputLength: currentSpecificDay.inputLength + 1,
                      }
                    : currentSpecificDay
            )
        );
    };
    const handleTimeInputChange = (
        event: [Date, Date],
        day: string,
        index: number
    ) => {
        const [from, to] = event;
        setFieldValue("extra_data.type", "custom");
        setFieldValue(`extra_data.data.${[day]}.${[index]}`, { from, to });
    };
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
            {selectSpecificTime && (
                <>
                    <Space h={16} />
                    <Stack spacing="md">
                        {specificDays.map((day, index) => (
                            <Group key={index}>
                                <Checkbox
                                    checked={day.selected}
                                    onChange={() => handleDayChecked(day.day)}
                                />
                                <Text>{day.day}</Text>
                                {Array.from({ length: day.inputLength }).map(
                                    (_, index) => (
                                        <TimeRangeInput
                                            key={index}
                                            onChange={(event) =>
                                                handleTimeInputChange(
                                                    event,
                                                    day.day,
                                                    index
                                                )
                                            }
                                            clearable
                                        />
                                    )
                                )}
                                {day.selected && (
                                    <ActionIcon
                                        onClick={() => handleAddTime(day.day)}
                                        color="blue"
                                    >
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                    </ActionIcon>
                                )}
                            </Group>
                        ))}
                    </Stack>
                </>
            )}
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
