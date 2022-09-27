import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export const ServiceAccept = () => {
    return (
        <div className="d-flex align-items-center justify-content-between accepted-notification">
            <div className="d-flex notification-wrapper">
                <figure className="d-flex flex-column justify-content-center notification-image">
                    <Image
                        alt="testimage"
                        src="/community/blog1.png"
                        height={50}
                        width={50}
                    />
                </figure>
                <div className="description-section">
                    <h4>Need a Gardener</h4>
                    <p className="main-desc">25 May, 2022 - 02:30 PM</p>
                    <div className="d-flex align-items-center image-cont-scheduling">
                        <div className=" d-flex align-items-center gap-4">
                            <figure className="rounded-circle">
                                <Image
                                    className="rounded-circle"
                                    alt="testimage"
                                    src="/community/blog1.png"
                                    height={32}
                                    width={32}
                                />
                            </figure>
                            <div>
                                <p className="m-0 main-desc ">John mayer</p>
                                <p className="m-0 main-desc">
                                    Gardening Services
                                </p>
                            </div>
                            <div className="d-flex align-items-center gap-4">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="text-secondary"
                                />
                                <p className="m-0 main-desc ">
                                    Scheduled: 25 May, 2022 - 02:30 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <AcceptReject /> */}
            <div className="d-flex confirm-cross ">
                <span className="text-confirm">Confirmed</span>
                {/* <FontAwesomeIcon icon={faXmark} /> */}
            </div>
        </div>
    );
};
