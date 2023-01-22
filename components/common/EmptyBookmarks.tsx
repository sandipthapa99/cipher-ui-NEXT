import Image from "next/image";
import React from "react";

export const EmptyBookmarks = () => {
    return (
        <div className="text-center p-5">
            <Image
                src="/board.svg"
                alt="board.svg"
                width={256}
                height={256}
                className="p-5"
            />
            <h1
                className="mb-1"
                style={{
                    fontSize: "2.4rem",
                    color: "#343A40",
                }}
            >
                No saved items.
            </h1>
            <p>You can save services, tasks and taskers.</p>
        </div>
    );
};
