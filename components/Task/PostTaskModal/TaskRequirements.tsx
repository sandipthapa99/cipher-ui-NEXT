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
import {
    AddCircleOutline,
    Check,
    Close,
    ErrorOutlineOutlined,
} from "@mui/icons-material";
import type { KeyboardEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";

export interface TaskRequiremnt {
    id: number;
    title: string;
}
export interface TaskRequirementsProps extends TextInputProps {
    initialRequirements?: any;
    onRequirementsChange: (requirements: string[]) => void;
    labelName: string;
    description: string;
}
export const TaskRequirements = ({
    initialRequirements,
    onRequirementsChange,
    labelName,
    description,
    ...rest
}: TaskRequirementsProps) => {
    const { classes } = useStyles();
    const [requirements, setRequirements] = useState<string[]>(() =>
        initialRequirements ? initialRequirements : []
    );

    const [newRequirement, setNewRequirement] = useState("");

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        handleAddRequirement();
    };

    const handleAddRequirement = () => {
        if (!newRequirement) return;
        const requirementAlreadyExist = requirements.find(
            (requirement) => requirement === newRequirement
        );
        if (requirementAlreadyExist) {
            setNewRequirement("");
            return;
        }
        setRequirements((previousRequirements) => [
            ...previousRequirements,
            newRequirement,
        ]);
        setNewRequirement("");
    };
    const handleRemoveRequirement = (name: string) => {
        setRequirements((previousRequirements) =>
            previousRequirements.filter((requirement) => requirement !== name)
        );
    };
    useEffect(() => {
        onRequirementsChange(requirements);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirements]);

    const renderRequirements = () => {
        return requirements.map((requirement, index) => (
            <li className={classes.listItem} key={index}>
                <ActionIcon>
                    <Check style={{ color: "#3EAEFF" }} />
                </ActionIcon>
                <Text className={classes.listItemTitle}>{requirement}</Text>
                <ActionIcon
                    onClick={() => handleRemoveRequirement(requirement)}
                >
                    <Close style={{ color: "#CED4DA" }} />
                </ActionIcon>
            </li>
        ));
    };
    return (
        <Box>
            <Box className={classes.requirement}>
                <Text>{labelName}</Text>
                <ErrorOutlineOutlined style={{ color: "#FF9700" }} />
            </Box>
            <Space h={5} />
            <Text color="dimmed" size="sm">
                {description}
            </Text>
            <Space h={10} />
            <List>{renderRequirements()}</List>
            <TextInput
                {...rest}
                value={newRequirement}
                size="md"
                onChange={(event) =>
                    setNewRequirement(event.currentTarget.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Add your requirements"
                rightSection={
                    <ActionIcon onClick={handleAddRequirement}>
                        <AddCircleOutline
                            style={{
                                color: "#3EAEFF",
                            }}
                        />
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
