import { ReactNode, useState } from "react";

const Spoiler = ({ text }: { text: string }) => {
    const [showMore, setShowMore] = useState(false);

    // if (text.length > 400) {
    //     setShowMore(true);
    // }

    return (
        <span>
            {!showMore && text.length > 300 ? text?.substring(0, 200) : text}{" "}
            <span
                onClick={() => setShowMore((prev) => !prev)}
                style={{ cursor: "pointer", color: "#8ecae6" }}
            >
                ...{!showMore ? "show More" : "show Less"}
            </span>
        </span>
    );
};

export default Spoiler;
