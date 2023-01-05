import {
    faArrowUpFromArc,
    faImage,
    faTrashCan,
    faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, BackgroundImage, Box, Group, Text } from "@mantine/core";
import type { DropzoneProps } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import type { FieldProps } from "formik";
import { Field } from "formik";
import type { FileDropzoneProps } from "types/FileDropzoneProps";

const FileDropzone = ({
    name,
    accept,
    maxSize,
    imagePreview,
    error,
    fieldRequired,
    touch,
    onBlur,
    labelName,
    style,
    ...restProps
}: FileDropzoneProps & Partial<DropzoneProps>) => {
    const errTouch = error && touch ? error : null;

    return (
        <>
            {labelName && (
                <Text size={16} mb={2}>
                    {labelName}{" "}
                    {fieldRequired && <span className="asterisk">*</span>}
                </Text>
            )}
            <Field name={name}>
                {({ form }: FieldProps) => {
                    const imageSrc =
                        imagePreview &&
                        form.values[imagePreview]?.map((val: any) => val?.src);
                    const isPreviewImage =
                        imagePreview && form.values[imagePreview]?.length;

                    return isPreviewImage ? (
                        <Box
                            sx={{
                                border: `2px dashed #CED4DA`,
                                borderRadius: 10,
                                marginBottom: `${isPreviewImage ? 20 : null}px`,
                            }}
                        >
                            {imageSrc?.map((val: any, index: number) => (
                                <BackgroundImage
                                    key={index}
                                    src={val}
                                    radius="sm"
                                >
                                    <Group
                                        position="right"
                                        p="md"
                                        style={{ minHeight: 196 }}
                                    >
                                        <ActionIcon
                                            variant="filled"
                                            color="red"
                                            radius="xl"
                                            size="lg"
                                            onClick={() => {
                                                form.setFieldValue(name, []);
                                                imagePreview &&
                                                    form.setFieldValue(
                                                        imagePreview,
                                                        []
                                                    );
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                fontSize={18}
                                            />
                                        </ActionIcon>
                                    </Group>
                                </BackgroundImage>
                            ))}
                        </Box>
                    ) : (
                        <Box style={style}>
                            <Dropzone
                                {...restProps}
                                onBlur={onBlur}
                                styles={{
                                    root: {
                                        borderColor: `${
                                            !errTouch ? `#CED4DA` : `#FE5050`
                                        }`,
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
                                    form.setFieldValue(name, files);
                                    imagePreview &&
                                        form.setFieldValue(
                                            imagePreview,
                                            multipleFiles
                                        );
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
                                maxSize={maxSize}
                                accept={accept}
                            >
                                <Group
                                    position="center"
                                    spacing="xl"
                                    style={{
                                        minHeight: 160,
                                        pointerEvents: "none",
                                    }}
                                >
                                    <Dropzone.Accept>
                                        <Group
                                            position="center"
                                            style={{
                                                minHeight: 160,
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowUpFromArc}
                                                fontSize={22}
                                            />
                                            <div>
                                                <Text size="sm" inline>
                                                    Drop files or click here to
                                                    upload
                                                </Text>
                                                <Text
                                                    size="xs"
                                                    color="dimmed"
                                                    inline
                                                    mt={7}
                                                >
                                                    Max file size: 2MB
                                                </Text>
                                            </div>
                                        </Group>
                                    </Dropzone.Accept>
                                    <Dropzone.Reject>
                                        <Group
                                            position="center"
                                            style={{
                                                minHeight: 160,
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                fontSize={22}
                                            />
                                            <Text size="sm" inline>
                                                Unsupported file format
                                            </Text>
                                        </Group>
                                    </Dropzone.Reject>
                                    <Dropzone.Idle>
                                        <Group
                                            position="center"
                                            style={{
                                                minHeight: 160,
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faImage}
                                                fontSize={22}
                                                color={`#CED4DA`}
                                            />
                                            <div>
                                                <Text
                                                    size="sm"
                                                    inline
                                                    color={`#CED4DA`}
                                                >
                                                    Drop files or click here to
                                                    upload
                                                </Text>
                                                <Text
                                                    size="xs"
                                                    color="dimmed"
                                                    inline
                                                    mt={7}
                                                >
                                                    Max file size: 2MB
                                                </Text>
                                            </div>
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
                    );
                }}
            </Field>
        </>
    );
};

export default FileDropzone;
