import type { Requirement } from "./requirement";

export interface PostTaskProps {
    title: string | undefined;
    description: string | undefined;
    highlights: string | undefined | Requirement[];
    address: string | undefined;
    category: string | undefined;
    location: "remote" | "onPremise";
    budget: string | undefined | number;
    minBudget: number | undefined;
    maxBudget: number | undefined;
    images: {
        id: number;
        media: string;
        size: number;
        name: string;
        media_type: string;
        path?: string;
    }[];
    imagePreviewUrl: {
        id: number;
        media: string;
        size: number;
        name: string;
        media_type: string;
    }[];
    videos: {
        id: number;
        media: string;
        size: number;
        name: string;
        media_type: string;
        path?: string;
    }[];
    videoPreviewUrl: {
        id: number;
        media: string;
        size: number;
        name: string;
        media_type: string;
    }[];
    date: string | null | Date;
    date_from: string | null | Date;
    date_to: string | null | Date;
}
