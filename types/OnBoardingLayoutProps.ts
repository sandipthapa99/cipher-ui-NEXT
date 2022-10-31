import type { ReactNode } from "react";

export interface OnBoardingLayoutProps {
    topLeftText?: string;
    topRightText?: string;
    welcomeText?: string;
    headerText?: string;
    redirectionLink?: any;
    currentPage?: string;
    mainImg: string;
    children: ReactNode;
    title?: string;
    description?: string;
    ogImage?: string;
    ogUrl?: string;
    keywords?: string;
}
