import { createStyles, Input, Select } from "@mantine/core";

export enum SearchScope {
    SERVICE = "Service",
    TALENT = "Talent",
    ALL = "All",
}

export interface SearchProps {
    query?: string;
    scope?: SearchScope;
}
export const Search = ({ query, scope }: SearchProps) => {
    const { classes } = useStyles();
    return (
        <div className={classes.root}>
            <Select
                className={classes.select}
                data={[
                    { value: "All", label: "All" },
                    { value: "All", label: "All" },
                ]}
            />
            <Input className={classes.input} />
        </div>
    );
};
const useStyles = createStyles(() => ({
    root: {
        display: "flex",
    },
    select: {},
    input: {
        flex: 1,
    },
}));
