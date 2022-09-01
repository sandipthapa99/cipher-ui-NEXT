import {
    faChevronDown,
    faSearch,
    faWarning,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, createStyles, Select } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { Tasker } from "hooks/tasker/use-tasker";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import {
    useSetSearchedServices,
    useSetSearchedTaskers,
    useSetSearchQuery,
} from "./searchStore";

export type SearchContext = "tasker.Profile" | "task.Service";
export enum SearchScope {
    ALL = "all",
    TALENT = "talent",
    SERVICE = "service",
}
export interface SearchApiResponse {
    result: Array<{ c_type: SearchContext; result: any }>;
}
export interface SearchDashboardResult {
    taskers: Tasker[];
    services: any[];
}

export interface SearchDashboardPayload {
    scope: SearchScope;
    q: string;
}
export const useSearchDashboard = () => {
    return useMutation<SearchDashboardResult, Error, SearchDashboardPayload>(
        async ({ scope, q }) => {
            const { data } = await axiosClient.get<SearchApiResponse>(
                `/search/dashboard?scope=${scope}&q=${q}`
            );
            const taskers = data.result
                .filter((item) => item.c_type === "tasker.Profile")
                .map((item) => item.result) as Tasker[];
            const services = data.result
                .filter((item) => item.c_type === "task.Service")
                .map((item) => item.result);
            return { taskers, services };
            // return data.result;
        }
    );
};
const searchData = [
    { label: "All", value: "all" },
    { label: "Service", value: "service" },
    { label: "Talent", value: "talent" },
];
export const Search = () => {
    const [searchError, setSearchError] = useState<string | undefined>();
    const router = useRouter();
    const setSearchedTaskers = useSetSearchedTaskers();
    const setSearchQuery = useSetSearchQuery();
    const setSearchedServices = useSetSearchedServices();
    const { classes } = useStyles();
    const { mutate } = useSearchDashboard();
    const { getFieldProps, handleSubmit, values, setFieldValue } = useFormik<{
        scope: SearchScope;
        q: string;
    }>({
        initialValues: {
            scope: SearchScope.ALL,
            q: "",
        },
        onSubmit: (values) => {
            mutate(values, {
                onSuccess: ({ services, taskers }) => {
                    if (services.length === 0 && taskers.length === 0) {
                        setSearchError(
                            `No search result's found for ${values.q}`
                        );
                    }
                    if (services.length > 0 && taskers.length > 0) {
                        console.log(
                            "TODO: REDIRECT TO SEARCH TASK AND SERVICE PAGE"
                        );
                        return;
                    }
                    if (taskers.length > 0) {
                        setSearchedTaskers(taskers);
                        setSearchQuery({
                            context: "tasker.Profile",
                            query: values.q,
                        });
                        router.push("/tasker");
                        return;
                    }
                    if (services.length > 0) {
                        setSearchQuery({
                            context: "task.Service",
                            query: values.q,
                        });
                        setSearchedServices(services);
                        router.push({ pathname: "/service" });
                    }
                },
            });
        },
    });
    return (
        <>
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className="search_box">
                        <Select
                            value={values.scope}
                            placeholder="All"
                            variant="unstyled"
                            className={classes.selectField}
                            data={searchData}
                            rightSection={
                                <FontAwesomeIcon icon={faChevronDown} />
                            }
                            onChange={(value) => setFieldValue("scope", value)}
                        />
                        <div className="search_field">
                            <input
                                type="text"
                                className="input"
                                placeholder={
                                    values.scope === SearchScope.ALL
                                        ? "Find anything"
                                        : `Find your ${values.scope}`
                                }
                                {...getFieldProps("q")}
                            />
                        </div>
                        <Button className="search-btn" type="submit">
                            <FontAwesomeIcon icon={faSearch} className="icon" />
                        </Button>
                    </div>
                </form>
            </div>
            {searchError && (
                <Alert
                    title="Search failed"
                    icon={<FontAwesomeIcon icon={faWarning} />}
                    color="red"
                    withCloseButton
                    closeButtonLabel="Close"
                    onClose={() => setSearchError(undefined)}
                    sx={{ marginBottom: "2rem" }}
                >
                    {searchError}
                </Alert>
            )}
        </>
    );
};
export const useStyles = createStyles(() => ({
    selectField: {
        maxWidth: "12rem",
        marginLeft: "1rem",
    },
}));