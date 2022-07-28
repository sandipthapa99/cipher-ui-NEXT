import { faChartSimple } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export const PostTaskModel = () => {
    return (
        <div className="profile-dropdown p-4">
            <div className="d-flex justify-content-between align-items-center profile-header">
                <div className="d-flex justify-content-between profile-desc">
                    <figure>
                        <Image
                            src="/aboutus/scope-1.png"
                            layout="fill"
                            alt="profile-pic"
                            className="rounded-circle"
                            objectFit="cover"
                        />
                    </figure>
                    <div className="ms-3 d-flex justify-content-around flex-column profile-desc__detail">
                        <h4>Harry Smith</h4>
                        <span>Client</span>
                    </div>
                </div>
                <figure>
                    <Image
                        src="/aboutus/scope-1.png"
                        layout="fill"
                        alt="profile-pic"
                        className="rounded-circle"
                        objectFit="cover"
                    />
                </figure>
            </div>
            <ul>
                <li>
                    <FontAwesomeIcon
                        icon={faChartSimple}
                        className="svg-icon svg-icon-chart-simple"
                    />
                    overview
                </li>
                <li>payment history</li>
                <li>reedeem</li>
            </ul>
        </div>
    );
};
