import { Carousel } from "@mantine/carousel";
import React from "react";
import { HoroscopeCardData } from "staticData/horoscopeCardData";

import { HoroscopeCard } from "./common/HoroscopeCard";

export const HoroscopeSlider = () => {
    return (
        <Carousel
            slideSize="33.333333%"
            slideGap="md"
            breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
            ]}
            loop
            align="start"
        >
            {HoroscopeCardData.map((item, index) => (
                <Carousel.Slide key={index}>
                    <HoroscopeCard
                        image={item.image}
                        title={item.title}
                        dateFrom={item.dateFrom}
                        dateTo={item.dateTo}
                        description={item.description}
                    />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
};
