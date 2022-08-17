import type { Requirement } from "./requirement";

export interface PostTaskProps {
    title: string;
    taskDescription: string;
    requirements: Requirement[];
    address: string;
    category: string;
    task_type: "remote" | "onPremise";
    budget?: string;
    minBudget?: number;
    maxBudget?: number;
    image: File | null | undefined;
    video: File | null | undefined;
    date: string | null;
    date_from: string | null;
    date_to: string | null;
}
