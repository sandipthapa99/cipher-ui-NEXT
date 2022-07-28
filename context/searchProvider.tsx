import { searchContext } from "./searchContext";
import { ReactNode, useState } from "react";
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
