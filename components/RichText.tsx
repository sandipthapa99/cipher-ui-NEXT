/* eslint-disable @typescript-eslint/no-var-requires */
import { Text } from "@mantine/core";
import type { RichTextEditorProps } from "@mantine/rte";
import { Field } from "formik";

export const RichText = ({
    error,
    touched,
    labelName,
    withAsterisk,
    name,
    ...props
}: {
    error: string;
    touched: boolean;
    labelName?: string;
    withAsterisk?: boolean;
    name: string;
} & RichTextEditorProps) => {
    const errTouch = error && touched ? error : null;

    if (typeof window !== "undefined") {
        const { RichTextEditor } = require("@mantine/rte");
        return (
            <>
                {labelName && (
                    <Text
                        component="label"
                        weight={500}
                        mb={4}
                        sx={{ display: "inline-block" }}
                    >
                        {labelName}{" "}
                        {withAsterisk && (
                            <Text component="span" color="red">
                                *
                            </Text>
                        )}
                    </Text>
                )}
                <Field name={name}>
                    {() => (
                        <RichTextEditor
                            styles={{
                                root: {
                                    ".ql-editor": {
                                        overflowY: "auto",
                                        height: `250px`,
                                    },
                                    borderColor: `${
                                        !errTouch ? "#D8D8D8" : "#FE5050"
                                    }`,
                                },
                            }}
                            {...props}
                            // sticky={false}
                            stickyOffset={-50}
                        />
                    )}
                </Field>
                {errTouch && (
                    <Text
                        size="sm"
                        component="label"
                        weight={500}
                        mt={4}
                        color="red"
                        sx={{ display: "inline-block", fontSize: 13 }}
                    >
                        {error}
                    </Text>
                )}
            </>
        );
    }
    return null;
};
