import {
    faCircleArrowUp,
    faTrashCan,
    faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Highlight, Text } from "@mantine/core";
import {
    ActionIcon,
    Box,
    Group,
    Image as MantineImage,
    useMantineTheme,
} from "@mantine/core";
import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import type { FieldProps } from "formik";
import { Field } from "formik";
import Image from "next/image";
import type { MultiFileDropzoneProps } from "types/MultiFileDropzoneProps";
import { formatBytes } from "utils/formatBytes";

interface CustomDropZoneProps
    extends Omit<DropzoneProps, "children" | "onDrop"> {
    maxSize?: number;
    minSize?: number;
    previewImageWidth?: number;
    previewImageHeight?: number;
    type: string;
    editImage?: string;
}
const MultiImageDropzone = ({
    name,
    maxSize,
    minSize,
    accept = ["image/jpg", "image/png", "image/jpeg"],
    multiple = false,
    //   maxSize = 1,
    editImage,
    imagePreview,
    error,
    type,
    style,
    maxFiles,
    imageDisplay = "grid",
    showFileDetail = false,
    ...restProps
}: MultiFileDropzoneProps & CustomDropZoneProps & Partial<DropzoneProps>) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <Field name={name}>
            {({ form }: FieldProps) => {
                const imageFile =
                    imagePreview &&
                    form.values[imagePreview]?.map((val: any) => {
                        return {
                            name: showFileDetail && val?.file?.name,
                            size:
                                showFileDetail && formatBytes(val?.file?.size),
                            src: val?.src,
                        };
                    });

                const isPreviewImage =
                    imagePreview && form.values[imagePreview]?.length;

                return (
                    <>
                        <Box
                            style={{ marginBottom: 20, ...style }}
                            className={classes.dropzoneContainer}
                        >
                            {isPreviewImage > 0 ? (
                                multiple &&
                                imageDisplay === "grid" && (
                                    <Group position="left" spacing={13} mb={20}>
                                        {imageFile?.map(
                                            (val: any, index: number) => {
                                                return (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        <MantineImage
                                                            src={
                                                                editImage
                                                                    ? editImage
                                                                    : val?.src
                                                            }
                                                            width={70}
                                                            height={70}
                                                            radius="md"
                                                            alt="img"
                                                            mb={
                                                                showFileDetail &&
                                                                val?.size !==
                                                                    "NaN undefined"
                                                                    ? 20
                                                                    : 0
                                                            }
                                                            caption={
                                                                showFileDetail &&
                                                                val?.size !==
                                                                    "NaN undefined" && (
                                                                    <Text
                                                                        size={
                                                                            11
                                                                        }
                                                                        weight={
                                                                            500
                                                                        }
                                                                        color="dimmed"
                                                                    >
                                                                        {
                                                                            val?.size
                                                                        }
                                                                    </Text>
                                                                )
                                                            }
                                                            styles={{
                                                                imageWrapper: {
                                                                    background:
                                                                        theme
                                                                            .colors
                                                                            .gray[2],
                                                                    borderRadius:
                                                                        theme
                                                                            .radius
                                                                            .md,
                                                                },
                                                                image: {
                                                                    padding: 0,
                                                                },
                                                                caption: {
                                                                    marginTop: 5,
                                                                },
                                                            }}
                                                        />

                                                        <ActionIcon
                                                            variant="light"
                                                            color="dark"
                                                            radius="xl"
                                                            size="xs"
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                top: -7,
                                                                right: -6,
                                                                zIndex: 1,
                                                            }}
                                                            onClick={() => {
                                                                form.setFieldValue(
                                                                    name,
                                                                    form.values[
                                                                        name
                                                                    ]?.filter(
                                                                        (
                                                                            _: any,
                                                                            key: number
                                                                        ) =>
                                                                            key !==
                                                                            Number(
                                                                                index
                                                                            )
                                                                    )
                                                                );
                                                                imagePreview &&
                                                                    form.setFieldValue(
                                                                        imagePreview,
                                                                        form.values[
                                                                            imagePreview
                                                                        ]?.filter(
                                                                            (
                                                                                _: any,
                                                                                key: number
                                                                            ) =>
                                                                                key !==
                                                                                Number(
                                                                                    index
                                                                                )
                                                                        )
                                                                    );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faXmark}
                                                                fontSize={14}
                                                            />
                                                        </ActionIcon>
                                                    </Box>
                                                );
                                            }
                                        )}
                                    </Group>
                                )
                            ) : (
                                <Image
                                    src="/service-details/file-upload.svg"
                                    width={80}
                                    height={80}
                                    alt="file-upload"
                                    objectFit="cover"
                                />
                            )}
                            {isPreviewImage > 0 &&
                                multiple &&
                                imageDisplay === "list" && (
                                    <Box mb={20}>
                                        {imageFile?.map(
                                            (val: any, index: number) => {
                                                return (
                                                    <Group
                                                        key={index}
                                                        position="apart"
                                                        spacing={10}
                                                        mb={10}
                                                    >
                                                        <Group position="left">
                                                            <MantineImage
                                                                src={val?.src}
                                                                width={50}
                                                                height={50}
                                                                radius="sm"
                                                                alt="img"
                                                                styles={{
                                                                    imageWrapper:
                                                                        {
                                                                            background:
                                                                                theme
                                                                                    .colors
                                                                                    .gray[0],
                                                                            borderRadius:
                                                                                theme
                                                                                    .radius
                                                                                    .sm,
                                                                        },
                                                                    image: {
                                                                        padding: 0,
                                                                    },
                                                                }}
                                                            />
                                                            {showFileDetail &&
                                                                (val?.name ||
                                                                    val?.size !==
                                                                        "NaN undefined") && (
                                                                    <Box>
                                                                        <Text
                                                                            size={
                                                                                12
                                                                            }
                                                                            weight={
                                                                                500
                                                                            }
                                                                            mb={
                                                                                2
                                                                            }
                                                                            sx={{
                                                                                color: theme
                                                                                    .colors
                                                                                    .gray[0],
                                                                            }}
                                                                        >
                                                                            {
                                                                                val?.name
                                                                            }
                                                                        </Text>
                                                                        <Text
                                                                            size={
                                                                                11
                                                                            }
                                                                            weight={
                                                                                500
                                                                            }
                                                                            color="dimmed"
                                                                        >
                                                                            {
                                                                                val?.size
                                                                            }
                                                                        </Text>
                                                                    </Box>
                                                                )}
                                                        </Group>
                                                        <ActionIcon
                                                            variant="subtle"
                                                            color="red"
                                                            radius="xl"
                                                            size="md"
                                                            onClick={() => {
                                                                form.setFieldValue(
                                                                    name,
                                                                    form.values[
                                                                        name
                                                                    ]?.filter(
                                                                        (
                                                                            _: any,
                                                                            key: number
                                                                        ) =>
                                                                            key !==
                                                                            Number(
                                                                                index
                                                                            )
                                                                    )
                                                                );
                                                                imagePreview &&
                                                                    form.setFieldValue(
                                                                        imagePreview,
                                                                        form.values[
                                                                            imagePreview
                                                                        ]?.filter(
                                                                            (
                                                                                _: any,
                                                                                key: number
                                                                            ) =>
                                                                                key !==
                                                                                Number(
                                                                                    index
                                                                                )
                                                                        )
                                                                    );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faTrashCan
                                                                }
                                                                fontSize={14}
                                                                color={
                                                                    theme.colors
                                                                        .red[6]
                                                                }
                                                            />
                                                        </ActionIcon>
                                                    </Group>
                                                );
                                            }
                                        )}
                                    </Box>
                                )}

                            <Dropzone
                                {...restProps}
                                py={5}
                                className={classes.box}
                                styles={{
                                    root: {
                                        borderColor: `${
                                            !error
                                                ? theme.colors.gray[4]
                                                : theme.colors.red[7]
                                        }`,
                                        border: "none",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    },
                                }}
                                onDrop={(files) => {
                                    const multipleFiles = files.map(
                                        (file, index) => {
                                            const src =
                                                window.URL.createObjectURL(
                                                    file
                                                );
                                            return {
                                                file,
                                                id: index,
                                                src,
                                            };
                                        }
                                    );
                                    form.setFieldValue(name, [
                                        ...form.values.images,
                                        ...files,
                                    ]);
                                    imagePreview &&
                                        form.setFieldValue(imagePreview, [
                                            ...form.values[imagePreview],
                                            ...multipleFiles,
                                        ]);
                                }}
                                onReject={(files) => {
                                    const erroMessage = files
                                        .map((file) =>
                                            file.errors.map(
                                                (val) => val.message
                                            )
                                        )[0]
                                        .toString();
                                    form.setFieldError(name, erroMessage);
                                }}
                                //accept={accept}
                                maxSize={maxSize && 1024 * 1024 * maxSize}
                                maxFiles={maxFiles}
                                multiple={multiple}
                            >
                                <Highlight
                                    highlightColor="blue"
                                    highlight="Browse"
                                    highlightStyles={() => ({
                                        backgroundImage: "#276EFD",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        marginTop: "2rem",
                                        //    textAlign: "center",
                                    })}
                                >
                                    {"Drag or Browse"}
                                </Highlight>
                                <Text mt="xs" className={classes.text}>
                                    Image/Video
                                </Text>
                                {minSize && (
                                    <Text mt="xl" className={classes.text}>
                                        Minimum {type} size is {minSize} MB
                                    </Text>
                                )}
                                {maxSize && (
                                    <Text mt="xs" className={classes.text}>
                                        Maximum {type} size is {maxSize} MB
                                    </Text>
                                )}
                            </Dropzone>
                        </Box>
                    </>
                );
            }}
        </Field>
    );
};

export default MultiImageDropzone;
const useStyles = createStyles({
    dropzoneContainer: {
        background: "#fff",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 1rem",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        border: "2px dotted #DEE2E6",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
