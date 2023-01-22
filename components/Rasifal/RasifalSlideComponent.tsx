import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "@mantine/core";
import { useClickOutside, useScrollLock } from "@mantine/hooks";
import axios from "axios";
import cheerio from "cheerio";
import {} from "date-fns/locale";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { Rasifal } from "types/rasifal";

import { RasifalCard } from "./RasifalCard";

const HoroscopeCardData = [
    {
        image: "/horoscope/image1.png",
        title: "मेष",
    },

    {
        image: "/horoscope/image2.png",
        title: "बृष",
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
        title: "बृश्चिक",
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

interface RasifalSliderProps {
    rasifal: boolean;
    setRasifal: React.Dispatch<React.SetStateAction<boolean>>;
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

                {dailyRasifal.length <= 1 &&
                    Array.from({ length: 12 }).map((_, key) => (
                        <div className="p-5 my-2" key={key}>
                            <Skeleton
                                height={80}
                                width={"100%"}
                                className="my-2"
                            />
                            <Skeleton
                                height={20}
                                width={"100%"}
                                className="my-3"
                            />
                            <Skeleton
                                height={10}
                                width={"100%"}
                                className="my-3"
                            />
                        </div>
                    ))}

                <Link href="/rasifal">
                    <a>
                        {dailyRasifal.map((item, index) => (
                            <RasifalCard
                                key={index}
                                title={item.title}
                                image={item.image}
                                description={item?.description}
                                showLimited={false}
                                slider={true}
                            />
                        ))}
                    </a>
                </Link>
            </div>
        </>
    );
};
