import type { HTMLAttributes } from "react";

export interface RecommendedTaskCardProps
    extends HTMLAttributes<HTMLDivElement> {
    title: string;
    charge?: number;
    description?: string;
    location: string;
    start_date: string;
    start_time: string;
    currency: string;
    id: string;
    status: string;
}
