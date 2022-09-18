import {
    faCheck,
    faCircleExclamation,
    faCirclePlus,
    faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TextInputProps } from "@mantine/core";
import { Space } from "@mantine/core";
import {
    ActionIcon,
    Box,
    createStyles,
    List,
    Text,
    TextInput,
} from "@mantine/core";
import type { KeyboardEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { safeParse } from "utils/safeParse";

export interface TaskRequiremnt {
    id: number;
    title: string;
}
export interface TaskRequirementsProps extends TextInputProps {
    initialRequirements: Record<string, string>;
    onRequirementsChange: (requirements: Record<string, string>) => void;
}
export const TaskRequirements = ({
    initialRequirements,
    onRequirementsChange,
    ...rest
}: TaskRequirementsProps) => {
    const { classes } = useStyles();
    const [requirements, setRequirements] = useState<Record<string, string>>(
        () => initialRequirements
    );
    const [newRequirement, setNewRequirement] = useState("");

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        if (!newRequirement) return;
        const requirementAlreadyExist = Object.values(requirements).some(
            (requirement) => requirement === newRequirement
        );
        if (requirementAlreadyExist) {
            setNewRequirement("");
            return;
        }

        setRequirements((currentRequirements) => {
            const newRequirements = {
                ...currentRequirements,
                [Object.keys(currentRequirements).length + 1]: newRequirement,
            };
            setNewRequirement("");
            return newRequirements;
        });
    };
    const handleRemoveRequirement = (id: string) => {
        setRequirements((currentRequirements) => {
            const updatedRequirements = Object.entries(
                currentRequirements
            ).reduce((acc, curr) => {
                const [key, value] = curr;
                if (key != id) acc[key] = value;
                return acc;
            }, {} as Record<string, string>);
            return updatedRequirements;
        });
    };
    useEffect(() => {
        onRequirementsChange(requirements);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirements]);

    const renderRequirements = () => {
        return Object.entries(requirements).map(([id, title]) => (
            <li className={classes.listItem} key={id}>
                <ActionIcon>
                    <FontAwesomeIcon icon={faCheck} color="#3EAEFF" />
                </ActionIcon>
                <Text className={classes.listItemTitle}>{title}</Text>
                <ActionIcon onClick={() => handleRemoveRequirement(id)}>
                    <FontAwesomeIcon icon={faXmark} color="#CED4DA" />
                </ActionIcon>
            </li>
        ));
    };
    return (
        <Box>
            <Box className={classes.requirement}>
                <Text>Requirements</Text>
                <FontAwesomeIcon icon={faCircleExclamation} color="#FF9700" />
            </Box>
            <Space h={5} />
            <Text color="dimmed" size="sm">
                This helps tasker to find about your requirements better.
            </Text>
            <Space h={10} />
            <List>{renderRequirements()}</List>
            <TextInput
                {...rest}
                value={newRequirement}
                onChange={(event) =>
                    setNewRequirement(event.currentTarget.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Add your requirements"
                rightSection={
                    <FontAwesomeIcon icon={faCirclePlus} color="#3EAEFF" />
                }
            />
        </Box>
    );
};
export const useStyles = createStyles(() => ({
    listItem: {
        display: "flex",
        gap: "0.8rem",
        marginBottom: "1rem",
    },
    listItemTitle: {
        flex: 1,
    },
    requirement: {
        display: "flex",
        alignItems: "center",
        gap: ".8rem",
    },
}));
