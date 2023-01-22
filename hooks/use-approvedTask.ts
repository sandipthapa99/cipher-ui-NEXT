import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useEffect, useState } from "react";
import type { ApprovedTaskProps } from "types/approvedTaskProps";
import { axiosClient } from "utils/axiosClient";

export const useApprovedTask = (
    searchParam?: string,
    page?: number,
    myState?: string | null
) => {
    const [changePage, setChangePage] = useState<number>();
    useEffect(() => {
        setChangePage(page);
    }, [page]);
    return useQuery(
        ["approved-task", searchParam, changePage, myState],
        () =>
            axiosClient
                .get<ApprovedTaskProps>(
                    `${urls.task.approvedTaskList}?assigned_to_me=${myState}&${searchParam}&page_size=9&page=${changePage}`
                )
                .then((response) => response.data)
                .catch((error) => error && setChangePage(1)),
        { enabled: !!myState && !!changePage }
    );
};
