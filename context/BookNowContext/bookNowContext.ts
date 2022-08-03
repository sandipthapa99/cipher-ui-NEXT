import { createContext, useContext } from "react";

interface BookNowContext {
    bookNowDetails: any;
    setBookNowDetails: Function;
}

export const bookNowContext = createContext<BookNowContext>(
    {} as BookNowContext
);

export const useBookContext = () => useContext(bookNowContext);
