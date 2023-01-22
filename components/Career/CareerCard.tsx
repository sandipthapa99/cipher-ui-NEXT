import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import type { CareerValueProps } from "types/careerValuesProps";

const CareerCard = ({ values }: { values: CareerValueProps["result"][0] }) => {
    return (
        <div className="bg-white w-100 mt-3 p-5 d-flex flex-column justify-content-between rounded">
            <h3>{values.title}</h3>
            <Link href={`/career/${values.slug}`}>
                <a>
                    Apply <FontAwesomeIcon icon={faArrowRight} />
                </a>
            </Link>
        </div>
    );
};

export default CareerCard;
