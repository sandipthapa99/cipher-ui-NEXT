export type DropdownSubMenu = {
    id: number;
    name: string;
    level: number;
    slug: string;
    icon: string;
    task_count: number;
    child: any[];
}[];
