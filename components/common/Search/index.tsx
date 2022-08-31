import { faChevronDown, faSearch } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, Select } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { Tasker } from "hooks/tasker/use-tasker";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import { useSetSearchedTaskers, useSetSearchQuery } from "./searchStore";

export type SearchContext = "tasker.Profile";

export interface TaskerSearch {
    c_type: SearchContext;
    result: Tasker;
}

export interface SearchDashboardResponse {
    result: TaskerSearch[];
}

export interface SearchDashboardPayload {
    scope: string;
    q: string;
}
export const useSearchDashboard = () => {
    return useMutation<SearchDashboardResponse, Error, SearchDashboardPayload>(
        ({ scope, q }) =>
            axiosClient
                .get<SearchDashboardResponse>(
                    `/search/dashboard?scope=${scope}&q=${q}`
                )
                .then((response) => response.data)
    );
};
const searchData = [
    { label: "All", value: "all" },
    { label: "Service", value: "service" },
    { label: "Talent", value: "talent" },
];
export const Search = () => {
    const router = useRouter();
    const setSearchedTaskers = useSetSearchedTaskers();
    const setSearchQuery = useSetSearchQuery();
    const { classes } = useStyles();
    const { mutate } = useSearchDashboard();
    const { getFieldProps, handleSubmit } = useFormik({
        initialValues: {
            scope: "",
            q: "",
        },
        onSubmit: (values) => {
            mutate(values, {
                onSuccess: (data) => {
                    if (data.result[0].c_type === "tasker.Profile") {
                        const taskers = data.result
                            .filter((item) => item.c_type === "tasker.Profile")
                            .map((result) => result.result);
                        setSearchedTaskers(taskers);
                        setSearchQuery({
                            context: "tasker.Profile",
                            query: values.q,
                        });
                        router.push({
                            pathname: "/tasker",
                        });
                    }
                },
            });
        },
    });
    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <div className="search_box">
                    <Select
                        placeholder="All"
                        variant="unstyled"
                        className={classes.selectField}
                        data={searchData}
                        rightSection={<FontAwesomeIcon icon={faChevronDown} />}
                    />
                    <div className="search_field">
                        <input
                            type="text"
                            className="input"
                            placeholder="Find your services"
                            {...getFieldProps("q")}
                        />
                    </div>
                    <Button className="search-btn" type="submit">
                        <FontAwesomeIcon icon={faSearch} className="icon" />
                    </Button>
                </div>
            </form>
        </div>
    );
};
export const useStyles = createStyles(() => ({
    selectField: {
        maxWidth: "12rem",
        marginLeft: "1rem",
    },
}));
