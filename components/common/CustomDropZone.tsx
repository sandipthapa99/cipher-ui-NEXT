import { createStyles, Highlight, Text } from "@mantine/core";
import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import { useRef, useState } from "react";

interface CustomDropZoneProps extends Omit<DropzoneProps, "children"> {
    label?: string;
    image?: string;
    maxSize?: number;
    minSize?: number;
    previewImageWidth?: number;
    previewImageHeight?: number;
}

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
export const CustomDropZone = ({
    label,
    image,
    maxSize,
    minSize,
    previewImageWidth,
    previewImageHeight,
    onDrop,
    ...rest
}: CustomDropZoneProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const previewImages = files.map((file) => URL.createObjectURL(file));

    const dropzoneRef = useRef<HTMLDivElement | null>(null);
    const { classes } = useStyles();

    const focusDropzone = () => dropzoneRef.current?.focus();

    const handleOnDrop = (files: File[]) => {
        setFiles(files);
        onDrop(files);
    };
    return (
        <>
            <div onClick={focusDropzone} className={classes.dropzoneContainer}>
                <Image
                    src={previewImages[0] ?? "/service-details/file-upload.svg"}
                    width={previewImageWidth ?? 80}
                    height={previewImageHeight ?? 80}
                    alt="file-upload"
                    objectFit="cover"
                />
                <Dropzone
                    onDrop={handleOnDrop}
                    ref={dropzoneRef}
                    className={classes.dropzone}
                    {...rest}
                >
                    <Highlight
                        highlightColor="blue"
                        highlight="Browse"
                        highlightStyles={() => ({
                            backgroundImage: "#276EFD",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        })}
                    >
                        Drag or Browse
                    </Highlight>
                    <Text mt="xs" className={classes.text}>
                        {label ?? "Image/Video"}
                    </Text>
                </Dropzone>
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
        </>
    );
};
