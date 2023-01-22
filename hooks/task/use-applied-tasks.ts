import { useQuery } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export const useAppliedTasks = () => {
    const { data: user, isLoading } = useUser();
    return useQuery(
        ["applied-tasks"],
        () =>
            axiosClient
                .get<AppliedTaskApiResponse>("/task/application")
                .then((res) => res.data.result),
        { initialData: [], enabled: !isLoading && !!user }
    );
};
export interface AppliedTaskApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: AppliedTask[];
}

export interface AppliedTask {
    id: number;
    task: string;
    user: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    status: string;
    is_active: boolean;
    remarks: string;
    charge: number;
    pre_requisites: string;
    contract: any;
}
