import {
    faCircleArrowUp,
    faTrashCan,
    faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ActionIcon,
    Box,
    Group,
    Image,
    Text,
    useMantineTheme,
} from "@mantine/core";
import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import type { FieldProps } from "formik";
import { Field } from "formik";
import type { MultiFileDropzoneProps } from "types/MultiFileDropzoneProps";
import { formatBytes } from "utils/formatBytes";

const MultiFileDropzone = ({
    name,
    labelName,
    textMuted,
    accept = ["image/png", "image/jpeg", "image/jpg"],
    multiple = false,
    maxSize = 1,
    imagePreview,
    error,
    touch,
    style,
    maxFiles,
    imageDisplay = "grid",
    showFileDetail = false,
    ...restProps
}: MultiFileDropzoneProps & Partial<DropzoneProps>) => {
    const theme = useMantineTheme();
    console.log("images are", name);
    const errTouch = error && touch ? error : null;
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
                console.log("files are ----->", imageFile);

                const isPreviewImage =
                    imagePreview && form.values[imagePreview]?.length;

                return (
                    <>
                        {labelName && (
                            <Text
                                component="label"
                                sx={{ fontWeight: 500 }}
                                mb={10}
                            >
                                {labelName}
                            </Text>
                        )}
                        {textMuted && (
                            <Text
                                size="xs"
                                component="div"
                                mb={10}
                                color={`${theme.colors.gray[6]}`}
                            >
                                {textMuted}
                            </Text>
                        )}
                        <Box style={{ marginBottom: 20, ...style }}>
                            <Dropzone
                                {...restProps}
                                py={5}
                                styles={{
                                    root: {
                                        borderColor: `${
                                            !error
                                                ? theme.colors.gray[4]
                                                : theme.colors.red[7]
                                        }`,
                                    },
                                }}
                                onDrop={(files) => {
                                    console.log("files are", files);
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
                                accept={accept}
                                maxSize={maxSize && 1024 * 1024 * maxSize}
                                maxFiles={maxFiles}
                                multiple={multiple}
                            >
                                <Group
                                    position="center"
                                    spacing="xl"
                                    style={{
                                        minHeight: 40,
                                        pointerEvents: "none",
                                    }}
                                >
                                    <Dropzone.Accept>
                                        <Group
                                            position="center"
                                            spacing={10}
                                            style={{
                                                minHeight: 40,
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleArrowUp}
                                                fontSize={18}
                                                color={theme.colors.blue[6]}
                                            />
                                            <Text>
                                                Drop files or click here to
                                                upload
                                            </Text>
                                        </Group>
                                    </Dropzone.Accept>
                                    <Dropzone.Reject>
                                        <Group
                                            position="center"
                                            spacing={10}
                                            style={{
                                                minHeight: 40,
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                fontSize={18}
                                                color={theme.colors.red[6]}
                                            />
                                            <Text>Unsupported file format</Text>
                                        </Group>
                                    </Dropzone.Reject>
                                    <Dropzone.Idle>
                                        <Group
                                            position="center"
                                            spacing={10}
                                            style={{
                                                minHeight: 40,
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleArrowUp}
                                                fontSize={18}
                                                color={theme.colors.blue[6]}
                                            />
                                            <Text color={theme.colors.dark[9]}>
                                                Drop files or click here to
                                                upload
                                            </Text>
                                        </Group>
                                    </Dropzone.Idle>
                                </Group>
                            </Dropzone>
                            {errTouch && (
                                <Text
                                    size="sm"
                                    component="div"
                                    weight={500}
                                    mt={4}
                                    color="red"
                                    sx={{ fontSize: 13 }}
                                >
                                    {error}
                                </Text>
                            )}
                        </Box>
                        {isPreviewImage > 0 &&
                            multiple &&
                            imageDisplay === "grid" && (
                                <Group position="left" spacing={13} mb={20}>
                                    {imageFile?.map(
                                        (val: any, index: number) => {
                                            return (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Image
                                                        src={val?.src}
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
                                                                    size={11}
                                                                    weight={500}
                                                                    color="dimmed"
                                                                >
                                                                    {val?.size}
                                                                </Text>
                                                            )
                                                        }
                                                        styles={{
                                                            imageWrapper: {
                                                                background:
                                                                    theme.colors
                                                                        .gray[2],
                                                                borderRadius:
                                                                    theme.radius
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
                                                        <Image
                                                            src={val?.src}
                                                            width={50}
                                                            height={50}
                                                            radius="sm"
                                                            alt="img"
                                                            styles={{
                                                                imageWrapper: {
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
                                                                        mb={2}
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
                                                            icon={faTrashCan}
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
                    </>
                );
            }}
        </Field>
    );
};

export default MultiFileDropzone;
