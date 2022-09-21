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
    initialRequirements: string;
    onRequirementsChange: (requirements: TaskRequiremnt[]) => void;
}
export const TaskRequirements = ({
    initialRequirements,
    onRequirementsChange,
    ...rest
}: TaskRequirementsProps) => {
    const initialTaskRequirementsJSON = safeParse<TaskRequiremnt[]>({
        rawString: initialRequirements,
        initialData: [],
    });
    const { classes } = useStyles();
    const [requirements, setRequirements] = useState<TaskRequiremnt[]>(
        () => initialTaskRequirementsJSON
    );
    const [newRequirement, setNewRequirement] = useState("");

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        handleAddRequirement();
    };

    const handleAddRequirement = () => {
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
            setNewRequirement("");
            return updatedRequirements;
        });
    };

    const handleRemoveRequirement = (id: number) => {
        setRequirements((currentRequirements) => {
            const updatedRequirements = currentRequirements.filter(
                (requirement) => requirement.id !== id
            );
            return updatedRequirements;
        });
    };
    useEffect(() => {
        onRequirementsChange(requirements);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirements]);

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
                placeholder="Add your Requirements"
                rightSection={
                    <ActionIcon onClick={handleAddRequirement}>
                        <FontAwesomeIcon icon={faCirclePlus} color="#3EAEFF" />
                    </ActionIcon>
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
