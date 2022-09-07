import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside, useScrollLock } from "@mantine/hooks";
import React, { useCallback, useEffect, useRef } from "react";
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
