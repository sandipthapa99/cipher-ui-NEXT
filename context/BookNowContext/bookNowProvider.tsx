import type { ReactNode } from "react";
import { useState } from "react";
import type { BookNowDetails } from "types/serviceNearYouCard";

import { bookNowContext } from "./bookNowContext";
interface Props {
    children: ReactNode;
}

const BookNowProvider = ({ children }: Props) => {
    const [bookNowDetails, setBookNowDetails] = useState({} as BookNowDetails);

    const value = {
        bookNowDetails,
        setBookNowDetails,
    };
    return (
        <bookNowContext.Provider value={value}>
            {children}
        </bookNowContext.Provider>
    );
};
export default BookNowProvider;
