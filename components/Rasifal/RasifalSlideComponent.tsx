import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside, useScrollLock } from "@mantine/hooks";
import axios from "axios";
import cheerio from "cheerio";
import {} from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { HoroscopeCardData } from "staticData/horoscopeCardData";

import { RasifalCard } from "./RasifalCard";

interface RasifalSliderProps {
    rasifal: boolean;
    setRasifal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Rasifal {
    title: string;
    description: string;
    image: string;
}

export const RasifalSlideComponent = ({
    rasifal,
    setRasifal,
}: RasifalSliderProps) => {
    const [dailyRasifal, setDailyRasifal] = useState<Rasifal[]>([]);
    const container = useClickOutside(() => setRasifal(false));
    const [rasifalTitle, setRasifalTitle] = useState("");
    useScrollLock(rasifal);
    const url = "https://www.hamropatro.com/rashifal";

    useEffect(() => {
        axios.get(url).then((response) => {
            const $ = cheerio.load(response.data);
            const date = $(".articleTitleNew").text();
            setRasifalTitle(date);
            $(".item").each(function (index, element) {
                const title = $(element).children("h3").text();

                const description = $(element).children(".desc").text();

                const image =
                    HoroscopeCardData.find((data) => data?.title === title)
                        ?.image ?? "";

                setDailyRasifal((pevDailyRasifal) => [
                    ...pevDailyRasifal,
                    { title, description, image },
                ]);
            });
        });
        return () => {
            setDailyRasifal([]);
        };
    }, []);

    const today = new Date();

    console.log(today);

    return (
        <>
            <div
                ref={container}
                className={`rasifal-slide-wrapper ${rasifal ? "active" : ""}`}
            >
                <div className="top-section__header">
                    <h3>{rasifalTitle}</h3>
                    <span
                        className="icon"
                        onClick={() => {
                            setRasifal(false);
                            document.body.style.overflow = "unset";
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>

                {/* <h4>{today}</h4> */}

                {dailyRasifal.map((item, index) => (
                    <RasifalCard
                        key={index}
                        title={item.title}
                        image={item.image}
                        description={item?.description}
                    />
                ))}
            </div>
        </>
    );
};
