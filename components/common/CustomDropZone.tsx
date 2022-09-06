import { createStyles, Highlight, Text } from "@mantine/core";
import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

const FILE_PLACEHOLDER_IMAGES = {
    pdf: "/userprofile/pdf.svg",
    image: "/userprofile/documents/image.svg",
    video: "/payrollservices/video.svg",
};
export type FileType = keyof typeof FILE_PLACEHOLDER_IMAGES;

export interface CustomDropZoneProps
    extends Omit<DropzoneProps, "children" | "onDrop"> {
    name: string;
    label?: string;
    maxSize?: number;
    minSize?: number;
    previewImageWidth?: number;
    previewImageHeight?: number;
    fileType?: FileType;
    fileLabel?: string;
    onDrop?: (image: FormData) => void;
    type: string[];
}

export const CustomDropZone = ({
    name,
    label,
    maxSize,
    minSize,
    previewImageWidth,
    previewImageHeight,
    fileType,
    onDrop,
    fileLabel,
    ...rest
}: CustomDropZoneProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const file = useMemo(
        () => (files.length > 0 ? files[0] : undefined),
        [files]
    );
    const previewImages = files.map((file) => URL.createObjectURL(file));
    const [previewVideo, setPreviewVideo] = useState<string | undefined>();

    const dropzoneRef = useRef<HTMLDivElement | null>(null);
    const { classes } = useStyles();

    const focusDropzone = () => dropzoneRef.current?.focus();

    const readVideo = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const result = e.target?.result;
            if (result) setPreviewVideo(result.toString());
        };
    };
    const handleOnDrop = (files: File[]) => {
        const file = files[0];
        if (fileLabel === "Video") {
            readVideo(file);
        }
        const formData = new FormData();
        formData.append(name, files[0]);
        onDrop?.(formData);
        setFiles(files);
    };
    const getPlaceHolderImage = () => {
        if (previewImages.length > 0) return previewImages[0];
        if (fileType) return FILE_PLACEHOLDER_IMAGES[fileType];
        return "/service-details/file-upload.svg";
    };
    return (
        <div onClick={focusDropzone} className={classes.dropzoneContainer}>
            {previewVideo ? (
                <video width="100%" height="100%" controls>
                    <source id="video-source" src={previewVideo} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <Image
                    src={getPlaceHolderImage()}
                    width={previewImageWidth ?? "100%"}
                    height={previewImageHeight ?? "100%"}
                    alt="file-upload"
                    objectFit="cover"
                />
            )}
            <Dropzone
                onDrop={handleOnDrop}
                ref={dropzoneRef}
                className={classes.dropzone}
                {...rest}
            >
                <Highlight
                    size="sm"
                    highlightColor="blue"
                    highlight="Browse"
                    highlightStyles={() => ({
                        backgroundImage: "#276EFD",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    })}
                >
                    {file ? file.name : `Drag or Browse ${fileLabel}`}
                </Highlight>
                <Text mt="xs" className={classes.text}>
                    {file ? file.type : label ?? "Image/Video/PDF"}
                </Text>
            </Dropzone>
            {file && (
                <Text className={classes.text}>
                    Current size : {`${file.size / 1000} kb`}
                </Text>
            )}
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
});
