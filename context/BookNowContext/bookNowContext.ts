import { createContext, useContext } from "react";
import type { BookNowDetails } from "types/serviceNearYouCard";

interface BookNowContext {
    bookNowDetails: BookNowDetails;
    setBookNowDetails: React.Dispatch<React.SetStateAction<BookNowDetails>>;
}

export const bookNowContext = createContext<BookNowContext>(
    {} as BookNowContext
);

export const useBookContext = () => useContext(bookNowContext);
