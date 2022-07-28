import {
    faChartSimple,
    faFileInvoiceDollar,
    faGaugeHigh,
    faGear,
    faGift,
    faRightFromBracket,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ProfileCardContent } from "staticData/profileCardContent";

export const ProfileModel = ({ profile }: { profile: ProfileCardContent }) => {
    const router = useRouter();
    return (
        <div className="profile-dropdown p-4">
            <div
                className="d-flex justify-content-between align-items-center profile-header"
                onClick={() => router.push("/profile")}
            >
                <div className="d-flex justify-content-between profile-desc">
                    <figure>
                        <Image
                            src="/userprofile/profile.svg"
                            layout="fill"
                            alt="profile-pic"
                            className="rounded-circle"
                            objectFit="cover"
                        />
                    </figure>
                    <div className="ms-3 d-flex justify-content-around flex-column profile-desc__detail">
                        <h4>{profile.name}</h4>
                        <span>{profile.type}</span>
                    </div>
                </div>
                <figure>
                    <Image
                        src="/userprofile/badge.png"
                        layout="fill"
                        alt="profile-pic"
                        objectFit="cover"
                    />
                </figure>
            </div>
            <ul>
                <li>
                    <Link href="">
                        <a>
                            <FontAwesomeIcon
                                icon={faChartSimple}
                                className="svg-icon"
                            />
                            overview
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>
                            <FontAwesomeIcon
                                icon={faFileInvoiceDollar}
                                className="svg-icon"
                            />
                            payment history
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>
                            <FontAwesomeIcon
                                icon={faGift}
                                className="svg-icon"
                            />
                            Redeem
                        </a>
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href="">
                        <a>
                            <FontAwesomeIcon
                                icon={faGaugeHigh}
                                className="svg-icon"
                            />
                            overview
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <a>
                            <FontAwesomeIcon
                                icon={faGear}
                                className="svg-icon"
                            />
                            payment history
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className="border-0">
                <li>
                    <Link href="">
                        <a>
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                className="svg-icon svg-180-transfrom"
                            />
                            Logout
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
