import Image from "next/image";
import React from "react";
import { DUMMY_TASKS } from "types/tasks";

export const CollaborateWith = () => {
    return (
        <div className="collaborate-with">
            <h5>Collaborate with</h5>
            <div className="d-flex collaborate-with-image-section">
                {DUMMY_TASKS.map((item) => (
                    <figure className="collaborate-with-image">
                        <Image
                            src={item?.user?.profileImage}
                            alt="collaborate-with-image"
                            height={48}
                            width={48}
                        />
                    </figure>
                ))}
            </div>
        </div>
    );
};
