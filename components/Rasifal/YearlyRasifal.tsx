import axios from "axios";
import cheerio from "cheerio";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { Rasifal } from "types/rasifal";

import { RasifalCard } from "./RasifalCard";

const HoroscopeCardData = [
    {
        image: "/horoscope/image1.png",
        title: "मेष",
    },

    {
        image: "/horoscope/image2.png",
        title: "वृष",
    },

    {
        image: "/horoscope/image3.png",
        title: "मिथुन",
    },
    {
        image: "/horoscope/image4.png",
        title: "कर्कट",
    },
    {
        image: "/horoscope/image5.png",
        title: "सिंह",
    },
    {
        image: "/horoscope/image6.png",
        title: "कन्या",
    },
    {
        image: "/horoscope/image7.png",
        title: "तुला",
    },
    {
        image: "/horoscope/image8.png",
        title: "वृश्चिक",
    },
    {
        image: "/horoscope/image9.png",
        title: "धनु",
    },
    {
        image: "/horoscope/image10.png",
        title: "मकर",
    },
    {
        image: "/horoscope/image11.png",
        title: "कुम्भ",
    },
    {
        image: "/horoscope/image12.png",
        title: "मीन",
    },
];

export const YearlyRasifal = () => {
    const [yearlyRasifal, setYearlyRasifal] = useState<Rasifal[]>([]);
    const [heading, setHeading] = useState("");

    const url = "https://www.hamropatro.com/rashifal/yearly";

    useEffect(() => {
        axios.get(url).then((response) => {
            const $ = cheerio.load(response.data);
            const heading = $(".articleTitleNew").text();
            setHeading(heading);

            $(".item").each(function (index, element) {
                const fullTitle = $(element).children("a").text();
                const title = fullTitle?.split(" ")[0].trim();

                const insideUrl = `https://www.hamropatro.com${$(element)
                    .children(".desc")
                    .children("p")
                    .children("a")
                    .attr("href")}`;

                axios.get(insideUrl).then((response) => {
                    const $ = cheerio.load(response.data);
                    const description = $(".desc").children("p").text();

                    const image =
                        HoroscopeCardData.find((data) => data?.title === title)
                            ?.image ?? "";

                    setYearlyRasifal((pevYearlyRasifal) => [
                        ...pevYearlyRasifal,
                        { title, description, image },
                    ]);
                });
            });
        });
        return () => {
            setYearlyRasifal([]);
        };
    }, []);

    return (
        <div className="daily-rasifal-details">
            <h3>{heading}</h3>
            <Row>
                {yearlyRasifal?.map((item, index) => (
                    <Col md={6} key={index} className="d-flex">
                        <RasifalCard
                            title={item.title}
                            image={item.image}
                            description={item?.description}
                            showLimited={true}
                            slider={false}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
