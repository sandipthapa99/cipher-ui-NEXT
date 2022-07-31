import Image from "next/image";
import React from "react";

interface CreatedTaskProps {
    text_after?: string;
}

export const CreatedTask = ({ text_after }: CreatedTaskProps) => {
    return (
        <div className="d-flex created-task-notification">
            <figure className="dropdown-notification-image">
                <Image
                    alt="testimage"
                    src="/community/blog1.png"
                    height={50}
                    width={50}
                />
            </figure>
            <div className="description-section">
                <h4>
                    <span>Created task</span> Need House Cleaner{" "}
                    <span>{text_after}</span>
                </h4>
                <p>Yesterday 03:30 PM</p>
            </div>
        </div>
    );
};
