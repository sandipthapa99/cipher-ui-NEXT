import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface HoroscopeDataProps {
    image: string;
    title: string;
    dateFrom: string;
    dateTo: string;
    description: string;
}

export const HoroscopeCard = ({
    image,
    title,
    dateFrom,
    dateTo,
    description,
}: HoroscopeDataProps) => {
    return (
        <div className="d-flex horoscope-card">
            <figure className="horoscope-card__image">
                <Image
                    src={image}
                    alt={"horoscope-image"}
                    height={40}
                    width={40}
                />
            </figure>

            <div className="horoscope-card__description">
                <div className="d-flex justify-content-between title-section">
                    <h6 className="title">{title}</h6>
                    <h6 className="date">
                        {dateFrom} - {dateTo}
                    </h6>
                </div>
                <p>{description}</p>
            </div>
        </div>
    );
};
