import { HTMLAttributes } from "react";

export interface TaskCardProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    charge: string;
    description?: string;
    location: string;
    date: string;
    time: string;
    isCompleted?: boolean;
    isRunning?: boolean;
    startPrice?: number | string;
    endPrice?: number | string;
    currency?: string;
}
