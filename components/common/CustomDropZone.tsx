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
import { isImage } from "utils/isImage";
import { isVideo } from "utils/isVideo";

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
    uploadedFiles?: Media[];
    onRemoveUploadedFiles?: (remainingFileIds: number[]) => void;
}
export interface PreviewFilesProps {
    files: {
        name: string;
        size: string;
        url: string;
        isUploaded?: boolean;
    }[];
    onFileRemove: (isUploaded: boolean, fileName: string) => void;
    isVideo?: boolean;
    uploadedFiles?: [];
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
    uploadedFiles,
    onRemoveUploadedFiles,
    ...rest
}: CustomDropZoneProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previewFiles, setPreviewFiles] = useState(() => uploadedFiles ?? []);

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

    const previewUploadedImages = (previewFiles ?? [])
        .filter((file) => isImage(file.media_type))
        .map((file) => ({
            name: file.name,
            size: convertToMB(file.size),
            url: file.media,
        }));

    const previewUploadedVideos = (previewFiles ?? [])
        .filter((file) => isVideo(file.media_type))
        .map((file) => ({
            name: file.name,
            size: convertToMB(file.size),
            url: file.media,
        }));

    const dropzoneRef = useRef<HTMLDivElement | null>(null);
    const { classes } = useStyles();

    const focusDropzone = () => dropzoneRef.current?.focus();

    const handleOnDrop = (droppedFiles: File[]) => {
        const fileAlreadyExist = droppedFiles.some((droppedFile) =>
            files.some((file) => file.name === droppedFile.name)
        );
        if (fileAlreadyExist) return;
        setFiles((previousFiles) => {
            const newFiles = [...droppedFiles, ...previousFiles];
            onDrop?.(newFiles);
            return newFiles;
        });
    };

    const handleRemoveFile = (fileName: string) => {
        setFiles((currentFiles) =>
            currentFiles.filter((file) => file.name !== fileName)
        );
    };

    const handleRemoveUploadedFile = (fileName: string) => {
        const updatedPreviewFiles = previewFiles.filter(
            (file) => file.name !== fileName
        );
        const remainingFileIds = updatedPreviewFiles.map((file) => file.id);

        onRemoveUploadedFiles?.(remainingFileIds);
        setPreviewFiles(updatedPreviewFiles);
    };

    const combinedPreviewImages = [
        ...previewUploadedImages.map((image) => ({
            ...image,
            isUploaded: true,
        })),
        ...previewImages.map((image) => ({ ...image, isUploaded: false })),
    ];
    const combinedPreviewVideos = [
        ...previewUploadedVideos.map((video) => ({
            ...video,
            isUploaded: true,
        })),
        ...previewVideos.map((video) => ({ ...video, isUploaded: false })),
    ];

    return (
        <div onClick={focusDropzone} className={classes.dropzoneContainer}>
            {combinedPreviewVideos.length > 0 ? (
                <PreviewFiles
                    isVideo
                    files={combinedPreviewVideos}
                    onFileRemove={(isUploaded, filename) =>
                        isUploaded
                            ? handleRemoveUploadedFile(filename)
                            : handleRemoveFile(filename)
                    }
                />
            ) : combinedPreviewImages.length > 0 ? (
                <PreviewFiles
                    files={combinedPreviewImages}
                    onFileRemove={(isUploaded, filename) =>
                        isUploaded
                            ? handleRemoveUploadedFile(filename)
                            : handleRemoveFile(filename)
                    }
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
            {files.map((file, index) => (
                <Grid.Col
                    span={files.length > 1 ? (isVideo ? 12 : 4) : 12}
                    key={file.name}
                >
                    <Stack key={file.name}>
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
                                width={"80%"}
                                height="80%"
                                objectFit="cover"
                                className={classes.preview}
                                alt={`Preview image ${index}`}
                            />
                        )}
                        <Box className={classes.previewHeader}>
                            <Text size="xs" color="dimmed">
                                {file.size}
                            </Text>
                            <ActionIcon
                                onClick={() =>
                                    onFileRemove(!!file.isUploaded, file.name)
                                }
                            >
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
