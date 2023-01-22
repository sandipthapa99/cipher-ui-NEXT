import Image from "next/image";
import React from "react";

export const EmptyOffers = () => {
    return (
        <div className="text-center">
            <Image
                src={"/board.svg"}
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
                No rewards available.
            </h1>
            <p>You don&apos;t have any rewards yet.</p>
        </div>
    );
};
