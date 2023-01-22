import {
    Box,
    Image,
    Text,
    ThemeIcon,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import {
    Article,
    DescriptionOutlined,
    Movie,
    PhotoSizeSelectActual,
    PictureAsPdf,
} from "@mui/icons-material";

export interface FileTypeProps {
    type?: string;
    filePath?: string;
    showFileDetail?: boolean;
    fileSize?: string;
    fileName?: string;
}

export const FileTypeGrid = ({
    type,
    filePath,
    showFileDetail,
    fileSize,
    fileName,
}: FileTypeProps) => {
    const theme = useMantineTheme();

    switch (type) {
        case "mp4":
        case "ogg":
        case "webm":
        case "avi":
            return (
                <Box>
                    <Tooltip
                        withArrow
                        label={fileName}
                        position="bottom"
                        styles={{
                            tooltip: {
                                fontSize: 10,
                                padding: "2px 8px",
                                fontWeight: 500,
                            },
                        }}
                    >
                        <ThemeIcon
                            variant="light"
                            radius="md"
                            color="indigo"
                            size={60}
                        >
                            <Movie style={{ fontSize: "2.8rem" }} />
                        </ThemeIcon>
                    </Tooltip>
                    <Text
                        size={11}
                        weight={500}
                        color="dimmed"
                        mt={5}
                        align="center"
                    >
                        {fileSize}
                    </Text>
                </Box>
            );
        case "csv":
            return (
                <Box>
                    <Tooltip
                        withArrow
                        label={fileName}
                        position="bottom"
                        styles={{
                            tooltip: {
                                fontSize: 10,
                                padding: "2px 8px",
                                fontWeight: 500,
                            },
                        }}
                    >
                        <ThemeIcon
                            variant="light"
                            radius="md"
                            color="green"
                            size={60}
                        >
                            <DescriptionOutlined
                                style={{ fontSize: "2.8rem" }}
                            />
                        </ThemeIcon>
                    </Tooltip>
                    <Text
                        size={11}
                        weight={500}
                        color="dimmed"
                        mt={5}
                        align="center"
                    >
                        {fileSize}
                    </Text>
                </Box>
            );
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "msword":
            return (
                <Box>
                    <Tooltip
                        withArrow
                        label={fileName}
                        position="bottom"
                        styles={{
                            tooltip: {
                                fontSize: 10,
                                padding: "2px 8px",
                                fontWeight: 500,
                            },
                        }}
                    >
                        <ThemeIcon
                            variant="light"
                            radius="md"
                            color="cyan"
                            size={60}
                        >
                            <DescriptionOutlined
                                style={{ fontSize: "2.8rem" }}
                            />
                        </ThemeIcon>
                    </Tooltip>
                    <Text
                        size={11}
                        weight={500}
                        color="dimmed"
                        mt={5}
                        align="center"
                    >
                        {fileSize}
                    </Text>
                </Box>
            );
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return (
                <Box>
                    <Tooltip
                        withArrow
                        label={fileName}
                        position="bottom"
                        styles={{
                            tooltip: {
                                fontSize: 10,
                                padding: "2px 8px",
                                fontWeight: 500,
                            },
                        }}
                    >
                        <ThemeIcon
                            variant="light"
                            radius="md"
                            color="green"
                            size={60}
                        >
                            <DescriptionOutlined
                                style={{ fontSize: "2.8rem" }}
                            />
                        </ThemeIcon>
                    </Tooltip>
                    <Text
                        size={11}
                        weight={500}
                        color="dimmed"
                        mt={5}
                        align="center"
                    >
                        {fileSize}
                    </Text>
                </Box>
            );
        case "pdf":
            return (
                <Box>
                    <Tooltip
                        withArrow
                        label={fileName}
                        position="bottom"
                        styles={{
                            tooltip: {
                                fontSize: 10,
                                padding: "2px 8px",
                                fontWeight: 500,
                            },
                        }}
                    >
                        <ThemeIcon
                            variant="light"
                            radius="md"
                            color="red"
                            size={60}
                        >
                            <PictureAsPdf style={{ fontSize: "2.8rem" }} />
                        </ThemeIcon>
                    </Tooltip>
                    <Text
                        size={11}
                        weight={500}
                        color="dimmed"
                        mt={5}
                        align="center"
                    >
                        {fileSize}
                    </Text>
                </Box>
            );
        case "vnd.ms-excel":
            return (
                <Box>
                    <Tooltip
                        withArrow
                        label={fileName}
                        position="bottom"
                        styles={{
                            tooltip: {
                                fontSize: 10,
                                padding: "2px 8px",
                                fontWeight: 500,
                            },
                        }}
                    >
                        <ThemeIcon
                            variant="light"
                            radius="md"
                            color="teal"
                            size={60}
                        >
                            <Article style={{ fontSize: "2.8rem" }} />
                        </ThemeIcon>
                    </Tooltip>
                    <Text
                        size={11}
                        weight={500}
                        color="dimmed"
                        mt={5}
                        align="center"
                    >
                        {fileSize}
                    </Text>
                </Box>
            );
        case "mpeg":
            return (
                <Box>
                    <Tooltip
                        withArrow
                        label={fileName}
                        position="bottom"
                        styles={{
                            tooltip: {
                                fontSize: 10,
                                padding: "2px 8px",
                                fontWeight: 500,
                            },
                        }}
                    >
                        <ThemeIcon
                            variant="light"
                            radius="md"
                            color="orange"
                            size={60}
                        >
                            <PhotoSizeSelectActual
                                style={{ fontSize: "2.8rem" }}
                            />
                        </ThemeIcon>
                    </Tooltip>
                    <Text
                        size={11}
                        weight={500}
                        color="dimmed"
                        mt={5}
                        align="center"
                    >
                        {fileSize}
                    </Text>
                </Box>
            );

        default:
            return (
                <Tooltip
                    label={fileName}
                    withArrow
                    position="bottom"
                    styles={{
                        tooltip: {
                            fontSize: 10,
                            padding: "2px 8px",
                            fontWeight: 500,
                        },
                    }}
                >
                    <Image
                        src={filePath}
                        width={60}
                        height={60}
                        radius="md"
                        alt="drop-image"
                        mb={
                            showFileDetail && fileSize !== "NaN undefined"
                                ? 20
                                : 0
                        }
                        caption={
                            showFileDetail &&
                            fileSize !== "NaN undefined" && (
                                <Text size={11} weight={500} color="dimmed">
                                    {fileSize}
                                </Text>
                            )
                        }
                        styles={{
                            imageWrapper: {
                                background: theme.colors["gray"][2],
                                borderRadius: theme.radius.md,
                            },
                            image: { padding: 0 },
                            caption: { marginTop: 5 },
                        }}
                    />
                </Tooltip>
            );
    }
};

export const FileTypeList = ({ type, filePath, fileSize }: FileTypeProps) => {
    const theme = useMantineTheme();

    switch (type) {
        case "mp4":
        case "ogg":
        case "webm":
        case "avi":
            return (
                <ThemeIcon variant="light" radius="md" color="indigo" size={44}>
                    <Movie style={{ fontSize: "2.4rem" }} />
                </ThemeIcon>
            );
        case "csv":
            return (
                <ThemeIcon variant="light" radius="md" color="green" size={44}>
                    <Article style={{ fontSize: "2.4rem" }} />
                </ThemeIcon>
            );
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "msword":
            return (
                <ThemeIcon variant="light" radius="md" color="cyan" size={44}>
                    <Article style={{ fontSize: "2.4rem" }} />
                </ThemeIcon>
            );
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return (
                <ThemeIcon variant="light" radius="md" color="green" size={44}>
                    <DescriptionOutlined style={{ fontSize: "2.4rem" }} />
                </ThemeIcon>
            );
        case "pdf":
            return (
                <ThemeIcon variant="light" radius="md" color="red" size={44}>
                    <PictureAsPdf style={{ fontSize: "2.4rem" }} />
                </ThemeIcon>
            );
        case "vnd.ms-excel":
            return (
                <ThemeIcon variant="light" radius="md" color="teal" size={44}>
                    <Article style={{ fontSize: "2.4rem" }} />
                </ThemeIcon>
            );
        case "mpeg":
            return (
                <ThemeIcon variant="light" radius="md" color="orange" size={44}>
                    <PhotoSizeSelectActual style={{ fontSize: "2.4rem" }} />
                </ThemeIcon>
            );

        default:
            return (
                <Image
                    src={filePath}
                    width={44}
                    height={44}
                    radius="sm"
                    alt="file-img"
                    styles={{
                        imageWrapper: {
                            background: theme.colors["gray"][0],
                            borderRadius: theme.radius.sm,
                        },
                        image: { padding: 0 },
                    }}
                />
            );
    }
};
