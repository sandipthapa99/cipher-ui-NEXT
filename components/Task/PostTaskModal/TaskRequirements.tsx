import {
    faCheck,
    faCirclePlus,
    faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TextInputProps } from "@mantine/core";
import {
    ActionIcon,
    Box,
    createStyles,
    List,
    Text,
    TextInput,
} from "@mantine/core";
import type { KeyboardEvent } from "react";
import { useState } from "react";

export interface TaskRequiremnt {
    id: number;
    title: string;
}
export interface TaskRequirementsProps extends TextInputProps {
    onRequirementsChange: (requirements: TaskRequiremnt[]) => void;
}
export const TaskRequirements = ({
    onRequirementsChange,
    ...rest
}: TaskRequirementsProps) => {
    const { classes } = useStyles();
    const [requirements, setRequirements] = useState<TaskRequiremnt[]>([]);
    const [newRequirement, setNewRequirement] = useState("");

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        if (!newRequirement) return;
        const requirementAlreadyExist = requirements.some(
            (requirement) => requirement.title === newRequirement
        );
        if (requirementAlreadyExist) {
            setNewRequirement("");
            return;
        }
        const newRequirementObj = {
            id: requirements.length + 1,
            title: newRequirement,
        };
        setRequirements((currentRequirements) => {
            const updatedRequirements = [
                newRequirementObj,
                ...currentRequirements,
            ];
            onRequirementsChange(updatedRequirements);
            setNewRequirement("");
            return updatedRequirements;
        });
    };
    const handleRemoveRequirement = (id: number) => {
        setRequirements((currentRequirements) => {
            const updatedRequirements = currentRequirements.filter(
                (requirement) => requirement.id !== id
            );
            onRequirementsChange(updatedRequirements);
            return updatedRequirements;
        });
    };
    const renderRequirements = () => {
        return requirements.map(({ id, title }) => (
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
            <List>{renderRequirements()}</List>

            <TextInput
                {...rest}
                label="Requirements"
                value={newRequirement}
                onChange={(event) =>
                    setNewRequirement(event.currentTarget.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Add Requirements"
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
        "&:not(:first-of-type)": {
            marginTop: "1rem",
        },
    },
    listItemTitle: {
        flex: 1,
    },
}));
