import { faRemove } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ActionIcon,
    Box,
    createStyles,
    Grid,
    Highlight,
    Stack,
    Text,
} from "@mantine/core";
import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Media } from "types/task";

const FILE_PLACEHOLDER_IMAGES = {
    pdf: "/userprofile/pdf.svg",
    image: "/userprofile/documents/image.svg",
    video: "/payrollservices/video.svg",
};
export type FileType = keyof typeof FILE_PLACEHOLDER_IMAGES;

export interface CustomDropZoneProps
    extends Omit<DropzoneProps, "children" | "onDrop"> {
    name: string;
    maxSize?: number;
    minSize?: number;
    previewImageWidth?: number;
    previewImageHeight?: number;
    fileType?: FileType;
    onDrop?: (image: File[]) => void;
}
export interface PreviewFilesProps {
    files: {
        name: string;
        size: string;
        url: string;
    }[];
    onFileRemove: (fileIndex: number) => void;
    isVideo?: boolean;
}

const convertToMB = (value: number) => {
    const mbValue = (value / 1024 / 1024).toFixed(2);
    return `${mbValue} MB`;
};
export const CustomDropZone = ({
    name,
    maxSize,
    minSize,
    previewImageWidth,
    previewImageHeight,
    fileType,
    onDrop,
    ...rest
}: CustomDropZoneProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const previewVideos = useMemo(() => {
        const videoFiles = files.filter((file) => file.type.includes("video"));
        return videoFiles.map((file) => ({
            name: file.name,
            size: convertToMB(file.size),
            url: URL.createObjectURL(file),
        }));
    }, [files]);
    const previewImages = useMemo(
        () =>
            files.map((file) => ({
                name: file.name,
                size: convertToMB(file.size),
                url: URL.createObjectURL(file),
            })),
        [files]
    );
    const dropzoneRef = useRef<HTMLDivElement | null>(null);
    const { classes } = useStyles();

    const focusDropzone = () => dropzoneRef.current?.focus();

    const handleOnDrop = (files: File[]) => {
        onDrop?.(files);
        setFiles(files);
    };
    const handleRemoveFile = (fileIndex: number) => {
        setFiles((currentFiles) =>
            currentFiles.filter((_, index) => index !== fileIndex)
        );
    };
    return (
        <div onClick={focusDropzone} className={classes.dropzoneContainer}>
            {previewVideos.length > 0 ? (
                <PreviewFiles
                    isVideo
                    files={previewVideos}
                    onFileRemove={handleRemoveFile}
                />
            ) : previewImages.length > 0 ? (
                <PreviewFiles
                    files={previewImages}
                    onFileRemove={handleRemoveFile}
                />
            ) : (
                <Image
                    src={"/service-details/file-upload.svg"}
                    width={previewImageWidth ?? "100%"}
                    height={previewImageHeight ?? "100%"}
                    alt="file-upload"
                    objectFit="contain"
                />
            )}
            <Dropzone
                name={name}
                onDrop={handleOnDrop}
                ref={dropzoneRef}
                className={classes.dropzone}
                {...rest}
            >
                <Highlight
                    highlight={fileType ?? "Image"}
                    highlightColor="blue"
                    highlightStyles={() => ({
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    })}
                >
                    {`Drag or browse ${fileType ?? "Image"}`}
                </Highlight>
            </Dropzone>
            {!minSize && !maxSize ? (
                <Text size="sm" color="dimmed">
                    Maximum {fileType} size 20 - 200 MB
                </Text>
            ) : null}
            {minSize && (
                <Text mt="xl" className={classes.text}>
                    Minimum image size is {maxSize} MB
                </Text>
            )}
            {maxSize && (
                <Text mt="xs" className={classes.text}>
                    Maximum image size is {minSize} MB
                </Text>
            )}
        </div>
    );
};
const PreviewFiles = ({
    files,
    onFileRemove,
    isVideo = false,
}: PreviewFilesProps) => {
    const { classes } = useStyles();
    return (
        <Grid>
            {files.map((file, index, currentFiles) => (
                <Grid.Col
                    span={isVideo ? 12 : currentFiles.length > 1 ? 4 : 12}
                    key={index}
                >
                    <Stack>
                        {isVideo ? (
                            <video
                                className={classes.preview}
                                width="100%"
                                height="100%"
                                controls
                            >
                                <source id="video-source" src={file.url} />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <Image
                                src={file.url}
                                width={"100%"}
                                height="100%"
                                objectFit="cover"
                                className={classes.preview}
                                alt={`Preview image ${index}`}
                            />
                        )}
                        <Box className={classes.previewHeader}>
                            <Text size="xs" color="dimmed">
                                {file.size}
                            </Text>
                            <ActionIcon onClick={() => onFileRemove(index)}>
                                <FontAwesomeIcon icon={faRemove} />
                            </ActionIcon>
                        </Box>
                        <Text align="center" size="xs">
                            {file.name}
                        </Text>
                    </Stack>
                </Grid.Col>
            ))}
        </Grid>
    );
};
const useStyles = createStyles({
    dropzoneContainer: {
        background: "#fff",
        border: "2px dotted #DEE2E6",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 1rem",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
    text: {
        fontSize: "1.2rem",
        color: "#868E96",
        textAlign: "center",
    },
    dropzone: {
        border: "none",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    preview: {
        borderRadius: "1rem",
    },
    previewHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
