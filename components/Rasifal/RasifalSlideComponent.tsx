import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside, useScrollLock } from "@mantine/hooks";
// import axios from "axios";
// import cheerio from "cheerio";
// import React, { useEffect } from "react";
import { HoroscopeCardData } from "staticData/horoscopeCardData";

import { RasifalCard } from "./RasifalCard";

interface RasifalSliderProps {
    rasifal: boolean;
    setRasifal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RasifalSlideComponent = ({
    rasifal,
    setRasifal,
}: RasifalSliderProps) => {
    const container = useClickOutside(() => setRasifal(false));
    useScrollLock(rasifal);

    // const spaen = ["daily", "weekly", "monthly", "yearly"];

    // const { span, sign } = "";
    // const obj1 = {
    //     message: "/api/:span can only have daily, weekly, monthly or yearly",
    // };

    // useEffect(() => {
    //     const url = `https://www.hamropatro.com/rashifal/weekly/mesh`;
    //     console.log(url);
    //     axios
    //         .get(url)
    //         .then((res) => {
    //             const $ = cheerio.load(res.data);
    //             const desc = $(".desc").find("p").text();
    //             const date = $(".articleTitleNew").find("span").text();
    //             const dt = date.split(" ");

    //             const sc = desc.replace("\n", "");
    //             const obj = {
    //                 date:
    //                     span === "daily"
    //                         ? `${dt[2]} ${dt[1]} ${dt[0]} ${dt[3]}`
    //                         : span === "weekly"
    //                         ? `${dt[1]} - ${dt[3]} ${dt[0]}`
    //                         : span === "monthly"
    //                         ? `${dt[0]} ${dt[1]}`
    //                         : `${dt[0]} ${dt[1]} ${dt[2]}`,
    //                 sun_sign: dt[dt.length - 5],
    //                 prediction: sc,
    //             };
    //             console.log(obj);
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // }, []);

    return (
        <>
            <div
                ref={container}
                className={`rasifal-slide-wrapper ${rasifal ? "active" : ""}`}
            >
                <div className="top-section__header">
                    <h3>दैनिक राशिफल</h3>
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

                {HoroscopeCardData.map((item, index) => (
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
