import { ReactNode } from "react";

export interface MetaDataProps {
    title?: string;
    description?: string;
    ogImage?: string;
    ogUrl?: string;
    keywords?: string;
    children: ReactNode;
}
