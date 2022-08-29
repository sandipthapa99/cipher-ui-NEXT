import {
    faCheck,
    faCircleExclamation,
    faCirclePlus,
    faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ActionIcon,
    Box,
    createStyles,
    List,
    Space,
    Text,
    TextInput,
} from "@mantine/core";
import type { FormEvent } from "react";
import { useState } from "react";

export interface TaskRequiremnt {
    id: number;
    title: string;
}
export interface TaskRequirementsProps {
    onRequirementsChange: (requirements: TaskRequiremnt[]) => void;
}
export const TaskRequirements = ({
    onRequirementsChange,
}: TaskRequirementsProps) => {
    const { classes } = useStyles();
    const [requirements, setRequirements] = useState<TaskRequiremnt[]>([]);
    const [newRequirement, setNewRequirement] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!newRequirement) return;
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
    const renderRequirements = () => {
        return requirements.map(({ id, title }) => (
            <li className={classes.listItem} key={id}>
                <ActionIcon>
                    <FontAwesomeIcon icon={faCheck} color="#3EAEFF" />
                </ActionIcon>
                <Text className={classes.listItemTitle}>{title}</Text>
                <ActionIcon>
                    <FontAwesomeIcon icon={faXmark} color="#CED4DA" />
                </ActionIcon>
            </li>
        ));
    };
    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Text>Requirements</Text>
                <FontAwesomeIcon icon={faCircleExclamation} color="#FF9700" />
            </Box>
            <Space h={6} />
            <List>{renderRequirements()}</List>
            <form onSubmit={handleSubmit}>
                <TextInput
                    value={newRequirement}
                    onChange={(event) =>
                        setNewRequirement(event.currentTarget.value)
                    }
                    placeholder="Add Requirements"
                    rightSection={
                        <FontAwesomeIcon icon={faCirclePlus} color="#3EAEFF" />
                    }
                />
            </form>
        </Box>
    );
};
export const useStyles = createStyles(() => ({
    listItem: {
        display: "flex",
        gap: "0.8rem",
        "&:not(:first-child)": {
            marginTop: "1rem",
        },
    },
    listItemTitle: {
        flex: 1,
    },
}));
