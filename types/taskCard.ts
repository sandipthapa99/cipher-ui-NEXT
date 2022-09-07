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

export interface TaskCardProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    charge?: string;
    budget_type?: string;
    description?: string;
    location: string;
    date: string;
    time: string;
    isCompleted?: boolean;
    isRunning?: boolean;
    startPrice?: number | string;
    endPrice?: number | string;
    currency?: string;
    taskId?: string;
}
