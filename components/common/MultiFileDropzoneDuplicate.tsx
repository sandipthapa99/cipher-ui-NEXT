import { faCircleArrowUp, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import * as _ from "lodash";
import type { MultiFileDropzoneDuplicateProps } from "types/MultiFileDropzoneProps";
import { FileTypeGrid } from "utils/fileType";
import { formatBytes } from "utils/formatBytes";

const MultiFileDropzoneDuplicate = ({
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
    displayView = "grid",
    showFileDetail = false,
    withCloseButton = true,
    formik,
    ...restProps
}: MultiFileDropzoneDuplicateProps & Partial<DropzoneProps>) => {
    const errTouch = error && touch ? error : null;
    const imageFile =
        formik.values["imagePreviewUrl"] &&
        formik.values["imagePreviewUrl"]?.map((val: any) => {
            return {
                name: showFileDetail && val?.file?.name,
                size: showFileDetail && formatBytes(val?.file?.size),
                src: val?.src,
                type: _.last(val?.file?.type.split("/")),
            };
        });
    const isPreviewImage =
        formik.values["imagePreviewUrl"] &&
        formik.values["imagePreviewUrl"]?.length;
    return (
        <>
            {labelName && (
                <Text component="label" sx={{ fontWeight: 500 }} mb={10}>
                    {labelName}
                </Text>
            )}
            {textMuted && (
                <Text size="xs" component="div" mb={10} color={`#868E96`}>
                    {textMuted}
                </Text>
            )}
            <Box style={{ marginBottom: 20, ...style }}>
                {isPreviewImage > 0 && multiple && displayView === "grid" && (
                    <Group position="left" spacing={13} mb={20}>
                        {imageFile?.map((val: any, index: number) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        position: "relative",
                                    }}
                                >
                                    <FileTypeGrid
                                        type={val?.type}
                                        filePath={val?.src}
                                        fileSize={val?.size}
                                        showFileDetail={showFileDetail}
                                        fileName={val?.name}
                                    />
                                    {withCloseButton && (
                                        <ActionIcon
                                            variant="light"
                                            color="dark"
                                            radius="xl"
                                            size="xs"
                                            sx={{
                                                position: "absolute",
                                                top: -7,
                                                right: -6,
                                                zIndex: 1,
                                            }}
                                            onClick={() => {
                                                formik.setFieldValue(
                                                    name,
                                                    formik.values[
                                                        "images"
                                                    ]?.filter(
                                                        (_: any, key: number) =>
                                                            key !==
                                                            Number(index)
                                                    )
                                                );
                                                imagePreview &&
                                                    formik.setFieldValue(
                                                        imagePreview,
                                                        formik.values[
                                                            "imagePreviewUrl"
                                                        ]?.filter(
                                                            (
                                                                _: any,
                                                                key: number
                                                            ) =>
                                                                key !==
                                                                Number(index)
                                                        )
                                                    );
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                fontSize={14}
                                            />
                                        </ActionIcon>
                                    )}
                                </Box>
                            );
                        })}
                    </Group>
                )}

                <Dropzone
                    {...restProps}
                    py={5}
                    styles={{
                        root: {
                            borderColor: `${!error ? "#D8D8D8" : "#FE5050"}`,
                        },
                    }}
                    onDrop={(files) => {
                        const multipleFiles = files.map((file, index) => {
                            const src = window.URL.createObjectURL(file);
                            return {
                                file,
                                id: index,
                                src,
                            };
                        });
                        formik.setFieldValue(name, [
                            ...formik.values["images"],
                            ...files,
                        ]);
                        imagePreview &&
                            formik.setFieldValue(imagePreview, [
                                ...formik.values["imagePreviewUrl"],
                                ...multipleFiles,
                            ]);
                    }}
                    onReject={(files) => {
                        const erroMessage = files
                            .map((file) =>
                                file.errors.map((val) => val.message)
                            )[0]
                            .toString();
                        formik.setFieldError(name, erroMessage);
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
                                    color={"#3EAEFF"}
                                />
                                <Text>Drop files or click here to upload</Text>
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
                                    color={"#FE5050"}
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
                                    color={"#3EAEFF"}
                                />
                                <Text color={"#343A40"}>
                                    Drop files or click here to upload
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
        </>
    );
};

export default MultiFileDropzoneDuplicate;
