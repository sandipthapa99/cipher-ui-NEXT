import { Requirement } from "./requirement";

export interface PostTaskData {
    title:string,
    titleDescription :string,
    category:string,
    subcategory: string,
    dateTime: string,
    estimatedHour: number,
    budgetType: 'range' | 'fixed'  ,
    fixedValue?:number,
    minBudget:number,
    maxBudget:number,
    address: string,
    requirements : Requirement[],
    image?:File | null





}