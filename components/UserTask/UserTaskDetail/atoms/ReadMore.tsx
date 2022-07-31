import { HTMLAttributes, useMemo } from "react";
import { useState } from "react";

interface ReadMoreProps extends HTMLAttributes<HTMLParagraphElement> {
    text: string;
    maxLength: number;
}
export const ReadMore = ({ text, maxLength, ...rest }: ReadMoreProps) => {
    const [showMore, setShowMore] = useState(false);

    const toggle = () => setShowMore((currValue) => !currValue);

    const truncatedText = useMemo(
        () => (showMore ? text : `${text.slice(0, maxLength)}...`),
        [text, maxLength, showMore]
    );
    return (
        <p {...rest}>
            {truncatedText}{" "}
            <span className="toggle-text-btn" onClick={toggle}>
                {showMore ? "Show less" : "Show More"}
            </span>
        </p>
    );
};
