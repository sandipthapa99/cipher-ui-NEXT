/* eslint-disable @typescript-eslint/no-var-requires */
import type { RichTextEditorProps } from "@mantine/rte";

export const RichText = (props: RichTextEditorProps) => {
    if (typeof window !== "undefined") {
        const { RichTextEditor } = require("@mantine/rte");
        return (
            <RichTextEditor
                sx={{ minHeight: "250px" }}
                {...props}
                // sticky={false}
                stickyOffset={-50}
            />
        );
    }
    return null;
};
