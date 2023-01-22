import { Alert, createStyles, LoadingOverlay, Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ErrorOutlineOutlined, SearchOutlined } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import type { IService } from "types/service";
import type { ITask } from "types/task";
import type { ITasker } from "types/tasker";
import { axiosClient } from "utils/axiosClient";

import {
    useSetSearchedServices,
    useSetSearchedTaskers,
    useSetSearchQuery,
} from "./searchStore";

export type SearchContext = "all" | "tasker.Profile" | "task.EntityService";
export enum SearchScope {
    ALL = "all",
    TALENT = "talent",
    SERVICE = "service",
}
export interface SearchApiResponse {
    result: Array<{ c_type: SearchContext; result: any }>;
}
export interface SearchDashboardResult {
    taskers: ITasker[];
    services: IService[];
    tasks: ITask[];
}

export interface SearchDashboardPayload {
    scope: SearchScope;
    q: string;
}
export const useSearchDashboard = () => {
    return useMutation<
        SearchDashboardResult,
        AxiosError,
        SearchDashboardPayload
    >(async ({ scope, q }) => {
        const { data } = await axiosClient.get<SearchApiResponse>(
            `/search/dashboard?scope=${scope}&q=${q}`
        );
        const taskers = data.result
            .filter((item) => item.c_type === "tasker.Profile")
            .map((item) => item.result) as ITasker[];
        const services = data.result
            .filter(
                (item) =>
                    item.c_type === "task.EntityService" &&
                    !item?.result?.is_requested
            )
            .map((item) => item.result) as IService[];
        const tasks = data.result
            .filter(
                (item) =>
                    item.c_type === "task.EntityService" &&
                    item?.result?.is_requested
            )
            .map((item) => item.result) as ITask[];

        console.log("tasks:", tasks);
        return { taskers, services, tasks };
        // return data.result;
    });
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
    const { mutate, isLoading } = useSearchDashboard();
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
                onSuccess: ({ services, taskers, tasks }) => {
                    if (
                        services.length === 0 &&
                        taskers.length === 0 &&
                        tasks.length === 0
                    ) {
                        setSearchError(
                            `No search result's found for ${values.q}`
                        );
                    } else if (
                        taskers.length > 0 &&
                        services.length <= 0 &&
                        tasks.length <= 0
                    ) {
                        setSearchedTaskers(taskers);

                        setSearchQuery({
                            context: "tasker.Profile",
                            query: values.q,
                        });
                        router.push("/tasker");
                        return;
                    } else if (
                        taskers.length <= 0 &&
                        services.length > 0 &&
                        tasks.length <= 0
                    ) {
                        setSearchedServices(services);

                        setSearchQuery({
                            context: "task.EntityService",
                            query: values.q,
                        });
                        router.push({ pathname: "/service" });
                    } else if (
                        taskers.length <= 0 &&
                        services.length <= 0 &&
                        tasks.length > 0
                    ) {
                        setSearchedServices(services);

                        setSearchQuery({
                            context: "task.EntityService",
                            query: values.q,
                        });
                        router.push({ pathname: "/task" });
                    } else {
                        setSearchedTaskers(taskers);
                        setSearchedServices(services);
                        setSearchQuery({
                            context: "all",
                            query: values.q,
                        });
                        router.push(`/search?search=${values.q}`);
                        return;
                    }
                },
                onError: (error: any) => {
                    const errorList = Object.values(error?.response?.data);
                    const errorMessage = errorList.join("\n");
                    setSearchError(errorMessage);
                },
            });
        },
    });
    return (
        <>
            <LoadingOverlay
                visible={isLoading}
                className={classes.loadingOverlay}
                overlayBlur={2}
            />
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className="search_box">
                        <Select
                            value={values.scope}
                            placeholder="All"
                            variant="unstyled"
                            className={classes.selectField}
                            data={searchData}
                            // rightSection={<AngleDown />}
                            onChange={(value) => setFieldValue("scope", value)}
                            // styles={{ dropdown: { marginLeft: `${-1}rem` } }}
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
                            <SearchOutlined className="icon" />
                        </Button>
                    </div>
                </form>
            </div>
            {searchError && (
                <Alert
                    title="Search failed"
                    icon={<ErrorOutlineOutlined />}
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
        maxWidth: useMediaQuery("(max-width:572px)") ? "10rem" : "12rem",
        marginLeft: "1rem",
        textAlign: "center",
    },
    loadingOverlay: {
        position: "fixed",
        inset: 0,
    },
}));
