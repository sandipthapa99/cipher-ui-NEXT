import { East } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import type { CareerValueProps } from "types/careerValuesProps";

const CareerCard = ({ values }: { values: CareerValueProps["result"][0] }) => {
    return (
        <div className="bg-white w-100 mt-3 p-5 d-flex flex-column justify-content-between rounded">
            <h3>{values.title}</h3>
            <Link href={`/career/${values.slug}`}>
                <a>
                    Apply <East />
                </a>
            </Link>
        </div>
    );
};

export default CareerCard;
