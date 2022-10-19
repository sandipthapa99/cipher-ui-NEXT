import { useRef } from "react";

export const useScrollToTop = <TElement extends HTMLElement>() => {
    const ref = useRef<TElement | null>(null);

    const scrollToTop = () => {
        if (!ref.current) return;
        // scroll to the top of the element with fixed height
        ref.current.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return { ref, scrollToTop };
};
