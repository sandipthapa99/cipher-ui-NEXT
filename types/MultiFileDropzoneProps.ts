import type { PostTaskPayload } from "@components/Task/PostTaskModal";
import type { FormikProps } from "formik";
import type { CSSProperties, ReactNode } from "react";

export interface MultiFileDropzoneProps {
    name: string;
    labelName?: ReactNode;
    textMuted?: ReactNode;
    accept?: string[];
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    imagePreview?: string;
    error?: string;
    touch?: boolean;
    style?: CSSProperties;
    displayView?: "grid" | "list";
    showFileDetail?: boolean;
    withCloseButton?: boolean;
}

export interface MultiFileDropzoneDuplicateProps
    extends MultiFileDropzoneProps {
    formik: FormikProps<PostTaskPayload>;
}
