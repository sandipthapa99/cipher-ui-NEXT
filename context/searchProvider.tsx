import type { ReactNode } from "react";
import { useState } from "react";

import { searchContext } from "./searchContext";
interface Props {
    children: ReactNode;
}

const SearchProvider = ({ children }: Props) => {
    const [state, setState] = useState("");
    const value = {
        state,
        setState,
    };
    return (
        <searchContext.Provider value={value}>
            {children}
        </searchContext.Provider>
    );
};
export default SearchProvider;
