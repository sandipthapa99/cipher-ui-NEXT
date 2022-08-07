import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import type { CareerCardProps } from "staticData/careerCardValues";

const CareerCard = ({ values }: { values: CareerCardProps }) => {
    return (
        <div className="bg-white w-100 mt-5 p-5 d-flex flex-column justify-content-between rounded">
            <h3>{values.Title}</h3>
            <Link href={""}>
                <a>
                    Apply <FontAwesomeIcon icon={faArrowRight} />
                </a>
            </Link>
        </div>
    );
};

export default CareerCard;
